"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { skillCategories, skills } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/animations/Motion";
import type { SkillTier } from "@/types";

const TIER_STYLES: Record<SkillTier, string> = {
  Core: "border-primary/25 bg-primary/10 text-primary",
  Proficient: "border-emerald-600/20 bg-emerald-500/10 text-emerald-700",
  Working: "border-amber-600/20 bg-amber-500/10 text-amber-700",
  Exploring: "border-border bg-surface text-muted",
};

function SkillRadar() {
  const topSkills = skills.slice(0, 6);
  const cx = 100;
  const cy = 100;
  const maxR = 68;

  const points = topSkills.map((skill, i) => {
    const angle = (i / topSkills.length) * Math.PI * 2 - Math.PI / 2;
    const r = (skill.level / 100) * maxR;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  });

  const gridPoints = topSkills.map((_, i) => {
    const angle = (i / topSkills.length) * Math.PI * 2 - Math.PI / 2;
    return `${cx + Math.cos(angle) * maxR},${cy + Math.sin(angle) * maxR}`;
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="-34 -14 268 228"
        className="h-44 w-full max-w-[260px] sm:h-48 sm:max-w-[290px]"
        role="img"
        aria-label="Core engineering proficiency radar chart"
      >
        <polygon points={gridPoints.join(" ")} fill="none" stroke="var(--border)" strokeWidth="1" />
        <polygon
          points={points.join(" ")}
          fill="color-mix(in srgb, var(--primary) 20%, transparent)"
          stroke="var(--primary)"
          strokeWidth="2"
        />
        {topSkills.map((skill, i) => {
          const angle = (i / topSkills.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * (maxR + 18);
          const y = cy + Math.sin(angle) * (maxR + 18);
          return (
            <text
              key={skill.name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted text-[8.5px] font-medium"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
      >
        V
      </div>
    </div>
  );
}

export function SkillsPanel() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    backend: true,
    architecture: true,
  });

  const toggleCategory = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="skills" className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Skills &amp; Architecture</h2>
          <p className="mt-0.5 text-xs text-muted">
            Backend · Frontend · Database · AI · Cloud · Leadership
          </p>
        </div>
        <span className="panel-badge">{skillCategories.length} Categories</span>
      </div>
      <div className="panel-body space-y-5">
        <div className="flex justify-center">
          <SkillRadar />
        </div>

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => {
            const isOpen = Boolean(expanded[cat.id]);
            const bodyId = `skills-cat-${cat.id}`;
            return (
              <StaggerItem key={cat.id}>
                <motion.div
                  className="h-full rounded-xl border border-border bg-surface-2/40 p-3 sm:p-3.5"
                  whileHover={{ y: -2 }}
                >
                  {/* Expandable accordion header on narrow mobile (<640px) */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={bodyId}
                    className="flex min-h-10 w-full items-center justify-between gap-2 text-left sm:hidden"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {cat.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
                      <span>{cat.items.length}</span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`}
                      />
                    </span>
                  </button>

                  {/* Static category heading on tablet/desktop */}
                  <p className="mb-2.5 hidden text-[11px] font-bold uppercase tracking-wider text-primary sm:block">
                    {cat.title}
                  </p>

                  <ul
                    id={bodyId}
                    className={`${isOpen ? "mt-2 space-y-2 border-t border-border/60 pt-2.5" : "hidden"} sm:mt-0 sm:block sm:space-y-2 sm:border-t-0 sm:pt-0`}
                  >
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs"
                      >
                        <span className="font-medium text-foreground">{item.name}</span>{" "}
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${TIER_STYLES[item.tier]}`}
                        >
                          {item.tier}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
