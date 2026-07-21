"use client";

import { motion } from "framer-motion";
import { ExternalLink, Target, Lightbulb, UserRound, TrendingUp } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { TitleCover } from "@/components/ui/TitleCover";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="space-y-2.5 text-xs leading-relaxed text-foreground-muted">
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
      {project.impact && (
        <p className="flex gap-2">
          <TrendingUp size={13} className="mt-0.5 shrink-0 text-cyan-500" />
          <span>
            <span className="font-semibold text-foreground">Impact: </span>
            {project.impact}
          </span>
        </p>
      )}
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
          <p className="panel-title">Featured Projects</p>
          <p className="mt-0.5 text-[11px] text-muted">Problem · Solution · Role · Impact</p>
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
      <div className="panel-body space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
          className="overflow-hidden rounded-xl border border-border"
        >
          <TitleCover
            title={featured.title}
            subtitle={featured.impact ?? featured.description}
            badge="Featured Project"
          />
          <div className="p-4">
            <h3 className="mb-1.5 text-lg font-bold text-foreground">{featured.title}</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground-muted">{featured.description}</p>
            <ProjectDetail project={featured} />
            <div className="mb-4 mt-3 flex flex-wrap gap-1.5">
              {featured.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !w-auto !px-3 !py-2 !text-xs"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {featured.githubUrl && (
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass !w-auto !px-3 !py-2 !text-xs"
                >
                  <GitHubIcon width={14} height={14} /> GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex flex-col overflow-hidden rounded-xl border border-border"
            >
              <TitleCover title={project.title} badge="Project" compact />
              <div className="flex flex-1 flex-col p-3">
                <h4 className="mb-1 text-sm font-bold">{project.title}</h4>
                <p className="mb-2 line-clamp-2 text-[11px] text-foreground-muted">{project.description}</p>
                {project.impact && (
                  <p className="mb-2 text-[10px] font-medium text-emerald-600">
                    Impact: {project.impact}
                  </p>
                )}
                <div className="mb-2 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold text-primary hover:underline"
                    >
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted hover:text-primary"
                    >
                      <GitHubIcon width={11} height={11} /> Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
