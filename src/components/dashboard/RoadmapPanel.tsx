import { roadmapPhases } from "@/data/portfolio";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500" },
  "in-progress": { icon: Clock, color: "text-primary", bg: "bg-primary" },
  upcoming: { icon: Circle, color: "text-muted", bg: "bg-muted" },
};

export function RoadmapPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Future Development Roadmap</p>
      </div>
      <div className="panel-body overflow-x-auto">
        <div className="flex min-w-[600px] gap-4">
          {roadmapPhases.map((phase) => {
            const cfg = statusConfig[phase.status];
            const Icon = cfg.icon;
            return (
              <div key={phase.id} className="flex-1 rounded-xl border border-border bg-surface-2 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Icon size={14} className={cfg.color} />
                  <span className="text-xs font-bold">{phase.title}</span>
                </div>
                <p className="mb-2 text-[10px] text-muted">{phase.period}</p>
                <span className={`mb-3 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold text-white ${cfg.bg}`}>
                  {phase.status.replace("-", " ")}
                </span>
                <ul className="space-y-1">
                  {phase.items.map((item) => (
                    <li key={item} className="text-[10px] text-foreground-muted">• {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
