"use client";

import { useState, useEffect, type ReactNode } from "react";
import { X, Download, ShieldCheck, Loader2 } from "lucide-react";
import { developer } from "@/data/portfolio";

type Step = "form" | "otp" | "success";

interface ResumeDownloadButtonProps {
  className?: string;
  children: ReactNode;
}

export function ResumeDownloadButton({ className, children }: ResumeDownloadButtonProps) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-resume-download"))} className={className}>
      {children}
    </button>
  );
}

export function ResumeDownloadModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [debugOtp, setDebugOtp] = useState("");

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep("form");
      setForm({ name: "", email: "", phone: "" });
      setOtp("");
      setError("");
      setInfo("");
      setDebugOtp("");
    };
    window.addEventListener("open-resume-download", handler);
    return () => window.removeEventListener("open-resume-download", handler);
  }, []);

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/resume/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send OTP");
      setInfo(data.message);
      if (data.debugOtp) setDebugOtp(data.debugOtp);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resume/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid OTP");

      setStep("success");
      const link = document.createElement("a");
      link.href = data.downloadUrl ?? developer.resumeUrl;
      link.download = "Venkatesan-D-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onClick={() => setOpen(false)}
    >
        <div
          className="card mb-[var(--mobile-bar)] w-full max-w-md rounded-t-2xl p-5 sm:mb-0 sm:rounded-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2 text-primary">
                <ShieldCheck size={18} />
                <span className="text-sm font-semibold">Secure Resume Download</span>
              </div>
              <p className="text-xs text-muted">
                Enter your details and verify with OTP to download the latest resume.
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-2" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {step === "form" && (
            <form onSubmit={requestOtp} className="space-y-3">
              <div>
                <label htmlFor="resume-name" className="mb-1 block text-xs font-medium">Full Name</label>
                <input
                  id="resume-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field !py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="resume-email" className="mb-1 block text-xs font-medium">Email</label>
                <input
                  id="resume-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field !py-2 text-sm"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="resume-phone" className="mb-1 block text-xs font-medium">Mobile Number</label>
                <input
                  id="resume-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field !py-2 text-sm"
                  placeholder="9688213541"
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send OTP"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyAndDownload} className="space-y-3">
              {info && <p className="rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">{info}</p>}
              {debugOtp && (
                <p className="rounded-lg border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
                  Dev mode OTP: <strong>{debugOtp}</strong>
                </p>
              )}
              <div>
                <label htmlFor="resume-otp" className="mb-1 block text-xs font-medium">Enter 6-digit OTP</label>
                <input
                  id="resume-otp"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="input-field !py-2 text-center text-lg tracking-[0.3em]"
                  placeholder="••••••"
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" className="btn btn-primary w-full" disabled={loading || otp.length !== 6}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <><Download size={16} /> Verify & Download</>}
              </button>
              <button
                type="button"
                className="w-full text-center text-xs text-muted hover:text-primary"
                onClick={() => { setStep("form"); setOtp(""); setError(""); }}
              >
                Change details or resend OTP
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Download size={22} />
              </div>
              <p className="font-semibold">Download started!</p>
              <p className="mt-1 text-sm text-muted">Thank you. Your resume should open shortly.</p>
              <button type="button" className="btn btn-glass mt-4 w-full" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          )}
        </div>
    </div>
  );
}
