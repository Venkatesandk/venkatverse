"use client";

import { useEffect, useState } from "react";
import { analyticsMetrics } from "@/data/portfolio";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { fetchAnalyticsStats } from "@/hooks/useRecordVisit";
import { Sparkline } from "./Sparkline";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { LiveGlobePanel } from "./LiveGlobePanel";
import { Users, Eye, Briefcase, FolderKanban, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/animations/Motion";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface MetricDef {
  label: string;
  value: number;
  display?: string;
  sublabel?: string;
  change?: string;
  animated: boolean;
  icon: LucideIcon;
  accent: string;
}

export function MetricsRow() {
  const [live, setLive] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const exp = useLiveExperience(1000);

  useEffect(() => {
    fetchAnalyticsStats().then(setLive);
    const refresh = () => fetchAnalyticsStats().then(setLive);
    window.addEventListener("visit-recorded", refresh);
    return () => window.removeEventListener("visit-recorded", refresh);
  }, []);

  const metrics: MetricDef[] = [
    {
      label: "Total Visitors",
      value: live.total,
      sublabel: "All time",
      animated: true,
      icon: Users,
      accent: "from-cyan-500/12 to-transparent",
    },
    {
      label: "Today",
      value: live.today,
      change: live.today > 0 ? "Live" : "—",
      animated: true,
      icon: Eye,
      accent: "from-emerald-500/12 to-transparent",
    },
    {
      label: "Experience",
      value: 0,
      display: exp.mounted ? exp.label : "…",
      change: exp.mounted ? exp.clock : "Jul 2021",
      animated: false,
      icon: Briefcase,
      accent: "from-violet-500/12 to-transparent",
    },
    {
      label: "Projects",
      value: 15,
      display: "15+",
      change: "+2 yr",
      animated: false,
      icon: FolderKanban,
      accent: "from-amber-500/12 to-transparent",
    },
    {
      label: "GitHub",
      value: 1247,
      display: "1.2k",
      change: "+92 mo",
      animated: false,
      icon: GitBranch,
      accent: "from-slate-500/12 to-transparent",
    },
  ];

  const sparklines = analyticsMetrics.map((m) => m.sparkline);

  return (
    <section className="space-y-3">
      <Stagger className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <StaggerItem key={metric.label}>
              <motion.div
                className={`metric-card !p-3 group relative min-w-0 overflow-hidden bg-gradient-to-br ${metric.accent}`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {metric.label}
                  </p>
                  <Icon size={13} className="shrink-0 text-primary/70" />
                </div>
                <p className="mt-1 text-lg font-bold leading-none sm:text-xl" suppressHydrationWarning>
                  {metric.animated ? (
                    <AnimatedCounter value={Number(metric.value)} />
                  ) : (
                    metric.display ?? metric.value
                  )}
                </p>
                {(metric.sublabel || metric.change) && (
                  <p className="mt-1 text-[10px] font-medium text-emerald-600" suppressHydrationWarning>
                    {metric.sublabel ?? metric.change}
                  </p>
                )}
                <div className="mt-2 opacity-70 group-hover:opacity-100">
                  <Sparkline data={sparklines[index] ?? sparklines[0]} />
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <LiveGlobePanel />
    </section>
  );
}
