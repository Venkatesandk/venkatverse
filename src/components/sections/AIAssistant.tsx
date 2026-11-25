"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { X, Send, Bot, AlertCircle } from "lucide-react";
import type { ChatMessage } from "@/types";
import { ClientOnly } from "@/components/ui/ClientOnly";

const quickActions = ["About Venkat", "PHP projects", "WhatsApp", "Hire me"];

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function ChatBubbleContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <span className="whitespace-pre-wrap break-words">{content}</span>;
  }

  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 text-[13px] leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1.5" />;

        const numbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numbered) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                {numbered[1]}
              </span>
              <p className="min-w-0 flex-1 break-words text-foreground">{renderInline(numbered[2])}</p>
            </div>
          );
        }

        if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 pl-0.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="min-w-0 flex-1 break-words text-foreground">{renderInline(trimmed.slice(2))}</p>
            </div>
          );
        }

        if (/^\s{2,}/.test(line)) {
          return (
            <p key={i} className="pl-7 text-xs break-words text-muted">
              {renderInline(trimmed)}
            </p>
          );
        }

        return (
          <p key={i} className="break-words text-foreground-muted">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

type AIHealth = "checking" | "live" | "fallback" | "offline";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [health, setHealth] = useState<AIHealth>("checking");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! Ask about Venkat's skills, enterprise ERP projects, or how to hire him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setErrorMsg("");
      setOpen(true);
      const text = (e as CustomEvent<string>).detail;
      if (text) setInput(text);
    };
    window.addEventListener("open-ai-assistant", handler);
    return () => window.removeEventListener("open-ai-assistant", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    fetch("/api/ai/health", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        if (d?.status === "live" && d?.configured) setHealth("live");
        else if (d?.ok) setHealth("fallback");
        else setHealth("offline");
      })
      .catch(() => setHealth("offline"));

    const focusTimer = window.setTimeout(() => textareaRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea smoothly up to 112px
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    setErrorMsg("");
    const history = messages.slice(-8);
    setMessages((p) => [...p, { role: "user", content: clean }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.reply) {
        throw new Error(data?.error || "Unable to get a response right now.");
      }
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Connection error. Please try again or reach out via WhatsApp/Email.";
      setErrorMsg(msg);
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: "Sorry, the AI service could not respond just now. You can contact Venkatesan directly via Email or WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientOnly>
      <>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="fixed bottom-6 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105 md:flex"
          aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Bot size={20} />}
        </button>

        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Venkat AI Assistant"
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-2 sm:items-center sm:p-4 md:items-end md:justify-end md:pb-20 md:pr-5"
            onClick={() => setOpen(false)}
          >
            <div
              className="card mb-[calc(var(--mobile-bar)+0.25rem)] flex h-[min(80dvh,33rem)] w-full max-w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-2xl shadow-2xl sm:mb-0 sm:max-w-lg md:max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Bot size={18} className="shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-semibold">AI Assistant</span>
                    <span className="text-[10px] text-muted">
                      {health === "live"
                        ? "Live AI backend"
                        : health === "fallback"
                          ? "Grounded fallback active"
                          : health === "checking"
                            ? "Checking connection…"
                            : "Offline"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-surface-2"
                  aria-label="Close AI Assistant"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain p-3.5 sm:p-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 ${
                        m.role === "user"
                          ? "bg-primary text-white"
                          : "border border-border bg-surface text-foreground"
                      }`}
                    >
                      <ChatBubbleContent content={m.content} isUser={m.role === "user"} />
                    </div>
                  </div>
                ))}
                {loading && (
                  <p className="text-xs text-muted" role="status" aria-live="polite">
                    Thinking…
                  </p>
                )}
                {errorMsg && (
                  <p className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs text-red-600" role="alert">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </p>
                )}
                <div ref={endRef} />
              </div>

              <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-border p-2.5">
                {quickActions.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => void send(a)}
                    className="min-h-9 rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] font-medium text-foreground-muted hover:border-primary hover:text-primary"
                  >
                    {a}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                className="flex shrink-0 items-end gap-2 border-t border-border p-3 pb-safe"
              >
                <label htmlFor="chat-drawer-textarea" className="sr-only">
                  Ask a question
                </label>
                <textarea
                  ref={textareaRef}
                  id="chat-drawer-textarea"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder="Ask about Venkat..."
                  className="input-field max-h-28 min-h-11 resize-none !py-2.5 text-sm leading-snug"
                />
                <button
                  type="submit"
                  className="btn btn-primary !min-h-11 !w-11 !shrink-0 !px-0"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    </ClientOnly>
  );
}
