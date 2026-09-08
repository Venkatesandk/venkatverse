"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { ClientOnly } from "@/components/ui/ClientOnly";

const quickActions = [
  "About my experience",
  "Explain my skills",
  "Show my projects",
  "How to hire me",
];

export function DashboardAIWidget() {
  const [input, setInput] = useState("");

  const openAI = (text?: string) => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: text }));
  };

  return (
    <div className="panel flex shrink-0 flex-col">
      <div className="panel-header !py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Bot size={14} className="text-primary" />
          </div>
          <div>
            <p className="panel-title text-sm">Venkat AI Assistant</p>
            <p className="flex items-center gap-1 text-[10px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3">
        <p className="mb-2.5 text-center text-xs leading-relaxed text-foreground-muted">
          Ask about skills, projects, or hiring.
        </p>
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => openAI(action)}
              className="rounded-lg border border-border bg-surface-2 px-2 py-1 text-[10px] text-foreground-muted hover:border-primary hover:text-primary"
            >
              {action}
            </button>
          ))}
        </div>
        <ClientOnly>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openAI(input);
              setInput("");
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="input-field !py-1.5 text-sm"
            />
            <button type="submit" className="btn btn-primary !w-auto !px-2.5">
              <Send size={15} />
            </button>
          </form>
        </ClientOnly>
      </div>
    </div>
  );
}
