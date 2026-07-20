import { developer } from "@/data/portfolio";

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "");
}

function toWhatsAppNumber(phone: string) {
  const digits = digitsOnly(phone);
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

/** Pre-filled WhatsApp chat with Venkat after a resume download */
export function buildVisitorThanksWhatsAppUrl(name: string) {
  const message = [
    `Hi ${developer.firstName}! 👋`,
    ``,
    `I just downloaded your resume from Venkatverse.`,
    `My name is ${name.trim() || "a visitor"}.`,
    ``,
    `Thanks for sharing your profile — looking forward to connecting!`,
  ].join("\n");

  return `https://wa.me/${developer.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/** Greeting message sent TO the person who downloaded the resume */
export function buildDownloaderGreetingText(name: string, downloadNumber: number) {
  return [
    `Hi ${name.trim() || "there"}! 🙏`,
    ``,
    `Thank you so much for downloading my resume (#${downloadNumber}) from Venkatverse.`,
    ``,
    `I'm ${developer.name}, ${developer.role} based in ${developer.location}.`,
    `It means a lot that you checked out my profile.`,
    ``,
    `If you have any opportunity or would like to discuss a project, feel free to reply here anytime.`,
    ``,
    `Warm regards,`,
    `${developer.name}`,
  ].join("\n");
}

/**
 * Try to send a WhatsApp greeting to the downloader (Cloud API / CallMeBot).
 * Returns whether an automated message was sent.
 */
export async function sendWhatsAppThanksToDownloader(params: {
  name: string;
  phone: string;
  downloadNumber: number;
}) {
  const to = toWhatsAppNumber(params.phone);
  const text = buildDownloaderGreetingText(params.name, params.downloadNumber);

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (token && phoneNumberId) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body: text },
          }),
        }
      );
      if (res.ok) return { sent: true as const, channel: "cloud-api" as const };
    } catch {
      /* fall through */
    }
  }

  // Optional CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/)
  const callMeBotKey = process.env.CALLMEBOT_APIKEY;
  if (callMeBotKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${to}&text=${encodeURIComponent(text)}&apikey=${callMeBotKey}`;
      const res = await fetch(url);
      if (res.ok) return { sent: true as const, channel: "callmebot" as const };
    } catch {
      /* fall through */
    }
  }

  console.log("[WhatsApp Thanks]", { to, preview: text.slice(0, 80) });
  return { sent: false as const, channel: "none" as const };
}
