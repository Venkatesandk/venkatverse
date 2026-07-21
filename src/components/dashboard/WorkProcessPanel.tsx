"use client";

import { motion } from "framer-motion";
import { workProcess } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

export function WorkProcessPanel() {
  return (
    <section id="process" className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-title">How I Work</p>
          <p className="mt-0.5 text-[11px] text-muted">Clear process from discovery to deploy</p>
        </div>
      </div>
      <div className="panel-body">
        <Stagger className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {workProcess.map((item, i) => (
            <StaggerItem key={item.step}>
              <motion.div
                className="relative h-full rounded-xl border border-border bg-surface-2/40 p-4"
                whileHover={{ y: -3 }}
              >
                <span className="text-2xl font-extrabold text-primary/25">{item.step}</span>
                <p className="mt-1 text-sm font-bold">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{item.desc}</p>
                {i < workProcess.length - 1 && i % 2 === 0 && (
                  <span className="absolute -right-2 top-1/2 hidden text-primary/40 sm:block">→</span>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
