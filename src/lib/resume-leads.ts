import { appendFile, mkdir } from "fs/promises";
import path from "path";

export async function logResumeLead(data: {
  name: string;
  email: string;
  phone: string;
}) {
  const line = JSON.stringify({ ...data, downloadedAt: new Date().toISOString() }) + "\n";
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "resume-leads.jsonl"), line, "utf8");
  console.log("[Resume Download]", data);
}
