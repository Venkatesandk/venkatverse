import type { LucideIcon } from "lucide-react";
import { Code, Plug, Brain, Database, Server } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  api: Plug,
  layout: Code,
  ai: Brain,
  database: Database,
  server: Server,
};

export function ServicesPanel() {
  return (
    <section id="services" className="panel">
      <div className="panel-header">
        <p className="panel-title">Services I Offer</p>
      </div>
      <div className="panel-body">
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Code;
            return (
              <div key={service.id} className="flex gap-3 rounded-xl border border-border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{service.title}</p>
                  <p className="mt-0.5 text-xs text-foreground-muted">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
