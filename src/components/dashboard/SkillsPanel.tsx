"use client";

import { motion } from "framer-motion";
import { skillCategories, skills } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

const levelLabel = (level: number) => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Intermediate";
  return "Proficient";
};

function SkillRadar() {
  const topSkills = skills.slice(0, 6);
  const cx = 100;
  const cy = 100;
  const maxR = 70;

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
      <svg viewBox="0 0 200 200" className="h-40 w-40 sm:h-44 sm:w-44">
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
              className="fill-muted text-[8px]"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        V
      </div>
    </div>
  );
}

export function SkillsPanel() {
  return (
    <section id="skills" className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-title">Skills</p>
          <p className="mt-0.5 text-[11px] text-muted">Backend · Frontend · Database · AI · Cloud · Architecture</p>
        </div>
        <span className="panel-badge">8 Categories</span>
      </div>
      <div className="panel-body space-y-5">
        <div className="flex justify-center">
          <SkillRadar />
        </div>

        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <motion.div
                className="h-full rounded-xl border border-border bg-surface-2/40 p-3"
                whileHover={{ y: -3 }}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {cat.title}
                </p>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => {
                    const skill = skills.find(
                      (s) =>
                        s.name.toLowerCase().includes(item.split(" ")[0].toLowerCase()) ||
                        item.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
                    );
                    return (
                      <li key={item} className="flex items-center justify-between gap-1 text-xs">
                        <span className="font-medium text-foreground">{item}</span>
                        {skill && (
                          <span className="shrink-0 text-[9px] text-muted">{levelLabel(skill.level)}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
