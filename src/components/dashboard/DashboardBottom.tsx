"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  Clock,
  Quote,
  Pencil,
  Trash2,
  Lock,
  LogOut,
  CheckCircle2,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { testimonials, blogPosts, developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { TitleCover } from "@/components/ui/TitleCover";
import { useAdminSession } from "@/hooks/useAdminSession";
import { FeedbackAdminLogin, FeedbackEditModal } from "@/components/dashboard/FeedbackAdmin";
import { RequestInterviewButton } from "@/components/sections/InterviewRequestModal";

interface LiveFeedback {
  id: string;
  name: string;
  rating: number;
  message: string;
  photo?: string;
  createdAt: string;
}

interface ReviewCardData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  live: boolean;
  photo?: string;
  featured?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function ReviewAvatar({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        onError={() => setFailed(true)}
        className="h-10 w-10 shrink-0 rounded-full object-cover shadow-md ring-2 ring-primary/20"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white shadow-md shadow-primary/20">
      {initials(name)}
    </div>
  );
}

function StarRow({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.05,
            type: "spring",
            stiffness: 420,
            damping: 16,
          }}
        >
          <Star
            size={14}
            className={
              i < rating
                ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                : "fill-transparent text-border"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
  isAdmin,
  onEdit,
  onDelete,
  className = "",
}: {
  review: ReviewCardData;
  index: number;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease }}
      whileHover={{ y: -3 }}
      className={`group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 ${
        review.live ? "ring-1 ring-primary/20" : ""
      } ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-3 text-primary/10 transition-colors duration-300 group-hover:text-primary/20"
      >
        <Quote size={44} strokeWidth={1.5} />
      </div>

      <div className="relative z-[1] flex h-full flex-col">
        <div className="mb-3 flex items-start justify-between gap-2">
          <StarRow rating={review.rating} delay={index * 0.05 + 0.08} />
          <div className="flex items-center gap-1">
            {review.live && isAdmin && (
              <div className="flex gap-0.5">
                <button
                  type="button"
                  onClick={onEdit}
                  className="rounded-lg p-1.5 text-muted transition hover:bg-primary/10 hover:text-primary"
                  aria-label="Edit feedback"
                  title="Edit (owner only)"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/10 hover:text-red-500"
                  aria-label="Delete feedback"
                  title="Delete (owner only)"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
            {review.live && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                Visitor
              </span>
            )}
          </div>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground-muted">
          &ldquo;{review.content}&rdquo;
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
          <ReviewAvatar name={review.name} photo={review.photo} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{review.name}</p>
            <p className="truncate text-xs text-muted">
              {review.role}
              {review.company ? ` · ${review.company}` : ""}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ReviewScrollRow({
  rowId,
  items,
  live,
  isAdmin,
  onEdit,
  onDelete,
  autoScroll = true,
}: {
  rowId: string;
  items: ReviewCardData[];
  live: LiveFeedback[];
  isAdmin: boolean;
  onEdit: (item: LiveFeedback) => void;
  onDelete: (id: string, name: string) => void;
  autoScroll?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const loopItems = useMemo(() => (items.length > 1 ? [...items, ...items] : items), [items]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoScroll || items.length <= 1 || prefersReduced) return;

    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const speed = 0.7;

    const animate = () => {
      if (!pausedRef.current) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll, items, rowId]);

  if (items.length === 0) return null;

  return (
    <div data-row={rowId}>
      <div
        className="relative"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onTouchStart={() => {
          pausedRef.current = true;
        }}
        onTouchEnd={() => {
          window.setTimeout(() => {
            pausedRef.current = false;
          }, 2500);
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopItems.map((review, i) => {
            const liveItem = live.find((f) => f.id === review.id);
            return (
              <div
                key={`${review.id}_${i}`}
                data-review-card
                className="w-[min(88vw,340px)] shrink-0 sm:w-[320px]"
              >
                <ReviewCard
                  review={review}
                  index={i % items.length}
                  isAdmin={isAdmin}
                  onEdit={liveItem ? () => onEdit(liveItem) : undefined}
                  onDelete={liveItem ? () => onDelete(liveItem.id, liveItem.name) : undefined}
                  className="h-full w-full"
                />
              </div>
            );
          })}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--surface)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--surface)] to-transparent"
        />
      </div>
      {items.length > 1 && (
        <p className="mt-2 text-center text-[10px] text-muted">Auto-scroll · hover or touch to pause</p>
      )}
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-56 w-[min(88vw,340px)] shrink-0 animate-pulse rounded-2xl border border-border bg-surface-2 sm:w-[320px]"
        />
      ))}
    </div>
  );
}

function FeedbackSection() {
  const [live, setLive] = useState<LiveFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [editing, setEditing] = useState<LiveFeedback | null>(null);
  const { isAdmin, configured, login, logout } = useAdminSession();

  const load = () => {
    fetch(`/api/feedback?_=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLive(Array.isArray(d.feedback) ? d.feedback : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    const onSubmit = () => {
      setLoading(true);
      window.setTimeout(load, 400);
    };
    window.addEventListener("feedback-submitted", onSubmit);
    return () => window.removeEventListener("feedback-submitted", onSubmit);
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete feedback from ${name}?`)) return;
    const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? "Could not delete");
      return;
    }
    load();
  };

  const liveCards: ReviewCardData[] = live.map((f) => ({
    id: f.id,
    name: f.name,
    role: "Visitor",
    company: "",
    content: f.message,
    rating: f.rating,
    live: true,
    photo: f.photo,
    featured: false,
  }));

  const staticCards: ReviewCardData[] = testimonials.map((t) => ({
    id: `t_${t.id}`,
    name: t.name,
    role: t.role,
    company: t.company,
    content: t.content,
    rating: t.rating,
    live: false,
    featured: false,
  }));

  const allReviews = [...liveCards, ...staticCards];

  return (
    <section id="testimonials" className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Endorsements &amp; Visitor Feedback</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            Colleague recommendations &amp; verified visitor reviews
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin && (
            <button
              type="button"
              onClick={() => void logout()}
              className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"
              title="Owner mode active"
            >
              <LogOut size={12} />
              Admin
            </button>
          )}
          {!isAdmin && configured && (
            <button
              type="button"
              onClick={() => setAdminLoginOpen(true)}
              className="rounded-full border border-border p-1.5 text-muted hover:text-primary"
              aria-label="Owner login"
              title="Owner: edit or delete feedback"
            >
              <Lock size={14} />
            </button>
          )}
          <motion.button
            type="button"
            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-feedback-popup"))}
          >
            Leave feedback
          </motion.button>
        </div>
      </div>
      <div className="panel-body space-y-5 overflow-hidden">
        {loading ? (
          <FeedbackSkeleton />
        ) : allReviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center">
            <p className="text-sm font-medium">No reviews yet</p>
            <p className="mt-1 text-xs text-muted">Be the first to share feedback on this portfolio.</p>
            <button
              type="button"
              className="btn btn-primary mt-4 !w-auto"
              onClick={() => window.dispatchEvent(new CustomEvent("open-feedback-popup"))}
            >
              Write a review
            </button>
          </div>
        ) : (
          <ReviewScrollRow
            rowId="all-reviews"
            items={allReviews}
            live={live}
            isAdmin={isAdmin}
            onEdit={setEditing}
            onDelete={handleDelete}
            autoScroll={allReviews.length > 1}
          />
        )}
      </div>

      <FeedbackAdminLogin
        open={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLogin={async (secret) => {
          await login(secret);
        }}
        configured={configured}
      />
      <FeedbackEditModal
        open={Boolean(editing)}
        feedback={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />
    </section>
  );
}

export function DashboardBottom() {
  return (
    <div className="dashboard-grid space-y-4">
      <FeedbackSection />

      <section id="blog" className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Engineering Articles</h2>
            <p className="mt-0.5 text-[11px] text-muted">
              Production lessons from CodeIgniter ERP, biometric sync, AWS S3 &amp; Ollama / vLLM
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <TitleCover title={post.title} badge={post.tags[0] ?? "Article"} compact />
                <div className="space-y-2 p-3">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-foreground-muted">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Read article <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </div>
  );
}

function ContactPanel() {
  const [form, setForm] = useState({ name: "", email: "", purpose: "job", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();
    const cleanMsg = form.message.trim();
    if (cleanName.length < 2) {
      setStatus("error");
      setErrorMsg("Please enter at least 2 characters for your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (cleanMsg.length < 10) {
      setStatus("error");
      setErrorMsg("Please provide at least 10 characters in your message.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          name: cleanName,
          email: cleanEmail,
          message: cleanMsg,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", purpose: "job", message: "", website: "" });
        window.dispatchEvent(new CustomEvent("contact-submitted"));
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try email or WhatsApp directly.");
    }
  };

  return (
    <section id="contact" className="panel scroll-mt-24">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border-b border-border p-4 sm:p-6 lg:border-b-0 lg:border-r"
        >
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Let&apos;s Work Together</h2>
          <p className="mb-2 text-sm text-foreground-muted">
            Hiring for a Lead/Senior PHP &amp; ERP role or planning an enterprise architecture engagement? Reach out directly.
          </p>
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} />
            {developer.responseTime}
          </span>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${developer.email}`} className="btn btn-primary sm:!w-auto">
              <Mail size={16} /> Email Direct
            </a>
            <RequestInterviewButton className="btn btn-glass sm:!w-auto">
              <Calendar size={16} /> Request Interview
            </RequestInterviewButton>
            <a
              href={developer.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp sm:!w-auto"
            >
              <WhatsAppIcon width={16} height={16} /> WhatsApp
            </a>
            <a
              href={developer.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass sm:!w-auto"
            >
              <LinkedInIcon width={16} height={16} /> LinkedIn
            </a>
          </div>
          <SocialLinks size="md" />
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p className="flex items-center gap-2 break-all">
              <Mail size={14} className="shrink-0" /> {developer.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="shrink-0" /> {developer.phone}
            </p>
          </div>
        </motion.div>

        <ClientOnly
          fallback={
            <div className="p-6" aria-hidden>
              <div className="space-y-3">
                <div className="h-10 animate-pulse rounded-lg bg-surface-2" />
                <div className="h-10 animate-pulse rounded-lg bg-surface-2" />
                <div className="h-24 animate-pulse rounded-lg bg-surface-2" />
              </div>
            </div>
          }
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6"
          >
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
            <div className="mb-3">
              <label htmlFor="dash-name" className="mb-1 block text-xs font-medium">
                Name
              </label>
              <input
                id="dash-name"
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field !py-2 text-sm transition-shadow focus:shadow-md focus:shadow-primary/10"
                placeholder="Your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dash-email" className="mb-1 block text-xs font-medium">
                Email
              </label>
              <input
                id="dash-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field !py-2 text-sm transition-shadow focus:shadow-md focus:shadow-primary/10"
                placeholder="you@company.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dash-purpose" className="mb-1 block text-xs font-medium">
                Purpose
              </label>
              <select
                id="dash-purpose"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="input-field !py-2 text-sm transition-shadow focus:shadow-md focus:shadow-primary/10"
              >
                <option value="job">Job / Senior Role Opportunity</option>
                <option value="interview">Schedule Interview</option>
                <option value="freelance">ERP / Web Architecture Project</option>
                <option value="collaboration">Technical Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dash-message" className="mb-1 block text-xs font-medium">
                Message
              </label>
              <textarea
                id="dash-message"
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-field min-h-[120px] resize-y !py-2 text-sm transition-shadow focus:shadow-md focus:shadow-primary/10"
                placeholder="Share role details, project scope, or preferred interview times..."
              />
            </div>
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 flex items-center gap-1 text-xs text-emerald-700"
                >
                  <CheckCircle size={14} /> Message sent! You&apos;ll receive a reply at your email.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 flex items-center gap-1 text-xs text-red-500"
                >
                  <AlertCircle size={14} /> {errorMsg || "Failed. Try WhatsApp or email directly."}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
            >
              <Send size={16} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </ClientOnly>
      </div>
    </section>
  );
}
