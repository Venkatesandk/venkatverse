"use client";

import type { LucideIcon } from "lucide-react";
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {aiSuiteTools.map((tool) => {
            const Icon = iconMap[tool.icon] ?? Bot;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => openAISuiteTool(tool.slug)}
                className="group rounded-xl border border-border bg-surface-2 p-3 text-left transition hover:border-primary hover:shadow-md"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-semibold">{tool.title}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted">{tool.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
