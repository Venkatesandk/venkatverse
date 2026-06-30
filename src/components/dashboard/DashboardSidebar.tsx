"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
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
  Menu,
} from "lucide-react";
import { navLinks } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  user: User,
  layers: Layers,
  folder: FolderOpen,
  briefcase: Briefcase,
  grid: LayoutGrid,
  bot: Bot,
  award: Award,
  book: BookOpen,
  mail: Mail,
};

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="flex h-[var(--header-height)] items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          V
        </div>
        <span className="text-lg font-bold tracking-tight">
          Venkat<span className="text-primary">.dev</span>
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 py-4">
        {navLinks.map((link) => {
          const Icon = iconMap[link.icon] ?? Home;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="sidebar-link"
            >
              <Icon size={18} />
              <span className="flex-1">{link.label}</span>
              {"badge" in link && link.badge && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {link.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-3.5 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <aside className="dashboard-sidebar hidden lg:flex lg:flex-col">
        <NavContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[var(--sidebar-width)] flex-col bg-surface shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3.5 rounded-lg p-1.5 hover:bg-surface-2"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}
