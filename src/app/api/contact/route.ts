import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contact-store";
import { isEmailConfigured } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, message, purpose } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const entry = await saveContactMessage({
      name: String(name),
      email: String(email),
      message: String(message),
      purpose: purpose ? String(purpose) : undefined,
    });

    const emailSent = (entry as { emailSent?: boolean }).emailSent ?? false;

    if (!emailSent && !isEmailConfigured()) {
      console.log("[Contact form — email not configured]", { name, email, message });
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
