"use client";

import { useEffect, useState } from "react";
import {
  getExperienceBreakdown,
  getExperienceClock,
  type ExperienceBreakdown,
} from "@/lib/experience";
import { useMounted } from "@/hooks/useMounted";

export function useLiveExperience(tickMs = 1000) {
  const mounted = useMounted();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), tickMs);
    return () => window.clearInterval(id);
  }, [tickMs]);

  const breakdown: ExperienceBreakdown = getExperienceBreakdown(now);
  const clock = getExperienceClock(now);

  return { ...breakdown, clock, now, mounted };
}
