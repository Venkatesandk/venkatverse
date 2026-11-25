"use client";

import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  User,
  Layers,
  FolderOpen,
  Briefcase,
  LayoutGrid,
  Bot,
  Award,
  BookOpen,
  Mail,
  X,
  Sparkles,
  Download,
  FileText,
} from "lucide-react";
import { developer } from "@/data/portfolio";
import { openResumeDownload } from "@/lib/resume-download";

const DRAWER_LINKS: Array<{
  href: string;
  label: string;
  icon: LucideIcon;
  isResume?: boolean;
  badge?: string;
}> = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects & Case Studies", icon: FolderOpen },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#skills", label: "Skills & Architecture", icon: LayoutGrid },
  { href: "#ai-highlights", label: "AI Lab & Engineering", icon: Sparkles },
  { href: "#ai-suite", label: "AI Toolkit", icon: Bot },
  { href: "#services", label: "Services", icon: Layers },
  { href: "#certifications", label: "Certs & Education", icon: Award },
  { href: "/recruiter", label: "Recruiter Brief", icon: FileText, badge: "60s" },
  { href: "#blog", label: "Articles", icon: BookOpen },
  { href: "#resume", label: "Download Resume", icon: Download, isResume: true },
  { href: "#contact", label: "Contact", icon: Mail },
];

interface DashboardSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export function DashboardSidebar({
  open,
  onOpenChange,
  returnFocusRef,
}: DashboardSidebarProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Move keyboard focus into the drawer on open
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 10);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const triggerEl = returnFocusRef?.current;

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerEl?.focus();
    };
  }, [open, onOpenChange, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      id="mobile-nav-drawer"
      className="fixed inset-0 z-[75] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation drawer"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className="absolute left-0 top-0 flex h-full w-[min(86vw,20rem)] max-w-full flex-col border-r border-border bg-surface shadow-2xl"
      >
        <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between gap-2 border-b border-border px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src={developer.photoUrl}
                alt={developer.name}
                fill
                sizes="36px"
                quality={90}
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold tracking-tight">{developer.name}</p>
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                Lead Developer
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground hover:border-primary/40 hover:text-primary"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3" aria-label="Portfolio sections">
          <ul className="space-y-1">
            {DRAWER_LINKS.map((item) => {
              const Icon = item.icon;
              const rowClass =
                "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-foreground-muted transition hover:bg-primary/10 hover:text-primary";

              if (item.isResume) {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenChange(false);
                        openResumeDownload();
                      }}
                      className={rowClass}
                    >
                      <Icon size={18} className="shrink-0 text-primary" />
                      <span className="flex-1 truncate">{item.label}</span>
                    </button>
                  </li>
                );
              }

              if (item.href.startsWith("/")) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                      className={rowClass}
                    >
                      <Icon size={18} className="shrink-0 text-primary" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={rowClass}
                  >
                    <Icon size={18} className="shrink-0 text-primary" />
                    <span className="flex-1 truncate">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
