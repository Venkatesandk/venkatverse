"use client";

import type { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content main-with-mobile-bar">{children}</div>
      </div>
    </div>
  );
}
