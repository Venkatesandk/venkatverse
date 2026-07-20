import { buildResumeOtpEmail } from "@/lib/email-templates";
import { isEmailConfigured, maskEmail, sendMail } from "@/lib/mailer";

interface SendOtpParams {
  otp: string;
  name: string;
  email: string;
  phone: string;
}

export interface SendOtpResult {
  channels: string[];
  emailed: boolean;
  maskedEmail: string;
  provider: "resend" | "smtp" | "console" | null;
}

export async function sendOtp({ otp, name, email, phone }: SendOtpParams): Promise<SendOtpResult> {
  const channels: string[] = [];
  const template = buildResumeOtpEmail({ name, otp });
  const masked = maskEmail(email);
  let provider: SendOtpResult["provider"] = null;

  const mailed = await sendMail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: `Hi ${name},\n\nYour OTP to download ${template.subject.includes("Resume") ? "the resume" : "the file"} is: ${otp}\n\nThis code expires in 10 minutes.\n\n— Venkatesan D`,
  });

  if (mailed) {
    channels.push("email");
    provider = mailed;
  }

  const msg91Key = process.env.MSG91_AUTH_KEY;
  if (msg91Key) {
    try {
      const mobile = phone.replace(/\D/g, "");
      const res = await fetch(
        `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSG91_TEMPLATE_ID ?? ""}&mobile=${mobile}&otp=${otp}`,
        {
          method: "POST",
          headers: { authkey: msg91Key },
        }
      );
      if (res.ok) channels.push("sms");
    } catch {
      /* fall through */
    }
  }

  if (channels.length === 0) {
    console.log(`[Resume OTP] ${name} <${email}> ${phone} → ${otp}`);
    console.log(`[Resume OTP] Email not configured. Add SMTP_* or RESEND_API_KEY in .env.local`);
    channels.push("console");
    provider = "console";
  }

  return {
    channels,
    emailed: channels.includes("email"),
    maskedEmail: masked,
    provider,
  };
}

export { isEmailConfigured, maskEmail };
