"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Star, X, Loader2, CheckCircle2, Sparkles, Camera } from "lucide-react";

const STORAGE_KEY = "vv_feedback_popup_done";
const DELAY_MS = 2 * 60 * 1000;

const RATING_LEVELS = [
  { value: 1, emoji: "😞", label: "Poor" },
  { value: 2, emoji: "😕", label: "Fair" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😊", label: "Great" },
  { value: 5, emoji: "🤩", label: "Amazing" },
] as const;

function RatingPicker({
  rating,
  hoverRating,
  onSelect,
  onHover,
  onLeave,
}: {
  rating: number;
  hoverRating: number;
  onSelect: (v: number) => void;
  onHover: (v: number) => void;
  onLeave: () => void;
}) {
  const display = hoverRating || rating;
  const activeLevel = RATING_LEVELS.find((r) => r.value === display);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium">Your rating</p>
        {activeLevel && (
          <motion.span
            key={activeLevel.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-semibold text-primary"
          >
            {activeLevel.label}
          </motion.span>
        )}
      </div>

      {/* 3D smile emojis */}
      <div className="flex justify-between gap-1 px-0.5 sm:gap-2">
        {RATING_LEVELS.map(({ value, emoji, label }) => {
          const selected = rating === value;
          const highlighted = value <= display;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              onMouseEnter={() => onHover(value)}
              onMouseLeave={onLeave}
              aria-label={`${value} stars — ${label}`}
              className="flex min-w-0 flex-1 flex-col items-center gap-1"
            >
              <motion.span
                className={`relative flex h-12 w-full max-w-[3.25rem] items-center justify-center rounded-2xl text-[1.65rem] sm:h-14 sm:max-w-[3.5rem] sm:text-3xl ${
                  selected
                    ? "bg-gradient-to-br from-primary/35 via-primary/15 to-surface-2 ring-2 ring-primary/60"
                    : highlighted
                      ? "bg-surface-2 ring-1 ring-primary/25"
                      : "bg-surface-2/40 opacity-55 grayscale"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: selected
                    ? "0 10px 24px -6px color-mix(in srgb, var(--primary) 45%, transparent), inset 0 2px 0 rgba(255,255,255,0.15)"
                    : highlighted
                      ? "0 6px 16px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
                      : "0 4px 10px -2px rgba(0,0,0,0.25)",
                }}
                animate={{
                  scale: selected ? 1.08 : highlighted ? 1.03 : 1,
                  rotateX: selected ? -12 : 0,
                  y: selected ? -3 : 0,
                }}
                whileHover={{ scale: 1.12, rotateY: 6, y: -4 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">{emoji}</span>
                {selected && (
                  <motion.span
                    layoutId="emoji-glow"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.span>
              <span
                className={`truncate text-[9px] font-medium ${selected ? "text-primary" : "text-muted"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stars synced with emoji */}
      <div className="flex items-center justify-center gap-1 rounded-xl bg-surface-2/60 py-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          const active = value <= display;
          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              onMouseEnter={() => onHover(value)}
              onMouseLeave={onLeave}
              aria-label={`${value} star`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                size={20}
                className={
                  active
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    : "text-border"
                }
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

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
  const [photo, setPhoto] = useState<string | null>(null);

  const onPhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 512 * 1024) {
      setError("Photo must be 512KB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
    setError("");
  };

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
        body: JSON.stringify({ name, email, message, rating, photoBase64: photo ?? undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setDone(true);
      localStorage.setItem(STORAGE_KEY, "1");
      window.dispatchEvent(new CustomEvent("feedback-submitted"));
      window.setTimeout(() => {
        setOpen(false);
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1200);
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
              <button
                type="button"
                onClick={() => close(true)}
                className="shrink-0 rounded-lg p-1.5 hover:bg-surface-2"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {done ? (
              <div className="py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <CheckCircle2 className="mx-auto mb-2 text-emerald-500" size={40} />
                </motion.div>
                <p className="font-semibold">Thank you for your feedback!</p>
                <p className="mt-1 text-sm text-muted">It will show on the portfolio shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <RatingPicker
                  rating={rating}
                  hoverRating={hoverRating}
                  onSelect={setRating}
                  onHover={setHoverRating}
                  onLeave={() => setHoverRating(0)}
                />

                <div>
                  <label htmlFor="fb-name" className="mb-1 block text-xs font-medium">
                    Name
                  </label>
                  <input
                    id="fb-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field w-full !py-2.5 text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <p className="mb-1.5 text-xs font-medium">Photo (optional)</p>
                  <div className="flex items-center gap-3">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Preview"
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-muted">
                        {name.trim() ? name.trim().slice(0, 1).toUpperCase() : "?"}
                      </div>
                    )}
                    <label className="btn btn-secondary flex cursor-pointer items-center gap-2 !py-2 text-xs">
                      <Camera size={14} />
                      {photo ? "Change photo" : "Upload photo"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        onChange={onPhotoPick}
                      />
                    </label>
                    {photo && (
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-red-500"
                        onClick={() => setPhoto(null)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-muted">
                    Shows your photo on the review, or name initials if skipped.
                  </p>
                </div>
                <div>
                  <label htmlFor="fb-email" className="mb-1 block text-xs font-medium">
                    Email (optional)
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full !py-2.5 text-sm"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="fb-message" className="mb-1 block text-xs font-medium">
                    Review / Feedback
                  </label>
                  <textarea
                    id="fb-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field w-full resize-none !py-2.5 text-sm"
                    placeholder="What did you think about the portfolio / resume?"
                  />
                </div>

                {error && <p className="text-center text-xs text-red-500">{error}</p>}

                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={15} />
                        Submit Feedback
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => close(true)}
                    className="flex h-10 w-full items-center justify-center rounded-xl border border-border bg-surface-2/50 text-sm font-medium text-muted transition hover:border-primary/30 hover:text-primary"
                  >
                    Maybe later
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
