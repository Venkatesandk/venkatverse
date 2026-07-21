"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { whyHireMe } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

export function WhyHireMePanel() {
  return (
    <section id="why-hire" className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <p className="panel-title">Why Hire Me?</p>
        </div>
        <span className="panel-badge">Recruiter snapshot</span>
      </div>
      <div className="panel-body">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whyHireMe.map((item, i) => (
            <StaggerItem key={item.title}>
              <motion.div
                className="why-hire-card group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-4"
                initial={{ opacity: 0, rotateX: 12, y: 16 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
                whileHover={{ y: -6, rotateY: 4, scale: 1.02 }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20"
                />
                <div className="relative z-[1] flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-md shadow-primary/10">
                    <CheckCircle2 size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-snug">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
