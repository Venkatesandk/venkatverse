"use client";

import { useEffect, useState } from "react";
import {
  getExperienceBreakdown,
  getExperienceClock,
  type ExperienceBreakdown,
} from "@/lib/experience";

export function useLiveExperience(tickMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), tickMs);
    return () => window.clearInterval(id);
  }, [tickMs]);

  const breakdown: ExperienceBreakdown = getExperienceBreakdown(now);
  const clock = getExperienceClock(now);

  return { ...breakdown, clock, now, mounted };
}
