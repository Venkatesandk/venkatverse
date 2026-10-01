"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  FileText,
  Mic,
  Code,
  Lightbulb,
  Mail,
  Volume2,
  Send,
  Compass,
  Bot,
} from "lucide-react";
import { aiSuiteTools } from "@/data/portfolio";
import { openAISuiteTool } from "./AISuiteProvider";

const iconMap: Record<string, LucideIcon> = {
  file: FileText,
  mic: Mic,
  code: Code,
  lightbulb: Lightbulb,
  mail: Mail,
  volume: Volume2,
  send: Send,
  compass: Compass,
};

export function AISuitePanel() {
  return (
    <section id="ai-suite" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-primary" />
          <p className="panel-title">AI Suite</p>
        </div>
        <span className="panel-badge">Powered by AI</span>
      </div>
      <div className="panel-body">
        <motion.div
          className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {aiSuiteTools.map((tool) => {
            const Icon = iconMap[tool.icon] ?? Bot;
            return (
              <motion.button
                key={tool.id}
                type="button"
                onClick={() => openAISuiteTool(tool.slug)}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-2xl border border-border bg-surface p-3.5 text-left hover:border-primary/40 hover:shadow-[0_12px_30px_-18px_rgba(91,92,230,0.7)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-semibold">{tool.title}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted">{tool.description}</p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
