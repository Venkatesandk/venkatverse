"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { useLiveStats } from "@/hooks/useLiveStats";
import {
  Users,
  Briefcase,
  FolderKanban,
  Award,
  Server,
  Eye,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/animations/Motion";
import type { LucideIcon } from "lucide-react";

const LiveGlobePanel = dynamic(
  () => import("./LiveGlobePanel").then((m) => m.LiveGlobePanel),
  {
    ssr: false,
    loading: () => (
      <div className="panel flex h-44 items-center justify-center text-xs text-muted">
        Loading live visitor world map…
      </div>
    ),
  }
);

interface HighlightDef {
  label: string;
  value?: number | null;
  display?: string;
  sublabel: string;
  loading?: boolean;
  isError?: boolean;
  animated?: boolean;
  icon: LucideIcon;
  accent: string;
}

export function MetricsRow() {
  const [showGlobe, setShowGlobe] = useState(false);
  const exp = useLiveExperience(60_000);
  const { total, isLoading, isError, isLive } = useLiveStats();

  const highlights: HighlightDef[] = [
    {
      label: "Tenure",
      display: exp.label,
      sublabel: "Joined Jul 2021 · Continuous",
      icon: Briefcase,
      accent: "from-violet-500/12 to-transparent",
    },
    {
      label: "Promotions",
      display: "3×",
      sublabel: "Junior → Lead",
      icon: Award,
      accent: "from-emerald-500/12 to-transparent",
    },
    {
      label: "ERP Modules",
      display: "20+",
      sublabel: "Production systems",
      icon: FolderKanban,
      accent: "from-amber-500/12 to-transparent",
    },
    {
      label: "Institutional Users",
      display: "5,000+",
      sublabel: "Across Tamil Nadu",
      icon: Users,
      accent: "from-cyan-500/12 to-transparent",
    },
    {
      label: "Exam Concurrency",
      display: "1,000+",
      sublabel: "Proctored candidates",
      icon: Server,
      accent: "from-rose-500/12 to-transparent",
    },
    {
      label: "Portfolio Visitors",
      value: total,
      loading: isLoading,
      isError,
      animated: true,
      sublabel: isError ? "Stats unavailable" : isLive ? "Live · Redis verified" : "All-time unique sessions",
      icon: Eye,
      accent: "from-sky-500/12 to-transparent",
    },
  ];

  return (
    <section id="highlights" className="space-y-3" aria-label="Career Highlights">
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
            Career Highlights
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setShowGlobe((v) => !v)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-foreground-muted transition hover:border-primary/40 hover:text-primary"
          aria-expanded={showGlobe}
        >
          <Globe size={14} className="text-primary" />
          {showGlobe ? "Hide Live Visitor Map" : "Live Visitor World Map"}
          {showGlobe ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <Stagger className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {highlights.map((metric) => {
          const Icon = metric.icon;
          return (
            <StaggerItem key={metric.label}>
              <motion.div
                className={`metric-card !p-3 group relative h-full min-w-0 overflow-hidden bg-gradient-to-br ${metric.accent}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {metric.label}
                  </p>
                  <Icon size={13} className="shrink-0 text-primary/75" />
                </div>

                {metric.loading ? (
                  <div className="mt-2 h-6 w-16 animate-pulse rounded bg-surface-2" />
                ) : (
                  <p className="mt-1.5 text-lg font-bold leading-none sm:text-xl" suppressHydrationWarning>
                    {metric.animated ? (
                      metric.isError || metric.value === null || metric.value === undefined ? (
                        "—"
                      ) : (
                        <AnimatedCounter value={metric.value} />
                      )
                    ) : (
                      metric.display
                    )}
                  </p>
                )}

                <p className="mt-1.5 truncate text-[10px] font-medium text-emerald-700" suppressHydrationWarning>
                  {metric.sublabel}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>

      {showGlobe && <LiveGlobePanel />}
    </section>
  );
}
