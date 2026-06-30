"use client";

import { techStack } from "@/data/portfolio";

export function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <section className="overflow-hidden border-y border-border bg-surface py-4" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-6 text-sm font-medium text-foreground-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
