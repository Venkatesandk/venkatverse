import { techStack } from "@/data/portfolio";

const techCategories = [
  {
    label: "Backend",
    items: ["PHP", "CodeIgniter", "Python", "MySQL", "REST API", "JWT", "RBAC"],
  },
  {
    label: "Frontend",
    items: ["JavaScript", "React", "Next.js", "jQuery", "AJAX", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  {
    label: "Cloud & Tools",
    items: ["AWS EC2", "AWS S3", "Vercel", "Git", "Postman"],
  },
  {
    label: "AI & Education",
    items: ["Ollama", "vLLM", "Gemini", "AWS Bedrock", "LMS Integration", "Admission AI"],
  },
] as const;

const focusAreas = [
  "Educational ERP",
  "LMS Integration",
  "Admission AI",
  "Ollama / vLLM",
  "HRMS & Payroll",
  "Online Exams",
];

export function TechStackPanel() {
  return (
    <section id="tech" className="panel flex h-full flex-col">
      <div className="panel-header">
        <p className="panel-title">Technologies I Work With</p>
        <span className="panel-badge">{techStack.length}+ tools</span>
      </div>
      <div className="panel-body flex flex-1 flex-col gap-3">
        {techCategories.map((cat) => {
          const items = cat.items.filter((t) => techStack.includes(t));
          if (!items.length) return null;
          return (
            <div key={cat.label}>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface-2/50 px-2 py-1 text-[11px] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-auto border-t border-border pt-3">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
            Delivery focus
          </p>
          <div className="flex flex-wrap gap-1.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
