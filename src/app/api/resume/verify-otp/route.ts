import { NextResponse } from "next/server";
import { otpKey, verifyOtp } from "@/lib/otp-store";
import { logResumeLead } from "@/lib/resume-leads";
import { notifyOwnerOtpVerified } from "@/lib/owner-alerts";
import { normalizePhone, parseVisitorMeta } from "@/lib/request-meta";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, otp, meta: bodyMeta } = body;

    if (!email?.trim() || !phone?.trim() || !otp?.trim()) {
      return NextResponse.json({ error: "Email, mobile number, and OTP are required." }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = normalizePhone(String(phone));
    const cleanOtp = String(otp).replace(/\D/g, "").trim();
    const cleanName = String(name ?? "").trim();

    if (cleanOtp.length !== 6) {
      return NextResponse.json({ error: "Please enter the complete 6-digit OTP." }, { status: 400 });
    }

    const key = otpKey(cleanPhone, cleanEmail);
    const entry = await verifyOtp(key, cleanOtp);

    if (!entry) {
      return NextResponse.json(
        { error: "Invalid or expired OTP. Please request a new one." },
        { status: 401 }
      );
    }

    // Prefer stored name; fall back to submitted name
    const finalName = entry.name || cleanName || "Visitor";
    const meta = parseVisitorMeta(request, bodyMeta ?? entry.meta);

    const lead = await logResumeLead({
      name: finalName,
      email: entry.email,
      phone: entry.phone,
      meta,
    });

    void notifyOwnerOtpVerified({
      name: finalName,
      email: entry.email,
      phone: entry.phone,
      downloadNumber: lead.downloadNumber,
      meta,
    });

    return NextResponse.json({
      success: true,
      downloadUrl: "/resume.pdf",
      downloadNumber: lead.downloadNumber,
      whatsappUrl: lead.whatsappUrl,
      greeting: `Thanks ${finalName.split(" ")[0]}! Your resume download has started.`,
    });
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}
