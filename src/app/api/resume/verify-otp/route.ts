import { NextResponse } from "next/server";
import { otpKey, verifyOtp } from "@/lib/otp-store";
import { logResumeLead } from "@/lib/resume-leads";

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return phone.trim();
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, otp } = await request.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !otp?.trim()) {
      return NextResponse.json({ error: "All fields including OTP are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = normalizePhone(phone);
    const key = otpKey(cleanPhone, cleanEmail);
    const entry = verifyOtp(key, otp);

    if (!entry) {
      return NextResponse.json({ error: "Invalid or expired OTP. Please request a new one." }, { status: 401 });
    }

    if (entry.name !== name.trim() || entry.email !== cleanEmail || entry.phone !== cleanPhone) {
      return NextResponse.json({ error: "Details do not match the OTP request." }, { status: 400 });
    }

    await logResumeLead({ name: entry.name, email: entry.email, phone: entry.phone });

    return NextResponse.json({ success: true, downloadUrl: "/resume.pdf" });
  } catch {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}
