"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getExperienceBreakdown,
  getExperienceClock,
  INITIAL_EXPERIENCE_SNAPSHOT,
} from "@/lib/experience";

interface LiveExperienceBadgeProps {
  variant?: "hero" | "panel" | "inline";
  className?: string;
}

export function LiveExperienceBadge({
  variant = "inline",
  className = "",
}: LiveExperienceBadgeProps) {
  // Deterministic initial value matching server render — never shows "Calculating…" or "--:--:--"
  const [now, setNow] = useState<Date>(INITIAL_EXPERIENCE_SNAPSHOT);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setNow(new Date()));
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const exp = getExperienceBreakdown(now);
  const clock = getExperienceClock(now);

  if (variant === "hero") {
    return (
      <motion.div
        className={`hero-exp-badge absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 ${className}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <p className="text-base font-bold leading-tight text-primary sm:text-lg" suppressHydrationWarning>
          {exp.years}y {exp.months}m
        </p>
        <p className="text-[10px] font-medium text-muted">Experience</p>
        <p className="mt-0.5 font-mono text-[9px] tabular-nums text-primary/80" suppressHydrationWarning>
          {exp.days}d · {clock}
        </p>
      </motion.div>
    );
  }

  if (variant === "panel") {
    return (
      <div className={`rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 ${className}`}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Live Experience</p>
        <p className="text-sm font-bold text-primary" suppressHydrationWarning>
          {exp.label}
        </p>
        <p className="font-mono text-[10px] tabular-nums text-muted" suppressHydrationWarning>
          Joined Jul 2021 · {exp.days}d {clock}
        </p>
      </div>
    );
  }

  return (
    <span className={className} suppressHydrationWarning>
      {exp.label}
    </span>
  );
}
