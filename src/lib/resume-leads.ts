import { appendFile, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { VisitorMeta } from "@/lib/otp-store";
import { BASE_DOWNLOAD_COUNT } from "@/lib/counters";
import { buildResumeThanksEmail } from "@/lib/email-templates";
import { maskEmail, sendMail } from "@/lib/mailer";
import {
  buildVisitorThanksWhatsAppUrl,
  sendWhatsAppThanksToDownloader,
} from "@/lib/whatsapp-greeting";
import { developer } from "@/data/portfolio";
import { getSeedDataDir, getWritableDataDir } from "@/lib/data-path";

const LEADS_FILE = () => path.join(getWritableDataDir(), "resume-leads.jsonl");
const META_WRITE = () => path.join(getWritableDataDir(), "resume-meta.json");
const META_SEED = () => path.join(getSeedDataDir(), "resume-meta.json");

export { BASE_DOWNLOAD_COUNT };

export interface ResumeLead {
  name: string;
  email: string;
  phone: string;
  downloadedAt: string;
  downloadNumber: number;
  meta?: VisitorMeta;
}

interface ResumeMeta {
  totalDownloads: number;
}

let metaMemory: ResumeMeta | null = null;

async function readMeta(): Promise<ResumeMeta> {
  if (metaMemory) return metaMemory;

  for (const file of [META_WRITE(), META_SEED()]) {
    try {
      const raw = await readFile(file, "utf8");
      const parsed = JSON.parse(raw) as ResumeMeta;
      if (
        typeof parsed.totalDownloads === "number" &&
        parsed.totalDownloads >= BASE_DOWNLOAD_COUNT
      ) {
        metaMemory = parsed;
        return metaMemory;
      }
    } catch {
      /* try next */
    }
  }

  metaMemory = { totalDownloads: BASE_DOWNLOAD_COUNT };
  return metaMemory;
}

async function writeMeta(meta: ResumeMeta) {
  metaMemory = meta;
  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await writeFile(META_WRITE(), JSON.stringify(meta, null, 2), "utf8");
  } catch (error) {
    console.warn("[resume-meta] persist skipped:", error);
  }
}

async function sendThanksEmail(name: string, email: string, downloadNumber: number) {
  const template = buildResumeThanksEmail({ name, downloadNumber });
  const sent = await sendMail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
  if (!sent) {
    console.log("[Thanks Email]", { to: email, subject: template.subject });
  }
  return Boolean(sent);
}

export async function getDownloadStats() {
  const meta = await readMeta();
  const recent = await getRecentDownloads(8);
  return {
    total: meta.totalDownloads,
    recent,
  };
}

export async function getRecentDownloads(limit = 8): Promise<
  Array<{
    name: string;
    emailMasked: string;
    downloadedAt: string;
    downloadNumber: number;
  }>
> {
  try {
    const raw = await readFile(LEADS_FILE(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    const leads: ResumeLead[] = [];
    for (const line of lines.slice(-limit * 2)) {
      try {
        leads.push(JSON.parse(line) as ResumeLead);
      } catch {
        /* skip bad line */
      }
    }
    return leads
      .slice(-limit)
      .reverse()
      .map((l) => ({
        name: l.name,
        emailMasked: maskEmail(l.email),
        downloadedAt: l.downloadedAt,
        downloadNumber: l.downloadNumber,
      }));
  } catch {
    return [];
  }
}

export async function logResumeLead(data: {
  name: string;
  email: string;
  phone: string;
  meta?: VisitorMeta;
}) {
  const metaFile = await readMeta();
  metaFile.totalDownloads += 1;
  await writeMeta(metaFile);

  const lead: ResumeLead = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    meta: data.meta,
    downloadedAt: new Date().toISOString(),
    downloadNumber: metaFile.totalDownloads,
  };

  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await appendFile(LEADS_FILE(), JSON.stringify(lead) + "\n", "utf8");
  } catch (error) {
    console.warn("[resume-leads] persist skipped:", error);
  }
  console.log("[Resume Download]", lead);

  await Promise.allSettled([
    sendThanksEmail(lead.name, lead.email, lead.downloadNumber),
    sendWhatsAppThanksToDownloader({
      name: lead.name,
      phone: lead.phone,
      downloadNumber: lead.downloadNumber,
    }),
  ]);

  return {
    ...lead,
    whatsappUrl: buildVisitorThanksWhatsAppUrl(lead.name),
    ownerWhatsapp: developer.social.whatsapp,
  };
}
