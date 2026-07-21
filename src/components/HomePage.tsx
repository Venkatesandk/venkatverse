"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { MetricsRow } from "@/components/dashboard/MetricsRow";
import { DailyGreetingBanner } from "@/components/dashboard/DailyGreetingBanner";
import { AboutPanel, AchievementsPanel, CertificationsPanel } from "@/components/dashboard/AboutPanel";
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
import { HireAvailabilityStrip } from "@/components/dashboard/HireAvailabilityStrip";
import { FAQPanel } from "@/components/dashboard/FAQPanel";
import { WorkProcessPanel } from "@/components/dashboard/WorkProcessPanel";
import { WhyHireMePanel } from "@/components/dashboard/WhyHireMePanel";
import { AdvancedFeaturesPanel } from "@/components/dashboard/AdvancedFeaturesPanel";
import { Reveal } from "@/components/animations/Motion";
import { developer, navLinks } from "@/data/portfolio";

const CURRENT_YEAR = 2026;

export function HomePage() {
  return (
    <>
      <DashboardShell>
        <div className="dashboard-grid space-y-4">
          <DailyGreetingBanner />
          <DashboardHero />
          <Reveal>
            <HireAvailabilityStrip />
          </Reveal>
          <Reveal>
            <MetricsRow />
          </Reveal>
          <Reveal delay={0.05}>
            <AboutPanel />
          </Reveal>
          <Reveal delay={0.05}>
            <SkillsPanel />
          </Reveal>
          <Reveal>
            <WhyHireMePanel />
          </Reveal>
          <Reveal>
            <ProjectsPanel />
          </Reveal>
          <div className="dashboard-grid items-start gap-4 lg:grid-cols-2">
            <CareerGrowthCard />
            <Reveal delay={0.06}>
              <WorkProcessPanel />
            </Reveal>
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
          <Reveal>
            <AdvancedFeaturesPanel />
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
            <CertificationsPanel />
          </Reveal>
          <Reveal>
            <AchievementsPanel />
          </Reveal>
          <Reveal>
            <FAQPanel />
          </Reveal>
          <Reveal>
            <DashboardBottom />
          </Reveal>
        </div>

        <footer className="mt-4 border-t border-border py-4 pb-2 text-center text-xs text-muted md:mt-6 md:py-5">
          <p suppressHydrationWarning>
            © {CURRENT_YEAR} {developer.name}. All rights reserved.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {navLinks.slice(0, 8).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary">
                {l.label}
              </a>
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
