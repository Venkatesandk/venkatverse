import { appendFile, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { sendMail } from "@/lib/mailer";
import { developer } from "@/data/portfolio";
import { getSeedDataDir, getWritableDataDir } from "@/lib/data-path";
import { saveFeedbackPhoto } from "@/lib/feedback-photo";

const FILE = () => path.join(getWritableDataDir(), "feedback.jsonl");
const SEED_FILE = () => path.join(getSeedDataDir(), "feedback.seed.jsonl");

export interface FeedbackEntry {
  id: string;
  name: string;
  email?: string;
  rating: number;
  message: string;
  photo?: string;
  createdAt: string;
  approved: boolean;
}

async function readAllRaw(): Promise<FeedbackEntry[]> {
  const items: FeedbackEntry[] = [];
  for (const file of [FILE(), SEED_FILE()]) {
    try {
      const raw = await readFile(file, "utf8");
      for (const line of raw.trim().split("\n").filter(Boolean)) {
        try {
          items.push(JSON.parse(line) as FeedbackEntry);
        } catch {
          /* skip */
        }
      }
      if (items.length) break;
    } catch {
      /* try next */
    }
  }
  return items;
}

async function writeAll(entries: FeedbackEntry[]) {
  const dir = getWritableDataDir();
  await mkdir(dir, { recursive: true });
  const body = entries.map((e) => JSON.stringify(e)).join("\n");
  await writeFile(FILE(), body ? body + "\n" : "", "utf8");
}

export async function addFeedback(input: {
  name: string;
  email?: string;
  rating: number;
  message: string;
  photoBase64?: string;
}) {
  const id = `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  let photo: string | undefined;

  if (input.photoBase64) {
    photo = (await saveFeedbackPhoto(id, input.photoBase64)) ?? undefined;
  }

  const entry: FeedbackEntry = {
    id,
    name: input.name.trim(),
    email: input.email?.trim().toLowerCase() || undefined,
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message.trim(),
    photo,
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
  const items: FeedbackEntry[] = [];

  try {
    const raw = await readFile(FILE(), "utf8");
    for (const line of raw.trim().split("\n").filter(Boolean)) {
      try {
        const parsed = JSON.parse(line) as FeedbackEntry;
        if (parsed.approved !== false) items.push(parsed);
      } catch {
        /* skip */
      }
    }
  } catch {
    /* no writable file yet */
  }

  if (items.length === 0) {
    const seed = await readAllRaw();
    items.push(...seed.filter((p) => p.approved !== false));
  }

  return items
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function updateFeedback(
  id: string,
  patch: { name?: string; message?: string; rating?: number }
): Promise<FeedbackEntry | null> {
  const all = await readAllFromWritable();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const current = all[idx];
  const next: FeedbackEntry = {
    ...current,
    name: patch.name !== undefined ? patch.name.trim() : current.name,
    message: patch.message !== undefined ? patch.message.trim() : current.message,
    rating:
      patch.rating !== undefined
        ? Math.min(5, Math.max(1, Math.round(patch.rating)))
        : current.rating,
  };

  if (next.name.length < 2 || next.message.length < 8) return null;

  all[idx] = next;
  await writeAll(all);
  return next;
}

export async function deleteFeedback(id: string): Promise<boolean> {
  const all = await readAllFromWritable();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;
  await writeAll(filtered);
  return true;
}

async function readAllFromWritable(): Promise<FeedbackEntry[]> {
  try {
    const raw = await readFile(FILE(), "utf8");
    const items: FeedbackEntry[] = [];
    for (const line of raw.trim().split("\n").filter(Boolean)) {
      try {
        items.push(JSON.parse(line) as FeedbackEntry);
      } catch {
        /* skip */
      }
    }
    return items;
  } catch {
    return [];
  }
}
