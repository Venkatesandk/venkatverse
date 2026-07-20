"use client";

import { useEffect, useRef } from "react";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { collectClientGeo } from "@/lib/client-geo";

function todaySessionKey() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  return `vv_visit_${today}`;
}

/** Record one visit per browser session per day (prevents refresh inflation). */
export function useRecordVisit(
  onStats?: (stats: { total: number; today: number }) => void
) {
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  useEffect(() => {
    const key = todaySessionKey();

    const apply = (stats: { total: number; today: number }) => {
      onStatsRef.current?.(stats);
      window.dispatchEvent(new CustomEvent("visit-recorded", { detail: stats }));
    };

    const record = async () => {
      const geo = await collectClientGeo();
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geo }),
      });
      return res.json();
    };

    if (sessionStorage.getItem(key)) {
      fetch("/api/analytics")
        .then((r) => r.json())
        .then((d) =>
          apply({ total: d.total ?? BASE_VISITOR_COUNT, today: d.today ?? 0 })
        )
        .catch(() => {});
      return;
    }

    record()
      .then((d) => {
        sessionStorage.setItem(key, "1");
        apply({ total: d.total ?? BASE_VISITOR_COUNT, today: d.today ?? 0 });
      })
      .catch(() => {});
  }, []);
}

export function fetchAnalyticsStats(): Promise<{ total: number; today: number }> {
  return fetch("/api/analytics")
    .then((r) => r.json())
    .then((d) => ({ total: d.total ?? BASE_VISITOR_COUNT, today: d.today ?? 0 }))
    .catch(() => ({ total: BASE_VISITOR_COUNT, today: 0 }));
}
