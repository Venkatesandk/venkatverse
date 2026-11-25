"use client";

import { useEffect, useState } from "react";
import {
  getExperienceBreakdown,
  getExperienceClock,
  INITIAL_EXPERIENCE_SNAPSHOT,
  type ExperienceBreakdown,
} from "@/lib/experience";
import { useMounted } from "@/hooks/useMounted";

export function useLiveExperience(tickMs = 1000) {
  const mounted = useMounted();
  // Initialized deterministically so SSR and first client render always match
  const [now, setNow] = useState<Date>(INITIAL_EXPERIENCE_SNAPSHOT);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setNow(new Date()));
    const id = window.setInterval(() => setNow(new Date()), tickMs);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, [tickMs]);

  const breakdown: ExperienceBreakdown = getExperienceBreakdown(now);
  const clock = getExperienceClock(now);

  return { ...breakdown, clock, now, mounted };
}
