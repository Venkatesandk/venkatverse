"use client";

import { Search, Download, Menu } from "lucide-react";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { ThemePicker } from "@/components/ui/ThemePicker";
import { NotificationBell } from "@/components/ui/NotificationBell";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="dashboard-header">
      <div className="mx-auto flex h-full w-full max-w-[76rem] min-w-0 items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-9">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface hover:bg-surface-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0 lg:hidden">
        <p className="truncate text-sm font-semibold tracking-tight">Venkatesan D</p>
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          Lead Developer
        </p>
      </div>

      <p className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-muted lg:block">
        Portfolio
      </p>

      <div className="flex-1" />

      <button
        type="button"
        onClick={openSearch}
        className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-sm text-muted hover:border-primary/40 hover:text-foreground"
        aria-label="Search portfolio"
      >
        <Search size={15} className="shrink-0" />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] lg:inline">
          Ctrl K
        </kbd>
      </button>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <ThemePicker />
        <NotificationBell />
        <ResumeDownloadButton className="btn btn-glass !inline-flex !h-9 !min-h-0 !w-auto !rounded-md !px-2.5 !py-2 !text-xs sm:!px-3">
          <Download size={15} />
          <span className="hidden sm:inline">Resume</span>
        </ResumeDownloadButton>
        <a href="#contact" className="btn btn-primary !h-9 !min-h-0 !w-auto !rounded-md !px-3 !py-2 !text-xs sm:!px-4">
          Contact
        </a>
      </div>
      </div>
    </header>
  );
}
