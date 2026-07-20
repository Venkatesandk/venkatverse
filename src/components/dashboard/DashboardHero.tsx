"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Eye,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { developer, techStack } from "@/data/portfolio";
import { ResumeDownloadButton } from "@/components/sections/ResumeDownloadModal";
import { DashboardAIWidget } from "./DashboardAIWidget";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LiveExperienceBadge } from "@/components/ui/LiveExperienceBadge";
import { useLiveExperience } from "@/hooks/useLiveExperience";
import { BASE_DOWNLOAD_COUNT, BASE_VISITOR_COUNT } from "@/lib/counters";

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
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function DashboardHero() {
  const liveExp = useLiveExperience(1000);
  const [visitors, setVisitors] = useState({ total: BASE_VISITOR_COUNT, today: 0 });
  const [downloads, setDownloads] = useState({ total: BASE_DOWNLOAD_COUNT, recent: [] as DownloadItem[] });

  useEffect(() => {
    fetch("/api/analytics", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setVisitors({ total: d.total ?? BASE_VISITOR_COUNT, today: d.today ?? 0 }))
      .catch(() => {});

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

  return (
    <section id="home" className="dashboard-grid lg:grid-cols-[1fr_300px]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="panel hero-panel relative overflow-hidden"
      >
        <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_minmax(200px,240px)] md:gap-8 lg:p-8">
          <div className="min-w-0 text-center md:text-left">
            <span className="badge mb-4">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Available for new opportunities
            </span>

            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-sm">
              Portfolio · Joined Jul 2021
            </p>

            <motion.h1
              className="mb-2 text-[clamp(1.75rem,5.5vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-balance"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m{" "}
              <span className="hero-brand-name">{developer.firstName}</span>{" "}
              <span className="gradient-text">{developer.lastName}</span>
            </motion.h1>

            <p className="mb-3 text-sm font-semibold text-primary sm:text-base md:text-lg">
              Lead Application Developer · PHP Expert · AWS &amp; AI
            </p>

            <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-foreground-muted md:mx-0 md:text-[0.95rem]">
              {developer.bio}
            </p>

            <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <ResumeDownloadButton className="btn btn-primary !w-full sm:!w-auto resume-download-cta">
                <Download size={17} className="animate-bounce" style={{ animationDuration: "2.2s" }} /> Download Resume
                <ShieldCheck size={15} className="opacity-80" />
              </ResumeDownloadButton>
              <a href="#projects" className="btn btn-glass !w-full sm:!w-auto">
                Explore My Work <ArrowRight size={16} />
              </a>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3 md:mx-0 mx-auto">
              <motion.div
                className="hero-stat"
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

            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {techStack.slice(0, 7).map((tech, i) => (
                <motion.span
                  key={tech}
                  className="tech-chip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.06 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[260px] shrink-0 flex-col items-center md:mx-0 md:max-w-none">
            <div className="hero-avatar-wrap relative w-full">
              <div className="flex flex-col items-center px-5 pb-12 pt-8 sm:pt-10">
                <div className="hero-avatar-float">
                  <div className="hero-avatar relative h-36 w-36 overflow-hidden rounded-full sm:h-40 sm:w-40 md:h-44 md:w-44">
                    <Image
                      src={developer.photoUrl}
                      alt={developer.name}
                      fill
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, 176px"
                      quality={100}
                      priority
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
              <LiveExperienceBadge variant="hero" />
            </div>

            <div className="mt-8 w-full px-2 text-center">
              <p className="text-sm font-semibold">{developer.name}</p>
              <p className="mt-0.5 text-xs text-muted">{developer.role}</p>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1 px-2 text-center text-xs text-muted">
              <MapPin size={12} className="shrink-0 text-primary" />
              <span>{developer.location}</span>
            </p>
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
