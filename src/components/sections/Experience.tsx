"use client";

import { motion } from "framer-motion";
import { Award, Building2, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import {
  experienceCompany,
  experiences,
  keyAchievements,
  majorProjectGroups,
} from "@/data/portfolio";
import { getExperienceLabel } from "@/lib/experience";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <div className="mb-10 md:mb-14">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Experience Timeline</h2>
          <p className="section-desc">
            {experienceCompany.heading} · {getExperienceLabel()} at {experienceCompany.name}
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-5 md:p-6">
          <div className="flex items-center gap-2 text-primary">
            <Building2 size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Company</span>
          </div>
          <h3 className="mt-2 text-xl font-bold">{experienceCompany.name}</h3>
          <p className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} /> {experienceCompany.location}
            </span>
            <span>{experienceCompany.period} ({experienceCompany.tenureLabel})</span>
          </p>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-5 md:p-6"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-primary">{exp.period}</p>
                {exp.current && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    Current
                  </span>
                )}
              </div>
              <h3 className="mb-1 text-lg font-semibold">{exp.role}</h3>
              <p className="mb-3 text-sm text-foreground-muted">{exp.description}</p>
              {exp.responsibilities && (
                <ul className="mb-4 space-y-1.5">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-foreground-muted">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span key={t} className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-foreground-muted">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <h3 className="text-lg font-bold">Major Projects</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {majorProjectGroups.map((g) => (
              <div key={g.id} className="card p-4">
                <p className="mb-2 font-semibold text-primary">{g.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span key={item} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Award size={18} className="text-primary" />
            <h3 className="text-lg font-bold">Key Achievements</h3>
          </div>
          <ul className="space-y-2">
            {keyAchievements.map((a, i) => (
              <li key={a} className="card flex gap-3 p-4 text-sm text-foreground-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
