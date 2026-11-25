import { NextResponse } from "next/server";
import {
  isBotUserAgent,
  isValidSessionId,
  refreshHeartbeat,
} from "@/lib/redis-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ua = request.headers.get("user-agent");
    if (isBotUserAgent(ua)) {
      return NextResponse.json(
        { ok: true, ignored: true },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const body = await request.json().catch(() => null);
    const sessionId = body?.sessionId;

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json(
        { ok: false, error: "Valid sessionId required" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await refreshHeartbeat(sessionId);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Heartbeat unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[api/stats/heartbeat]", err);
    return NextResponse.json(
      { ok: false, error: "Heartbeat failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

