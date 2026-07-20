"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";
import { TitleCover } from "@/components/ui/TitleCover";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="card max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 sm:max-w-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <p className="mb-6 text-foreground-muted">{project.description}</p>
        {[
          { label: "Architecture", value: project.architecture },
          { label: "Problem", value: project.problem },
          { label: "Solution", value: project.solution },
        ].map((b) => (
          <div key={b.label} className="mb-4">
            <h4 className="mb-1 text-sm font-semibold text-primary">{b.label}</h4>
            <p className="text-sm text-foreground-muted">{b.value}</p>
          </div>
        ))}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="badge !normal-case !tracking-normal">{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !text-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-glass !text-sm">
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section relative">
      <div className="container-main">
        <div className="gsap-reveal mb-10 text-center md:mb-14">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="section-desc mx-auto">
            Real-world applications built for performance, scalability, and business impact.
          </p>
        </div>

        <div className="gsap-stagger grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card gsap-stagger-item group cursor-pointer overflow-hidden"
              onClick={() => setSelected(project)}
            >
              <div className="relative h-36 overflow-hidden">
                <TitleCover
                  title={project.title}
                  badge={project.featured ? "Featured" : "Project"}
                  className="!aspect-auto h-full"
                />
              </div>
              <div className="p-5">
                {project.featured && (
                  <span className="badge mb-2 !text-[10px]">Featured</span>
                )}
                <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">{project.title}</h3>
                <p className="mb-3 line-clamp-2 text-sm text-foreground-muted">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-foreground-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
