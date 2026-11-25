"use client";

import { Cpu, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { technicalSpecializations } from "@/data/portfolio";

export function TechnicalSpecializationPanel() {
  const { primary, additional } = technicalSpecializations;

  return (
    <section id="specialization" className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Technical Specialization</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            Enterprise PHP &amp; ERP core architecture paired with modern full-stack &amp; private AI engineering
          </p>
        </div>
        <span className="panel-badge">Core + AI</span>
      </div>

      <div className="panel-body grid gap-4 lg:grid-cols-2">
        {/* Primary Specialization */}
        <article className="flex flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 via-surface to-surface-2/40 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <Layers size={12} />
              {primary.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
              <ShieldCheck size={13} /> Production Depth
            </span>
          </div>

          <h3 className="text-base font-bold sm:text-lg">{primary.title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted sm:text-sm">
            {primary.summary}
          </p>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {primary.areas.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-border bg-surface/90 p-3"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <CheckCircle2 size={13} className="shrink-0 text-primary" />
                  {area.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-foreground-muted">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* Additional Specialization */}
        <article className="flex flex-col rounded-2xl border border-border bg-surface-2/40 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Cpu size={12} />
              {additional.badge}
            </span>
            <span className="text-[11px] font-medium text-muted">Full-Stack &amp; GenAI</span>
          </div>

          <h3 className="text-base font-bold sm:text-lg">{additional.title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted sm:text-sm">
            {additional.summary}
          </p>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {additional.areas.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-border bg-surface p-3"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />
                  {area.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-foreground-muted">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

