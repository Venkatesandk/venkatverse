"use client";

import { useRef, useState, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="dashboard-shell">
      <div className="ambient-layer hidden md:block" aria-hidden>
        <span className="ambient-orb ambient-orb-a" />
        <span className="ambient-orb ambient-orb-b" />
        <span className="ambient-orb ambient-orb-c" />
      </div>
      <DashboardSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        returnFocusRef={menuTriggerRef}
      />
      <div className="dashboard-main">
        <DashboardHeader
          menuOpen={sidebarOpen}
          menuTriggerRef={menuTriggerRef}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="dashboard-content main-with-mobile-bar">{children}</div>
      </div>
    </div>
  );
}
