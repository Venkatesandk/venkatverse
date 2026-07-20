import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { getAnalytics, recordVisit } from "@/lib/analytics-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const stats = await recordVisit();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[analytics POST]", error);
    // Never break the site for analytics — return a safe baseline
    return NextResponse.json({
      total: BASE_VISITOR_COUNT,
      today: 0,
      degraded: true,
    });
  }
}

export async function GET() {
  try {
    const stats = await getAnalytics();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ total: BASE_VISITOR_COUNT, today: 0 });
  }
}
