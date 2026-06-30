"use client";

import { ArrowRight, Play, MapPin } from "lucide-react";
import { developer, techStack } from "@/data/portfolio";
import { DashboardAIWidget } from "./DashboardAIWidget";

export function DashboardHero() {
  return (
    <section id="home" className="dashboard-grid lg:grid-cols-[1fr_320px]">
      <div className="panel overflow-hidden">
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:p-6 lg:p-8">
          <div>
            <span className="badge mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for new opportunities
            </span>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-[2.5rem]">
              Hi, I&apos;m {developer.firstName}{" "}
              <span className="gradient-text">{developer.lastName}</span>
            </h1>
            <p className="mb-3 text-base font-semibold text-primary md:text-lg">
              Full Stack Developer | PHP Expert | AI Enthusiast
            </p>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-foreground-muted md:text-base">
              {developer.bio}
            </p>
            <div className="mb-5 flex flex-wrap gap-2.5">
              <a href="#projects" className="btn btn-primary !w-auto">
                Explore My Work <ArrowRight size={16} />
              </a>
              <button type="button" className="btn btn-glass !w-auto">
                <Play size={16} /> Watch Intro
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {techStack.slice(0, 7).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-foreground-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[220px] shrink-0 flex-col items-center md:max-w-[260px]">
            <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-surface-2 to-accent/10">
              <div className="flex flex-col items-center px-6 pb-8 pt-10">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-4xl font-bold text-white shadow-lg md:h-32 md:w-32">
                  VD
                </div>
              </div>
            </div>

            <div className="w-full px-4 text-center">
              <p className="text-sm font-semibold">{developer.name}</p>
              <p className="mt-0.5 text-xs text-muted">{developer.role}</p>
            </div>

            <div className="-mt-3 rounded-xl border border-border bg-surface px-5 py-2 text-center shadow-md">
              <p className="text-lg font-bold leading-tight text-primary">{developer.experience}</p>
              <p className="text-[10px] text-muted">Experience</p>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1 px-2 text-center text-xs text-muted">
              <MapPin size={12} className="shrink-0" />
              <span>{developer.location}</span>
            </p>
          </div>
        </div>
      </div>

      <DashboardAIWidget />
    </section>
  );
}
