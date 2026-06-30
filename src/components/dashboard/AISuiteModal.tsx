"use client";

import { useCallback, useEffect, useState } from "react";
import { X, Sparkles, Copy, Download, Check, Mic, MicOff, Volume2 } from "lucide-react";
import { aiSuiteTools, projects } from "@/data/portfolio";
import { toolFields } from "@/lib/ai-suite/tool-fields";
import type { AISuiteToolSlug } from "@/types";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ClientOnly } from "@/components/ui/ClientOnly";

interface AISuiteResult {
  title: string;
  content: string;
  source?: string;
}

interface AISuiteModalProps {
  tool: AISuiteToolSlug | null;
  onClose: () => void;
}

export function AISuiteModal({ tool, onClose }: AISuiteModalProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AISuiteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const speech = useSpeechRecognition();

  const toolMeta = aiSuiteTools.find((t) => t.slug === tool);

  useEffect(() => {
    if (!tool) return;
    setForm({});
    setResult(null);
    setError("");
    setCopied(false);
    if (tool === "project-explainer" && projects[0]) {
      setForm({ projectId: projects[0].id });
    }
    if (tool === "interview-coach") {
      setForm({ focus: "full-stack", level: "senior" });
    }
    if (tool === "email-writer") {
      setForm({ tone: "professional" });
    }
    if (tool === "career-advisor") {
      setForm({ currentLevel: "mid-level" });
    }
    if (tool === "code-reviewer") {
      setForm({ language: "php" });
    }
  }, [tool]);

  const runTool = useCallback(
    async (input: Record<string, string>) => {
      if (!tool) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/ai-suite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool, input }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Request failed");
        setResult(data);
        if (tool === "voice-assistant") {
          speech.speak(data.content);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [tool, speech]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runTool(form);
  };

  const handleVoiceSubmit = () => {
    if (!speech.transcript.trim()) return;
    runTool({ transcript: speech.transcript });
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!tool || !toolMeta) return null;

  const fields = toolFields[tool];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="panel mb-[var(--mobile-bar)] flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden sm:mb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-header shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <div>
              <p className="panel-title">{toolMeta.title}</p>
              <p className="text-[11px] text-muted">{toolMeta.description}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-surface-2" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {!result ? (
            <>
              {tool === "voice-assistant" ? (
                <VoiceAssistantUI
                  speech={speech}
                  loading={loading}
                  onSubmit={handleVoiceSubmit}
                />
              ) : tool === "project-explainer" ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="projectId" className="mb-1.5 block text-sm font-medium">
                      Select Project
                    </label>
                    <select
                      id="projectId"
                      value={form.projectId ?? ""}
                      onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                      className="input-field"
                      required
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <SubmitButton loading={loading} label="Generate Client Brief" />
                </form>
              ) : (
                <ClientOnly
                  fallback={<div className="h-40 animate-pulse rounded-lg bg-surface-2" />}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                      <div key={field.name}>
                        <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={field.name}
                            value={form[field.name] ?? field.options?.[0]?.value ?? ""}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            className="input-field"
                            required={field.required}
                          >
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.name}
                            rows={field.rows ?? 4}
                            value={form[field.name] ?? ""}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            className="input-field resize-none font-mono text-sm"
                            required={field.required}
                          />
                        ) : (
                          <input
                            id={field.name}
                            type="text"
                            value={form[field.name] ?? ""}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            className="input-field"
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                    <SubmitButton
                      loading={loading}
                      label={
                        tool === "code-reviewer"
                          ? "Run Code Review"
                          : tool === "resume-builder"
                            ? "Generate Resume"
                            : "Generate"
                      }
                    />
                  </form>
                </ClientOnly>
              )}
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </>
          ) : (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{result.title}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyResult}
                    className="btn btn-glass !w-auto !px-3 !py-1.5 !text-xs"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadResult}
                    className="btn btn-glass !w-auto !px-3 !py-1.5 !text-xs"
                  >
                    <Download size={14} /> Download
                  </button>
                  {tool === "voice-assistant" && (
                    <button
                      type="button"
                      onClick={() => speech.speak(result.content)}
                      className="btn btn-glass !w-auto !px-3 !py-1.5 !text-xs"
                    >
                      <Volume2 size={14} /> Listen
                    </button>
                  )}
                </div>
              </div>
              {result.source === "openai" && (
                <p className="mb-2 text-[10px] text-emerald-600">Powered by OpenAI</p>
              )}
              <pre className="whitespace-pre-wrap rounded-xl border border-border bg-surface-2 p-4 font-sans text-sm leading-relaxed text-foreground-muted">
                {result.content}
              </pre>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="btn btn-primary mt-4 !w-full"
              >
                Generate Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
      <Sparkles size={16} />
      {loading ? "Generating..." : label}
    </button>
  );
}

function VoiceAssistantUI({
  speech,
  loading,
  onSubmit,
}: {
  speech: ReturnType<typeof useSpeechRecognition>;
  loading: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      {!speech.supported ? (
        <p className="text-sm text-muted">
          Voice input is not supported in this browser. Use Chrome or Edge on desktop.
        </p>
      ) : (
        <>
          <button
            type="button"
            onClick={speech.listening ? speech.stop : speech.start}
            className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full transition ${
              speech.listening
                ? "animate-pulse bg-red-500 text-white"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
            aria-label={speech.listening ? "Stop listening" : "Start listening"}
          >
            {speech.listening ? <MicOff size={32} /> : <Mic size={32} />}
          </button>
          <p className="mb-1 text-sm font-medium">
            {speech.listening ? "Listening..." : "Tap the mic and ask a question"}
          </p>
          <p className="mb-4 text-xs text-muted">Try: &quot;What are Venkat&apos;s skills?&quot;</p>
          {speech.transcript && (
            <p className="mb-4 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm">
              &ldquo;{speech.transcript}&rdquo;
            </p>
          )}
          <button
            type="button"
            onClick={onSubmit}
            disabled={!speech.transcript.trim() || loading}
            className="btn btn-primary !w-auto"
          >
            <Sparkles size={16} />
            {loading ? "Processing..." : "Get Answer"}
          </button>
        </>
      )}
    </div>
  );
}
