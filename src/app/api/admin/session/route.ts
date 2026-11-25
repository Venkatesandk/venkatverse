import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  MAX_AGE_SEC,
  isAdminConfigured,
  signAdminSession,
  verifyAdminSession,
} from "@/lib/admin-auth";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";

function constantTimeMatch(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export async function GET() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return NextResponse.json({
    admin: verifyAdminSession(token),
    configured: isAdminConfigured(),
  });
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  const ip = getRateLimitClientKey(request);
  const limit = checkRateLimit({
    namespace: "admin-login",
    key: ip,
    maxRequests: 6,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Too many login attempts. Try again in ${limit.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  try {
    const body = await request.json();
    const secret = String(body.secret ?? "").trim();
    const expected = process.env.ADMIN_SECRET?.trim() ?? "";

    if (!secret || !expected || !constantTimeMatch(secret, expected)) {
      return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
    }

    const token = signAdminSession();
    if (!token) {
      return NextResponse.json({ error: "Could not create session." }, { status: 500 });
    }

    const res = NextResponse.json({ success: true, admin: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE_SEC,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, admin: false });
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, maxAge: 0, path: "/" });
  return res;
}
