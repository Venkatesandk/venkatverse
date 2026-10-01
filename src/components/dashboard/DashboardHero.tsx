"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download,
  MapPin,
  Eye,
  Users,
  ShieldCheck,
  Sparkles,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { developer } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { DashboardAIWidget } from "./DashboardAIWidget";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { BASE_DOWNLOAD_COUNT, BASE_VISITOR_COUNT } from "@/lib/counters";
import { fetchAnalyticsStats, useRecordVisit } from "@/hooks/useRecordVisit";

interface DownloadItem {
  name: string;
  emailMasked: string;
  downloadedAt: string;
  downloadNumber: number;
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function DashboardHero() {
  const liveExp = useLiveExperience(60_000);
  const [visitors, setVisitors] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const [downloads, setDownloads] = useState({
    total: BASE_DOWNLOAD_COUNT,
    recent: [] as DownloadItem[],
  });

  useEffect(() => {
    fetch("/api/resume/downloads")
      .then((r) => r.json())
      .then((d) =>
        setDownloads({
          total: d.total ?? BASE_DOWNLOAD_COUNT,
          recent: Array.isArray(d.recent) ? d.recent : [],
        })
      )
      .catch(() => {});

    const refresh = () => {
      fetch("/api/resume/downloads")
        .then((r) => r.json())
        .then((d) =>
          setDownloads({
            total: d.total ?? BASE_DOWNLOAD_COUNT,
            recent: Array.isArray(d.recent) ? d.recent : [],
          })
        )
        .catch(() => {});
    };
    window.addEventListener("resume-downloaded", refresh);
    return () => window.removeEventListener("resume-downloaded", refresh);
  }, []);

  useRecordVisit((stats) => setVisitors(stats));

  useEffect(() => {
    const onVisit = (e: Event) => {
      const detail = (e as CustomEvent<{ total: number; today: number }>).detail;
      if (detail) setVisitors(detail);
      else fetchAnalyticsStats().then(setVisitors);
    };
    window.addEventListener("visit-recorded", onVisit);
    return () => window.removeEventListener("visit-recorded", onVisit);
  }, []);

  return (
    <section
      id="home"
      className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-stretch lg:gap-4"
    >
      <motion.article
        className="panel flex h-full flex-col overflow-hidden !p-0"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      >
        {/* Top status bar */}
        <motion.div variants={rise} className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-2/70 px-4 py-2 sm:px-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/15 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to full-time and contract roles
          </span>
          <span className="text-[11px] text-muted" suppressHydrationWarning>
            {liveExp.mounted ? liveExp.label : "5+ Years"} · eNova Software · Since Jul 2021
          </span>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Profile header — compact single block */}
          <motion.div
            className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div
              variants={rise}
              className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm sm:h-28 sm:w-28"
            >
              <Image
                src={developer.photoUrl}
                alt={developer.name}
                fill
                priority
                sizes="112px"
                quality={100}
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div variants={rise} className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.35rem]">
                {developer.name}
              </h1>
              <p className="mt-0.5 text-[14px] font-semibold text-primary">{developer.role}</p>
              <p className="mt-0.5 text-xs text-foreground-muted sm:text-sm">
                PHP · CodeIgniter · MySQL · Next.js · LMS · Ollama / vLLM
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-muted sm:justify-start">
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
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted transition hover:border-primary hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon width={13} height={13} />
                </a>
                <a
                  href={developer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted transition hover:border-primary hover:text-primary"
                  aria-label="GitHub"
                >
                  <GitHubIcon width={13} height={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={rise} className="mt-3 border-t border-border pt-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Professional Summary
            </p>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {developer.heroDescription} Promoted three times from Junior Developer to Lead.
              Skilled in REST APIs, workflow automation, AWS deployment, and AI-enabled education
              systems.
            </p>
          </motion.div>

          <motion.div variants={rise} className="mt-3 grid grid-cols-2 gap-y-2.5 border-t border-border pt-3 sm:grid-cols-4">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "3×", label: "Promotions" },
              { value: "20+", label: "ERP Modules" },
              { value: "1k+", label: "Exam Users" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`px-2 text-center ${i > 0 ? "sm:border-l sm:border-border" : ""}`}
              >
                <p className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                  {item.value}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={rise} className="mt-auto flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:flex-wrap">
            <ResumeDownloadButton className="btn btn-primary !w-full sm:!w-auto">
              <Download size={16} />
              Download Resume
              <ShieldCheck size={14} className="opacity-80" />
            </ResumeDownloadButton>
            <a
              href={developer.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass !w-full sm:!w-auto"
            >
              <Calendar size={15} />
              Schedule Interview
            </a>
            <a href="#projects" className="btn btn-glass !w-full sm:!w-auto">
              View Case Studies
            </a>
            <a href="/recruiter" className="btn btn-glass !w-full sm:!w-auto">
              Recruiter Brief
            </a>
          </motion.div>
        </motion.div>
      </motion.article>

      {/* Right rail — stretches to match profile card height */}
      <aside className="flex h-full min-h-0 flex-col gap-3">
        <DashboardAIWidget />

        <div className="panel flex min-h-0 flex-1 flex-col">
          <div className="panel-header !py-2.5 !pb-2">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-primary" />
              <p className="panel-title text-sm">Visitors</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
          <div className="panel-body flex min-h-0 flex-1 flex-col !pt-2">
            <div className="mb-2.5 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-surface-2 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-muted">All Time</p>
                <p className="mt-0.5 text-xl font-extrabold tracking-tight">
                  <AnimatedCounter value={visitors.total} />
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-primary">Today</p>
                <p className="mt-0.5 text-xl font-extrabold tracking-tight text-primary">
                  <AnimatedCounter value={visitors.today} />
                </p>
              </div>
            </div>

            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold">
              <Users size={13} className="text-primary" />
              Recent resume downloads
              <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-muted">
                #<AnimatedCounter value={downloads.total} />
              </span>
            </div>

            {downloads.recent.length === 0 ? (
              <p className="flex flex-1 items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-3 text-xs text-muted">
                <Sparkles size={12} /> Be the next to download
              </p>
            ) : (
              <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
                {downloads.recent.map((d) => (
                  <li
                    key={`${d.downloadNumber}-${d.downloadedAt}`}
                    className="flex items-start gap-2 rounded-lg border border-border/60 bg-surface-2/50 px-2.5 py-2 text-xs"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                      {d.name.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{d.name}</p>
                      <p className="truncate text-muted">{d.emailMasked}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-medium text-primary">#{d.downloadNumber}</p>
                      <p className="text-[10px] text-muted">{timeAgo(d.downloadedAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}
