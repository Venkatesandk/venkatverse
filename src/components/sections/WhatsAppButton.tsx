"use client";

import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function WhatsAppButton() {
  return (
    <a
      href={developer.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-20 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-[#25d366]/30 transition-transform hover:scale-105 md:flex md:bottom-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
