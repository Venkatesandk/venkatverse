import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { BASE_VISITOR_COUNT } from "@/lib/counters";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "analytics.json");

interface AnalyticsData {
  total: number;
  daily: Record<string, number>;
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

async function read(): Promise<AnalyticsData> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as AnalyticsData;
    const total =
      typeof parsed.total === "number" && parsed.total >= BASE_VISITOR_COUNT
        ? parsed.total
        : BASE_VISITOR_COUNT;
    return {
      total,
      daily: parsed.daily && typeof parsed.daily === "object" ? parsed.daily : {},
    };
  } catch {
    return { total: BASE_VISITOR_COUNT, daily: {} };
  }
}

async function write(data: AnalyticsData) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getAnalytics() {
  const data = await read();
  const today = todayKey();
  return {
    total: data.total,
    today: data.daily[today] ?? 0,
  };
}

export async function recordVisit() {
  const data = await read();
  const today = todayKey();
  data.total += 1;
  data.daily[today] = (data.daily[today] ?? 0) + 1;
  await write(data);
  return {
    total: data.total,
    today: data.daily[today],
  };
}
