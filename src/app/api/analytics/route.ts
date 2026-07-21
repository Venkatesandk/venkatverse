import { NextResponse } from "next/server";
import { getAnalytics, recordVisit } from "@/lib/analytics-store";
import { validCoords } from "@/lib/geo";
import { recordMapPin } from "@/lib/map-pins-store";
import { geoFromIp, getClientIp } from "@/lib/ip-geo";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function fallbackStats() {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "src", "data", "analytics.seed.json"),
      "utf8"
    );
    const seed = JSON.parse(raw) as { total?: number; daily?: Record<string, number> };
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    return {
      total: seed.total ?? 925,
      today: seed.daily?.[today] ?? 0,
    };
  } catch {
    return { total: 925, today: 0 };
  }
}

export async function POST(request: Request) {
  try {
    let lat: number | null = null;
    let lng: number | null = null;

    try {
      const body = await request.json();
      lat = body?.geo?.lat ?? body?.lat ?? null;
      lng = body?.geo?.lng ?? body?.lng ?? null;
    } catch {
      /* no body */
    }

    const stats = await recordVisit();

    let coords = validCoords(lat, lng);
    if (!coords) {
      coords = await geoFromIp(getClientIp(request));
    }

    if (coords) {
      await recordMapPin({
        type: "visit",
        lat: coords.lat,
        lng: coords.lng,
        label: "Portfolio visitor",
      });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[analytics POST]", error);
    const baseline = await fallbackStats();
    return NextResponse.json({ ...baseline, degraded: true });
  }
}

export async function GET() {
  try {
    const stats = await getAnalytics();
    return NextResponse.json(stats);
  } catch {
    const baseline = await fallbackStats();
    return NextResponse.json(baseline);
  }
}
