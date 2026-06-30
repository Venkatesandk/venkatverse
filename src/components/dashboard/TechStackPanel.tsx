import { techStack } from "@/data/portfolio";

export function TechStackPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Technologies I Work With</p>
      </div>
      <div className="panel-body">
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs font-semibold text-foreground-muted transition hover:border-primary hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
