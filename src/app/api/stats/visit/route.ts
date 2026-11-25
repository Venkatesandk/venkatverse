import { NextResponse } from "next/server";
import {
  isBotUserAgent,
  isValidSessionId,
  readCountryFromHeaders,
  recordVisitStats,
} from "@/lib/redis-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ua = request.headers.get("user-agent");
    if (isBotUserAgent(ua)) {
      return NextResponse.json(
        { ok: true, ignored: true, reason: "bot" },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    let sessionId: string | null = null;
    try {
      const body = await request.json();
      if (isValidSessionId(body?.sessionId)) {
        sessionId = body.sessionId;
      }
    } catch {
      /* empty body allowed */
    }

    const countryCode = readCountryFromHeaders(request.headers);
    const result = await recordVisitStats({ countryCode, sessionId });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Stats unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        total: result.total,
        today: result.today,
        country: countryCode,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[api/stats/visit]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to record visit" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

