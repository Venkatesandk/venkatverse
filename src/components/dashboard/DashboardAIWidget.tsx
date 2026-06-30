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
    <div className="panel flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot size={16} className="text-primary" />
          </div>
          <div>
            <p className="panel-title">Venkat AI Assistant</p>
            <p className="flex items-center gap-1 text-[10px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
            <Bot size={40} className="text-primary" />
          </div>
        </div>
        <p className="mb-4 text-center text-sm text-foreground-muted">
          Hi! I&apos;m Venkat&apos;s AI assistant. Ask me anything about skills, projects, or hiring.
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => openAI(action)}
              className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-[11px] text-foreground-muted hover:border-primary hover:text-primary"
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
            className="mt-auto flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="input-field !py-2 text-sm"
            />
            <button type="submit" className="btn btn-primary !w-auto !px-3">
              <Send size={16} />
            </button>
          </form>
        </ClientOnly>
      </div>
    </div>
  );
}
