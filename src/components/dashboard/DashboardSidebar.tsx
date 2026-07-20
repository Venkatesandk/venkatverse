"use client";

import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";
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
} from "lucide-react";
import { navLinks, developer } from "@/data/portfolio";
import Image from "next/image";

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

interface DashboardSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DashboardSidebar({ open, onOpenChange }: DashboardSidebarProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const NavContent = () => (
    <>
      <div className="flex h-[var(--header-height)] items-center gap-2.5 border-b border-border px-5">
        <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-primary/30">
          <Image
            src={developer.photoUrl}
            alt={developer.name}
            fill
            sizes="36px"
            quality={95}
            className="object-cover object-center"
          />
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
              onClick={() => onOpenChange(false)}
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
      <aside className="dashboard-sidebar hidden lg:flex lg:flex-col">
        <NavContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[min(85vw,var(--sidebar-width))] max-w-full flex-col bg-surface shadow-xl">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
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
