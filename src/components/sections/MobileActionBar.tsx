"use client";

import { Phone, Mail, Bot } from "lucide-react";
import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const actions = [
  { href: developer.social.whatsapp, label: "WhatsApp", icon: WhatsAppIcon, isSvg: true, color: "text-[#25d366]" },
  { href: `tel:${developer.phone}`, label: "Call", icon: Phone, isSvg: false, color: "text-foreground-muted" },
  { href: "#contact", label: "Email", icon: Mail, isSvg: false, color: "text-foreground-muted" },
  { href: "#home", label: "AI Chat", icon: Bot, isSvg: false, color: "text-primary", onClick: "ai" as const },
];

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
        {actions.map((action) => {
          const content = (
            <>
              {action.isSvg ? (
                <action.icon width={20} height={20} />
              ) : (
                <action.icon size={20} />
              )}
              <span className="text-[10px] font-medium">{action.label}</span>
            </>
          );

          if ("onClick" in action && action.onClick === "ai") {
            return (
              <button
                key={action.label}
                type="button"
                onClick={openAi}
                className={`flex flex-col items-center justify-center gap-0.5 ${action.color}`}
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 active:opacity-70 ${action.color}`}
            >
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
