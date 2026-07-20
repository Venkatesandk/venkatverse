"use client";

import { roadmapPhases } from "@/data/portfolio";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/animations/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    glow: "hover:shadow-emerald-500/10",
  },
  "in-progress": {
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary",
    ring: "ring-primary/25",
    glow: "hover:shadow-primary/15",
  },
  upcoming: {
    icon: Circle,
    color: "text-muted",
    bg: "bg-muted",
    ring: "ring-border",
    glow: "hover:shadow-black/5",
  },
};

function RoadmapCard({
  phase,
  index,
  isLast,
}: {
  phase: (typeof roadmapPhases)[number];
  index: number;
  isLast: boolean;
}) {
  const cfg = statusConfig[phase.status];
  const Icon = cfg.icon;
  const isActive = phase.status === "in-progress";
  const isDone = phase.status === "completed";

  return (
    <StaggerItem className="relative min-w-0">
      {/* Timeline connector (desktop) */}
      {!isLast && (
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-8 hidden h-0.5 w-[calc(100%+1rem)] origin-left lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.6, ease }}
        >
          <div
            className={`h-full w-full rounded-full ${
              isDone ? "bg-emerald-400/60" : "bg-border"
            }`}
          />
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 p-4 shadow-sm transition-shadow duration-300 hover:border-primary/20 hover:shadow-lg ${cfg.glow} ${
          isActive ? `ring-2 ${cfg.ring}` : ""
        }`}
      >
        {/* Shimmer for in-progress */}
        {isActive && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />
        )}

        <div className="relative z-[1]">
          <div className="mb-2 flex items-center gap-2">
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 16,
                delay: index * 0.1 + 0.15,
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-surface ${
                isActive ? "animate-pulse" : ""
              }`}
            >
              <Icon size={15} className={cfg.color} />
            </motion.span>
            <span className="text-xs font-bold">{phase.title}</span>
          </div>

          <p className="mb-2 text-[10px] font-medium text-muted">{phase.period}</p>

          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white ${cfg.bg} ${
              isActive ? "shadow-md shadow-primary/30" : ""
            }`}
          >
            {phase.status.replace("-", " ")}
          </motion.span>

          <ul className="space-y-1.5">
            {phase.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.25 + i * 0.06, ease }}
                className="flex items-start gap-1.5 text-[10px] text-foreground-muted"
              >
                <span
                  className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                    isDone ? "bg-emerald-500" : isActive ? "bg-primary" : "bg-muted"
                  }`}
                />
                <span className="leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export function RoadmapPanel() {
  const completed = roadmapPhases.filter((p) => p.status === "completed").length;
  const progress = (completed / roadmapPhases.length) * 100;

  return (
    <section id="roadmap" className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <p className="panel-title">Future Development Roadmap</p>
          <p className="mt-0.5 text-[11px] text-muted">
            {completed} of {roadmapPhases.length} phases completed
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mb-1 h-1.5 overflow-hidden rounded-full bg-surface-2 sm:mx-5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-primary/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
      </div>

      <div className="panel-body !pt-3">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {roadmapPhases.map((phase, index) => (
            <RoadmapCard
              key={phase.id}
              phase={phase}
              index={index}
              isLast={index === roadmapPhases.length - 1}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
