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
  Briefcase,
  Mail,
} from "lucide-react";
import { developer, techStack } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { DashboardAIWidget } from "./DashboardAIWidget";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LiveExperienceBadge } from "@/components/ui/LiveExperienceBadge";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { BASE_DOWNLOAD_COUNT, BASE_VISITOR_COUNT } from "@/lib/counters";
import { fetchAnalyticsStats, useRecordVisit } from "@/hooks/useRecordVisit";
import { Hero3DBackdrop } from "@/components/three/Hero3DBackdrop";

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

function HeroStats({
  liveExp,
  visitors,
  downloads,
  showExperience = true,
}: {
  liveExp: ReturnType<typeof useLiveExperience>;
  visitors: { total: number; today: number };
  downloads: { total: number };
  showExperience?: boolean;
}) {
  return (
    <div
      className={`grid gap-2 sm:gap-3 ${showExperience ? "grid-cols-3" : "grid-cols-2 md:grid-cols-3"}`}
    >
      <motion.div
        className={`hero-stat ${showExperience ? "" : "hidden md:block"}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="hero-stat-value" suppressHydrationWarning>
          {liveExp.mounted ? `${liveExp.years}y ${liveExp.months}m` : "…"}
        </p>
        <p className="hero-stat-label">Experience</p>
        <p className="mt-0.5 font-mono text-[9px] tabular-nums text-primary/70" suppressHydrationWarning>
          {liveExp.mounted ? `${liveExp.days}d ${liveExp.clock}` : "live"}
        </p>
      </motion.div>
      <motion.div
        className="hero-stat"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        <p className="hero-stat-value">
          <AnimatedCounter value={visitors.today} />
        </p>
        <p className="hero-stat-label">Today</p>
      </motion.div>
      <motion.div
        className="hero-stat"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
      >
        <p className="hero-stat-value">
          <AnimatedCounter value={downloads.total} />
        </p>
        <p className="hero-stat-label">CV Downloads</p>
      </motion.div>
    </div>
  );
}

export function DashboardHero() {
  const liveExp = useLiveExperience(1000);
  const [visitors, setVisitors] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const [downloads, setDownloads] = useState({ total: BASE_DOWNLOAD_COUNT, recent: [] as DownloadItem[] });

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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="panel hero-panel relative overflow-hidden"
      >
        <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden />
        <Hero3DBackdrop className="opacity-90 sm:opacity-100" />

        <div className="relative p-5 sm:p-6 lg:p-8">
          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_11rem] lg:grid-cols-[minmax(0,1fr)_12.5rem] lg:gap-8">
            {/* Photo — first on mobile, right column on desktop */}
            <div className="order-1 mx-auto w-full max-w-[220px] md:order-2 md:mx-0 md:max-w-none md:sticky md:top-4">
              <div className="hero-avatar-wrap relative">
                <div className="flex flex-col items-center px-4 pb-10 pt-6 md:px-3 md:pb-11 md:pt-7">
                  <div className="hero-avatar-float relative">
                    <div className="hero-orbit-rings hidden sm:block" aria-hidden>
                      <span className="hero-orbit-ring hero-orbit-ring-a" />
                      <span className="hero-orbit-ring hero-orbit-ring-b" />
                      <span className="hero-orbit-dot hero-orbit-dot-a" />
                      <span className="hero-orbit-dot hero-orbit-dot-b" />
                    </div>
                    <motion.div
                      className="hero-avatar relative z-10 h-32 w-32 overflow-hidden rounded-full sm:h-36 sm:w-36 md:h-[8.5rem] md:w-[8.5rem]"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src={developer.photoUrl}
                        alt={developer.name}
                        fill
                        sizes="(max-width: 768px) 144px, 136px"
                        quality={100}
                        priority
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </div>
                </div>
                {/* Exp badge on photo — mobile only (desktop uses stats row) */}
                <div className="md:hidden">
                  <LiveExperienceBadge variant="hero" />
                </div>
              </div>
            </div>

            {/* Main content — natural top-to-bottom flow */}
            <div className="order-2 space-y-5 md:order-1 md:text-left">
              <div className="text-center md:text-left">
                <span className="badge mb-3 inline-flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Available for new opportunities
                </span>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Portfolio · Joined Jul 2021
                </p>

                <motion.h1
                  className="mb-1.5 text-[clamp(1.65rem,5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-balance"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="hero-brand-name">{developer.firstName}</span>{" "}
                  <span className="gradient-text">{developer.lastName}</span>
                </motion.h1>

                <p className="text-base font-bold text-foreground sm:text-lg">
                  {developer.role}
                </p>
              </div>

              <blockquote
                className="hero-bio-card text-left text-sm leading-relaxed text-foreground-muted md:text-[15px]"
                suppressHydrationWarning
              >
                {developer.bio}
              </blockquote>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted md:justify-start sm:text-sm">
                <MapPin size={14} className="shrink-0 text-primary" />
                <span>{developer.location}</span>
              </p>

              <HeroStats
                liveExp={liveExp}
                visitors={visitors}
                downloads={downloads}
                showExperience={false}
              />

              <ul className="grid gap-1.5 text-left text-sm sm:grid-cols-2">
                {developer.specialties.map((line, i) => (
                  <motion.li
                    key={line}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-2.5 py-1.5 font-medium text-foreground-muted"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className={i === 0 ? "font-semibold text-primary" : ""}>{line}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
                <ResumeDownloadButton className="btn btn-primary !w-full sm:!w-auto resume-download-cta">
                  <Download size={17} style={{ animationDuration: "2.2s" }} /> Download Resume
                  <ShieldCheck size={15} className="opacity-80" />
                </ResumeDownloadButton>
                <a href="#why-hire" className="btn btn-glass !w-full sm:!w-auto">
                  <Briefcase size={16} /> Hire Me
                </a>
                <a href="#contact" className="btn btn-glass !w-full sm:!w-auto">
                  <Mail size={16} /> Contact Me
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 border-t border-border/60 pt-4 md:justify-start">
                {techStack.slice(0, 7).map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="tech-chip"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
        <DashboardAIWidget />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
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
                  <motion.li
                    key={`${d.downloadNumber}-${d.downloadedAt}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
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
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
