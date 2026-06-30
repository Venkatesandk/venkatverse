"use client";

import { Search, Sun, Moon, Bell, Download } from "lucide-react";
import { developer } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="dashboard-header flex items-center gap-3 px-4 lg:px-6">
      <div className="hidden flex-1 lg:block" />

      <button
        type="button"
        onClick={openSearch}
        className="ml-auto flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-muted lg:ml-0 lg:max-w-md"
      >
        <Search size={16} />
        <span>Search anything...</span>
        <kbd className="ml-auto hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2 sm:flex"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>
        <a href={developer.resumeUrl} className="btn btn-glass !hidden !w-auto !px-3 !py-2 !text-xs sm:!inline-flex">
          <Download size={15} /> Download CV
        </a>
        <a href="#contact" className="btn btn-primary !w-auto !px-3 !py-2 !text-xs sm:!px-4">
          Hire Me
        </a>
      </div>
    </header>
  );
}
