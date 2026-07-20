"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Star, X, Loader2, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "vv_feedback_popup_done";
const DELAY_MS = 2 * 60 * 1000; // 2 minutes

export function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const openNow = () => setOpen(true);
    window.addEventListener("open-feedback-popup", openNow);

    let timer: number | undefined;
    if (!localStorage.getItem(STORAGE_KEY)) {
      timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("open-feedback-popup", openNow);
    };
  }, []);

  const close = (persist = false) => {
    setOpen(false);
    if (persist) localStorage.setItem(STORAGE_KEY, "1");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, rating }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setDone(true);
      localStorage.setItem(STORAGE_KEY, "1");
      window.dispatchEvent(new CustomEvent("feedback-submitted"));
      window.setTimeout(() => setOpen(false), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(true)}
        >
          <motion.div
            className="card mb-[var(--mobile-bar)] w-full max-w-md rounded-t-2xl p-5 sm:mb-0 sm:rounded-2xl sm:p-6"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2 text-primary">
                  <MessageSquareHeart size={18} />
                  <span className="text-sm font-semibold">Share your feedback</span>
                </div>
                <p className="text-xs text-muted">
                  Your review helps improve this portfolio and will appear in the feedback section.
                </p>
              </div>
              <button type="button" onClick={() => close(true)} className="rounded-lg p-1.5 hover:bg-surface-2" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {done ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto mb-2 text-emerald-500" size={36} />
                <p className="font-semibold">Thank you for your feedback!</p>
                <p className="mt-1 text-sm text-muted">It will show on the portfolio shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <p className="mb-1.5 text-xs font-medium">Your rating</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      const active = value <= (hoverRating || rating);
                      return (
                        <button
                          key={value}
                          type="button"
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(value)}
                          className="p-0.5"
                          aria-label={`${value} star`}
                        >
                          <Star
                            size={22}
                            className={active ? "fill-amber-400 text-amber-400" : "text-border"}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label htmlFor="fb-name" className="mb-1 block text-xs font-medium">Name</label>
                  <input
                    id="fb-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field !py-2 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="fb-email" className="mb-1 block text-xs font-medium">Email (optional)</label>
                  <input
                    id="fb-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field !py-2 text-sm"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="fb-message" className="mb-1 block text-xs font-medium">Review / Feedback</label>
                  <textarea
                    id="fb-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field resize-none !py-2 text-sm"
                    placeholder="What did you think about the portfolio / resume?"
                  />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit Feedback"}
                </button>
                <button type="button" className="w-full text-center text-xs text-muted hover:text-primary" onClick={() => close(true)}>
                  Maybe later
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
