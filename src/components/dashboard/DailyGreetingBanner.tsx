"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Sunset, Moon, CloudSun } from "lucide-react";
import { getSiteGreetingBundle, type TimeOfDay } from "@/lib/greetings";
import { developer } from "@/data/portfolio";

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
      <div className="flex flex-col gap-1.5 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-4">
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
          <TimeIcon tod={bundle.timeOfDay} />
          {bundle.timeGreeting}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {developer.firstName} says:{" "}
            <span className="font-medium text-foreground-muted">{bundle.dailyShort}</span>
          </p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted sm:line-clamp-1">
            {bundle.extraLine} · {bundle.weekday}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
