"use client";

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
import { ResumeReviewerTool } from "./ResumeReviewerTool";
import { InterviewSimulatorTool } from "./InterviewSimulatorTool";
import { openInterviewRequest } from "@/lib/interview-modal";

const features = [
  {
    title: "AI Resume Reviewer",
    desc: "Paste any job description and get an ATS match score grounded strictly in Venkat's verified profile.",
    icon: FileSearch,
    badge: "ATS Tool",
    href: "#resume-reviewer",
  },
  {
    title: "AI Interview Simulator",
    desc: "Role-based mock questions for PHP/CodeIgniter, system design, and enterprise ERP architecture.",
    icon: BrainCircuit,
    badge: "Mock Prep",
    href: "#interview-simulator",
  },
  {
    title: "Recruiter Dashboard",
    desc: "One-screen 60-second executive summary with top case studies, verified metrics, and direct actions.",
    icon: ChartColumn,
    badge: "Executive View",
    href: "/recruiter",
  },
  {
    title: "Interview Request Flow",
    desc: "Submit preferred interview date, timezone, and role agenda directly to Venkatesan.",
    icon: CalendarCheck2,
    badge: "Booking",
    action: openInterviewRequest,
  },
] as const;

export function AdvancedFeaturesPanel() {
  return (
    <section id="advanced-features" className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-primary" />
          <div>
            <h2 className="panel-title">Recruiter &amp; AI Evaluation Toolkit</h2>
            <p className="mt-0.5 text-[11px] text-muted">
              Optional interactive evaluation tools — separate from the core portfolio experience
            </p>
          </div>
        </div>
        <span className="panel-badge">Interactive Lab</span>
      </div>

      <div className="panel-body space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const inner = (
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="flex h-full flex-col rounded-xl border border-border bg-surface p-3.5 text-left transition hover:border-primary/40"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <feature.icon size={16} />
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground-muted">{feature.desc}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                  Open <ArrowRight size={12} />
                </p>
              </motion.article>
            );

            if ("action" in feature) {
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={feature.action}
                  className="text-left"
                >
                  {inner}
                </button>
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
            Recruiter Quick Evaluation
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
            Evaluate technical depth, verified ERP/HRMS metrics, ATS alignment, and interview availability in under 60 seconds via the{" "}
            <Link href="/recruiter" className="font-semibold text-primary hover:underline">
              Recruiter Brief
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
