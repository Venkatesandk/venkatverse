"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, MessageCircle } from "lucide-react";
import { availability, developer } from "@/data/portfolio";

export function HireAvailabilityStrip() {
  return (
    <section id="hire" className="panel overflow-hidden">
      <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/5"
        />
        <div className="relative z-[1]">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {availability.status}
          </span>
          <h3 className="text-lg font-bold sm:text-xl">Ready to hire a Lead Application Developer?</h3>
          <p className="mt-1.5 text-sm text-foreground-muted">{availability.notice}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {availability.roles.map((role) => (
              <li
                key={role}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium"
              >
                <CheckCircle2 size={12} className="text-primary" />
                {role}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-[1] flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          <motion.a
            href="#contact"
            className="btn btn-primary flex-1 justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={16} /> Hire Me
          </motion.a>
          <motion.a
            href={developer.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass flex-1 justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={16} /> Schedule Interview
          </motion.a>
        </div>
      </div>
    </section>
  );
}
