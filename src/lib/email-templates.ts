import { developer } from "@/data/portfolio";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildResumeOtpEmail({
  name,
  otp,
}: {
  name: string;
  otp: string;
}) {
  const safeName = escapeHtml(name.trim() || "there");
  const year = new Date().getFullYear();

  return {
    subject: `Your OTP to download ${developer.name}'s Resume`,
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#eef2f6;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0c1a2a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dce4ee;">
        <tr>
          <td style="background:linear-gradient(135deg,#0e7490,#0d9488);padding:28px 24px;color:#fff;">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">Venkatverse · Resume Access</p>
            <h1 style="margin:0;font-size:22px;line-height:1.3;">Download My Resume</h1>
            <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">Secure one-time verification for ${safeName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px;">
            <p style="margin:0 0 12px;font-size:15px;">Hi <strong>${safeName}</strong>,</p>
            <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#3d5166;">
              Thanks for your interest in my profile. Use the OTP below to unlock and download
              <strong>${escapeHtml(developer.name)}'s</strong> latest resume.
            </p>
            <div style="text-align:center;margin:24px 0;">
              <div style="display:inline-block;background:#f0fdfa;border:1px dashed #0e7490;border-radius:12px;padding:16px 28px;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#0e7490;font-weight:700;">Your OTP Code</p>
                <p style="margin:0;font-size:32px;letter-spacing:0.28em;font-weight:800;color:#0c1a2a;">${otp}</p>
              </div>
            </div>
            <p style="margin:0 0 8px;font-size:13px;color:#64748b;text-align:center;">
              This code expires in <strong>10 minutes</strong>. Do not share it with anyone.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 24px;border-top:1px solid #eef2f6;font-size:12px;color:#64748b;">
            <p style="margin:0;">${escapeHtml(developer.name)} · ${escapeHtml(developer.role)}</p>
            <p style="margin:12px 0 0;color:#94a3b8;">© ${year} Venkatverse</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function buildResumeThanksEmail({
  name,
  downloadNumber,
}: {
  name: string;
  downloadNumber: number;
}) {
  const firstName = escapeHtml((name.trim() || "there").split(/\s+/)[0]);
  const year = new Date().getFullYear();

  return {
    subject: `Thank you for downloading my resume`,
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#eef2f6;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0c1a2a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dce4ee;">
        <tr>
          <td style="background:linear-gradient(135deg,#0d9488,#0e7490);padding:24px;color:#fff;">
            <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.9;">Download #${downloadNumber}</p>
            <h1 style="margin:8px 0 0;font-size:22px;">Thank you for visiting</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px;font-size:15px;line-height:1.75;color:#334155;">
            <p style="margin:0 0 16px;">Hi ${firstName},</p>
            <p style="margin:0 0 16px;">Thank you for visiting my portfolio and downloading my resume.</p>
            <p style="margin:0 0 16px;">I appreciate your interest in my profile. If you'd like to discuss any opportunities, I'd be happy to connect.</p>
            <p style="margin:24px 0 0;">
              Best Regards,<br/>
              <strong style="color:#0c1a2a;">${escapeHtml(developer.name)}</strong><br/>
              ${escapeHtml(developer.role)}
            </p>
            <div style="margin-top:22px;">
              <a href="${developer.social.whatsapp}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:11px 18px;border-radius:10px;margin-right:8px;">WhatsApp</a>
              <a href="mailto:${developer.email}" style="display:inline-block;background:#0e7490;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:11px 18px;border-radius:10px;">Email Me</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 24px 22px;border-top:1px solid #eef2f6;font-size:12px;color:#94a3b8;">
            © ${year} Venkatverse · ${escapeHtml(developer.location)}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `Hi ${name.trim().split(/\s+/)[0] || "there"},

Thank you for visiting my portfolio and downloading my resume.

I appreciate your interest in my profile. If you'd like to discuss any opportunities, I'd be happy to connect.

Best Regards,
${developer.name}
${developer.role}`,
  };
}
