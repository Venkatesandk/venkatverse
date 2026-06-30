"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

const categories = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "database", label: "Database" },
  { key: "devops", label: "DevOps" },
  { key: "ai", label: "AI" },
] as const;

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-main">
        <div className="mb-10 text-center md:mb-14">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-desc mx-auto">
            Proficient across the full stack — from PHP backends to modern JavaScript frontends.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, ci) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            if (!catSkills.length) return null;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.05 }}
                className="card p-5"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  {cat.label}
                </h3>
                <div className="space-y-3">
                  {catSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-foreground-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
