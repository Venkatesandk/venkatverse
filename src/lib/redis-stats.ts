import { Redis } from "@upstash/redis";

export interface LiveStatsPayload {
  total: number;
  today: number;
  online: number;
  downloads: number;
  countries: Record<string, number>;
  updatedAt: string;
}

const TOTAL_VISITS_KEY = "stats:total_visits";
const RESUME_DOWNLOADS_KEY = "stats:resume_downloads";
const COUNTRIES_HASH_KEY = "stats:countries";
const DAILY_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days
const LIVE_TTL_SECONDS = 60; // 60 seconds

let cachedClient: Redis | null | undefined;

function getRedisCredentials(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim() ||
    "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim() ||
    "";

  if (!url || !token) return null;
  return { url, token };
}

export function isRedisConfigured(): boolean {
  return Boolean(getRedisCredentials());
}

function getRedisClient(): Redis | null {
  if (cachedClient !== undefined) return cachedClient;
  const creds = getRedisCredentials();
  if (!creds) {
    cachedClient = null;
    return null;
  }
  cachedClient = new Redis({ url: creds.url, token: creds.token });
  return cachedClient;
}

/** Current date YYYY-MM-DD in Asia/Kolkata timezone */
export function getIstDateKey(date = new Date()): string {
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export function dailyVisitsKey(date = new Date()): string {
  return `stats:visits:${getIstDateKey(date)}`;
}

const BOT_UA_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|applebot|pinterest|semrush|ahrefs|mj12bot|dotbot|petalbot|yandex|baiduspider|duckduckbot|headlesschrome|puppeteer|playwright|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|statuscake|curl|wget|python-requests|python-urllib|go-http-client|axios|node-fetch|undici|java\/|okhttp/i;

export function isBotUserAgent(userAgent?: string | null): boolean {
  if (!userAgent || !userAgent.trim()) return true;
  return BOT_UA_PATTERN.test(userAgent);
}

export function readCountryFromHeaders(headers: Headers): string | null {
  const raw =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    "";
  const code = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || code === "XX" || code === "T1") {
    return null;
  }
  return code;
}

export function isValidSessionId(sessionId: unknown): sessionId is string {
  return typeof sessionId === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(sessionId);
}

export async function recordVisitStats(options: {
  countryCode: string | null;
  sessionId?: string | null;
}): Promise<{ ok: boolean; total?: number; today?: number; error?: string }> {
  const redis = getRedisClient();
  if (!redis) {
    console.warn("[redis-stats] Redis env vars not configured; skipping visit increment.");
    return { ok: false, error: "Redis not configured" };
  }

  try {
    const todayKey = dailyVisitsKey();
    const pipe = redis.pipeline();
    pipe.incr(TOTAL_VISITS_KEY);
    pipe.incr(todayKey);
    pipe.expire(todayKey, DAILY_TTL_SECONDS);

    if (options.countryCode) {
      pipe.hincrby(COUNTRIES_HASH_KEY, options.countryCode, 1);
    }
    if (options.sessionId && isValidSessionId(options.sessionId)) {
      pipe.set(`live:${options.sessionId}`, "1", { ex: LIVE_TTL_SECONDS });
    }

    const results = await pipe.exec();
    const total = Number(results[0] ?? 0);
    const today = Number(results[1] ?? 0);

    return { ok: true, total, today };
  } catch (err) {
    console.error("[redis-stats] recordVisitStats failed:", err);
    return { ok: false, error: "Redis write failed" };
  }
}

export async function refreshHeartbeat(sessionId: string): Promise<{ ok: boolean; error?: string }> {
  const redis = getRedisClient();
  if (!redis) {
    return { ok: false, error: "Redis not configured" };
  }
  if (!isValidSessionId(sessionId)) {
    return { ok: false, error: "Invalid sessionId" };
  }

  try {
    await redis.set(`live:${sessionId}`, "1", { ex: LIVE_TTL_SECONDS });
    return { ok: true };
  } catch (err) {
    console.error("[redis-stats] refreshHeartbeat failed:", err);
    return { ok: false, error: "Redis heartbeat failed" };
  }
}

export async function incrementResumeDownloadStat(): Promise<number | null> {
  const redis = getRedisClient();
  if (!redis) {
    console.warn("[redis-stats] Redis not configured; skipping resume download increment.");
    return null;
  }

  try {
    const next = await redis.incr(RESUME_DOWNLOADS_KEY);
    return Number(next);
  } catch (err) {
    console.error("[redis-stats] incrementResumeDownloadStat failed:", err);
    return null;
  }
}

async function countOnlineSessions(redis: Redis): Promise<number> {
  let cursor = "0";
  const seen = new Set<string>();
  let iterations = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: "live:*",
      count: 100,
    });
    for (const k of keys) {
      seen.add(k);
    }
    cursor = String(nextCursor);
    iterations += 1;
  } while (cursor !== "0" && iterations < 50);

  return seen.size;
}

export async function getLiveStatsData(): Promise<LiveStatsPayload | null> {
  const redis = getRedisClient();
  if (!redis) {
    console.warn("[redis-stats] Redis env vars not configured.");
    return null;
  }

  try {
    const todayKey = dailyVisitsKey();
    const [rawTotal, rawToday, rawDownloads, rawCountries, online] = await Promise.all([
      redis.get<number | string>(TOTAL_VISITS_KEY),
      redis.get<number | string>(todayKey),
      redis.get<number | string>(RESUME_DOWNLOADS_KEY),
      redis.hgetall<Record<string, number | string>>(COUNTRIES_HASH_KEY),
      countOnlineSessions(redis),
    ]);

    const countries: Record<string, number> = {};
    if (rawCountries && typeof rawCountries === "object") {
      for (const [code, val] of Object.entries(rawCountries)) {
        const count = Number(val);
        if (Number.isFinite(count) && count > 0) {
          countries[code.toUpperCase()] = count;
        }
      }
    }

    return {
      total: Math.max(0, Number(rawTotal ?? 0) || 0),
      today: Math.max(0, Number(rawToday ?? 0) || 0),
      online: Math.max(0, online),
      downloads: Math.max(0, Number(rawDownloads ?? 0) || 0),
      countries,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[redis-stats] getLiveStatsData failed:", err);
    return null;
  }
}

