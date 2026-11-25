import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import type { VisitorMeta } from "@/lib/otp-store";
import { buildResumeThanksEmail } from "@/lib/email-templates";
import { maskEmail, sendMail } from "@/lib/mailer";
import {
  buildVisitorThanksWhatsAppUrl,
  sendWhatsAppThanksToDownloader,
} from "@/lib/whatsapp-greeting";
import { developer } from "@/data/portfolio";
import { getWritableDataDir } from "@/lib/data-path";
import { getLiveStatsData, incrementResumeDownloadStat } from "@/lib/redis-stats";

const LEADS_FILE = () => path.join(getWritableDataDir(), "resume-leads.jsonl");

export interface ResumeLead {
  name: string;
  email: string;
  phone: string;
  downloadedAt: string;
  downloadNumber: number;
  meta?: VisitorMeta;
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
  const stats = await getLiveStatsData();
  const recent = await getRecentDownloads(8);
  return {
    total: stats ? stats.downloads : null,
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
  const redisCount = await incrementResumeDownloadStat();
  const downloadNumber = redisCount ?? 1;

  const lead: ResumeLead = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    meta: data.meta,
    downloadedAt: new Date().toISOString(),
    downloadNumber,
  };

  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await appendFile(LEADS_FILE(), JSON.stringify(lead) + "\n", "utf8");
  } catch (error) {
    console.warn("[resume-leads] persist skipped:", error);
  }

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
