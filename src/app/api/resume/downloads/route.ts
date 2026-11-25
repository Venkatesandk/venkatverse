import { NextResponse } from "next/server";
import { getDownloadStats } from "@/lib/resume-leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getDownloadStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[api/resume/downloads]", err);
    return NextResponse.json(
      { total: null, recent: [] },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
