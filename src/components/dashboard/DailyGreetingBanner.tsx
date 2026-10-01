"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Sunset, Moon, CloudSun } from "lucide-react";
import { getSiteGreetingBundle, type TimeOfDay } from "@/lib/greetings";

function TimeIcon({ tod }: { tod: TimeOfDay }) {
  if (tod === "morning") return <Sun size={14} className="text-amber-500" />;
  if (tod === "afternoon") return <CloudSun size={14} className="text-sky-500" />;
  if (tod === "evening") return <Sunset size={14} className="text-orange-500" />;
  return <Moon size={14} className="text-indigo-400" />;
}

/** Persistent daily greeting strip shown on the site (updates by day & time). */
export function DailyGreetingBanner() {
  const [bundle, setBundle] = useState<ReturnType<typeof getSiteGreetingBundle> | null>(null);

  useEffect(() => {
    const refresh = () => setBundle(getSiteGreetingBundle());
    refresh();
    const id = window.setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!bundle) {
    return (
      <div className="panel flex items-center gap-2 px-3 py-2.5 sm:px-4">
        <div className="h-4 w-40 animate-pulse rounded bg-surface-2" />
      </div>
    );
  }

  return (
    <motion.div
      className="panel overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 sm:px-5">
        <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          <TimeIcon tod={bundle.timeOfDay} />
          {bundle.timeGreeting}
        </p>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-foreground-muted">
            <span className="font-medium text-foreground">{bundle.dailyShort}</span>
            <span className="hidden text-muted sm:inline"> · {bundle.weekday}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
