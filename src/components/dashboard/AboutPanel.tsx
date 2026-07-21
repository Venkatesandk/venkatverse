"use client";

import { motion } from "framer-motion";
import { developer, certificates, professionalCerts, aboutContent } from "@/data/portfolio";
import { Award, Calendar, BadgeCheck, CheckCircle2 } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

export function AboutPanel() {
  return (
    <section id="about" className="panel">
      <div className="panel-header">
        <p className="panel-title">About Me</p>
        <span className="panel-badge">{developer.responseTime}</span>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm leading-relaxed text-foreground-muted">{aboutContent.intro}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Key Impact</p>
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
              <span className="flex items-center gap-1.5 text-muted">
                <Calendar size={14} className="text-primary" /> {developer.experience} · Since Jul 2021
              </span>
              <span className="text-muted">{developer.location}</span>
            </div>
          </motion.div>
          <motion.div
            className="rounded-xl border border-border bg-surface-2 p-4"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            whileHover={{ y: -3 }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Quick Facts</p>
            <ul className="space-y-2 text-sm">
              <li className="break-words">
                <span className="text-muted">Role:</span> {developer.role}
              </li>
              <li className="break-all">
                <span className="text-muted">Email:</span> {developer.email}
              </li>
              <li className="break-words">
                <span className="text-muted">Phone:</span> {developer.phone}
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
          <p className="panel-title">Certifications</p>
        </div>
        <span className="panel-badge">Platform badges</span>
      </div>
      <div className="panel-body">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {professionalCerts.map((cert) => {
            const Card = (
              <motion.div
                className="flex items-start gap-3 rounded-xl border border-border p-3.5 transition hover:border-primary/30"
                whileHover={{ y: -3 }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 text-[10px] font-extrabold tracking-wide text-primary ring-1 ring-primary/20">
                  {cert.badge}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{cert.title}</p>
                  <p className="text-xs text-muted">{cert.issuer}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-primary">{cert.date}</p>
                </div>
              </motion.div>
            );
            return (
              <StaggerItem key={cert.id}>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function AchievementsPanel() {
  return (
    <section id="achievements" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-primary" />
          <p className="panel-title">Education</p>
        </div>
      </div>
      <div className="panel-body">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <StaggerItem key={cert.id}>
              <motion.div
                className="rounded-xl border border-border p-4 text-center"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
              >
                <motion.div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                  whileHover={{ rotate: 8 }}
                >
                  <Award size={20} className="text-primary" />
                </motion.div>
                <p className="text-sm font-semibold">{cert.title}</p>
                <p className="text-xs text-muted">{cert.issuer}</p>
                <p className="mt-1 text-[10px] text-primary">{cert.date}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
