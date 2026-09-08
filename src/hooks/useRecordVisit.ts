"use client";

import { useEffect, useRef } from "react";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { collectClientGeo } from "@/lib/client-geo";

function todaySessionKey() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  return `vv_visit_${today}`;
}

function applyStats(
  onStats: ((stats: { total: number; today: number }) => void) | undefined,
  stats: { total: number; today: number }
) {
  onStats?.(stats);
  window.dispatchEvent(new CustomEvent("visit-recorded", { detail: stats }));
}

/** Record one visit per browser session per day, then keep stats fresh. */
export function useRecordVisit(
  onStats?: (stats: { total: number; today: number }) => void
) {
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  useEffect(() => {
    let cancelled = false;
    const key = todaySessionKey();

    const push = (d: { total?: number; today?: number }) => {
      if (cancelled) return;
      applyStats(onStatsRef.current, {
        total: typeof d.total === "number" ? d.total : BASE_VISITOR_COUNT,
        today: typeof d.today === "number" ? d.today : 0,
      });
    };

    const load = () =>
      fetch("/api/analytics", { cache: "no-store" })
        .then((r) => r.json())
        .then(push)
        .catch(() => {});

    const record = async () => {
      const geo = await collectClientGeo();
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geo }),
        cache: "no-store",
      });
      return res.json();
    };

    if (sessionStorage.getItem(key)) {
      void load();
    } else {
      record()
        .then((d) => {
          sessionStorage.setItem(key, "1");
          push(d);
        })
        .catch(() => {
          void load();
        });
    }

    // Keep Visitors panel live without requiring a full page refresh
    const poll = window.setInterval(load, 12_000);
    const onFocus = () => void load();
    const onVisibility = () => {
      if (document.visibilityState === "visible") void load();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}

export function fetchAnalyticsStats(): Promise<{ total: number; today: number }> {
  return fetch("/api/analytics", { cache: "no-store" })
    .then((r) => r.json())
    .then((d) => ({
      total: typeof d.total === "number" ? d.total : BASE_VISITOR_COUNT,
      today: typeof d.today === "number" ? d.today : 0,
    }))
    .catch(() => ({ total: BASE_VISITOR_COUNT, today: 0 }));
}
