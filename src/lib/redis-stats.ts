import { Redis } from "@upstash/redis";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getWritableDataDir } from "@/lib/data-path";

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
const ONLINE_SESSIONS_KEY = "live:sessions";
const DAILY_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days
const LIVE_WINDOW_MS = 60 * 1000; // 60 seconds active window
const ONLINE_KEY_TTL_SECONDS = 5 * 60; // safety TTL on the ZSET

let cachedClient: Redis | null | undefined;

interface LocalStatsStore {
  total: number;
  daily: Record<string, number>;
  countries: Record<string, number>;
  downloads: number;
  sessions: Record<string, number>;
}

const LOCAL_STATS_FILE = () => path.join(getWritableDataDir(), "live-stats.json");
const LEADS_FILE = () => path.join(getWritableDataDir(), "resume-leads.jsonl");

// Serialize local file read-modify-write operations in-process to avoid lost updates
let localQueue: Promise<unknown> = Promise.resolve();

function withLocalLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = localQueue.then(fn, fn);
  localQueue = next.catch(() => {});
  return next;
}

async function countVerifiedLeadRecords(): Promise<number> {
  try {
    const raw = await readFile(LEADS_FILE(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    return lines.length;
  } catch {
    return 0;
  }
}

async function readLocalStore(nowMs: number): Promise<LocalStatsStore> {
  let store: LocalStatsStore | null = null;
  try {
    const raw = await readFile(LOCAL_STATS_FILE(), "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalStatsStore>;
    store = {
      total: Math.max(0, Number(parsed.total ?? 0) || 0),
      daily: parsed.daily && typeof parsed.daily === "object" ? { ...parsed.daily } : {},
      countries:
        parsed.countries && typeof parsed.countries === "object" ? { ...parsed.countries } : {},
      downloads: Math.max(0, Number(parsed.downloads ?? 0) || 0),
      sessions:
        parsed.sessions && typeof parsed.sessions === "object" ? { ...parsed.sessions } : {},
    };
  } catch {
    const verifiedLeads = await countVerifiedLeadRecords();
    store = {
      total: verifiedLeads,
      daily: {},
      countries: {},
      downloads: verifiedLeads,
      sessions: {},
    };
  }

  // Reconcile downloads floor with real logged OTP-verified leads on disk
  const verifiedLeads = await countVerifiedLeadRecords();
  if (verifiedLeads > store.downloads) {
    store.downloads = verifiedLeads;
  }

  // Prune expired live sessions (>60s)
  const cutoff = nowMs - LIVE_WINDOW_MS;
  for (const [sid, ts] of Object.entries(store.sessions)) {
    if (!Number.isFinite(ts) || ts < cutoff) {
      delete store.sessions[sid];
    }
  }

  return store;
}

async function writeLocalStore(store: LocalStatsStore): Promise<void> {
  const dir = getWritableDataDir();
  await mkdir(dir, { recursive: true });
  await writeFile(LOCAL_STATS_FILE(), JSON.stringify(store, null, 2), "utf8");
}

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
  const nowMs = Date.now();
  const istDate = getIstDateKey(new Date(nowMs));

  if (!redis) {
    return withLocalLock(async () => {
      try {
        const store = await readLocalStore(nowMs);
        store.total += 1;
        store.daily[istDate] = (store.daily[istDate] ?? 0) + 1;
        if (options.countryCode) {
          store.countries[options.countryCode] =
            (store.countries[options.countryCode] ?? 0) + 1;
        }
        if (options.sessionId && isValidSessionId(options.sessionId)) {
          store.sessions[options.sessionId] = nowMs;
        }
        await writeLocalStore(store);
        console.info("[stats] local visit recorded", {
          istDate,
          total: store.total,
          today: store.daily[istDate],
        });
        return { ok: true, total: store.total, today: store.daily[istDate] };
      } catch (err) {
        console.error("[stats] local recordVisitStats failed:", err);
        return { ok: false, error: "Local stats write failed" };
      }
    });
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
      pipe.zadd(ONLINE_SESSIONS_KEY, { score: nowMs, member: options.sessionId });
      pipe.zremrangebyscore(ONLINE_SESSIONS_KEY, 0, nowMs - LIVE_WINDOW_MS);
      pipe.expire(ONLINE_SESSIONS_KEY, ONLINE_KEY_TTL_SECONDS);
    }

    const results = await pipe.exec();
    const total = Number(results[0] ?? 0);
    const today = Number(results[1] ?? 0);

    console.info("[stats] visit recorded", {
      todayKey,
      country: options.countryCode ?? "unknown",
      total,
      today,
    });

    return { ok: true, total, today };
  } catch (err) {
    console.error("[stats] recordVisitStats failed:", err);
    return { ok: false, error: "Redis write failed" };
  }
}

export async function refreshHeartbeat(sessionId: string): Promise<{ ok: boolean; error?: string }> {
  if (!isValidSessionId(sessionId)) {
    return { ok: false, error: "Invalid sessionId" };
  }

  const redis = getRedisClient();
  const nowMs = Date.now();

  if (!redis) {
    return withLocalLock(async () => {
      try {
        const store = await readLocalStore(nowMs);
        store.sessions[sessionId] = nowMs;
        await writeLocalStore(store);
        return { ok: true };
      } catch (err) {
        console.error("[stats] local refreshHeartbeat failed:", err);
        return { ok: false, error: "Local heartbeat failed" };
      }
    });
  }

  try {
    const pipe = redis.pipeline();
    pipe.zadd(ONLINE_SESSIONS_KEY, { score: nowMs, member: sessionId });
    pipe.zremrangebyscore(ONLINE_SESSIONS_KEY, 0, nowMs - LIVE_WINDOW_MS);
    pipe.expire(ONLINE_SESSIONS_KEY, ONLINE_KEY_TTL_SECONDS);
    await pipe.exec();

    console.info("[stats] heartbeat refreshed", { zset: ONLINE_SESSIONS_KEY });
    return { ok: true };
  } catch (err) {
    console.error("[stats] refreshHeartbeat failed:", err);
    return { ok: false, error: "Redis heartbeat failed" };
  }
}

export async function incrementResumeDownloadStat(): Promise<number | null> {
  const redis = getRedisClient();
  const nowMs = Date.now();

  if (!redis) {
    return withLocalLock(async () => {
      try {
        const store = await readLocalStore(nowMs);
        store.downloads += 1;
        await writeLocalStore(store);
        console.info("[stats] local resume download incremented", { downloads: store.downloads });
        return store.downloads;
      } catch (err) {
        console.error("[stats] local incrementResumeDownloadStat failed:", err);
        return null;
      }
    });
  }

  try {
    const next = await redis.incr(RESUME_DOWNLOADS_KEY);
    const downloads = Number(next);
    console.info("[stats] resume download incremented", { downloads });
    return downloads;
  } catch (err) {
    console.error("[stats] incrementResumeDownloadStat failed:", err);
    return null;
  }
}

export async function getLiveStatsData(): Promise<LiveStatsPayload | null> {
  const redis = getRedisClient();
  const nowMs = Date.now();
  const istDate = getIstDateKey(new Date(nowMs));

  if (!redis) {
    return withLocalLock(async () => {
      try {
        const store = await readLocalStore(nowMs);
        await writeLocalStore(store);
        return {
          total: store.total,
          today: Math.max(0, Number(store.daily[istDate] ?? 0) || 0),
          online: Object.keys(store.sessions).length,
          downloads: store.downloads,
          countries: store.countries,
          updatedAt: new Date(nowMs).toISOString(),
        };
      } catch (err) {
        console.error("[stats] local getLiveStatsData failed:", err);
        return null;
      }
    });
  }

  try {
    const todayKey = dailyVisitsKey();
    const pipe = redis.pipeline();
    pipe.get<number | string>(TOTAL_VISITS_KEY);
    pipe.get<number | string>(todayKey);
    pipe.get<number | string>(RESUME_DOWNLOADS_KEY);
    pipe.hgetall<Record<string, number | string>>(COUNTRIES_HASH_KEY);
    pipe.zremrangebyscore(ONLINE_SESSIONS_KEY, 0, nowMs - LIVE_WINDOW_MS);
    pipe.zcard(ONLINE_SESSIONS_KEY);

    const results = await pipe.exec();
    const rawTotal = results[0] as number | string | null;
    const rawToday = results[1] as number | string | null;
    const rawDownloads = results[2] as number | string | null;
    const rawCountries = results[3] as Record<string, number | string> | null;
    const rawOnline = results[5] as number | string | null;

    const countries: Record<string, number> = {};
    if (rawCountries && typeof rawCountries === "object") {
      for (const [code, val] of Object.entries(rawCountries)) {
        const count = Number(val);
        if (Number.isFinite(count) && count > 0) {
          countries[code.toUpperCase()] = count;
        }
      }
    }

    const payload: LiveStatsPayload = {
      total: Math.max(0, Number(rawTotal ?? 0) || 0),
      today: Math.max(0, Number(rawToday ?? 0) || 0),
      online: Math.max(0, Number(rawOnline ?? 0) || 0),
      downloads: Math.max(0, Number(rawDownloads ?? 0) || 0),
      countries,
      updatedAt: new Date(nowMs).toISOString(),
    };

    console.info("[stats] read snapshot", {
      todayKey,
      total: payload.total,
      today: payload.today,
      online: payload.online,
      downloads: payload.downloads,
      countryKeys: Object.keys(countries).length,
    });

    return payload;
  } catch (err) {
    console.error("[stats] getLiveStatsData failed:", err);
    return null;
  }
}
