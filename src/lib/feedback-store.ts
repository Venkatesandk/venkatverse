import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { sendMail } from "@/lib/mailer";
import { developer } from "@/data/portfolio";
import { getWritableDataDir } from "@/lib/data-path";

const FILE = () => path.join(getWritableDataDir(), "feedback.jsonl");

export interface FeedbackEntry {
  id: string;
  name: string;
  email?: string;
  rating: number;
  message: string;
  createdAt: string;
  approved: boolean;
}

export async function addFeedback(input: {
  name: string;
  email?: string;
  rating: number;
  message: string;
}) {
  const entry: FeedbackEntry = {
    id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    email: input.email?.trim().toLowerCase() || undefined,
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    approved: true,
  };

  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await appendFile(FILE(), JSON.stringify(entry) + "\n", "utf8");
  } catch (error) {
    console.warn("[feedback] persist skipped:", error);
  }

  const ownerEmail = process.env.OWNER_EMAIL ?? developer.email;
  void sendMail({
    to: ownerEmail,
    subject: `New portfolio feedback — ${entry.rating}★ from ${entry.name}`,
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#0c1a2a;">
        <h2 style="color:#0e7490;margin:0 0 12px;">New visitor feedback</h2>
        <p><strong>Name:</strong> ${entry.name}</p>
        <p><strong>Email:</strong> ${entry.email || "Not provided"}</p>
        <p><strong>Rating:</strong> ${"★".repeat(entry.rating)}${"☆".repeat(5 - entry.rating)}</p>
        <p><strong>Message:</strong><br/>${entry.message.replace(/\n/g, "<br/>")}</p>
        <p style="color:#64748b;font-size:12px;">${new Date(entry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
      </div>
    `,
  });

  return entry;
}

export async function listFeedback(limit = 24): Promise<FeedbackEntry[]> {
  try {
    const raw = await readFile(FILE(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    const items: FeedbackEntry[] = [];
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line) as FeedbackEntry;
        if (parsed.approved !== false) items.push(parsed);
      } catch {
        /* skip */
      }
    }
    return items.reverse().slice(0, limit);
  } catch {
    return [];
  }
}
