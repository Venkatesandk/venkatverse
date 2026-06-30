"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import type { ChatMessage } from "@/types";
import { ClientOnly } from "@/components/ui/ClientOnly";

const quickActions = ["About Venkat", "PHP projects", "WhatsApp", "Hire me"];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! Ask about Venkat's skills, projects, or how to hire him." },
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
    setMessages((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Please try WhatsApp for a quick reply." }]);
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
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-xl px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-white" : "bg-surface-2 text-foreground-muted"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <p className="text-xs text-muted">Thinking...</p>}
              <div ref={endRef} />
            </div>
            <div className="flex flex-wrap gap-1 border-t border-border p-2">
              {quickActions.map((a) => (
                <button key={a} onClick={() => send(a)} className="rounded-md bg-surface-2 px-2 py-1 text-[10px] text-foreground-muted">
                  {a}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-border p-3 pb-safe">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask..." className="input-field !py-2 text-sm" />
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
