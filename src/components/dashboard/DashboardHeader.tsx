"use client";

import { Search, Sun, Moon, Bell, Download, Menu } from "lucide-react";
import { developer } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { useTheme } from "@/hooks/useTheme";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="dashboard-header flex min-w-0 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden flex-1 lg:block" />

      <button
        type="button"
        onClick={openSearch}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-sm text-muted sm:px-3 lg:max-w-md"
      >
        <Search size={16} className="shrink-0" />
        <span className="truncate max-sm:hidden">Search anything...</span>
        <span className="truncate sm:hidden">Search...</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] md:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2"
          aria-label="Toggle theme"
        >
          {mounted ? (theme === "dark" ? <Sun size={17} /> : <Moon size={17} />) : <Moon size={17} />}
        </button>
        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2 sm:flex"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>
        <ResumeDownloadButton className="btn btn-glass !inline-flex !w-auto !px-2.5 !py-2 !text-xs sm:!px-3">
          <Download size={15} />
          <span className="max-[400px]:hidden">Download CV</span>
          <span className="min-[401px]:hidden">CV</span>
        </ResumeDownloadButton>
        <a href="#contact" className="btn btn-primary !w-auto !px-2.5 !py-2 !text-xs sm:!px-4">
          <span className="max-[380px]:hidden">Hire </span>Me
        </a>
      </div>
    </header>
  );
}
