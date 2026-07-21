import type { Metadata } from "next";
import Link from "next/link";
import {
  developer,
  experiences,
  keyAchievements,
  projects,
  skills,
  aboutContent,
  resumeSummary,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Recruiter Dashboard",
  description:
    "60-second executive brief for Venkatesan D — Lead Application Developer. Impact metrics, top projects, skills, and interview booking.",
  robots: { index: true, follow: true },
};

const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 10);

export default function RecruiterPage() {
  const featured = projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured)).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back to portfolio
          </Link>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            Recruiter view · 60-second brief
          </span>
        </div>

        <header className="mb-8 rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {developer.heroSubheadline}
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            {developer.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-primary">{developer.headline}</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {developer.tagline} {developer.heroDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a href={developer.resumeUrl} className="btn btn-primary !w-auto">
              Download Resume
            </a>
            <a
              href={developer.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass !w-auto"
            >
              Book Interview
            </a>
            <a href={`mailto:${developer.email}`} className="btn btn-glass !w-auto">
              Email {developer.email}
            </a>
            <a
              href={developer.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass !w-auto"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-4 text-xs font-medium text-emerald-600">{developer.responseTime}</p>
        </header>

        <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Experience", value: "5+ yrs" },
            { label: "Promotions", value: "3×" },
            { label: "ERP Modules", value: "20+" },
            { label: "Exam Capacity", value: "1,000+" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-extrabold text-primary">{m.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{m.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{resumeSummary}</p>
          <ul className="mt-4 space-y-2">
            {aboutContent.impacts.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-foreground-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Top Case Studies</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {featured.map((p) => (
              <article key={p.id} className="rounded-xl border border-border bg-surface-2/40 p-4">
                <h3 className="text-sm font-bold">{p.title}</h3>
                <p className="mt-1 text-xs font-medium text-primary">{p.impact}</p>
                <ul className="mt-2 space-y-1">
                  {(p.metrics ?? []).slice(0, 3).map((m) => (
                    <li key={m} className="text-[11px] text-foreground-muted">
                      • {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Career Path</h2>
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
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Core Skills</h2>
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
            <h3 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wider text-muted">Key Achievements</h3>
            <ul className="space-y-2">
              {keyAchievements.slice(0, 5).map((a) => (
                <li key={a} className="text-xs leading-relaxed text-foreground-muted">
                  • {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5 text-center sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Ready to interview?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground-muted">
            Based in {developer.location}. Open to full-time Lead/Senior PHP roles and contract ERP engagements.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <a
              href={developer.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !w-auto"
            >
              Book 30-min Interview
            </a>
            <a href={`mailto:${developer.email}?subject=Interview%20Opportunity%20—%20${encodeURIComponent(developer.name)}`} className="btn btn-glass !w-auto">
              Send Opportunity Email
            </a>
            <Link href="/#advanced-features" className="btn btn-glass !w-auto">
              Run ATS Resume Review
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
