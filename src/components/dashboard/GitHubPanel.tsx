import { GitHubIcon } from "@/components/ui/SocialIcons";
import { ExternalLink, Code2 } from "lucide-react";
import { developer, githubRepos, projects } from "@/data/portfolio";

export function GitHubPanel() {
  const totalProjects = projects.length;
  const countMatching = (needle: string) =>
    projects.filter((p) => p.technologies.some((t) => t.toLowerCase().includes(needle))).length;

  const stackShare = [
    { name: "PHP / CodeIgniter", count: countMatching("php"), color: "bg-[#4F5D95]" },
    { name: "MySQL", count: countMatching("mysql"), color: "bg-[#00758F]" },
    { name: "JavaScript / React", count: countMatching("javascript") + countMatching("react"), color: "bg-[#3178c6]" },
    { name: "Python / AI", count: countMatching("python") + countMatching("ollama"), color: "bg-[#10b981]" },
  ];

  const totalCount = stackShare.reduce((s, x) => s + x.count, 0) || 1;

  return (
    <section className="panel flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <GitHubIcon width={16} height={16} className="text-primary" />
          <h2 className="panel-title">GitHub &amp; Engineering Footprint</h2>
        </div>
        <a
          href={developer.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          GitHub Profile <ExternalLink size={12} />
        </a>
      </div>

      <div className="panel-body flex-1 space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted">
            <span>Stack Distribution Across {totalProjects} Case Studies</span>
            <span>Verified Portfolio Data</span>
          </div>
          <div className="mb-2 flex h-2.5 overflow-hidden rounded-full bg-surface-2">
            {stackShare.map((l) => (
              <div
                key={l.name}
                className={l.color}
                style={{ width: `${Math.round((l.count / totalCount) * 100)}%` }}
                title={`${l.name} (${l.count} case studies)`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-foreground-muted">
            {stackShare.map((l) => (
              <span key={l.name} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${l.color}`} />
                {l.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">
            Repositories &amp; Pattern Kits
          </p>
          <ul className="space-y-2">
            {githubRepos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 rounded-lg border border-border px-3 py-2.5 transition hover:border-primary/30 hover:bg-surface-2/50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-primary">{repo.name}</p>
                    <p className="truncate text-[11px] text-foreground-muted">{repo.desc}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                    <Code2 size={10} />
                    {repo.lang}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[10px] text-muted">
            Note: Enterprise institutional ERP &amp; HRMS repositories remain private under employer confidentiality.
          </p>
        </div>
      </div>
    </section>
  );
}
