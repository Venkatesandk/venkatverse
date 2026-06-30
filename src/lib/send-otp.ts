interface SendOtpParams {
  otp: string;
  name: string;
  email: string;
  phone: string;
}

export async function sendOtp({ otp, name, email, phone }: SendOtpParams) {
  const channels: string[] = [];

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
          to: email,
          subject: "Your OTP to download Venkatesan D's Resume",
          html: `<p>Hi ${name},</p><p>Your verification code is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
        }),
      });
      if (res.ok) channels.push("email");
    } catch {
      /* fall through */
    }
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
    channels.push("console");
  }

  return channels;
}
