"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section id="home" className="dashboard-grid lg:grid-cols-[1fr_300px]">
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="panel overflow-hidden !p-0"
      >
        {/* Top status bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-2/70 px-5 py-2.5 sm:px-7">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for full-time & contract roles
          </span>
          <span className="text-[11px] text-muted" suppressHydrationWarning>
            {liveExp.mounted ? liveExp.label : "5+ Years"} · eNova Software · Since Jul 2021
          </span>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          {/* Profile header row */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-[3px] border-border bg-surface-2 sm:h-[7.5rem] sm:w-[7.5rem]">
              <Image
                src={developer.photoUrl}
                alt={developer.name}
                fill
                priority
                sizes="120px"
                quality={100}
                className="object-cover object-center"
              />
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-[1.85rem] font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.15rem]">
                {developer.name}
              </h1>
              <p className="mt-1 text-[15px] font-semibold text-primary sm:text-base">
                {developer.role}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                PHP · CodeIgniter · MySQL · Next.js · Enterprise ERP & HRMS
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary" />
                  {developer.location}
                </span>
                <a href={`mailto:${developer.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                  <Mail size={13} className="text-primary" />
                  {developer.email}
                </a>
                <a href={`tel:+${developer.phoneRaw}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                  <Phone size={13} className="text-primary" />
                  {developer.phone}
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
                <a
                  href={developer.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon width={15} height={15} />
                </a>
                <a
                  href={developer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary"
                  aria-label="GitHub"
                >
                  <GitHubIcon width={15} height={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Professional summary */}
          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Professional Summary
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
              {developer.heroDescription} Promoted three times from Junior Developer to Lead.
              Skilled in REST APIs, workflow automation, AWS deployment, and AI-enabled education systems.
            </p>
          </div>

          {/* Impact metrics — divider style, not cards */}
          <div className="mt-5 grid grid-cols-2 gap-y-4 border-t border-border pt-5 sm:grid-cols-4">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "3×", label: "Promotions" },
              { value: "20+", label: "ERP Modules" },
              { value: "1k+", label: "Exam Users" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`px-2 text-center sm:px-3 ${i > 0 ? "sm:border-l sm:border-border" : ""} ${i === 2 ? "border-t border-border pt-4 sm:border-t-0 sm:pt-0" : ""} ${i === 3 ? "border-t border-border pt-4 sm:border-t-0 sm:pt-0" : ""}`}
              >
                <p className="text-xl font-extrabold tracking-tight text-foreground">{item.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2.5 border-t border-border pt-5 sm:flex-row sm:flex-wrap">
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
          </div>
        </div>
      </motion.article>

      <div className="dashboard-grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
        <DashboardAIWidget />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="panel"
        >
          <div className="panel-header !pb-2">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-primary" />
              <p className="panel-title text-sm">Visitors</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
          <div className="panel-body !pt-2">
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-surface-2 px-3 py-2.5">
                <p className="text-lg font-bold tracking-tight">
                  <AnimatedCounter value={visitors.total} />
                </p>
                <p className="text-[10px] text-muted">All time</p>
              </div>
              <div className="rounded-lg bg-primary/10 px-3 py-2.5">
                <p className="text-lg font-bold tracking-tight text-primary">
                  <AnimatedCounter value={visitors.today} />
                </p>
                <p className="text-[10px] text-muted">Today</p>
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
              <p className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-4 text-xs text-muted">
                <Sparkles size={12} /> Be the next to download
              </p>
            ) : (
              <ul className="max-h-[180px] space-y-2 overflow-y-auto pr-0.5">
                {downloads.recent.map((d, i) => (
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
        </motion.div>
      </div>
    </section>
  );
}
