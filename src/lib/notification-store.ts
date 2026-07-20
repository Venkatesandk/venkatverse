import { maskEmail, maskMessage, maskName } from "@/lib/privacy-mask";
import { listContactMessages } from "@/lib/contact-store";
import { listFeedback } from "@/lib/feedback-store";
import { getWritableDataDir, getSeedDataDir } from "@/lib/data-path";
import { readFile } from "fs/promises";
import path from "path";

export interface SiteNotification {
  id: string;
  type: "contact" | "feedback" | "resume" | "visit";
  title: string;
  body: string;
  time: string;
  href?: string;
}

async function readJsonl(file: string, limit: number) {
  try {
    const raw = await readFile(file, "utf8");
    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .reverse();
  } catch {
    return [];
  }
}

export async function getNotifications(limit = 15): Promise<SiteNotification[]> {
  const items: SiteNotification[] = [];

  const contacts = await listContactMessages(8);
  for (const c of contacts) {
    items.push({
      id: c.id,
      type: "contact",
      title: `Message from ${maskName(c.name)}`,
      body: maskMessage(c.message),
      time: c.createdAt,
    });
  }

  const feedback = await listFeedback(8);
  for (const f of feedback) {
    items.push({
      id: f.id,
      type: "feedback",
      title: `${f.rating}★ feedback — ${maskName(f.name)}`,
      body: maskMessage(f.message),
      time: f.createdAt,
    });
  }

  const leadsDir = getWritableDataDir();
  const seedDir = getSeedDataDir();
  let leadLines: string[] = [];
  for (const dir of [leadsDir, seedDir]) {
    leadLines = await readJsonl(path.join(dir, "resume-leads.jsonl"), 6);
    if (leadLines.length) break;
  }
  for (const line of leadLines) {
    try {
      const l = JSON.parse(line) as {
        name: string;
        email: string;
        downloadedAt: string;
        downloadNumber?: number;
      };
      const num = l.downloadNumber ?? "—";
      items.push({
        id: `dl_${l.downloadedAt}`,
        type: "resume",
        title: `Resume downloaded — ${maskName(l.name)}`,
        body: `Download #${num} · ${maskEmail(l.email)}`,
        time: l.downloadedAt,
      });
    } catch {
      /* skip */
    }
  }

  items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  return items.slice(0, limit);
}
