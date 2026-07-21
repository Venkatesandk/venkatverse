"use client";

import { motion } from "framer-motion";
import { TrendingUp, Trophy, Rocket, Briefcase } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Motion";
import { experiences } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/** Chronological growth: Junior → Lead */
const growthSteps = [...experiences].reverse().map((e) => {
  const year = e.period.match(/\d{4}/)?.[0] ?? "";
  return {
    year,
    role: e.role,
    period: e.period,
    current: Boolean(e.current),
  };
});

export function CareerGrowthCard() {
  return (
    <Reveal variant="scale" className="panel relative overflow-hidden p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-[1]">
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
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Promoted <strong className="text-foreground">three times</strong> at eNova Software — from Junior
          Developer to Lead Application Developer.
        </p>

        {/* Visual year ladder */}
        <Stagger className="relative mt-5">
          <div className="absolute bottom-4 left-[1.35rem] top-4 w-0.5 bg-gradient-to-b from-primary/15 via-primary/40 to-emerald-400/70" />

          {growthSteps.map((step, i) => (
            <StaggerItem key={`${step.year}-${step.role}`}>
              <motion.div
                className="relative mb-0 flex gap-3 pb-4 last:pb-0"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease }}
              >
                <div className="relative z-[1] flex w-11 shrink-0 flex-col items-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold ${
                      step.current
                        ? "bg-primary text-white ring-2 ring-primary/40"
                        : "bg-surface-2 text-primary ring-1 ring-border"
                    }`}
                  >
                    {step.year.slice(2) || "—"}
                  </span>
                  {i < growthSteps.length - 1 && (
                    <span className="mt-1 text-[10px] font-bold text-primary/50">↓</span>
                  )}
                </div>
                <div
                  className={`min-w-0 flex-1 rounded-xl border px-3 py-2.5 ${
                    step.current
                      ? "border-primary/35 bg-primary/8"
                      : "border-border/70 bg-surface-2/30"
                  }`}
                >
                  <p className="text-xs font-semibold text-foreground">{step.role}</p>
                  <p className="mt-0.5 text-[10px] text-muted">{step.period}</p>
                  {step.current && (
                    <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                      <Briefcase size={10} /> Current role
                    </p>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
          {[
            { label: "Promotions", value: "3×", icon: Trophy },
            { label: "Experience", value: "5 yr", icon: TrendingUp },
            { label: "Current", value: "Lead", icon: Rocket },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-surface-2/60 px-2 py-2 text-center">
              <Icon size={14} className="mx-auto mb-1 text-primary/70" />
              <p className="text-sm font-bold">{value}</p>
              <p className="text-[9px] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
