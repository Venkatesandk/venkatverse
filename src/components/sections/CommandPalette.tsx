"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Palette, Download, Mail, Calendar } from "lucide-react";
import { navLinks, developer, projects } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { openResumeDownload } from "@/lib/resume-download";
import { openInterviewRequest } from "@/lib/interview-modal";

const quickCommands = [
  { id: "resume", label: "Download Resume (OTP Verified)", action: openResumeDownload, icon: Download },
  { id: "interview", label: "Request an Interview", action: openInterviewRequest, icon: Calendar },
  { id: "whatsapp", label: "Chat on WhatsApp", href: developer.social.whatsapp, icon: Mail },
];

export function CommandPalette() {
  return (
    <ClientOnly>
      <CommandPaletteInner />
    </ClientOnly>
  );
}

function CommandPaletteInner() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { current, mounted } = useTheme();

  const allCommands = [
    ...navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: `Go to ${l.label}`,
      href: l.href,
      icon: ArrowRight,
    })),
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: `Case Study: ${p.title}`,
      href: `/projects/${p.slug}`,
      icon: ArrowRight,
    })),
    ...quickCommands,
    ...(mounted
      ? [{
        id: "theme",
        label: `Themes — ${current.name} (24 available)`,
        action: () => window.dispatchEvent(new CustomEvent("open-theme-picker")),
        icon: Palette,
      }]
      : []),
  ];

  const filtered = allCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const execute = (cmd: (typeof allCommands)[0]) => {
    if ("action" in cmd && cmd.action) {
      cmd.action();
    } else if ("href" in cmd && cmd.href) {
      if (cmd.href.startsWith("#")) {
        document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth" });
      } else if (cmd.href.startsWith("/")) {
        router.push(cmd.href);
      } else {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      }
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio commands"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 pt-[18vh] px-3 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={18} className="text-muted" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, case studies, or actions..."
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-foreground outline-none"
              />
              <kbd className="rounded bg-surface-2 px-2 py-0.5 text-xs text-muted">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => execute(cmd)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-surface-2"
                >
                  <cmd.icon size={16} className="shrink-0 text-primary" />
                  <span>{cmd.label}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="p-4 text-center text-sm text-muted">No matching sections or commands</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
