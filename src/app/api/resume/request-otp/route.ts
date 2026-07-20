import { NextResponse } from "next/server";
import { generateOtp, otpKey, saveOtp } from "@/lib/otp-store";
import { isEmailConfigured, sendOtp } from "@/lib/send-otp";
import { notifyOwnerOtpSent } from "@/lib/owner-alerts";
import { normalizePhone, parseVisitorMeta } from "@/lib/request-meta";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateMap = new Map<string, number>();

function allowRequest(key: string) {
  const now = Date.now();
  const last = rateMap.get(key) ?? 0;
  if (now - last < 30_000) return false;
  rateMap.set(key, now);
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, meta: bodyMeta } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name, email, and mobile number are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = normalizePhone(phone);
    const cleanName = name.trim();

    if (!emailRegex.test(cleanEmail)) {
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
    if (!allowRequest(rateKey)) {
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

    // Owner-only alert with visitor details (never sent to visitor)
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
