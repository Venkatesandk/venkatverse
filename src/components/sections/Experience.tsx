"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <div className="mb-10 md:mb-14">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Work History</h2>
          <p className="section-desc">
            A track record of delivering quality software across diverse industries.
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-primary">{exp.period}</p>
                  <h3 className="mb-0.5 text-lg font-semibold">{exp.role}</h3>
                  <p className="mb-3 text-sm text-foreground-muted">{exp.company}</p>
                  <p className="text-sm leading-relaxed text-foreground-muted">{exp.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:max-w-[200px] sm:justify-end">
                  {exp.technologies.map((t) => (
                    <span key={t} className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-foreground-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
