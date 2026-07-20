"use client";

import { motion } from "framer-motion";
import { TrendingUp, Trophy, Rocket, Briefcase } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Motion";

const steps = [
  {
    role: "Lead Application Developer",
    period: "Jul 2025 – Present",
    level: 4,
    emoji: "🚀",
    highlight: true,
  },
  {
    role: "Senior Programmer",
    period: "Jun 2024 – Jul 2025",
    level: 3,
    emoji: "⭐",
    highlight: false,
  },
  {
    role: "Programmer",
    period: "Apr 2023 – Jun 2024",
    level: 2,
    emoji: "💼",
    highlight: false,
  },
  {
    role: "Junior Software Developer",
    period: "Jul 2021 – Apr 2023",
    level: 1,
    emoji: "🌱",
    highlight: false,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CareerGrowthCard() {
  const progress = 100;

  return (
    <Reveal variant="scale" className="panel relative overflow-hidden p-5 sm:p-6">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="relative z-[1]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <motion.div
              className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TrendingUp size={12} />
              Career Growth
            </motion.div>
            <h3 className="text-lg font-bold leading-tight sm:text-xl">
              Junior → Lead in{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                5 Years
              </span>
            </h3>
          </div>
          <motion.div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-primary/20 text-xl shadow-inner"
            animate={{ rotate: [0, 5, -5, 0], y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              boxShadow: "0 8px 20px -6px color-mix(in srgb, var(--primary) 30%, transparent)",
              transform: "perspective(200px) rotateX(-8deg)",
            }}
          >
            🏆
          </motion.div>
        </div>

        <p className="text-sm leading-relaxed text-foreground-muted">
          Promoted <strong className="text-foreground">three times</strong> at eNova Software — delivering
          enterprise ERP, HRMS, ticketing, and AI-enabled education systems.
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-muted">Growth journey</span>
            <span className="text-primary">{progress}% path complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-medium text-muted">
            <span>Jul 2021</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <Rocket size={10} /> Present
            </span>
          </div>
        </div>

        {/* Timeline */}
        <Stagger className="relative mt-5 space-y-0">
          <div className="absolute bottom-3 left-[1.15rem] top-3 w-0.5 bg-gradient-to-b from-emerald-400/60 via-primary/40 to-primary/10" />

          {steps.map((step, i) => (
            <StaggerItem key={step.role}>
              <motion.div
                className={`relative mb-3 flex items-start gap-3 rounded-xl border p-3 last:mb-0 ${
                  step.highlight
                    ? "border-primary/35 bg-gradient-to-r from-primary/10 to-transparent shadow-sm shadow-primary/5"
                    : "border-border/60 bg-surface-2/30"
                }`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease }}
                whileHover={{ x: 4, borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)" }}
              >
                {/* Timeline dot + 3D emoji */}
                <div className="relative z-[1] flex shrink-0 flex-col items-center">
                  <motion.span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${
                      step.highlight
                        ? "bg-primary/20 ring-2 ring-primary/50"
                        : "bg-surface-2 ring-1 ring-border"
                    }`}
                    style={{
                      boxShadow: step.highlight
                        ? "0 6px 16px -4px color-mix(in srgb, var(--primary) 40%, transparent)"
                        : "0 4px 10px -2px rgba(0,0,0,0.2)",
                      transform: step.highlight ? "perspective(120px) rotateX(-10deg)" : undefined,
                    }}
                    animate={step.highlight ? { y: [0, -2, 0] } : undefined}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {step.emoji}
                  </motion.span>
                  {step.highlight && (
                    <motion.span
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <p
                      className={`text-xs font-semibold leading-snug ${
                        step.highlight ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {step.role}
                    </p>
                    <span
                      className={`shrink-0 text-[10px] font-bold ${
                        step.highlight ? "text-primary" : "text-muted"
                      }`}
                    >
                      {step.period}
                    </span>
                  </div>
                  {step.highlight && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-600"
                    >
                      <Briefcase size={10} />
                      Current role · Level {step.level}/4
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Stats row */}
        <motion.div
          className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: "Promotions", value: "3×", icon: Trophy },
            { label: "Experience", value: "5 yr", icon: TrendingUp },
            { label: "Current", value: "Lead", icon: Rocket },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl bg-surface-2/60 px-2 py-2 text-center"
            >
              <Icon size={14} className="mx-auto mb-1 text-primary/70" />
              <p className="text-sm font-bold text-foreground">{value}</p>
              <p className="text-[9px] text-muted">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
}
