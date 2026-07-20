import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { getAnalytics, recordVisit } from "@/lib/analytics-store";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const stats = await recordVisit();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
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
