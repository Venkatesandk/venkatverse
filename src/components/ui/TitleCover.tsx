"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const THEMES = [
  { bg: "from-[#0f766e] to-[#134e4a]", chip: "bg-teal-400" },
  { bg: "from-[#0369a1] to-[#0c4a6e]", chip: "bg-sky-400" },
  { bg: "from-[#0e7490] to-[#155e75]", chip: "bg-cyan-400" },
  { bg: "from-[#115e59] to-[#042f2e]", chip: "bg-emerald-400" },
  { bg: "from-[#1d4ed8] to-[#1e3a8a]", chip: "bg-blue-400" },
] as const;

function themeIndex(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % THEMES.length;
}

interface TitleCoverProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  compact?: boolean;
}

export function TitleCover({ title, subtitle, badge, className, compact }: TitleCoverProps) {
  const theme = THEMES[themeIndex(title)];
  const initial = title.trim().charAt(0).toUpperCase() || "V";
  const words = title.split(/\s+/).slice(0, 3);

  return (
    <motion.div
      className={cn(
        "group/cover relative flex overflow-hidden bg-gradient-to-br text-white",
        theme.bg,
        compact ? "aspect-[4/3] flex-col justify-between p-3" : "aspect-[16/10] flex-col justify-between p-4 sm:p-5",
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-2 border-white/20" />
        <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full border border-white/15" />
        <div className={`absolute right-0 top-0 h-full w-1.5 ${theme.chip}`} />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/cover:translate-x-full" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-800 shadow-sm">
          {badge ?? "Project"}
        </span>
        <motion.span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-slate-800 shadow-sm sm:h-10 sm:w-10 sm:text-base"
          whileHover={{ rotate: 6, scale: 1.05 }}
        >
          {initial}
        </motion.span>
      </div>

      <div className="relative z-10 mt-auto">
        {!compact && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {words.map((w) => (
              <span
                key={w}
                className="rounded bg-black/35 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
              >
                {w}
              </span>
            ))}
          </div>
        )}
        <h3
          className={cn(
            "font-extrabold leading-tight tracking-tight text-white",
            compact ? "line-clamp-2 text-sm" : "line-clamp-2 text-lg sm:text-xl"
          )}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
        >
          {title}
        </h3>
        {subtitle && !compact && (
          <p
            className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/95 sm:text-[13px]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
