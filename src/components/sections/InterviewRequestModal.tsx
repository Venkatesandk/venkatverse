"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2, X, Mail } from "lucide-react";
import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function RequestInterviewButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-interview-request"))}
      className={className}
    >
      {children}
    </button>
  );
}

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  roleTitle: "",
  preferredSlot: "",
  mode: "Video Call (Google Meet / Zoom)",
  notes: "",
  website: "",
};

export function InterviewRequestModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setStatus("idle");
      setErrorMsg("");
      setForm(INITIAL_FORM);
    };
    window.addEventListener("open-interview-request", onOpen);
    return () => window.removeEventListener("open-interview-request", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const composedMessage = [
      `Interview Request`,
      form.company ? `Company: ${form.company}` : null,
      form.roleTitle ? `Target Role: ${form.roleTitle}` : null,
      `Preferred Mode: ${form.mode}`,
      form.preferredSlot ? `Preferred Date / Time (IST or local): ${form.preferredSlot}` : null,
      form.notes ? `Notes / JD Summary:\n${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          purpose: "interview",
          message: composedMessage,
          website: form.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Could not submit interview request.");
      }
      setStatus("success");
      window.dispatchEvent(new CustomEvent("contact-submitted"));
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Try email or WhatsApp.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="interview-modal-title"
          className="fixed inset-0 z-[85] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="card mb-[var(--mobile-bar)] max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl p-5 sm:mb-0 sm:rounded-2xl sm:p-6"
            initial={{ y: 36, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2 text-primary">
                  <Calendar size={18} />
                  <h2 id="interview-modal-title" className="text-base font-bold">
                    Request an Interview
                  </h2>
                </div>
                <p className="text-xs text-muted">
                  Submit preferred dates or role details — {developer.responseTime.toLowerCase()}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-surface-2"
                aria-label="Close interview request dialog"
              >
                <X size={18} />
              </button>
            </div>

            {status === "success" ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-500" />
                <p className="text-base font-bold">Interview Request Sent</p>
                <p className="mt-1.5 text-sm text-foreground-muted">
                  Thank you, {form.name.split(" ")[0] || "there"}. Venkatesan will reply to{" "}
                  <span className="font-semibold text-foreground">{form.email}</span> within 24 hours.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <a
                    href={developer.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp !w-auto"
                  >
                    <WhatsAppIcon width={16} height={16} /> WhatsApp Direct
                  </a>
                  <button type="button" onClick={() => setOpen(false)} className="btn btn-glass !w-auto">
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="int-name" className="mb-1 block text-xs font-medium">
                      Your Name
                    </label>
                    <input
                      id="int-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Recruiter / Hiring Manager"
                      className="input-field !py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="int-email" className="mb-1 block text-xs font-medium">
                      Work Email
                    </label>
                    <input
                      id="int-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="input-field !py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="int-company" className="mb-1 block text-xs font-medium">
                      Company
                    </label>
                    <input
                      id="int-company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Organization name"
                      className="input-field !py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="int-role" className="mb-1 block text-xs font-medium">
                      Role Title
                    </label>
                    <input
                      id="int-role"
                      required
                      value={form.roleTitle}
                      onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
                      placeholder="e.g. Lead PHP Developer"
                      className="input-field !py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="int-mode" className="mb-1 block text-xs font-medium">
                      Interview Mode
                    </label>
                    <select
                      id="int-mode"
                      value={form.mode}
                      onChange={(e) => setForm({ ...form, mode: e.target.value })}
                      className="input-field !py-2 text-sm"
                    >
                      <option>Video Call (Google Meet / Zoom)</option>
                      <option>Phone Screening</option>
                      <option>WhatsApp Call</option>
                      <option>In-Person (Coimbatore)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="int-slot" className="mb-1 block text-xs font-medium">
                      Preferred Date & Time
                    </label>
                    <input
                      id="int-slot"
                      required
                      value={form.preferredSlot}
                      onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                      placeholder="e.g. Thu 4:00 PM IST"
                      className="input-field !py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="int-notes" className="mb-1 block text-xs font-medium">
                    Role Details / Agenda (optional)
                  </label>
                  <textarea
                    id="int-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Share tech stack focus, team size, or interview round format..."
                    className="input-field resize-none !py-2 text-sm"
                  />
                </div>

                {status === "error" && <p className="text-xs text-red-500">{errorMsg}</p>}

                <button type="submit" className="btn btn-primary w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Calendar size={16} /> Send Interview Request
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-3 text-xs text-muted">
                  <span>Or connect instantly:</span>
                  <a
                    href={developer.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                  <span>·</span>
                  <a href={`mailto:${developer.email}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                    <Mail size={12} /> {developer.email}
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

