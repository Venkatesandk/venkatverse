"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { MetricsRow } from "@/components/dashboard/MetricsRow";
import { AboutPanel, AchievementsPanel } from "@/components/dashboard/AboutPanel";
import { SkillsPanel } from "@/components/dashboard/SkillsPanel";
import { ProjectsPanel } from "@/components/dashboard/ProjectsPanel";
import { ExperiencePanel } from "@/components/dashboard/ExperiencePanel";
import { AISuitePanel } from "@/components/dashboard/AISuitePanel";
import { GitHubPanel } from "@/components/dashboard/GitHubPanel";
import { RoadmapPanel } from "@/components/dashboard/RoadmapPanel";
import { ServicesPanel } from "@/components/dashboard/ServicesPanel";
import { TechStackPanel } from "@/components/dashboard/TechStackPanel";
import { DashboardBottom } from "@/components/dashboard/DashboardBottom";
import { AISuiteProvider } from "@/components/dashboard/AISuiteProvider";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { CommandPalette } from "@/components/sections/CommandPalette";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { ResumeDownloadModal } from "@/components/sections/ResumeDownloadModal";
import { FeedbackPopup } from "@/components/sections/FeedbackPopup";
import { BackToTop } from "@/components/sections/BackToTop";
import { CareerGrowthCard } from "@/components/dashboard/CareerGrowthCard";
import { Reveal } from "@/components/animations/Motion";
import { developer, navLinks } from "@/data/portfolio";

const CURRENT_YEAR = 2026;

export function HomePage() {
  return (
    <>
      <DashboardShell>
        <div className="dashboard-grid space-y-4">
          <DashboardHero />
          <Reveal>
            <MetricsRow />
          </Reveal>
          <Reveal delay={0.05}>
            <AboutPanel />
          </Reveal>
          <Reveal delay={0.05}>
            <SkillsPanel />
          </Reveal>
          <div className="dashboard-grid lg:grid-cols-2">
            <ProjectsPanel />
            <CareerGrowthCard />
          </div>
          <ExperiencePanel />
          <div className="dashboard-grid lg:grid-cols-2">
            <Reveal>
              <AISuitePanel />
            </Reveal>
            <Reveal delay={0.08}>
              <GitHubPanel />
            </Reveal>
          </div>
          <Reveal>
            <RoadmapPanel />
          </Reveal>
          <div className="dashboard-grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal>
              <ServicesPanel />
            </Reveal>
            <Reveal delay={0.08}>
              <TechStackPanel />
            </Reveal>
          </div>
          <Reveal>
            <AchievementsPanel />
          </Reveal>
          <Reveal>
            <DashboardBottom />
          </Reveal>
        </div>

        <footer className="mt-8 border-t border-border py-6 text-center text-xs text-muted">
          <p suppressHydrationWarning>© {CURRENT_YEAR} {developer.name}. All rights reserved.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {navLinks.slice(0, 6).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary">{l.label}</a>
            ))}
          </div>
        </footer>
      </DashboardShell>

      <MobileActionBar />
      <AISuiteProvider />
      <AIAssistant />
      <CommandPalette />
      <ClientOnly>
        <ResumeDownloadModal />
        <FeedbackPopup />
      </ClientOnly>
      <BackToTop />
    </>
  );
}
