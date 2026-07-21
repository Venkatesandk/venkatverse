"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  CalendarCheck2,
  ChartColumn,
  FileSearch,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { developer } from "@/data/portfolio";
import { ResumeReviewerTool } from "./ResumeReviewerTool";
import { InterviewSimulatorTool } from "./InterviewSimulatorTool";

const ProfessionalShowcase3D = dynamic(
  () => import("@/components/three/ProfessionalShowcase3D").then((m) => m.ProfessionalShowcase3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[250px] items-center justify-center rounded-xl border border-border bg-surface-2/40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  }
);

const features = [
  {
    title: "AI Resume Reviewer",
    desc: "Paste any job description and get an instant ATS match score with skill gaps.",
    icon: FileSearch,
    badge: "Live",
    href: "#resume-reviewer",
  },
  {
    title: "AI Interview Simulator",
    desc: "Role-based mock interviews for PHP, system design, and enterprise architecture.",
    icon: BrainCircuit,
    badge: "Live",
    href: "#interview-simulator",
  },
  {
    title: "Recruiter Dashboard",
    desc: "One-screen executive summary with top projects, impact metrics, and interview booking.",
    icon: ChartColumn,
    badge: "Live",
    href: "/recruiter",
  },
  {
    title: "Smart Booking Flow",
    desc: "Book a 30-minute interview with a ready agenda and portfolio brief.",
    icon: CalendarCheck2,
    badge: "Live",
    href: developer.calendarUrl,
    external: true,
  },
] as const;

export function AdvancedFeaturesPanel() {
  return (
    <section id="advanced-features" className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-primary" />
          <p className="panel-title">Advanced Portfolio Features</p>
        </div>
        <span className="panel-badge">10/10 Toolkit</span>
      </div>

      <div className="panel-body space-y-4">
        <ProfessionalShowcase3D />

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => {
            const inner = (
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="h-full rounded-xl border border-border bg-surface p-3.5 transition hover:border-primary/40"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <feature.icon size={16} />
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{feature.desc}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                  Open <ArrowRight size={12} />
                </p>
              </motion.article>
            );

            if ("external" in feature && feature.external) {
              return (
                <a key={feature.title} href={feature.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              );
            }
            if (feature.href.startsWith("/")) {
              return (
                <Link key={feature.title} href={feature.href}>
                  {inner}
                </Link>
              );
            }
            return (
              <a key={feature.title} href={feature.href}>
                {inner}
              </a>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ResumeReviewerTool />
          <InterviewSimulatorTool />
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles size={15} />
            Recruiter Promise
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
            Evaluate fit in under 60 seconds: technical depth, business impact, ATS match, and interview readiness —
            then book a call from the{" "}
            <Link href="/recruiter" className="font-semibold text-primary hover:underline">
              Recruiter Dashboard
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
