import { NextResponse } from "next/server";
import { getLiveStatsData } from "@/lib/redis-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getLiveStatsData();
    if (!stats) {
      return NextResponse.json(
        { error: "Stats storage unavailable" },
        {
          status: 503,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        }
      );
    }

    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (err) {
    console.error("[api/stats GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch live stats" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      }
    );
  }
}

