import { developer } from "@/data/portfolio";
import { sendMail } from "@/lib/mailer";

interface DownloadNotify {
  name: string;
  email: string;
  phone: string;
  downloadNumber: number;
}

export async function notifyOwnerOfDownload(lead: DownloadNotify) {
  const ownerEmail = process.env.OWNER_EMAIL ?? developer.email;
  const subject = `Resume downloaded (#${lead.downloadNumber}) — ${lead.name}`;
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#0c1a2a;">
      <h2 style="margin:0 0 12px;color:#0e7490;">New resume download</h2>
      <p><strong>Download #:</strong> ${lead.downloadNumber}</p>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
  `;

  const sent = await sendMail({ to: ownerEmail, subject, html });
  if (!sent) {
    console.log("[Owner Notify]", { ...lead, to: ownerEmail });
  }
  return Boolean(sent);
}
