"use client";

import { developer, navLinks } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-[calc(var(--mobile-bar)+1.5rem)] pt-10 md:pb-10">
      <div className="container-main">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="#home" className="text-lg font-bold">
              Venkat<span className="text-primary">.dev</span>
            </a>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground-muted">
              {developer.role} · {developer.experience}
            </p>
            <div className="mt-4">
              <SocialLinks size="sm" />
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-foreground-muted hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">Connect</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="break-all">{developer.email}</li>
              <li>{developer.phone}</li>
              <li>
                <a href={developer.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25d366]">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={developer.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-center text-xs text-muted sm:text-left">
          © {new Date().getFullYear()} {developer.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
