"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Palette, Download, Mail } from "lucide-react";
import { navLinks, developer } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { openResumeDownload } from "@/lib/resume-download";

const commands = [
  { id: "home", label: "Go to Home", href: "#home", icon: ArrowRight },
  { id: "projects", label: "View Projects", href: "#projects", icon: ArrowRight },
  { id: "contact", label: "Contact Me", href: "#contact", icon: Mail },
  { id: "whatsapp", label: "Chat on WhatsApp", href: developer.social.whatsapp, icon: Mail },
  { id: "resume", label: "Download Resume", action: openResumeDownload, icon: Download },
];

export function CommandPalette() {
  return (
    <ClientOnly>
      <CommandPaletteInner />
    </ClientOnly>
  );
}

function CommandPaletteInner() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { current, mounted } = useTheme();

  const allCommands = [
    ...navLinks.map((l) => ({
      id: l.href,
      label: `Go to ${l.label}`,
      href: l.href,
      icon: ArrowRight,
    })),
    ...commands,
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
      } else {
        window.open(cmd.href, "_blank");
      }
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={18} className="text-muted" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="w-full bg-transparent py-4 text-foreground outline-none"
              />
              <kbd className="rounded bg-white/10 px-2 py-0.5 text-xs text-muted">ESC</kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => execute(cmd)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-white/5"
                >
                  <cmd.icon size={16} className="text-primary" />
                  {cmd.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="p-4 text-center text-sm text-muted">No commands found</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
