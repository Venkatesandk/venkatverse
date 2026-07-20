import nodemailer from "nodemailer";
import { developer } from "@/data/portfolio";

export interface MailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

function htmlToText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function sendViaResend(payload: MailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Venkatverse <onboarding@resend.dev>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text ?? htmlToText(payload.html),
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("[Mail Resend]", res.status, err);
    return false;
  }

  return true;
}

async function sendViaSmtp(payload: MailPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const fromName = process.env.SMTP_FROM_NAME ?? developer.name;
  const fromEmail = process.env.SMTP_FROM ?? user;

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text ?? htmlToText(payload.html),
    replyTo: process.env.OWNER_EMAIL ?? developer.email,
  });

  return true;
}

/** Returns which provider delivered the email, or null if none. */
export async function sendMail(payload: MailPayload): Promise<"resend" | "smtp" | null> {
  try {
    if (await sendViaResend(payload)) return "resend";
  } catch (err) {
    console.error("[Mail Resend exception]", err);
  }

  try {
    if (await sendViaSmtp(payload)) return "smtp";
  } catch (err) {
    console.error("[Mail SMTP exception]", err);
  }

  return null;
}

export function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "***";
  const visible = user.slice(0, Math.min(2, user.length));
  return `${visible}***@${domain}`;
}
