"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BASE_VISITOR_COUNT } from "@/lib/counters";
import { useRecordVisit } from "@/hooks/useRecordVisit";

export function VisitorAnalytics() {
  const [count, setCount] = useState(BASE_VISITOR_COUNT);

  useRecordVisit((stats) => setCount(stats.total));

  useEffect(() => {
    const onVisit = (e: Event) => {
      const detail = (e as CustomEvent<{ total: number }>).detail;
      if (detail?.total) setCount(detail.total);
    };
    window.addEventListener("visit-recorded", onVisit);
    return () => window.removeEventListener("visit-recorded", onVisit);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Eye className="text-primary" size={20} />
        </div>
        <div>
          <p className="font-display text-3xl font-bold text-primary">{count.toLocaleString()}</p>
          <p className="text-sm text-muted">Total Visitors</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
