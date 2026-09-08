"use client";

import { useState } from "react";
import Image from "next/image";
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

function AbstractUI({
  project,
  compact,
  theme,
}: {
  project: Project;
  compact: boolean;
  theme: (typeof THEMES)[number];
}) {
  return (
    <div
      className={`relative grid gap-2 p-3 ${compact ? "grid-cols-3" : "grid-cols-[0.9fr_1.4fr]"}`}
      style={{
        background: `linear-gradient(145deg, ${theme.panel}, #0b1220)`,
        minHeight: compact ? 96 : 150,
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
          <div className="h-10 flex-1 rounded-lg bg-white/10" />
          <div className="h-10 w-16 rounded-lg" style={{ background: theme.accent, opacity: 0.85 }} />
        </div>
        <div className={`grid gap-1.5 ${compact ? "grid-cols-2" : "grid-cols-3"}`}>
          {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-white/8 ring-1 ring-white/10" />
          ))}
        </div>
      </div>
      <span className="sr-only">{project.title} preview</span>
    </div>
  );
}

/** Browser-frame project preview — sharp real screenshots, no 3D blur */
export function ProjectMockup3D({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = themeFor(project.title);
  const showScreenshot = Boolean(project.image) && !imgFailed;

  return (
    <div className={`relative ${compact ? "min-h-[8rem]" : "min-h-[16rem] sm:min-h-[18rem]"}`}>
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface shadow-md">
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: theme.bar }}>
          <span className="h-2 w-2 rounded-full bg-red-400/90" />
          <span className="h-2 w-2 rounded-full bg-amber-300/90" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          <span className="ml-2 truncate rounded bg-black/25 px-2 py-0.5 text-[9px] text-white/85">
            {project.title === "Educational ERP"
              ? "eduerp.app/dashboard"
              : project.title.includes("HRMS")
                ? "hrms.app/dashboard"
                : project.title.includes("Examination")
                  ? "examportal.app/dashboard"
                  : project.title.includes("Ticket")
                    ? "supportdesk.app/dashboard"
                    : project.title.includes("Website")
                      ? "sitecms.app/admin"
                      : `${project.title.toLowerCase().replace(/\s+/g, "-")}.app`}
          </span>
        </div>

        {showScreenshot ? (
          <div
            className={`relative w-full bg-white ${
              compact ? "aspect-[16/10]" : "aspect-[16/9]"
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.title} dashboard screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 900px"
              className="object-contain object-top"
              quality={100}
              unoptimized
              priority={Boolean(project.featured)}
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          <AbstractUI project={project} compact={compact} theme={theme} />
        )}
      </div>
    </div>
  );
}
