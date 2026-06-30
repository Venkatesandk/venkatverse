import { experiences } from "@/data/portfolio";

export function ExperiencePanel() {
  return (
    <section id="experience" className="panel">
      <div className="panel-header">
        <p className="panel-title">Experience Timeline</p>
      </div>
      <div className="panel-body">
        <div className="relative space-y-0">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="relative flex gap-4 pb-6 last:pb-0">
              {i < experiences.length - 1 && (
                <div className="absolute left-[7px] top-4 h-full w-0.5 bg-border" />
              )}
              <div className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-surface" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-primary">{exp.period}</p>
                <h3 className="font-bold">{exp.role}</h3>
                <p className="text-sm text-muted">{exp.company}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{exp.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.technologies.map((t) => (
                    <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
