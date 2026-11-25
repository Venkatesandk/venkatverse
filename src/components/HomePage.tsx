"use client";

import { MotionConfig } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { MetricsRow } from "@/components/dashboard/MetricsRow";
import { DailyGreetingBanner } from "@/components/dashboard/DailyGreetingBanner";
import {
  AboutPanel,
  AchievementsPanel,
  CertificationsPanel,
} from "@/components/dashboard/AboutPanel";
import { TechnicalSpecializationPanel } from "@/components/dashboard/TechnicalSpecializationPanel";
import { AIEngineeringPanel } from "@/components/dashboard/AIEngineeringPanel";
import { SkillsPanel } from "@/components/dashboard/SkillsPanel";
import { ProjectsPanel } from "@/components/dashboard/ProjectsPanel";
import { ExperiencePanel } from "@/components/dashboard/ExperiencePanel";
import { AISuitePanel } from "@/components/dashboard/AISuitePanel";
import { GitHubPanel } from "@/components/dashboard/GitHubPanel";
import { ServicesPanel } from "@/components/dashboard/ServicesPanel";
import { TechStackPanel } from "@/components/dashboard/TechStackPanel";
import { DashboardBottom } from "@/components/dashboard/DashboardBottom";
import { AISuiteProvider } from "@/components/dashboard/AISuiteProvider";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { CommandPalette } from "@/components/sections/CommandPalette";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { ResumeDownloadModal } from "@/components/sections/ResumeDownloadModal";
import { InterviewRequestModal } from "@/components/sections/InterviewRequestModal";
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
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <DashboardShell>
        <main id="main-content" className="dashboard-grid space-y-5 md:space-y-7">
          <DailyGreetingBanner />

          {/* 1. Professional Hero */}
          <DashboardHero />

          {/* 2. Career Highlights */}
          <Reveal>
            <MetricsRow />
          </Reveal>

          {/* 3. Technical Specialization & Executive Profile */}
          <Reveal>
            <TechnicalSpecializationPanel />
          </Reveal>
          <Reveal delay={0.04}>
            <AboutPanel />
          </Reveal>
          <Reveal>
            <WhyHireMePanel />
          </Reveal>

          {/* 4. Featured Enterprise Projects (8 Priority Case Studies) */}
          <Reveal>
            <ProjectsPanel />
          </Reveal>

          {/* 5. Professional Experience */}
          <div className="dashboard-grid items-start gap-4 lg:grid-cols-2">
            <CareerGrowthCard />
            <Reveal delay={0.05}>
              <WorkProcessPanel />
            </Reveal>
          </div>
          <ExperiencePanel />

          {/* 6. Architecture and Engineering Skills */}
          <Reveal delay={0.04}>
            <SkillsPanel />
          </Reveal>

          {/* 7. AI Engineering Highlights */}
          <Reveal>
            <AIEngineeringPanel />
          </Reveal>

          {/* 8. Services & Technology Stack */}
          <div className="dashboard-grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal className="h-full">
              <ServicesPanel />
            </Reveal>
            <Reveal className="h-full" delay={0.06}>
              <TechStackPanel />
            </Reveal>
          </div>

          {/* 9. Certifications, Continuous Learning & Education */}
          <Reveal>
            <CertificationsPanel />
          </Reveal>
          <Reveal>
            <AchievementsPanel />
          </Reveal>

          {/* 10. Recruiter Call to Action */}
          <Reveal>
            <HireAvailabilityStrip />
          </Reveal>

          {/* Separate Interactive AI & Recruiter Toolkit */}
          <div className="dashboard-grid lg:grid-cols-2">
            <Reveal>
              <AISuitePanel />
            </Reveal>
            <Reveal delay={0.06}>
              <GitHubPanel />
            </Reveal>
          </div>
          <Reveal>
            <AdvancedFeaturesPanel />
          </Reveal>

          {/* 11. FAQ, Reviews, Technical Articles & Contact */}
          <Reveal>
            <FAQPanel />
          </Reveal>
          <Reveal>
            <DashboardBottom />
          </Reveal>
        </main>

        <footer className="mt-8 border-t border-border py-6 text-center text-xs text-muted md:mt-10 md:py-8">
          <p suppressHydrationWarning>
            © {CURRENT_YEAR} {developer.name} · {developer.role}. All rights reserved.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {navLinks.slice(0, 10).map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.href} href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="hover:text-primary">
                  {l.label}
                </a>
              )
            )}
          </div>
        </footer>
      </DashboardShell>

      <MobileActionBar />
      <AISuiteProvider />
      <AIAssistant />
      <CommandPalette />
      <ClientOnly>
        <ResumeDownloadModal />
        <InterviewRequestModal />
        <FeedbackPopup />
      </ClientOnly>
      <BackToTop />
    </MotionConfig>
  );
}
