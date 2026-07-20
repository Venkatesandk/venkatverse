"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Motion";

const steps = [
  { role: "Lead Application Developer", period: "Jul 2025 – Present" },
  { role: "Senior Programmer", period: "Jun 2024 – Jul 2025" },
  { role: "Programmer", period: "Apr 2023 – Jun 2024" },
  { role: "Junior Software Developer", period: "Jul 2021 – Apr 2023" },
];

export function CareerGrowthCard() {
  return (
    <Reveal variant="scale" className="panel flex flex-col justify-center overflow-hidden p-5 sm:p-6">
      <motion.p
        className="text-xs font-bold uppercase tracking-wider text-primary"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Career Growth
      </motion.p>
      <h3 className="mt-1 text-lg font-bold">Junior → Lead in 5 Years</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        Promoted three times at eNova Software — from Junior Software Developer to Lead Application Developer —
        delivering enterprise ERP, HRMS, ticketing, and AI-enabled education systems.
      </p>

      <Stagger className="relative mt-5 space-y-0">
        <div className="timeline-line absolute bottom-2 left-[0.18rem] top-2 w-0.5 bg-primary/25" />
        {steps.map((step, i) => (
          <StaggerItem key={step.role}>
            <motion.div
              className="career-step mb-3 flex justify-between gap-2 border-b border-border pb-3 last:mb-0 last:border-0 last:pb-0"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <span className="text-xs text-foreground-muted">{step.role}</span>
              <span className="shrink-0 text-xs font-semibold text-primary">{step.period}</span>
              <span className="sr-only">Step {i + 1}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
