"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Calendar, ArrowRight, Mail, Phone, Clock } from "lucide-react";
import { testimonials, blogPosts, developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { TitleCover } from "@/components/ui/TitleCover";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface LiveFeedback {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}

function FeedbackSection() {
  const [live, setLive] = useState<LiveFeedback[]>([]);

  const load = () => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((d) => setLive(Array.isArray(d.feedback) ? d.feedback : []))
      .catch(() => {});
  };

  useEffect(() => {
    load();
    const onSubmit = () => load();
    window.addEventListener("feedback-submitted", onSubmit);
    return () => window.removeEventListener("feedback-submitted", onSubmit);
  }, []);

  const cards = [
    ...live.map((f) => ({
      id: f.id,
      name: f.name,
      role: "Portfolio Visitor",
      company: "Feedback",
      content: f.message,
      rating: f.rating,
      live: true as const,
    })),
    ...testimonials.map((t) => ({ ...t, live: false as const })),
  ].slice(0, 9);

  return (
    <section id="testimonials" className="panel">
      <div className="panel-header">
        <p className="panel-title">Reviews & Feedback</p>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:underline"
          onClick={() => window.dispatchEvent(new CustomEvent("open-feedback-popup"))}
        >
          Leave feedback
        </button>
      </div>
      <div className="panel-body">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {t.live && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    New
                  </span>
                )}
              </div>
              <p className="mb-3 text-sm leading-relaxed text-foreground-muted">&ldquo;{t.content}&rdquo;</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted">{t.role}{t.company ? `, ${t.company}` : ""}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DashboardBottom() {
  return (
    <div className="dashboard-grid space-y-4">
      <FeedbackSection />

      <section id="blog" className="panel">
        <div className="panel-header">
          <p className="panel-title">Latest Blog Posts</p>
        </div>
        <div className="panel-body">
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-xl border border-border"
              >
                <TitleCover
                  title={post.title}
                  badge={post.tags[0] ?? "Article"}
                />
                <div className="p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold leading-snug text-foreground">{post.title}</h3>
                  <p className="mb-3 text-xs leading-relaxed text-foreground-muted line-clamp-2">{post.excerpt}</p>
                  <button type="button" className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Read more <ArrowRight size={12} />
                  </button>
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="panel overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-border p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Let&apos;s Work Together</h2>
          <p className="mb-5 text-sm text-foreground-muted">
            Have a project in mind? I&apos;d love to hear about it. Reach out and let&apos;s build something great.
          </p>
          <div className="mb-5 flex flex-wrap gap-2">
            <a href={`mailto:${developer.email}`} className="btn btn-primary !w-auto">
              <Mail size={16} /> Get in Touch
            </a>
            <a href={developer.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !w-auto">
              <WhatsAppIcon width={16} height={16} /> WhatsApp
            </a>
          </div>
          <SocialLinks size="md" />
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p className="flex items-center gap-2 break-all"><Mail size={14} className="shrink-0" /> {developer.email}</p>
            <p className="flex items-center gap-2"><Phone size={14} className="shrink-0" /> {developer.phone}</p>
          </div>
        </div>

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
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="mb-3">
              <label htmlFor="dash-name" className="mb-1 block text-xs font-medium">Name</label>
              <input
                id="dash-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field !py-2 text-sm"
                placeholder="Your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dash-email" className="mb-1 block text-xs font-medium">Email</label>
              <input
                id="dash-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field !py-2 text-sm"
                placeholder="you@email.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dash-message" className="mb-1 block text-xs font-medium">Message</label>
              <textarea
                id="dash-message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-field resize-none !py-2 text-sm"
                placeholder="Your message..."
              />
            </div>
            {status === "success" && (
              <p className="mb-3 flex items-center gap-1 text-xs text-emerald-600">
                <CheckCircle size={14} /> Sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="mb-3 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={14} /> Failed. Try WhatsApp instead.
              </p>
            )}
            <button type="submit" className="btn btn-primary w-full" disabled={status === "loading"}>
              <Send size={16} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </ClientOnly>
      </div>
    </section>
  );
}
