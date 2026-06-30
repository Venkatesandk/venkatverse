"use client";

import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { Terminal } from "lucide-react";

const terminalLines = [
  "$ git log --oneline -5",
  "a3f2c1d feat: dashboard redesign",
  "b8e4f2a fix: hydration mismatch",
  "c1d9e3b feat: AI assistant widget",
  "d4f7a2c feat: analytics panel",
  "e2b8c1d init: portfolio v1",
  "$ npm run build",
  "✓ Compiled successfully",
];

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

  return (
    <section className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <GitHubIcon width={16} height={16} className="text-primary" />
          <p className="panel-title">GitHub Activity</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-x-auto">
            <div className="flex gap-[3px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div key={di} className={`h-2.5 w-2.5 rounded-sm ${colors[level]}`} />
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted">1,247 contributions in the last year</p>
          </div>

          <div className="overflow-hidden rounded-lg bg-[#0d1117] p-3 font-mono text-[10px] text-green-400">
            <div className="mb-2 flex items-center gap-1.5 text-slate-400">
              <Terminal size={12} /> Live Terminal
            </div>
            {terminalLines.map((line, i) => (
              <p key={i} className={line.startsWith("$") ? "text-slate-300" : line.startsWith("✓") ? "text-emerald-400" : "text-slate-400"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
