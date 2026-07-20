"use client";

import { motion } from "framer-motion";
import { useLiveExperience } from "@/hooks/useLiveExperience";

interface LiveExperienceBadgeProps {
  variant?: "hero" | "panel" | "inline";
  className?: string;
}

export function LiveExperienceBadge({ variant = "inline", className = "" }: LiveExperienceBadgeProps) {
  const exp = useLiveExperience(1000);

  if (variant === "hero") {
    return (
      <motion.div
        className={`hero-exp-badge absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 ${className}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <p className="text-base font-bold leading-tight text-primary sm:text-lg" suppressHydrationWarning>
          {exp.mounted ? `${exp.years}y ${exp.months}m` : "…"}
        </p>
        <p className="text-[10px] font-medium text-muted">Experience</p>
        <p className="mt-0.5 font-mono text-[9px] tabular-nums text-primary/80" suppressHydrationWarning>
          {exp.mounted ? `${exp.days}d · ${exp.clock}` : "live"}
        </p>
      </motion.div>
    );
  }

  if (variant === "panel") {
    return (
      <div className={`rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 ${className}`}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Live Experience</p>
        <p className="text-sm font-bold text-primary" suppressHydrationWarning>
          {exp.mounted ? exp.label : "Calculating…"}
        </p>
        <p className="font-mono text-[10px] tabular-nums text-muted" suppressHydrationWarning>
          Joined Jul 2021 · {exp.mounted ? `${exp.days}d ${exp.clock}` : "--:--:--"}
        </p>
      </div>
    );
  }

  return (
    <span className={className} suppressHydrationWarning>
      {exp.mounted ? exp.label : "…"}
    </span>
  );
}
