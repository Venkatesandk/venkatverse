"use client";

import { Phone, Download, Bot } from "lucide-react";
import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { openResumeDownload } from "@/lib/resume-download";

export function MobileActionBar() {
  const openAi = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-surface/95 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick actions"
    >
      <div className="grid h-[var(--mobile-bar)] grid-cols-4">
        <a
          href={developer.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[#25d366] active:opacity-70"
        >
          <WhatsAppIcon width={20} height={20} />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>

        <a
          href={`tel:${developer.phone}`}
          className="flex flex-col items-center justify-center gap-0.5 text-foreground-muted active:opacity-70"
        >
          <Phone size={20} />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        <button
          type="button"
          onClick={openResumeDownload}
          className="flex flex-col items-center justify-center gap-0.5 text-primary active:opacity-70"
        >
          <Download size={20} />
          <span className="text-[10px] font-medium">Resume</span>
        </button>

        <button
          type="button"
          onClick={openAi}
          className="flex flex-col items-center justify-center gap-0.5 text-foreground-muted active:opacity-70"
        >
          <Bot size={20} />
          <span className="text-[10px] font-medium">AI Chat</span>
        </button>
      </div>
    </nav>
  );
}
