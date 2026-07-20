import { developer } from "@/data/portfolio";
import { sendMail } from "@/lib/mailer";
import type { VisitorMeta } from "@/lib/otp-store";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatIstTime(date = new Date()) {
  // e.g. 20/7/2026, 11:27:02 am IST
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const day = get("day");
  const month = get("month");
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");
  const dayPeriod = (get("dayPeriod") || "am").toLowerCase();

  return `${day}/${month}/${year}, ${hour}:${minute}:${second} ${dayPeriod} IST`;
}

function row(label: string, valueHtml: string) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top;width:160px;white-space:nowrap;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0 10px 18px;color:#111827;font-size:14px;font-weight:700;vertical-align:top;word-break:break-word;">
        ${valueHtml}
      </td>
    </tr>`;
}

function textRow(label: string, value: string) {
  return row(label, escapeHtml(value || "—"));
}

function buildVisitorRows(data: {
  downloadNumber?: number;
  name: string;
  email: string;
  phone: string;
  meta?: VisitorMeta;
}) {
  const meta = data.meta;
  const ip = meta?.publicIp || meta?.ip || "Unknown";
  const serverIp = meta?.ip && meta?.publicIp && meta.ip !== meta.publicIp ? meta.ip : null;

  let html = "";
  if (data.downloadNumber != null) {
    html += textRow("Download #", String(data.downloadNumber));
  }
  html += textRow("Name", data.name);
  html += row(
    "Email",
    `<a href="mailto:${escapeHtml(data.email)}" style="color:#2563eb;font-weight:700;text-decoration:underline;">${escapeHtml(data.email)}</a>`
  );
  html += textRow("Mobile", data.phone);
  html += textRow("Time", formatIstTime());
  html += textRow("Device / Browser", meta?.deviceSummary || meta?.userAgent || "Unknown");
  html += textRow("Platform", meta?.platform || "Unknown");
  html += textRow("Language", meta?.language || "Unknown");
  html += textRow("Screen", meta?.screen || "Unknown");
  html += textRow("Timezone", meta?.timezone || "Unknown");
  html += textRow("IP Address", ip);
  if (serverIp) html += textRow("Server IP", serverIp);

  if (meta?.lat != null && meta?.lng != null) {
    html += textRow("Latitude", String(meta.lat));
    html += textRow("Longitude", String(meta.lng));
    if (meta.accuracy != null) {
      html += textRow("GPS Accuracy (m)", String(Math.round(meta.accuracy)));
    }
  } else {
    html += textRow("Location", "Not shared / permission denied");
  }

  return html;
}

function buildReportEmail(opts: {
  title: string;
  subtitle: string;
  rowsHtml: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:28px 24px;background:#ffffff;">
    <h1 style="margin:0 0 8px;font-size:22px;line-height:1.3;font-weight:700;color:#0e7490;">
      ${escapeHtml(opts.title)}
    </h1>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.5;color:#4b5563;">
      ${escapeHtml(opts.subtitle)}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${opts.rowsHtml}
    </table>
  </div>
</body>
</html>`;
}

export async function notifyOwnerOtpSent(data: {
  name: string;
  email: string;
  phone: string;
  meta?: VisitorMeta;
}) {
  const ownerEmail = process.env.OWNER_EMAIL ?? developer.email;
  const subject = `OTP requested — ${data.name}`;
  const html = buildReportEmail({
    title: "OTP requested",
    subtitle: "Someone requested an OTP to download your resume.",
    rowsHtml: buildVisitorRows(data),
  });

  const sent = await sendMail({ to: ownerEmail, subject, html });
  if (!sent) console.log("[Owner OTP Log]", { ...data, to: ownerEmail });
  return Boolean(sent);
}

export async function notifyOwnerOtpVerified(data: {
  name: string;
  email: string;
  phone: string;
  downloadNumber: number;
  meta?: VisitorMeta;
}) {
  const ownerEmail = process.env.OWNER_EMAIL ?? developer.email;
  const subject = `OTP verified & resume downloaded — #${data.downloadNumber} ${data.name}`;
  const html = buildReportEmail({
    title: "OTP verified & resume downloaded",
    subtitle: "Visitor successfully verified OTP and downloaded your resume.",
    rowsHtml: buildVisitorRows(data),
  });

  const sent = await sendMail({ to: ownerEmail, subject, html });
  if (!sent) console.log("[Owner Verify Log]", { ...data, to: ownerEmail });
  return Boolean(sent);
}
