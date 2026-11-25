import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contact-store";
import { isEmailConfigured } from "@/lib/mailer";
import { isValidEmail } from "@/lib/html";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getRateLimitClientKey(request);
    const limit = checkRateLimit({
      namespace: "contact",
      key: ip,
      maxRequests: 5,
      windowMs: 5 * 60 * 1000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${limit.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const { name, email, message, purpose, website } = body;

    // Honeypot field — silently accept without persisting/mailing bots
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true, emailSent: false });
    }

    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim();
    const cleanMessage = String(message ?? "").trim();
    const cleanPurpose = purpose ? String(purpose).trim().slice(0, 40) : undefined;

    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json({ error: "Please enter a valid name (2–100 characters)." }, { status: 400 });
    }
    if (!isValidEmail(cleanEmail) || cleanEmail.length > 160) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return NextResponse.json({ error: "Message must be between 10 and 3000 characters." }, { status: 400 });
    }

    const entry = await saveContactMessage({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      purpose: cleanPurpose,
    });

    const emailSent = Boolean(entry.emailSent);

    if (!emailSent && !isEmailConfigured()) {
      console.log("[Contact form — email not configured]", { name: cleanName, email: cleanEmail });
    }

    return NextResponse.json({
      success: true,
      emailSent,
      id: entry.id,
    });
  } catch (err) {
    console.error("[contact POST]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
