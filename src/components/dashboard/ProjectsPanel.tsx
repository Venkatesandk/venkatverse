"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { TitleCover } from "@/components/ui/TitleCover";
import { projects } from "@/data/portfolio";

export function ProjectsPanel() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.id !== featured.id).slice(0, 4);

  return (
    <section id="projects" className="panel">
      <div className="panel-header">
        <p className="panel-title">Featured Projects</p>
        <a href="#projects" className="text-xs font-semibold text-primary hover:underline">
          View all
        </a>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="overflow-hidden rounded-xl border border-border"
          >
            <TitleCover
              title={featured.title}
              badge="Featured Project"
            />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-foreground">{featured.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-foreground-muted">{featured.description}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {featured.technologies.slice(0, 5).map((t) => (
                  <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.liveUrl && (
                  <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !w-auto !px-3 !py-2 !text-xs">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                <button type="button" className="btn btn-glass !w-auto !px-3 !py-2 !text-xs">
                  <FileText size={14} /> Case Study
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {others.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="overflow-hidden rounded-xl border border-border"
              >
                <TitleCover title={project.title} badge="Project" compact />
                <div className="p-2.5">
                  <p className="truncate text-xs font-semibold">{project.title}</p>
                  <div className="mt-1 flex gap-1">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary">
                        <GitHubIcon width={12} height={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
