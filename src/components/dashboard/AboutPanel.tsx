"use client";

import { motion } from "framer-motion";
import {
  developer,
  certificates,
  professionalCerts,
  learningActivities,
  aboutContent,
} from "@/data/portfolio";
import { Award, Calendar, BadgeCheck, CheckCircle2, BookOpen } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/Motion";
import { useLiveExperience } from "@/hooks/useLiveExperience";

export function AboutPanel() {
  const liveExp = useLiveExperience(60_000);

  return (
    <section id="about" className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Executive Profile</h2>
        <span className="panel-badge">{developer.responseTime}</span>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm leading-relaxed text-foreground-muted">{aboutContent.intro}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                Verified Impact &amp; Delivery Highlights
              </p>
              <ul className="space-y-2">
                {aboutContent.impacts.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{aboutContent.closing}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted" suppressHydrationWarning>
                <Calendar size={14} className="text-primary" />
                {liveExp.label} · Since Jul 2021
              </span>
              <span className="text-muted">{developer.location}</span>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-surface-2 p-4"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Quick Facts</p>
            <ul className="space-y-2.5 text-sm">
              <li className="break-words">
                <span className="block text-[11px] font-semibold uppercase text-muted">Designation</span>
                <span className="font-semibold text-foreground">{developer.role}</span>
              </li>
              <li className="break-words">
                <span className="block text-[11px] font-semibold uppercase text-muted">Primary Stack</span>
                <span className="text-foreground-muted">PHP 7/8 · CodeIgniter 3/4 · MySQL</span>
              </li>
              <li className="break-words">
                <span className="block text-[11px] font-semibold uppercase text-muted">Additional Stack</span>
                <span className="text-foreground-muted">React · Next.js · Python · Ollama / vLLM · AWS</span>
              </li>
              <li className="break-all">
                <span className="block text-[11px] font-semibold uppercase text-muted">Email</span>
                <a href={`mailto:${developer.email}`} className="text-primary hover:underline">
                  {developer.email}
                </a>
              </li>
              <li className="break-words">
                <span className="block text-[11px] font-semibold uppercase text-muted">Phone</span>
                <a href={`tel:+${developer.phoneRaw}`} className="hover:text-primary">
                  {developer.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CertificationsPanel() {
  return (
    <section id="certifications" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <BadgeCheck size={16} className="text-primary" />
          <div>
            <h2 className="panel-title">Verified Certifications &amp; Assessments</h2>
            <p className="mt-0.5 text-[11px] text-muted">
              Completed assessments &amp; platform credentials — separated from active learning
            </p>
          </div>
        </div>
        <span className="panel-badge">{professionalCerts.length} Completed</span>
      </div>
      <div className="panel-body space-y-5">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {professionalCerts.map((cert) => {
            const Card = (
              <motion.div
                className="flex h-full items-start gap-3 rounded-xl border border-border p-3.5 transition hover:border-primary/30"
                whileHover={{ y: -2 }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 text-[10px] font-extrabold tracking-wide text-primary ring-1 ring-primary/20">
                  {cert.badge}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{cert.title}</p>
                  <p className="text-xs text-muted">{cert.issuer}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-primary">
                    <span>{cert.date}</span>
                    <span className="text-muted">· {cert.kind}</span>
                  </p>
                </div>
              </motion.div>
            );
            return (
              <StaggerItem key={cert.id}>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Continuous Learning — separated from earned certifications */}
        <div className="border-t border-border pt-4">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen size={15} className="text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Continuous Learning &amp; Upskilling (In Progress)
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {learningActivities.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-dashed border-border bg-surface-2/40 p-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted">{item.provider}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AchievementsPanel() {
  return (
    <section id="education" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-primary" />
          <h2 className="panel-title">Academic Education</h2>
        </div>
        <span className="panel-badge">Bharathiar University</span>
      </div>
      <div className="panel-body">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <StaggerItem key={cert.id}>
              <motion.div
                className="h-full rounded-xl border border-border p-4 text-center"
                whileHover={{ y: -3 }}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Award size={20} className="text-primary" />
                </div>
                <p className="text-sm font-semibold">{cert.title}</p>
                <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                <p className="mt-1 text-[11px] font-semibold text-primary">{cert.date}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
