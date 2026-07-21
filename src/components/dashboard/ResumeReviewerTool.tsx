"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSearch, Loader2, Sparkles } from "lucide-react";
import { FormattedAIContent } from "@/components/ui/FormattedAIContent";

interface ReviewResponse {
  score: number;
  verdict: string;
  matched: string[];
  gaps: string[];
  content: string;
  source?: string;
}

export function ResumeReviewerTool() {
  const [roleTitle, setRoleTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReviewResponse | null>(null);

  const runReview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resume-reviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleTitle, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Review failed");
        setResult(null);
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="resume-reviewer" className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <FileSearch size={16} />
        </span>
        <div>
          <p className="text-sm font-bold">AI Resume Reviewer</p>
          <p className="text-[11px] text-muted">Paste a JD → get ATS match score vs Venkat&apos;s profile</p>
        </div>
        <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
          Live
        </span>
      </div>

      <div className="space-y-2.5">
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder="Role title (e.g. Lead PHP Developer)"
          className="input-field !py-2 text-sm"
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          placeholder="Paste the full job description here…"
          className="input-field min-h-[120px] resize-y !py-2 text-sm"
        />
        <button
          type="button"
          onClick={runReview}
          disabled={loading || jobDescription.trim().length < 40}
          className="btn btn-primary w-full disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Analyzing JD…
            </>
          ) : (
            <>
              <Sparkles size={16} /> Get ATS Match Score
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
        {result && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-3"
          >
            <div className="flex flex-wrap items-end gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">ATS Score</p>
                <p className="text-3xl font-extrabold tracking-tight text-primary">{result.score}</p>
              </div>
              <div className="pb-1">
                <p className="text-sm font-bold">{result.verdict}</p>
                <p className="text-[11px] text-muted">Source: {result.source ?? "local"}</p>
              </div>
              <div className="ml-auto h-2 w-full max-w-[180px] overflow-hidden rounded-full bg-surface-2 sm:w-40">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, result.score)}%` }}
                />
              </div>
            </div>

            {(result.matched.length > 0 || result.gaps.length > 0) && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface-2/40 p-2.5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase text-emerald-600">Matched</p>
                  <div className="flex flex-wrap gap-1">
                    {result.matched.slice(0, 8).map((m) => (
                      <span key={m} className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-surface-2/40 p-2.5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase text-amber-600">Gaps</p>
                  <div className="flex flex-wrap gap-1">
                    {result.gaps.length === 0 ? (
                      <span className="text-[10px] text-muted">No major gaps</span>
                    ) : (
                      result.gaps.slice(0, 6).map((g) => (
                        <span key={g} className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                          {g}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="max-h-[280px] overflow-y-auto rounded-lg border border-border p-3 text-sm">
              <FormattedAIContent content={result.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
