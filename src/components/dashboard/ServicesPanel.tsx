import type { LucideIcon } from "lucide-react";
import { Code, Plug, Brain, Database, Server, Layout } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  api: Plug,
  layout: Layout,
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
        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Code;
            return (
              <div
                key={service.id}
                className="flex h-full gap-3 rounded-xl border border-border bg-surface p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{service.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
