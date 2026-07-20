import { techStack } from "@/data/portfolio";

const techCategories = [
  { label: "Backend", items: ["PHP", "CodeIgniter", "Python", "MySQL", "REST API"] },
  { label: "Frontend", items: ["JavaScript", "React", "jQuery", "AJAX"] },
  { label: "Cloud & DevOps", items: ["AWS EC2", "AWS S3", "AWS Bedrock", "Git"] },
] as const;

export function TechStackPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Technologies I Work With</p>
      </div>
      <div className="panel-body flex flex-col gap-4">
        {techCategories.map((cat) => {
          const items = cat.items.filter((t) => techStack.includes(t));
          if (!items.length) return null;
          return (
            <div key={cat.label}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground-muted transition hover:border-primary hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
