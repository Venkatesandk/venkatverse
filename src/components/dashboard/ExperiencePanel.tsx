"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Building2, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import {
  experienceCompany,
  experiences,
  keyAchievements,
  majorProjectGroups,
} from "@/data/portfolio";
import { LiveExperienceBadge } from "@/components/ui/LiveExperienceBadge";
import { useLiveExperience } from "@/hooks/useLiveExperience";

export function ExperiencePanel() {
  const live = useLiveExperience(1000);

  return (
    <section id="experience" className="panel">
      <div className="panel-header">
        <div className="min-w-0">
          <p className="panel-title">Experience Timeline</p>
          <p className="mt-0.5 text-xs text-muted">{experienceCompany.heading}</p>
        </div>
        <span className="panel-badge" suppressHydrationWarning>
          {live.mounted ? live.label : "…"}
        </span>
      </div>

      <div className="panel-body space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-surface-2 to-accent/5 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-primary">
                <Building2 size={16} />
                <span className="text-[11px] font-bold uppercase tracking-wider">Company</span>
              </div>
              <h3 className="text-base font-bold leading-snug sm:text-lg">{experienceCompany.name}</h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-primary" />
                  {experienceCompany.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase size={12} className="text-primary" />
                  {experienceCompany.period}
                </span>
              </p>
            </div>
            <span className="shrink-0 self-start rounded-full bg-primary px-3 py-1 text-xs font-bold text-white" suppressHydrationWarning>
              {live.mounted ? live.label : experienceCompany.tenureLabel}
            </span>
          </div>
          <div className="mt-3">
            <LiveExperienceBadge variant="panel" />
          </div>
        </motion.div>

        <div className="relative space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-3 pb-6 last:pb-0 sm:gap-4"
            >
              {i < experiences.length - 1 && (
                <div className="absolute left-[7px] top-4 h-full w-0.5 bg-border sm:left-[9px]" />
              )}
              <div
                className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 sm:h-4 sm:w-4 ${
                  exp.current
                    ? "border-primary bg-primary shadow-[0_0_0_4px] shadow-primary/20"
                    : "border-primary bg-surface"
                }`}
              />
              <div className="min-w-0 flex-1 rounded-xl border border-border bg-surface-2/40 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-primary">{exp.period}</p>
                  {exp.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 text-sm font-bold sm:text-base">{exp.role}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                      Key Responsibilities
                    </p>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2 text-xs leading-relaxed text-foreground-muted">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-primary" />
            <p className="text-sm font-bold">Major Projects</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {majorProjectGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-surface p-3 sm:p-4"
              >
                <p className="mb-2 text-xs font-bold text-primary sm:text-sm">{group.title}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-surface-2 px-2 py-1 text-[10px] font-medium text-foreground-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Award size={15} className="text-primary" />
            <p className="text-sm font-bold">Key Achievements</p>
          </div>
          <ul className="space-y-2">
            {keyAchievements.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-2 rounded-lg border border-border/70 bg-surface-2/50 px-3 py-2.5 text-xs leading-relaxed text-foreground-muted sm:text-[13px]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
