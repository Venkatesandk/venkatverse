"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemePicker() {
  const { themeId, setThemeId, themes, current, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    const openPicker = () => setOpen(true);
    window.addEventListener("open-theme-picker", openPicker);
    return () => window.removeEventListener("open-theme-picker", openPicker);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2"
        aria-label="Choose theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Theme: ${mounted ? current.name : "Themes"}`}
      >
        <Palette size={17} style={{ color: mounted ? current.vars["--primary"] : undefined }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/20 sm:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="fixed inset-x-3 top-[calc(var(--header-height)+0.5rem)] z-[70] max-h-[min(70dvh,28rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="text-sm font-bold">24 Themes</p>
                  <p className="text-[10px] text-muted">Pick your portfolio look</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 hover:bg-surface-2"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="grid max-h-[min(58dvh,22rem)] grid-cols-2 gap-2 overflow-y-auto overscroll-contain p-3">
                {themes.map((t, i) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setThemeId(t.id);
                      setOpen(false);
                    }}
                    className={`relative flex items-center gap-2 rounded-xl border p-2.5 text-left transition-colors ${
                      themeId === t.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border hover:border-primary/30 hover:bg-surface-2"
                    }`}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm shadow-sm"
                      style={{
                        background: t.vars["--background"],
                        border: `2px solid ${t.vars["--primary"]}`,
                      }}
                    >
                      {t.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-semibold">{t.name}</span>
                      <span className="block truncate text-[9px] capitalize text-muted">{t.category}</span>
                    </span>
                    {themeId === t.id && (
                      <Check size={14} className="shrink-0 text-primary" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
