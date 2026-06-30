import { NextResponse } from "next/server";
import { generateOtp, otpKey, saveOtp } from "@/lib/otp-store";
import { sendOtp } from "@/lib/send-otp";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return phone.trim();
}

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name, email, and mobile number are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = normalizePhone(phone);

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

    const otp = generateOtp();
    const key = otpKey(cleanPhone, cleanEmail);

    saveOtp(key, { otp, name: name.trim(), email: cleanEmail, phone: cleanPhone });
    const channels = await sendOtp({ otp, name: name.trim(), email: cleanEmail, phone: cleanPhone });

    const body: Record<string, unknown> = {
      success: true,
      message: channels.includes("sms")
        ? "OTP sent to your mobile number and email."
        : channels.includes("email")
          ? "OTP sent to your email address."
          : "OTP generated. Check your email or contact the site owner if you did not receive it.",
    };

    if (process.env.NODE_ENV === "development" && channels.includes("console")) {
      body.debugOtp = otp;
    }

    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
