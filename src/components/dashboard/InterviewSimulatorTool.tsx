"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Loader2, Mic } from "lucide-react";
import { FormattedAIContent } from "@/components/ui/FormattedAIContent";

const FOCUS_OPTIONS = [
  { value: "php", label: "PHP / CodeIgniter" },
  { value: "full-stack", label: "Full-Stack / ERP" },
  { value: "react", label: "React / Next.js" },
] as const;

export function InterviewSimulatorTool() {
  const [focus, setFocus] = useState<string>("php");
  const [level, setLevel] = useState("senior");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-suite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "interview-coach",
          input: { focus, level },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not start interview coach");
        return;
      }
      setContent(data.content ?? "");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="interview-simulator" className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <BrainCircuit size={16} />
        </span>
        <div>
          <p className="text-sm font-bold">AI Interview Simulator</p>
          <p className="text-[11px] text-muted">Domain questions for PHP, ERP, and full-stack roles</p>
        </div>
        <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
          Live
        </span>
      </div>

      <div className="mb-2.5 grid gap-2 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase text-muted">Focus</label>
          <select
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="input-field !py-2 text-sm"
          >
            {FOCUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase text-muted">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input-field !py-2 text-sm"
          >
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </div>

      <button type="button" onClick={run} disabled={loading} className="btn btn-glass w-full disabled:opacity-60">
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Generating questions…
          </>
        ) : (
          <>
            <Mic size={16} /> Start Mock Interview
          </>
        )}
      </button>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-red-500">
            {error}
          </motion.p>
        )}
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 max-h-[280px] overflow-y-auto rounded-lg border border-border p-3 text-sm"
          >
            <FormattedAIContent content={content} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
