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

function DomainPreview({
  project,
  compact,
}: {
  project: Project;
  compact: boolean;
}) {
  const variant = project.previewVariant;
  const aspect = compact ? "aspect-[16/10]" : "aspect-[16/9]";

  if (variant === "lms-sync") {
    return (
      <div className={`relative flex flex-col justify-between bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 p-3 text-white ${aspect}`}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-semibold text-cyan-300">
            ERP ⇄ LMS REST Sync
          </span>
          <span className="text-emerald-400">Idempotent · Active</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Course Catalog", sub: "Batch Sync" },
            { label: "Enrollments", sub: "ERP Truth" },
            { label: "Progress Hooks", sub: "Mentor View" },
          ].map((b) => (
            <div key={b.label} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="truncate text-[10px] font-bold text-cyan-200">{b.label}</p>
              <p className="mt-0.5 truncate text-[9px] text-white/70">{b.sub}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-[9px] text-white/80">
          <span>Nightly Reconciliation Job</span>
          <span className="font-mono text-emerald-300">200 OK · Synced</span>
        </div>
      </div>
    );
  }

  if (variant === "admission-ai") {
    return (
      <div className={`relative flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 text-white ${aspect}`}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="rounded bg-indigo-500/25 px-2 py-0.5 font-semibold text-indigo-200">
            On-Prem LLM Gateway
          </span>
          <span className="text-emerald-400">Ollama · vLLM</span>
        </div>
        <div className="space-y-1.5 rounded-lg border border-white/10 bg-white/5 p-2.5 text-[10px]">
          <p className="text-white/70">Enquiry: &ldquo;Eligibility &amp; fee slab for BCA?&rdquo;</p>
          <p className="font-medium text-cyan-200">
            Grounded ERP Reply: Verified course criteria + document checklist (campus-hosted inference).
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[9px]">
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">Campus-Hosted Model</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">Counsellor Escalation</span>
        </div>
      </div>
    );
  }

  if (variant === "biometric") {
    return (
      <div className={`relative flex flex-col justify-between bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-3 text-white ${aspect}`}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-semibold text-emerald-300">
            Biometric Pipeline
          </span>
          <span className="text-cyan-300">4 Branches · 200+ Staff</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">
            <p className="font-bold text-white">.NET Listener</p>
            <p className="text-white/65">Device Punches</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">
            <p className="font-bold text-emerald-300">CI REST API</p>
            <p className="text-white/65">Idempotent Keys</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">
            <p className="font-bold text-cyan-300">Payroll Feed</p>
            <p className="text-white/65">Shift Rules</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-[9px] text-white/80">
          <span>Duplicate Punch Guard</span>
          <span className="font-mono text-emerald-300">Nightly Reconciled</span>
        </div>
      </div>
    );
  }

  return null;
}

/** Browser-frame project preview — sharp screenshots or domain architecture views */
export function ProjectMockup3D({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = themeFor(project.title);
  const isCustomPreview =
    project.previewVariant === "lms-sync" ||
    project.previewVariant === "admission-ai" ||
    project.previewVariant === "biometric";
  const showScreenshot = !isCustomPreview && Boolean(project.image) && !imgFailed;

  const urlSlug =
    project.slug === "educational-erp"
      ? "eduerp.internal/dashboard"
      : project.slug === "hrms-payroll"
        ? "hrms.internal/payroll"
        : project.slug === "online-examination"
          ? "examportal.internal/proctor"
          : project.slug === "ticket-management"
            ? "supportdesk.internal/sla"
            : project.slug === "website-cms"
              ? "sitecms.internal/admin"
              : `${project.slug}.internal/overview`;

  return (
    <div className={`relative ${compact ? "min-h-[8rem]" : "min-h-[15rem] sm:min-h-[17rem]"}`}>
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: theme.bar }}>
          <span className="h-2 w-2 rounded-full bg-red-400/90" />
          <span className="h-2 w-2 rounded-full bg-amber-300/90" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          <span className="ml-2 truncate rounded bg-black/25 px-2 py-0.5 text-[9px] text-white/90">
            {urlSlug}
          </span>
        </div>

        {isCustomPreview ? (
          <DomainPreview project={project} compact={compact} />
        ) : showScreenshot ? (
          <div className={`relative w-full bg-white ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
            <Image
              src={project.image}
              alt={`${project.title} anonymized dashboard preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 720px"
              className="object-contain object-top"
              quality={85}
              priority={Boolean(project.featured && project.slug === "educational-erp")}
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          <div
            className={`relative flex items-center justify-center bg-slate-900 p-4 text-xs text-white/80 ${compact ? "aspect-[16/10]" : "aspect-[16/9]"
              }`}
          >
            {project.title}
          </div>
        )}
      </div>
    </div>
  );
}
