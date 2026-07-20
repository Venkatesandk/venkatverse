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

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "resume-leads.jsonl");
const META_FILE = path.join(DATA_DIR, "resume-meta.json");

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

async function readMeta(): Promise<ResumeMeta> {
  try {
    const raw = await readFile(META_FILE, "utf8");
    const parsed = JSON.parse(raw) as ResumeMeta;
    if (typeof parsed.totalDownloads === "number" && parsed.totalDownloads >= BASE_DOWNLOAD_COUNT) {
      return parsed;
    }
  } catch {
    /* first run */
  }
  return { totalDownloads: BASE_DOWNLOAD_COUNT };
}

async function writeMeta(meta: ResumeMeta) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(META_FILE, JSON.stringify(meta, null, 2), "utf8");
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
    const raw = await readFile(LEADS_FILE, "utf8");
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

  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
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
