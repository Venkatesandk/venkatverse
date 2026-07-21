"use client";

import { motion } from "framer-motion";
import { ExternalLink, Target, Lightbulb, UserRound, CheckCircle2 } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";
import { ProjectMockup3D } from "./ProjectMockup3D";

function CaseStudyBody({ project }: { project: Project }) {
  return (
    <div className="space-y-3">
      {project.metrics && project.metrics.length > 0 && (
        <ul className="space-y-1.5">
          {project.metrics.map((m) => (
            <li key={m} className="flex items-start gap-2 text-xs font-medium text-foreground sm:text-[13px]">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2 text-xs leading-relaxed text-foreground-muted">
        {project.problem && (
          <p className="flex gap-2">
            <Target size={13} className="mt-0.5 shrink-0 text-primary" />
            <span>
              <span className="font-semibold text-foreground">Problem: </span>
              {project.problem}
            </span>
          </p>
        )}
        {project.solution && (
          <p className="flex gap-2">
            <Lightbulb size={13} className="mt-0.5 shrink-0 text-amber-500" />
            <span>
              <span className="font-semibold text-foreground">Solution: </span>
              {project.solution}
            </span>
          </p>
        )}
        {project.role && (
          <p className="flex gap-2">
            <UserRound size={13} className="mt-0.5 shrink-0 text-emerald-500" />
            <span>
              <span className="font-semibold text-foreground">My role: </span>
              {project.role}
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !w-auto !px-3 !py-2 !text-xs"
          >
            <ExternalLink size={14} /> Live Demo
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
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-title">Case Studies</p>
          <p className="mt-0.5 text-[11px] text-muted">
            Screenshot mockup · Metrics · Problem · Solution · Role
          </p>
        </div>
        <a
          href="https://github.com/Venkatesandk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary hover:underline"
        >
          GitHub →
        </a>
      </div>
      <div className="panel-body space-y-5">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-border"
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="border-b border-border bg-surface-2/40 p-3 sm:p-4 lg:border-b-0 lg:border-r">
              <ProjectMockup3D project={featured} />
            </div>
            <div className="p-4 sm:p-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Featured case study</p>
              <h3 className="mb-2 text-lg font-bold">{featured.title}</h3>
              <p className="mb-3 text-sm text-foreground-muted">{featured.description}</p>
              <CaseStudyBody project={featured} />
            </div>
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="bg-surface-2/30 p-3">
                <ProjectMockup3D project={project} compact />
              </div>
              <div className="p-3.5">
                <h4 className="mb-1 text-sm font-bold">{project.title}</h4>
                {project.metrics && (
                  <ul className="mb-2 space-y-1">
                    {project.metrics.slice(0, 3).map((m) => (
                      <li key={m} className="flex gap-1.5 text-[11px] font-medium text-foreground-muted">
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mb-2 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
                  >
                    <GitHubIcon width={11} height={11} /> GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
