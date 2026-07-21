"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types";

const THEMES = [
  { bar: "#0e7490", panel: "#0f766e", accent: "#5eead4" },
  { bar: "#0369a1", panel: "#0c4a6e", accent: "#7dd3fc" },
  { bar: "#1d4ed8", panel: "#1e3a8a", accent: "#93c5fd" },
  { bar: "#0f766e", panel: "#134e4a", accent: "#6ee7b7" },
  { bar: "#155e75", panel: "#164e63", accent: "#67e8f9" },
];

function themeFor(title: string) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  return THEMES[h % THEMES.length];
}

/** CSS 3D browser mockup — stands in for screenshots until real assets are added */
export function ProjectMockup3D({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 180, damping: 18 });
  const theme = themeFor(project.title);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${compact ? "min-h-[8rem]" : "min-h-[12rem] sm:min-h-[14rem]"}`}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full overflow-hidden rounded-xl border border-white/10 shadow-xl"
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ background: theme.bar, transform: "translateZ(24px)" }}
        >
          <span className="h-2 w-2 rounded-full bg-red-400/90" />
          <span className="h-2 w-2 rounded-full bg-amber-300/90" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          <span className="ml-2 truncate rounded bg-black/25 px-2 py-0.5 text-[9px] text-white/80">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
          </span>
        </div>

        {/* Fake UI screenshot */}
        <div
          className={`relative grid gap-2 p-3 ${compact ? "grid-cols-3" : "grid-cols-[0.9fr_1.4fr]"}`}
          style={{
            background: `linear-gradient(145deg, ${theme.panel}, #0b1220)`,
            minHeight: compact ? 96 : 150,
            transform: "translateZ(12px)",
          }}
        >
          {!compact && (
            <div className="space-y-1.5 rounded-lg bg-black/25 p-2">
              {[1, 0.85, 0.7, 0.9, 0.55].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded"
                  style={{ width: `${w * 100}%`, background: `${theme.accent}55` }}
                />
              ))}
            </div>
          )}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-lg bg-white/10" style={{ boxShadow: `0 0 20px ${theme.accent}33` }} />
              <div className="h-10 w-16 rounded-lg" style={{ background: theme.accent, opacity: 0.85 }} />
            </div>
            <div className={`grid gap-1.5 ${compact ? "grid-cols-2" : "grid-cols-3"}`}>
              {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
                <div key={i} className="h-12 rounded-lg bg-white/8 ring-1 ring-white/10" />
              ))}
            </div>
            {!compact && (
              <div className="h-8 rounded-lg bg-black/20">
                <div
                  className="h-full rounded-lg"
                  style={{ width: "68%", background: `linear-gradient(90deg, ${theme.accent}, transparent)` }}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15"
          style={{ transform: "translateZ(40px)" }}
        />
      </motion.div>
    </div>
  );
}
