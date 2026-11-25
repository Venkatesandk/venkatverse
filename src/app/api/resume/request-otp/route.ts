import { NextResponse } from "next/server";
import { generateOtp, otpKey, saveOtp } from "@/lib/otp-store";
import { isEmailConfigured, sendOtp } from "@/lib/send-otp";
import { notifyOwnerOtpSent } from "@/lib/owner-alerts";
import { normalizePhone, parseVisitorMeta } from "@/lib/request-meta";
import { isValidEmail } from "@/lib/html";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getRateLimitClientKey(request);
    const ipLimit = checkRateLimit({
      namespace: "otp-request-ip",
      key: ip,
      maxRequests: 8,
      windowMs: 10 * 60 * 1000,
    });
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: `Too many OTP requests. Please wait ${ipLimit.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const { name, email, phone, meta: bodyMeta } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name, email, and mobile number are required." }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = normalizePhone(String(phone));
    const cleanName = String(name).trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }

    if (!isValidEmail(cleanEmail) || cleanEmail.length > 160) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const phoneDigits = cleanPhone.replace(/\D/g, "");
    const validPhone =
      (phoneDigits.length === 10 && /^[6-9]/.test(phoneDigits)) ||
      (phoneDigits.length === 12 && /^91[6-9]/.test(phoneDigits));

    if (!validPhone) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    const rateKey = `${cleanEmail}:${phoneDigits}`;
    const pairLimit = checkRateLimit({
      namespace: "otp-request-pair",
      key: rateKey,
      maxRequests: 1,
      windowMs: 30_000,
    });
    if (!pairLimit.allowed) {
      return NextResponse.json(
        { error: "Please wait 30 seconds before requesting another OTP." },
        { status: 429 }
      );
    }

    const meta = parseVisitorMeta(request, bodyMeta);
    const otp = generateOtp();
    const key = otpKey(cleanPhone, cleanEmail);

    await saveOtp(key, {
      otp,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      meta,
    });

    const result = await sendOtp({
      otp,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
    });

    void notifyOwnerOtpSent({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      meta,
    });

    if (isEmailConfigured() && !result.emailed) {
      return NextResponse.json(
        { error: "Could not deliver OTP email right now. Please try again in a moment." },
        { status: 502 }
      );
    }

    const responseBody: Record<string, unknown> = {
      success: true,
      emailed: result.emailed,
      maskedEmail: result.maskedEmail,
      expiresIn: 600,
      message: result.emailed
        ? `OTP sent to ${result.maskedEmail}. Enter the 6-digit code to download the resume.`
        : "OTP generated (email not configured). Use the code shown below for testing.",
    };

    if (process.env.NODE_ENV === "development" && !result.emailed) {
      responseBody.debugOtp = otp;
    }

    return NextResponse.json(responseBody);
  } catch (err) {
    console.error("[request-otp]", err);
    return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
