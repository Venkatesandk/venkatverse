"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/portfolio";
import type { Project, ProjectCategory } from "@/types";
import { ProjectMockup3D } from "./ProjectMockup3D";

const CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Enterprise ERP",
  "AI & EdTech",
  "HR & Operations",
  "Web Platforms",
];

function CaseStudyBody({ project }: { project: Project }) {
  return (
    <div className="space-y-3">
      {project.metrics && project.metrics.length > 0 && (
        <ul className="space-y-1.5">
          {project.metrics.slice(0, 4).map((m) => (
            <li key={m} className="flex items-start gap-2 text-xs font-medium text-foreground sm:text-[13px]">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2 text-xs leading-relaxed text-foreground-muted">
        <p className="flex gap-2">
          <Target size={13} className="mt-0.5 shrink-0 text-primary" />
          <span>
            <span className="font-semibold text-foreground">Problem: </span>
            {project.problem}
          </span>
        </p>
        <p className="flex gap-2">
          <Lightbulb size={13} className="mt-0.5 shrink-0 text-amber-500" />
          <span>
            <span className="font-semibold text-foreground">Architecture: </span>
            {project.architecture}
          </span>
        </p>
        <p className="flex gap-2">
          <UserRound size={13} className="mt-0.5 shrink-0 text-emerald-500" />
          <span>
            <span className="font-semibold text-foreground">{project.ownership}: </span>
            {project.ownershipDetails}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <Link
          href={`/projects/${project.slug}`}
          className="btn btn-primary !w-auto !px-3.5 !py-2 !text-xs"
        >
          Read Full Case Study <ArrowRight size={14} />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass !w-auto !px-3 !py-2 !text-xs"
          >
            <ExternalLink size={14} /> Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass !w-auto !px-3 !py-2 !text-xs"
          >
            <GitHubIcon width={14} height={14} /> GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsPanel() {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");

  const filtered =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  const featured = filtered[0] ?? projects[0];
  const others = filtered.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Enterprise Case Studies</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            {projects.length} production systems · Problem, architecture, database, APIs, security &amp; ownership
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter case studies">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${category === cat
                  ? "bg-primary text-white"
                  : "border border-border bg-surface-2/60 text-foreground-muted hover:border-primary/40"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-body space-y-5">
        <motion.article
          key={featured.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-border"
        >
          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-border bg-surface-2/40 p-3 sm:p-4 lg:border-b-0 lg:border-r">
              <ProjectMockup3D project={featured} />
            </div>
            <div className="p-4 sm:p-5">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {featured.category}
                </span>
                <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {featured.ownership}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold">{featured.title}</h3>
              <p className="mb-3 text-sm text-foreground-muted">{featured.description}</p>
              <CaseStudyBody project={featured} />
            </div>
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="bg-surface-2/30 p-3">
                <ProjectMockup3D project={project} compact />
              </div>
              <div className="flex flex-1 flex-col p-3.5">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[9px] font-semibold text-muted">
                    {project.ownership}
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-bold">{project.title}</h3>
                {project.impact && (
                  <p className="mb-2 text-[11px] font-medium leading-snug text-primary">
                    {project.impact}
                  </p>
                )}
                {project.metrics && (
                  <ul className="mb-3 space-y-1">
                    {project.metrics.slice(0, 2).map((m) => (
                      <li key={m} className="flex gap-1.5 text-[11px] text-foreground-muted">
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mb-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2.5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Case Study <ArrowRight size={12} />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted hover:text-primary"
                    >
                      <GitHubIcon width={11} height={11} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-[11px] text-muted">
          <ShieldCheck size={13} className="shrink-0 text-primary" />
          All case studies present anonymized architecture, database, and security details without exposing confidential client institutions or student records.
        </p>
      </div>
    </section>
  );
}
