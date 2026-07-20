import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  MAX_AGE_SEC,
  isAdminConfigured,
  signAdminSession,
  verifyAdminSession,
} from "@/lib/admin-auth";

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

  try {
    const body = await request.json();
    const secret = String(body.secret ?? "").trim();
    if (secret !== process.env.ADMIN_SECRET) {
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
