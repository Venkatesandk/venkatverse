import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Gauge,
  Layers,
  Lock,
  Plug,
  ShieldAlert,
  ShieldCheck,
  Target,
  UserCheck,
} from "lucide-react";
import { developer, projects } from "@/data/portfolio";
import { ProjectMockup3D } from "@/components/dashboard/ProjectMockup3D";
import { GitHubIcon } from "@/components/ui/SocialIcons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study Not Found" };

  const canonical = `/projects/${project.slug}`;
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} — Case Study | ${developer.name}`,
      description: project.description,
      url: `${developer.siteUrl}${canonical}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prevProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — Enterprise Case Study`,
    description: project.description,
    url: `${developer.siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: developer.name,
      jobTitle: developer.role,
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              {project.category}
            </span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              {project.ownership}
            </span>
          </div>
        </div>

        {/* Hero / Overview */}
        <header className="mb-6 rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {project.overview}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-2 rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-xs font-semibold text-foreground"
                >
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/recruiter" className="btn btn-primary !w-auto">
              Recruiter Executive Brief
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass !w-auto"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass !w-auto"
              >
                <GitHubIcon width={15} height={15} /> GitHub Profile
              </a>
            )}
          </div>
        </header>

        {/* Visual Preview */}
        <section className="mb-6 rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
            Anonymized Product &amp; Architecture Preview
          </h2>
          <ProjectMockup3D project={project} />
          {project.confidentialityNote && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={14} className="shrink-0 text-primary" />
              {project.confidentialityNote}
            </p>
          )}
        </section>

        {/* Problem & Existing Limitations */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Target size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Business Problem</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground-muted">{project.problem}</p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-amber-600">
              <ShieldAlert size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Existing Limitations</h2>
            </div>
            <ul className="space-y-2">
              {project.existingLimitations.map((lim) => (
                <li key={lim} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Solution Architecture & Ownership */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Layers size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Solution Architecture</h2>
            </div>
            <p className="text-sm font-semibold text-foreground">{project.architecture}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{project.solution}</p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <UserCheck size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Ownership &amp; Responsibilities
              </h2>
            </div>
            <p className="text-xs font-bold text-primary">
              {project.ownership} — {project.role}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
              {project.ownershipDetails}
            </p>
            <ul className="mt-3 space-y-1.5">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex gap-2 text-xs leading-relaxed text-foreground-muted sm:text-sm">
                  <CheckCircle2 size={14} className="mt-1 shrink-0 text-emerald-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Database, APIs, Security, Performance */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Database size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Database Architecture</h2>
            </div>
            <ul className="space-y-2">
              {project.databaseArchitecture.map((db) => (
                <li key={db} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{db}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Plug size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">API Integrations</h2>
            </div>
            <ul className="space-y-2">
              {project.apiIntegrations.map((api) => (
                <li key={api} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{api}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Lock size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Security Considerations</h2>
            </div>
            <ul className="space-y-2">
              {project.securityConsiderations.map((sec) => (
                <li key={sec} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <CheckCircle2 size={14} className="mt-1 shrink-0 text-primary" />
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <Gauge size={17} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Performance &amp; Impact</h2>
            </div>
            <ul className="space-y-2">
              {project.performanceImprovements.map((perf) => (
                <li key={perf} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <Cpu size={14} className="mt-1 shrink-0 text-emerald-600" />
                  <span>{perf}</span>
                </li>
              ))}
            </ul>
            {project.impact && (
              <p className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-3 text-xs font-semibold text-emerald-800">
                Actual Business Impact: {project.impact}
              </p>
            )}
          </section>
        </div>

        {/* Navigation between case studies */}
        <nav
          aria-label="Case study navigation"
          className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40"
          >
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
              <ArrowLeft size={12} /> Previous Case Study
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">{prevProject.title}</p>
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="rounded-xl border border-border bg-surface p-4 text-right transition hover:border-primary/40"
          >
            <p className="flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Next Case Study <ArrowRight size={12} />
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">{nextProject.title}</p>
          </Link>
        </nav>
      </div>
    </main>
  );
}

