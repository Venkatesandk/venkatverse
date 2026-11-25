"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { fetchAnalyticsStats } from "@/hooks/useRecordVisit";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLiveExperience } from "@/hooks/useLiveExperience";
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
        Loading interactive 3D visitor globe…
      </div>
    ),
  }
);

interface HighlightDef {
  label: string;
  value: number;
  display?: string;
  sublabel: string;
  animated: boolean;
  icon: LucideIcon;
  accent: string;
}

export function MetricsRow() {
  const [live, setLive] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const [showGlobe, setShowGlobe] = useState(false);
  const exp = useLiveExperience(1000);

  useEffect(() => {
    void fetchAnalyticsStats().then(setLive);
    const refresh = () => void fetchAnalyticsStats().then(setLive);
    window.addEventListener("visit-recorded", refresh);
    const poll = window.setInterval(refresh, 15_000);
    return () => {
      window.removeEventListener("visit-recorded", refresh);
      window.clearInterval(poll);
    };
  }, []);

  const highlights: HighlightDef[] = [
    {
      label: "Live Tenure",
      value: 0,
      display: exp.mounted ? exp.label : "5+ Years",
      sublabel: exp.mounted ? `Since Jul 2021 · ${exp.clock}` : "Since Jul 2021",
      animated: false,
      icon: Briefcase,
      accent: "from-violet-500/12 to-transparent",
    },
    {
      label: "Promotions",
      value: 3,
      display: "3×",
      sublabel: "Junior → Lead",
      animated: false,
      icon: Award,
      accent: "from-emerald-500/12 to-transparent",
    },
    {
      label: "ERP Modules",
      value: 20,
      display: "20+",
      sublabel: "Production systems",
      animated: false,
      icon: FolderKanban,
      accent: "from-amber-500/12 to-transparent",
    },
    {
      label: "Institutional Users",
      value: 5000,
      display: "5,000+",
      sublabel: "Across Tamil Nadu",
      animated: false,
      icon: Users,
      accent: "from-cyan-500/12 to-transparent",
    },
    {
      label: "Exam Concurrency",
      value: 1000,
      display: "1,000+",
      sublabel: "Proctored candidates",
      animated: false,
      icon: Server,
      accent: "from-rose-500/12 to-transparent",
    },
    {
      label: "Portfolio Visitors",
      value: live.total,
      sublabel: live.today > 0 ? `Live · ${live.today} today` : "Live analytics",
      animated: true,
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
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold text-foreground-muted transition hover:border-primary/40 hover:text-primary"
          aria-expanded={showGlobe}
        >
          <Globe size={13} className="text-primary" />
          {showGlobe ? "Hide Live Visitor Map" : "Live Visitor World Map"}
          {showGlobe ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      <Stagger className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
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
                <p className="mt-1.5 text-lg font-bold leading-none sm:text-xl" suppressHydrationWarning>
                  {metric.animated ? (
                    <AnimatedCounter value={Number(metric.value)} />
                  ) : (
                    metric.display ?? metric.value
                  )}
                </p>
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
