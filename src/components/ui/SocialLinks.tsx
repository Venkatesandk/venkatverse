"use client";

import { developer } from "@/data/portfolio";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";
import { Mail } from "lucide-react";

const links = [
  { href: developer.social.whatsapp, icon: WhatsAppIcon, label: "WhatsApp", color: "hover:text-[#25d366]" },
  { href: developer.social.linkedin, icon: LinkedInIcon, label: "LinkedIn", color: "hover:text-[#0a66c2]" },
  { href: developer.social.instagram, icon: InstagramIcon, label: "Instagram", color: "hover:text-[#e4405f]" },
  { href: developer.social.github, icon: GitHubIcon, label: "GitHub", color: "hover:text-foreground" },
  { href: developer.social.email, icon: Mail, label: "Email", color: "hover:text-primary", isLucide: true },
];

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SocialLinks({ size = "md", className = "" }: SocialLinksProps) {
  const dim = size === "sm" ? 18 : size === "lg" ? 24 : 20;
  const btn = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`${btn} card flex items-center justify-center text-foreground-muted transition-colors ${link.color}`}
        >
          {"isLucide" in link && link.isLucide ? (
            <link.icon size={dim} />
          ) : (
            <link.icon width={dim} height={dim} />
          )}
        </a>
      ))}
    </div>
  );
}
