import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vv_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function adminSecret() {
  return process.env.ADMIN_SECRET?.trim() || "";
}

export function isAdminConfigured() {
  return adminSecret().length >= 8;
}

export function signAdminSession(): string | null {
  const secret = adminSecret();
  if (!secret) return null;
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = `admin:${exp}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token?: string | null): boolean {
  const secret = adminSecret();
  if (!secret || !token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload.split(":")[1]);
  return Number.isFinite(exp) && Date.now() < exp;
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSession(store.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME, MAX_AGE_SEC };
