"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Download, FileText, MessageCircle } from "lucide-react";
import { availability, developer } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { RequestInterviewButton } from "@/components/sections/InterviewRequestModal";

export function HireAvailabilityStrip() {
  return (
    <section id="hire" className="panel overflow-hidden">
      <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/5"
        />
        <div className="relative z-[1]">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {availability.status}
          </span>
          <h2 className="text-lg font-bold sm:text-xl">
            Hiring a Lead PHP / Enterprise ERP Developer?
          </h2>
          <p className="mt-1.5 text-sm text-foreground-muted">{availability.notice}</p>
          <p className="mt-2 text-xs font-medium text-primary">{developer.hirePitch}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {availability.roles.map((role) => (
              <li
                key={role}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium"
              >
                <CheckCircle2 size={12} className="text-primary" />
                {role}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-[1] grid gap-2 sm:grid-cols-2">
          <RequestInterviewButton className="btn btn-primary w-full justify-center">
            <Calendar size={16} /> Request Interview
          </RequestInterviewButton>
          <ResumeDownloadButton className="btn btn-glass w-full justify-center">
            <Download size={16} /> Download Resume
          </ResumeDownloadButton>
          <Link href="/recruiter" className="btn btn-glass w-full justify-center">
            <FileText size={16} /> Recruiter Brief
          </Link>
          <motion.a
            href="#contact"
            className="btn btn-glass w-full justify-center"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <MessageCircle size={16} /> Direct Message
          </motion.a>
        </div>
      </div>
    </section>
  );
}
