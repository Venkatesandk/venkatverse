"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Activity,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  FileText,
  Users,
} from "lucide-react";
import { developer } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { RequestInterviewButton } from "@/components/sections/InterviewRequestModal";
import { DashboardAIWidget } from "./DashboardAIWidget";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { useLiveStats } from "@/hooks/useLiveStats";

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function DashboardHero() {
  const liveExp = useLiveExperience(60_000);
  const { today, online, downloads, isLoading, isError, isLive } = useLiveStats();

  return (
    <section
      id="home"
      className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-stretch lg:gap-4"
    >
      <motion.article
        className="panel flex h-full flex-col overflow-hidden !p-0"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
      >
        {/* Top status bar */}
        <motion.div
          variants={rise}
          className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-2/70 px-4 py-2 sm:px-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to Lead &amp; Senior Engineering Roles
          </span>
          <span className="text-[11px] font-medium text-muted" suppressHydrationWarning>
            {liveExp.label} · eNova Software · Since Jul 2021
          </span>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Profile header */}
          <motion.div
            className="flex flex-col items-center gap-3.5 sm:flex-row sm:items-center sm:gap-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div
              variants={rise}
              className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm sm:h-28 sm:w-28"
            >
              <Image
                src={developer.photoUrl}
                alt={`${developer.name} — ${developer.role}`}
                fill
                priority
                sizes="112px"
                quality={95}
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div variants={rise} className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-[clamp(1.65rem,4.5vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
                {developer.name}
              </h1>
              <p className="mt-0.5 text-[15px] font-bold text-primary">{developer.role}</p>
              <p className="mt-1 text-xs font-medium text-foreground-muted sm:text-[13px]">
                <span className="font-semibold text-foreground">Core:</span>{" "}
                PHP 7/8 · CodeIgniter 3/4 · MySQL · Enterprise ERP · LMS · HRMS &amp; Biometrics
              </p>
              <p className="mt-0.5 text-xs text-muted">
                <span className="font-medium text-foreground-muted">Additional:</span>{" "}
                React · Next.js · Python · Private AI (Ollama / vLLM) · AWS
              </p>

              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-muted sm:justify-start">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-primary" />
                  {developer.location}
                </span>
                <a
                  href={`mailto:${developer.email}`}
                  className="inline-flex items-center gap-1 hover:text-primary"
                >
                  <Mail size={12} className="text-primary" />
                  {developer.email}
                </a>
                <a
                  href={`tel:+${developer.phoneRaw}`}
                  className="inline-flex items-center gap-1 hover:text-primary"
                >
                  <Phone size={12} className="text-primary" />
                  {developer.phone}
                </a>
                <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden />
                <a
                  href={developer.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary sm:h-9 sm:w-9"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon width={14} height={14} />
                </a>
                <a
                  href={developer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary sm:h-9 sm:w-9"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon width={14} height={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={rise} className="mt-4 border-t border-border pt-3.5">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Enterprise Engineering Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {developer.heroDescription} Promoted three consecutive times from Junior Software Developer to Lead Application Developer, owning architecture, MySQL performance, REST APIs, and team delivery.
            </p>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-4 grid grid-cols-2 gap-y-2.5 border-t border-border pt-3.5 sm:grid-cols-4"
          >
            {[
              { value: `${liveExp.years}y ${liveExp.months}m`, label: "Experience" },
              { value: "3×", label: "Promotions" },
              { value: "20+", label: "ERP Modules" },
              { value: "5,000+", label: "Platform Users" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`px-2 text-center ${i > 0 ? "sm:border-l sm:border-border" : ""}`}
              >
                <p className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl" suppressHydrationWarning>
                  {item.value}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-auto flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:flex-wrap"
          >
            <ResumeDownloadButton className="btn btn-primary !w-full sm:!w-auto">
              <Download size={16} />
              Download Resume
              <ShieldCheck size={14} className="opacity-85" />
            </ResumeDownloadButton>
            <RequestInterviewButton className="btn btn-glass !w-full sm:!w-auto">
              <Calendar size={15} />
              Request Interview
            </RequestInterviewButton>
            <a href="#projects" className="btn btn-glass !w-full sm:!w-auto">
              View Case Studies
            </a>
            <Link href="/recruiter" className="btn btn-glass !w-full sm:!w-auto">
              <FileText size={15} />
              Recruiter Brief
            </Link>
          </motion.div>
        </motion.div>
      </motion.article>

      {/* Right rail — AI Assistant + Real-Time Activity (no duplicated Total Visitors card) */}
      <aside className="flex h-full min-h-0 flex-col gap-3">
        <DashboardAIWidget />

        <div className="panel flex min-h-0 flex-1 flex-col">
          <div className="panel-header !py-2.5 !pb-2">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-primary" />
              <p className="panel-title text-sm">Live Activity</p>
            </div>
            {isLive ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            ) : (
              <span className="text-[10px] font-medium text-muted">
                {isLoading ? "Syncing" : "Offline"}
              </span>
            )}
          </div>

          <div className="panel-body flex min-h-0 flex-1 flex-col justify-start gap-3 !pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-primary">Online Now</p>
                {isLoading ? (
                  <div className="mt-1 h-6 w-12 animate-pulse rounded bg-primary/20" />
                ) : (
                  <p className="mt-0.5 text-xl font-extrabold tracking-tight text-primary">
                    {isError || online === null ? "—" : <AnimatedCounter value={online} />}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-border bg-surface-2 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-muted">Today&apos;s Visits</p>
                {isLoading ? (
                  <div className="mt-1 h-6 w-12 animate-pulse rounded bg-border" />
                ) : (
                  <p className="mt-0.5 text-xl font-extrabold tracking-tight text-foreground">
                    {isError || today === null ? "—" : <AnimatedCounter value={today} />}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface-2/50 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Users size={13} className="text-primary" />
                  Resume Downloads
                </span>
                <span className="rounded bg-emerald-500/12 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                  OTP Verified
                </span>
              </div>

              {isLoading ? (
                <div className="mt-2 h-6 w-24 animate-pulse rounded bg-border" />
              ) : isError || downloads === null ? (
                <p className="mt-1.5 text-lg font-bold text-muted">—</p>
              ) : downloads === 0 ? (
                <p className="mt-1.5 text-xs font-medium text-muted">No downloads yet</p>
              ) : (
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-extrabold tracking-tight text-foreground">
                    <AnimatedCounter value={downloads} />
                  </p>
                  <p className="text-[11px] text-muted">verified downloads</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
