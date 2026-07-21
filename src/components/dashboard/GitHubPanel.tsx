"use client";

import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { ExternalLink, Star } from "lucide-react";
import { developer, githubRepos } from "@/data/portfolio";

export function GitHubPanel() {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    const weeks = 26;
    const days = 7;
    const seed = 42;
    const data = Array.from({ length: weeks }, (_, wi) =>
      Array.from({ length: days }, (_, di) => ((wi * 7 + di + seed) % 17) % 5)
    );
    setContributions(data);
  }, []);

  const colors = [
    "bg-surface-2",
    "bg-primary/25",
    "bg-primary/45",
    "bg-primary/65",
    "bg-primary",
  ];

  const langs = [
    { name: "PHP", pct: 42 },
    { name: "JavaScript", pct: 28 },
    { name: "TypeScript", pct: 18 },
    { name: "Python", pct: 12 },
  ];

  return (
    <section className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <GitHubIcon width={16} height={16} className="text-primary" />
          <p className="panel-title">GitHub Activity</p>
        </div>
        <a
          href={developer.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Profile <ExternalLink size={12} />
        </a>
      </div>
      <div className="panel-body space-y-4">
        <div className="overflow-x-auto pb-1">
          <div className="flex w-max gap-[3px]">
            {contributions.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div key={di} className={`h-2.5 w-2.5 rounded-sm ${colors[level]}`} />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-muted">Contribution activity · last year</p>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Top languages</p>
          <div className="mb-2 flex h-2 overflow-hidden rounded-full">
            {langs.map((l) => (
              <div
                key={l.name}
                className={
                  l.name === "PHP"
                    ? "bg-[#4F5D95]"
                    : l.name === "JavaScript"
                      ? "bg-[#f1e05a]"
                      : l.name === "TypeScript"
                        ? "bg-[#3178c6]"
                        : "bg-[#3572A5]"
                }
                style={{ width: `${l.pct}%` }}
                title={`${l.name} ${l.pct}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] text-muted">
            {langs.map((l) => (
              <span key={l.name}>
                {l.name} <strong className="text-foreground">{l.pct}%</strong>
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Recent repositories</p>
          <ul className="space-y-2">
            {githubRepos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 rounded-lg border border-border px-3 py-2 transition hover:border-primary/30 hover:bg-surface-2/50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-primary">{repo.name}</p>
                    <p className="truncate text-[10px] text-muted">{repo.desc}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted">
                    <span className="h-2 w-2 rounded-full bg-primary/70" />
                    {repo.lang}
                    <Star size={10} className="ml-1" /> {repo.stars}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
