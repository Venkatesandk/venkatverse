"use client";

import { useEffect, useState } from "react";
import { Bot, Send } from "lucide-react";
import { ClientOnly } from "@/components/ui/ClientOnly";

const quickActions = [
  "About my experience",
  "Explain my skills",
  "Show my projects",
  "How to hire me",
];

type HealthState = "checking" | "live" | "fallback" | "offline";

export function DashboardAIWidget() {
  const [input, setInput] = useState("");
  const [health, setHealth] = useState<HealthState>("checking");

  useEffect(() => {
    let active = true;
    fetch("/api/ai/health", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        if (!active) return;
        if (d?.status === "live" && d?.configured) setHealth("live");
        else if (d?.ok) setHealth("fallback");
        else setHealth("offline");
      })
      .catch(() => {
        if (active) setHealth("offline");
      });
    return () => {
      active = false;
    };
  }, []);

  const openAI = (text?: string) => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: text }));
  };

  const badgeText =
    health === "live"
      ? "Live AI"
      : health === "fallback"
        ? "Fallback Ready"
        : health === "checking"
          ? "Checking AI…"
          : "Offline";

  const dotClass =
    health === "live"
      ? "bg-emerald-500"
      : health === "fallback"
        ? "bg-amber-500"
        : health === "checking"
          ? "bg-primary animate-pulse"
          : "bg-slate-400";

  return (
    <div className="panel flex shrink-0 flex-col">
      <div className="panel-header !py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot size={15} className="text-primary" />
          </div>
          <div>
            <p className="panel-title text-sm">Venkat AI Assistant</p>
            <p className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
              {badgeText}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3.5">
        <p className="mb-2.5 text-xs leading-relaxed text-foreground-muted">
          Ask about skills, ERP architecture, projects, or hiring.
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => openAI(action)}
              className="min-h-9 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-[11px] font-medium text-foreground-muted transition hover:border-primary hover:text-primary"
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
            <label htmlFor="hero-ai-input" className="sr-only">
              Ask Venkat AI Assistant
            </label>
            <input
              id="hero-ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="input-field min-h-11 !py-2 text-sm"
            />
            <button
              type="submit"
              className="btn btn-primary !min-h-11 !w-11 !shrink-0 !px-0"
              aria-label="Send to AI Assistant"
            >
              <Send size={16} />
            </button>
          </form>
        </ClientOnly>
      </div>
    </div>
  );
}
