import { techStack } from "@/data/portfolio";

const techCategories = [
  { label: "Backend", items: ["PHP", "CodeIgniter", "Python", "MySQL", "REST API"] },
  { label: "Frontend", items: ["JavaScript", "React", "Next.js", "jQuery", "AJAX", "HTML5", "CSS3"] },
  { label: "Cloud & DevOps", items: ["AWS EC2", "AWS S3", "Git", "Vercel"] },
  { label: "AI", items: ["Gemini", "AWS Bedrock"] },
] as const;

export function TechStackPanel() {
  return (
    <section id="tech" className="panel">
      <div className="panel-header">
        <p className="panel-title">Technologies I Work With</p>
        <span className="panel-badge">{techStack.length}+ tools</span>
      </div>
      <div className="panel-body flex flex-col gap-4">
        {techCategories.map((cat) => {
          const items = cat.items.filter((t) => techStack.includes(t));
          if (!items.length) return null;
          return (
            <div key={cat.label}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold"
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
