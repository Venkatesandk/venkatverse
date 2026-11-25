import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  developer,
  experiences,
  keyAchievements,
  projects,
  skills,
  aboutContent,
  getResumeSummary,
  professionalCerts,
  certificates,
} from "@/data/portfolio";
import { getExperienceLabel, getExperiencePlusLabel } from "@/lib/experience";
import { RecruiterActions } from "@/components/recruiter/RecruiterActions";

export const metadata: Metadata = {
  title: "Recruiter Brief & Executive Summary",
  description:
    "60-second executive brief for Venkatesan D — Lead Application Developer specializing in PHP 7/8, CodeIgniter 3/4, MySQL, Enterprise ERP, LMS, HRMS, and Private AI (Ollama / vLLM).",
  alternates: { canonical: "/recruiter" },
  openGraph: {
    title: "Recruiter Brief — Venkatesan D | Lead Application Developer",
    description:
      "3× promoted · 20+ ERP modules · 5,000+ institutional users · PHP, CodeIgniter, MySQL, Next.js, AWS, Ollama/vLLM.",
    url: `${developer.siteUrl}/recruiter`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Brief — Venkatesan D",
    description:
      "60-second executive brief: enterprise PHP/ERP architecture, LMS, HRMS, and private AI.",
  },
  robots: { index: true, follow: true },
};

const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 12);

export default function RecruiterPage() {
  const featured = projects.slice(0, 4);
  const expPlus = getExperiencePlusLabel();
  const expLabel = getExperienceLabel();
  const summary = getResumeSummary();

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back to full portfolio
          </Link>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Recruiter view · 60-second brief
          </span>
        </div>

        <header className="mb-8 rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {developer.role} · {expPlus} · PHP 7/8, CodeIgniter 3/4, MySQL
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            {developer.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-primary">{developer.headline}</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {developer.tagline} {developer.heroDescription}
          </p>

          <div className="mt-5">
            <RecruiterActions variant="header" />
          </div>

          <p className="mt-4 text-xs font-medium text-emerald-700">
            {developer.responseTime} · {developer.location} · Tenure: {expLabel} (Since July 2021)
          </p>
        </header>

        <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Verified Experience", value: expPlus },
            { label: "Promotions", value: "3×" },
            { label: "ERP Modules", value: "20+" },
            { label: "Institutional Users", value: "5,000+" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-extrabold text-primary">{m.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{m.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{summary}</p>
          <ul className="mt-4 space-y-2">
            {aboutContent.impacts.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-foreground-muted">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
              Priority Case Studies ({projects.length} Total)
            </h2>
            <Link href="/#projects" className="text-xs font-semibold text-primary hover:underline">
              View all {projects.length} →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {featured.map((p) => (
              <article key={p.id} className="flex flex-col rounded-xl border border-border bg-surface-2/40 p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                    {p.ownership}
                  </span>
                </div>
                <h3 className="text-sm font-bold">{p.title}</h3>
                <p className="mt-1 text-xs font-medium text-primary">{p.impact}</p>
                <ul className="mt-2 space-y-1">
                  {(p.metrics ?? []).slice(0, 3).map((m) => (
                    <li key={m} className="text-[11px] text-foreground-muted">
                      • {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Read full case study <ArrowRight size={12} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Career Progression</h2>
            <ul className="space-y-3">
              {experiences.map((e) => (
                <li key={e.id} className="border-l-2 border-primary/40 pl-3">
                  <p className="text-[11px] font-semibold text-primary">{e.period}</p>
                  <p className="text-sm font-bold">{e.role}</p>
                  <p className="text-xs text-muted">{e.company}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Core Skills &amp; Credentials</h2>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((s) => (
                <span
                  key={s.name}
                  className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-xs font-semibold"
                >
                  {s.name} · {s.level}%
                </span>
              ))}
            </div>
            <h3 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-muted">
              Education &amp; Assessments
            </h3>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              <li>• {certificates[0].title} — {certificates[0].issuer} ({certificates[0].date})</li>
              {professionalCerts.slice(0, 3).map((c) => (
                <li key={c.id}>
                  • {c.title} ({c.issuer}, {c.date} — {c.kind})
                </li>
              ))}
            </ul>
            <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-muted">Key Highlights</h3>
            <ul className="space-y-1.5">
              {keyAchievements.slice(0, 4).map((a) => (
                <li key={a} className="text-xs leading-relaxed text-foreground-muted">
                  • {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5 text-center sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Ready to schedule an interview?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground-muted">
            Based in {developer.location}. Open to full-time Lead/Senior PHP &amp; Full-Stack roles and enterprise ERP consulting.
          </p>
          <div className="mt-5">
            <RecruiterActions variant="cta" />
          </div>
          <div className="mt-4">
            <Link href="/#advanced-features" className="text-xs font-semibold text-primary hover:underline">
              Or run the AI ATS Resume Reviewer against your JD →
            </Link>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-muted">
          Full portfolio · <Link href="/" className="text-primary hover:underline">{developer.siteUrl}</Link>
        </p>
      </div>
    </main>
  );
}
