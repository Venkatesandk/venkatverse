"use client";

import { useEffect, useState } from "react";
import { analyticsMetrics, liveVisitorCountries } from "@/data/portfolio";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { Sparkline } from "./Sparkline";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

export function MetricsRow() {
  const [live, setLive] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const exp = useLiveExperience(1000);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => setLive({ total: d.total ?? BASE_VISITOR_COUNT, today: d.today ?? 0 }))
      .catch(() => {});
  }, []);

  const metrics: Array<{
    label: string;
    value: number;
    display?: string;
    sublabel?: string;
    change?: string;
    positive?: boolean;
    sparkline: number[];
    animated: boolean;
  }> = [
    {
      label: "Total Visitors",
      value: live.total,
      sublabel: "All Time",
      sparkline: analyticsMetrics[0].sparkline,
      animated: true,
    },
    {
      label: "Today's Visitors",
      value: live.today,
      change: live.today > 0 ? "Live count" : "Waiting…",
      positive: true,
      sparkline: analyticsMetrics[1].sparkline,
      animated: true,
    },
    {
      label: "Experience",
      value: 0,
      display: exp.mounted ? exp.label : "…",
      change: exp.mounted ? `${exp.days}d · ${exp.clock}` : "Since Jul 2021",
      positive: true,
      sparkline: analyticsMetrics[2].sparkline,
      animated: false,
    },
    {
      label: "Projects Completed",
      value: 15,
      display: "15",
      change: "+2 This Year",
      positive: true,
      sparkline: analyticsMetrics[3].sparkline,
      animated: false,
    },
    {
      label: "GitHub Contributions",
      value: 1247,
      display: "1,247",
      change: "+92 This Month",
      positive: true,
      sparkline: analyticsMetrics[4].sparkline,
      animated: false,
    },
  ];

  return (
    <section className="dashboard-grid xl:grid-cols-[1fr_280px]">
      <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {metrics.map((metric) => (
          <StaggerItem key={metric.label}>
            <motion.div className="metric-card min-w-0" whileHover={{ y: -3 }}>
              <p className="truncate text-[11px] font-medium text-muted">{metric.label}</p>
              <p className="mt-1 text-lg font-bold tracking-tight sm:text-xl md:text-2xl" suppressHydrationWarning>
                {metric.animated ? (
                  <AnimatedCounter value={Number(metric.value)} />
                ) : (
                  metric.display ?? metric.value
                )}
              </p>
              {metric.sublabel && (
                <p className="text-[10px] text-muted">{metric.sublabel}</p>
              )}
              {metric.change && (
                <p
                  className={`text-[10px] font-semibold tabular-nums ${metric.positive ? "text-emerald-600" : "text-red-500"}`}
                  suppressHydrationWarning
                >
                  {metric.change}
                </p>
              )}
              <div className="mt-2">
                <Sparkline data={metric.sparkline} />
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="panel">
        <div className="panel-header !border-0 !pb-0">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-primary" />
            <p className="panel-title">Live Visitors</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Today {live.today}
          </span>
        </div>
        <div className="panel-body !pt-3">
          <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
            <Globe size={48} className="text-primary/30" />
          </div>
          <ul className="space-y-2">
            {liveVisitorCountries.map((c) => (
              <li key={c.country} className="flex items-center gap-2 text-xs">
                <span>{c.flag}</span>
                <span className="flex-1 text-foreground-muted">{c.country}</span>
                <span className="font-semibold">{c.count}</span>
                <span className="w-8 text-right text-muted">{c.percent}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
