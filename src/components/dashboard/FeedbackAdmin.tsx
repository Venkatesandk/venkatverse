"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Loader2, ShieldCheck } from "lucide-react";

interface FeedbackAdminLoginProps {
  open: boolean;
  onClose: () => void;
  onLogin: (secret: string) => Promise<void>;
  configured: boolean;
}

export function FeedbackAdminLogin({
  open,
  onClose,
  onLogin,
  configured,
}: FeedbackAdminLoginProps) {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onLogin(secret);
      setSecret("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card w-full max-w-sm p-5"
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Lock size={18} />
                <p className="font-bold">Owner access</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-surface-2" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            {!configured ? (
              <p className="text-sm text-muted">
                Set <code className="text-xs">ADMIN_SECRET</code> in your environment to enable edit/delete.
              </p>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <p className="text-xs text-muted">
                  Enter your admin key to edit or delete visitor feedback. Only you should know this key.
                </p>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="input-field !py-2 text-sm"
                  placeholder="Admin secret key"
                  required
                  autoComplete="current-password"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Unlock admin"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FeedbackEditModalProps {
  open: boolean;
  feedback: { id: string; name: string; message: string; rating: number } | null;
  onClose: () => void;
  onSaved: () => void;
}

export function FeedbackEditModal({ open, feedback, onClose, onSaved }: FeedbackEditModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (feedback && open) {
      setName(feedback.name);
      setMessage(feedback.message);
      setRating(feedback.rating);
      setError("");
    }
  }, [feedback, open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/feedback/${feedback.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, rating }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && feedback && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            className="card w-full max-w-md p-5"
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
          >
            <div className="mb-4 flex items-center gap-2 text-primary">
              <ShieldCheck size={18} />
              <p className="font-bold">Edit feedback</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field !py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="input-field !py-2 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Review</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="input-field resize-none !py-2 text-sm"
                  required
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex gap-2">
                <button type="button" className="btn btn-secondary flex-1" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Save"}
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
