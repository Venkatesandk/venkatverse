import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { getSeedDataDir, getWritableDataDir } from "@/lib/data-path";

interface AnalyticsData {
  total: number;
  daily: Record<string, number>;
}

const WRITE_FILE = () => path.join(getWritableDataDir(), "analytics.json");
const SEED_FILE = () => path.join(getSeedDataDir(), "analytics.json");

/** Survives warm serverless instances */
let memory: AnalyticsData | null = null;

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function normalize(parsed: Partial<AnalyticsData> | null): AnalyticsData {
  const total =
    typeof parsed?.total === "number" && parsed.total >= BASE_VISITOR_COUNT
      ? parsed.total
      : BASE_VISITOR_COUNT;
  return {
    total,
    daily: parsed?.daily && typeof parsed.daily === "object" ? parsed.daily : {},
  };
}

async function readJson(file: string): Promise<AnalyticsData | null> {
  try {
    const raw = await readFile(file, "utf8");
    return normalize(JSON.parse(raw) as AnalyticsData);
  } catch {
    return null;
  }
}

async function load(): Promise<AnalyticsData> {
  if (memory) return memory;

  // Prefer writable runtime file (/tmp on Vercel), then bundled seed
  const fromWrite = await readJson(WRITE_FILE());
  if (fromWrite) {
    memory = fromWrite;
    return memory;
  }

  const fromSeed = await readJson(SEED_FILE());
  memory = fromSeed ?? { total: BASE_VISITOR_COUNT, daily: {} };
  return memory;
}

async function persist(data: AnalyticsData) {
  memory = data;
  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await writeFile(WRITE_FILE(), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    // Never fail the request — in-memory still works for this instance
    console.warn("[analytics] persist skipped:", error);
  }
}

export async function getAnalytics() {
  const data = await load();
  const today = todayKey();
  return {
    total: data.total,
    today: data.daily[today] ?? 0,
  };
}

export async function recordVisit() {
  const data = await load();
  const today = todayKey();
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
  };
}
