import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { sendMail } from "@/lib/mailer";
import { developer } from "@/data/portfolio";
import { getWritableDataDir } from "@/lib/data-path";

const FILE = () => path.join(getWritableDataDir(), "contact-messages.jsonl");

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  purpose?: string;
  createdAt: string;
}

export async function saveContactMessage(input: {
  name: string;
  email: string;
  message: string;
  purpose?: string;
}): Promise<ContactMessage> {
  const entry: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    purpose: input.purpose?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await appendFile(FILE(), JSON.stringify(entry) + "\n", "utf8");
  } catch (error) {
    console.warn("[contact] persist skipped:", error);
  }

  const ownerEmail =
    process.env.OWNER_EMAIL ?? process.env.CONTACT_EMAIL ?? developer.email;

  const sent = await sendMail({
    to: ownerEmail,
    subject: `New contact message — ${entry.name}`,
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0c1a2a;max-width:560px;">
        <h2 style="color:#0e7490;margin:0 0 16px;">New portfolio contact message</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#64748b;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${entry.name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${entry.email}">${entry.email}</a></td></tr>
          ${entry.purpose ? `<tr><td style="padding:8px 0;color:#64748b;">Purpose</td><td style="padding:8px 0;">${entry.purpose}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td><td style="padding:8px 0;">${entry.message.replace(/\n/g, "<br/>")}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Time</td><td style="padding:8px 0;">${new Date(entry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">Reply directly to ${entry.email} to respond.</p>
      </div>
    `,
    text: `New contact from ${entry.name} (${entry.email}):\n\n${entry.message}`,
  });

  return { ...entry, emailSent: Boolean(sent) } as ContactMessage & { emailSent?: boolean };
}

export async function listContactMessages(limit = 20): Promise<ContactMessage[]> {
  try {
    const raw = await readFile(FILE(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    const items: ContactMessage[] = [];
    for (const line of lines.slice(-limit * 2)) {
      try {
        items.push(JSON.parse(line) as ContactMessage);
      } catch {
        /* skip */
      }
    }
    return items.reverse().slice(0, limit);
  } catch {
    return [];
  }
}
