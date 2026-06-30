"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { GlassCard } from "@/components/ui/GlassCard";

export function GitHubGraph() {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    // Generate mock contribution data (replace with GitHub API in production)
    const weeks = 52;
    const days = 7;
    const data = Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.floor(Math.random() * 5))
    );
    setContributions(data);
  }, []);

  const colors = [
    "bg-white/5",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/60",
    "bg-primary",
  ];

  return (
    <GlassCard>
      <div className="mb-4 flex items-center gap-2">
        <GitHubIcon width={20} height={20} className="text-primary" />
        <h3 className="font-display font-semibold">GitHub Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]">
          {contributions.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (wi * 7 + di) * 0.002 }}
                  className={`h-3 w-3 rounded-sm ${colors[level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        Contribution activity over the past year
      </p>
    </GlassCard>
  );
}
