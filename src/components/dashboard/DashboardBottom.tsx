"use client";

import { useState } from "react";
import { Star, Calendar, ArrowRight, Mail, Phone } from "lucide-react";
import { testimonials, blogPosts, developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export function DashboardBottom() {
  return (
    <div className="dashboard-grid space-y-4">
      <section id="testimonials" className="panel">
        <div className="panel-header">
          <p className="panel-title">What Clients Say</p>
        </div>
        <div className="panel-body">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-xl border border-border p-4">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-3 text-sm leading-relaxed text-foreground-muted">&ldquo;{t.content}&rdquo;</p>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}, {t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="panel">
        <div className="panel-header">
          <p className="panel-title">Latest Blog Posts</p>
        </div>
        <div className="panel-body">
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-xl border border-border">
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <span className="text-3xl font-bold text-primary/20">📝</span>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-[10px] text-muted">
                    <Calendar size={11} /> {post.date} · {post.readTime}
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold leading-snug">{post.title}</h3>
                  <p className="mb-3 text-xs text-foreground-muted line-clamp-2">{post.excerpt}</p>
                  <button type="button" className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Read more <ArrowRight size={12} />
                  </button>
                </div>
              </article>
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
