import { analyticsMetrics, liveVisitorCountries } from "@/data/portfolio";
import { Sparkline } from "./Sparkline";
import { Globe } from "lucide-react";

export function MetricsRow() {
  return (
    <section className="dashboard-grid xl:grid-cols-[1fr_280px]">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {analyticsMetrics.map((metric) => (
          <div key={metric.label} className="metric-card min-w-0">
            <p className="truncate text-[11px] font-medium text-muted">{metric.label}</p>
            <p className="mt-1 text-lg font-bold tracking-tight sm:text-xl md:text-2xl">{metric.value}</p>
            {metric.sublabel && (
              <p className="text-[10px] text-muted">{metric.sublabel}</p>
            )}
            {metric.change && (
              <p className={`text-[10px] font-semibold ${metric.positive ? "text-emerald-600" : "text-red-500"}`}>
                {metric.change}
              </p>
            )}
            <div className="mt-2">
              <Sparkline data={metric.sparkline} />
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header !border-0 !pb-0">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-primary" />
            <p className="panel-title">Live Visitors</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            24 Online
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
