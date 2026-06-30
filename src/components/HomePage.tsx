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
import { BackToTop } from "@/components/sections/BackToTop";
import { developer, navLinks } from "@/data/portfolio";

export function HomePage() {
  return (
    <>
      <DashboardShell>
        <div className="dashboard-grid space-y-4">
          <DashboardHero />
          <MetricsRow />
          <AboutPanel />
          <SkillsPanel />
          <div className="dashboard-grid lg:grid-cols-2">
            <ProjectsPanel />
            <ExperiencePanel />
          </div>
          <div className="dashboard-grid lg:grid-cols-2">
            <AISuitePanel />
            <GitHubPanel />
          </div>
          <RoadmapPanel />
          <div className="dashboard-grid lg:grid-cols-2">
            <ServicesPanel />
            <TechStackPanel />
          </div>
          <AchievementsPanel />
          <DashboardBottom />
        </div>

        <footer className="mt-8 border-t border-border py-6 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} {developer.name}. All rights reserved.</p>
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
      <BackToTop />
    </>
  );
}
