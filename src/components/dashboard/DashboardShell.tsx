"use client";

import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="dashboard-main">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="dashboard-content main-with-mobile-bar">{children}</div>
      </div>
    </div>
  );
}
