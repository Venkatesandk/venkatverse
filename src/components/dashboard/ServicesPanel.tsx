import type { LucideIcon } from "lucide-react";
import { Code, Plug, Brain, Database, Server, Layout, GraduationCap, Users } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  api: Plug,
  layout: Layout,
  ai: Brain,
  database: Database,
  server: Server,
  lms: GraduationCap,
  users: Users,
};

export function ServicesPanel() {
  return (
    <section id="services" className="panel flex h-full flex-col">
      <div className="panel-header">
        <p className="panel-title">Services I Offer</p>
        <span className="panel-badge">{services.length} services</span>
      </div>
      <div className="panel-body flex-1">
        <div className="grid gap-2.5 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Code;
            return (
              <div
                key={service.id}
                className="flex gap-2.5 rounded-xl border border-border bg-surface-2/40 p-2.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug">{service.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-foreground-muted">
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
