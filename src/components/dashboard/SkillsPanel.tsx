"use client";

import { skills } from "@/data/portfolio";

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
      <svg viewBox="0 0 200 200" className="h-44 w-44">
        <polygon points={gridPoints.join(" ")} fill="none" stroke="var(--border)" strokeWidth="1" />
        <polygon points={points.join(" ")} fill="color-mix(in srgb, var(--primary) 20%, transparent)" stroke="var(--primary)" strokeWidth="2" />
        {topSkills.map((skill, i) => {
          const angle = (i / topSkills.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * (maxR + 18);
          const y = cy + Math.sin(angle) * (maxR + 18);
          return (
            <text key={skill.name} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-muted text-[8px]">
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

function SkillList({ items }: { items: typeof skills }) {
  return (
    <ul className="space-y-2.5">
      {items.map((skill) => (
        <li key={skill.name} className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{skill.name}</p>
            <p className="text-[10px] text-muted">{levelLabel(skill.level)}</p>
          </div>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-primary" style={{ width: `${skill.level}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SkillsPanel() {
  const left = skills.filter((s) => s.category === "backend" || s.category === "database").slice(0, 4);
  const right = skills.filter((s) => s.category === "frontend" || s.category === "ai").slice(0, 4);

  return (
    <section id="skills" className="panel">
      <div className="panel-header">
        <p className="panel-title">My Skills</p>
        <span className="panel-badge">Proficiency</span>
      </div>
      <div className="panel-body">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 md:order-1">
            <SkillList items={left} />
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <SkillRadar />
          </div>
          <div className="order-3">
            <SkillList items={right} />
          </div>
        </div>
      </div>
    </section>
  );
}
