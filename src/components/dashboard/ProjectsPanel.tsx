import { ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/portfolio";

export function ProjectsPanel() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.id !== featured.id).slice(0, 4);

  return (
    <section id="projects" className="panel">
      <div className="panel-header">
        <p className="panel-title">Featured Projects</p>
        <a href="#projects" className="text-xs font-semibold text-primary hover:underline">
          View all
        </a>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 via-surface-2 to-accent/10">
              <div className="text-center p-6">
                <p className="text-4xl font-bold text-primary/30">ERP</p>
                <p className="mt-2 text-sm text-muted">Project Preview</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold">{featured.title}</h3>
              <p className="mb-3 text-sm text-foreground-muted">{featured.description}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {featured.technologies.slice(0, 5).map((t) => (
                  <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.liveUrl && (
                  <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !w-auto !px-3 !py-2 !text-xs">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                <button type="button" className="btn btn-glass !w-auto !px-3 !py-2 !text-xs">
                  <FileText size={14} /> Case Study
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {others.map((project) => (
              <div key={project.id} className="overflow-hidden rounded-xl border border-border">
                <div className="flex aspect-[4/3] items-center justify-center bg-surface-2">
                  <span className="text-2xl font-bold text-primary/20">{project.title.charAt(0)}</span>
                </div>
                <div className="p-2.5">
                  <p className="truncate text-xs font-semibold">{project.title}</p>
                  <div className="mt-1 flex gap-1">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary">
                        <GitHubIcon width={12} height={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
