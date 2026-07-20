"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { X, Send, Bot } from "lucide-react";
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
        if (!trimmed) {
          return <div key={i} className="h-1.5" />;
        }

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

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! Ask about Venkat's skills, projects, or how to hire him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const text = (e as CustomEvent<string>).detail;
      if (text) setInput(text);
    };
    window.addEventListener("open-ai-assistant", handler);
    return () => window.removeEventListener("open-ai-assistant", handler);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const history = messages.slice(-8);
    setMessages((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: data.reply || "Please try WhatsApp for a quick reply.",
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "Please try WhatsApp for a quick reply." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientOnly>
      <>
        <button
          onClick={() => setOpen(!open)}
          className="fixed right-4 bottom-[calc(var(--mobile-bar)+1rem)] z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:bottom-6 md:flex"
          aria-label="AI Assistant"
        >
          {open ? <X size={20} /> : <Bot size={20} />}
        </button>

        {open && (
          <div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4 md:justify-end md:pr-4 md:pb-20"
            onClick={() => setOpen(false)}
          >
            <div
              className="card mb-[var(--mobile-bar)] flex h-[min(85dvh,32rem)] w-full max-w-lg flex-col rounded-t-2xl sm:mb-0 sm:rounded-2xl md:max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-primary" />
                  <span className="text-sm font-semibold">AI Assistant</span>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-2" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
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
                  <p className="text-xs text-muted">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:240ms]" />
                    </span>
                  </p>
                )}
                <div ref={endRef} />
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-border p-2">
                {quickActions.map((a) => (
                  <button
                    key={a}
                    onClick={() => send(a)}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-foreground-muted hover:border-primary hover:text-primary"
                  >
                    {a}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex gap-2 border-t border-border p-3 pb-safe"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask..."
                  className="input-field !py-2 text-sm"
                />
                <button type="submit" className="btn btn-primary !w-auto !px-3" disabled={loading}>
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
