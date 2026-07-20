import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { getWritableDataDir } from "@/lib/data-path";

interface AnalyticsData {
  total: number;
  daily: Record<string, number>;
}

const WRITE_FILE = () => path.join(getWritableDataDir(), "analytics.json");
const SEED_FILE = () =>
  path.join(process.cwd(), "src", "data", "analytics.seed.json");

/** Survives warm serverless instances */
let memory: AnalyticsData | null = null;

/** Today in IST (India) — matches your timezone */
export function todayKeyIST(d = new Date()): string {
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function envBaselineTotal(): number {
  const raw = process.env.ANALYTICS_TOTAL ?? process.env.VISITOR_BASELINE;
  if (!raw) return BASE_VISITOR_COUNT;
  const n = Number(raw);
  return Number.isFinite(n) && n >= BASE_VISITOR_COUNT ? n : BASE_VISITOR_COUNT;
}

function normalize(parsed: Partial<AnalyticsData> | null, floorTotal: number): AnalyticsData {
  const total =
    typeof parsed?.total === "number" && parsed.total >= floorTotal
      ? parsed.total
      : floorTotal;
  return {
    total,
    daily: parsed?.daily && typeof parsed.daily === "object" ? { ...parsed.daily } : {},
  };
}

async function readJson(file: string): Promise<AnalyticsData | null> {
  try {
    const raw = await readFile(file, "utf8");
    return normalize(JSON.parse(raw) as AnalyticsData, envBaselineTotal());
  } catch {
    return null;
  }
}

async function readSeed(): Promise<AnalyticsData> {
  const fromFile = await readJson(SEED_FILE());
  const floor = Math.max(envBaselineTotal(), fromFile?.total ?? envBaselineTotal());
  return fromFile ?? { total: floor, daily: {} };
}

function mergeDaily(
  a: Record<string, number>,
  b: Record<string, number>
): Record<string, number> {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: Record<string, number> = {};
  for (const k of keys) {
    out[k] = Math.max(a[k] ?? 0, b[k] ?? 0);
  }
  return out;
}

function reconcile(data: AnalyticsData, seed: AnalyticsData): AnalyticsData {
  const today = todayKeyIST();
  const todayCount = data.daily[today] ?? 0;
  const seedToday = seed.daily[today] ?? 0;

  const daily = mergeDaily(seed.daily, data.daily);
  const mergedToday = daily[today] ?? 0;

  // Total must never lag behind seed + today's live count
  const minTotal = Math.max(seed.total, data.total, seed.total + mergedToday - seedToday);

  // If daily says more visits happened today than total growth suggests, fix total
  const dailySum = Object.values(daily).reduce((s, n) => s + n, 0);
  const fixedTotal = Math.max(minTotal, seed.total + dailySum - Object.values(seed.daily).reduce((s, n) => s + n, 0));

  return {
    total: Math.max(fixedTotal, seed.total + (mergedToday - seedToday)),
    daily,
  };
}

async function load(): Promise<AnalyticsData> {
  if (memory) return memory;

  const seed = await readSeed();
  const rawRuntime = await readJson(WRITE_FILE());
  // Discard stale runtime when total fell below committed seed baseline
  const runtime =
    rawRuntime && rawRuntime.total < seed.total ? null : rawRuntime;

  if (!runtime) {
    memory = reconcile({ total: seed.total, daily: {} }, seed);
    return memory;
  }

  memory = reconcile(runtime, seed);
  return memory;
}

async function persist(data: AnalyticsData) {
  memory = data;
  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await writeFile(WRITE_FILE(), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.warn("[analytics] persist skipped:", error);
  }
}

export async function getAnalytics() {
  const data = await load();
  const today = todayKeyIST();
  return {
    total: data.total,
    today: data.daily[today] ?? 0,
    date: today,
  };
}

export async function recordVisit() {
  const data = await load();
  const today = todayKeyIST();
  const next: AnalyticsData = {
    total: data.total + 1,
    daily: {
      ...data.daily,
      [today]: (data.daily[today] ?? 0) + 1,
    },
  };
  await persist(next);
  return {
    total: next.total,
    today: next.daily[today],
    date: today,
  };
}
