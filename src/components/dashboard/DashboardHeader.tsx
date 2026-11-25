"use client";

import type { RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Download, Menu } from "lucide-react";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { ThemePicker } from "@/components/ui/ThemePicker";
import { NotificationBell } from "@/components/ui/NotificationBell";
import { openResumeDownload } from "@/lib/resume-download";
import { developer } from "@/data/portfolio";

const DESKTOP_NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Overview" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#ai-highlights", label: "AI Engineering" },
  { href: "#services", label: "Services" },
  { href: "#resume", label: "Resume", isResume: true },
  { href: "#contact", label: "Contact" },
] as const;

interface DashboardHeaderProps {
  menuOpen: boolean;
  menuTriggerRef: RefObject<HTMLButtonElement | null>;
  onMenuClick: () => void;
}

export function DashboardHeader({
  menuOpen,
  menuTriggerRef,
  onMenuClick,
}: DashboardHeaderProps) {
  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="dashboard-header">
      <div className="mx-auto flex h-full w-full max-w-[78rem] min-w-0 items-center justify-between gap-2 px-3 sm:px-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 lg:flex-initial">
          <button
            ref={menuTriggerRef}
            type="button"
            onClick={onMenuClick}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground hover:bg-surface-2 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu size={20} />
          </button>

          <Link
            href="#home"
            className="flex min-w-0 items-center gap-2 rounded-lg py-1 pr-1"
            aria-label="Venkatesan D Home"
          >
            <div className="relative hidden h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2 min-[360px]:block">
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
              <p className="truncate text-sm font-bold tracking-tight text-foreground">
                Venkatesan D
              </p>
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                Lead Developer
              </p>
            </div>
          </Link>
        </div>

        {/* Clean single-row desktop navigation */}
        <nav
          className="hidden min-w-0 items-center gap-0.5 lg:flex"
          aria-label="Primary navigation"
        >
          {DESKTOP_NAV.map((item) =>
            "isResume" in item && item.isResume ? (
              <button
                key={item.href}
                type="button"
                onClick={openResumeDownload}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-2 text-xs font-semibold text-foreground-muted transition hover:bg-surface-2 hover:text-primary xl:px-2.5"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-2 text-xs font-semibold text-foreground-muted transition hover:bg-surface-2 hover:text-primary xl:px-2.5"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={openSearch}
            className="flex h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-muted hover:border-primary/40 hover:text-foreground"
            aria-label="Search portfolio"
          >
            <Search size={16} className="shrink-0" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] xl:inline">
              Ctrl K
            </kbd>
          </button>

          <ThemePicker />
          <NotificationBell />

          <ResumeDownloadButton className="btn btn-glass !hidden !min-h-11 !w-auto !rounded-lg !px-3 !py-2 !text-xs sm:!inline-flex lg:!hidden">
            <Download size={15} />
            <span>Resume</span>
          </ResumeDownloadButton>
          <a
            href="#contact"
            className="btn btn-primary !hidden !min-h-11 !w-auto !rounded-lg !px-3 !py-2 !text-xs min-[420px]:!inline-flex lg:!hidden"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
