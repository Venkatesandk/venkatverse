"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ClientOnly } from "@/components/ui/ClientOnly";

export function Contact() {
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
    <section id="contact" className="section">
      <div className="container-main">
        <div className="mb-10 text-center md:mb-14">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-desc mx-auto">
            Have a project in mind? Reach out via form, WhatsApp, or social media.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="card p-6">
              <h3 className="mb-4 font-semibold">Quick Contact</h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-muted">Email:</span> {developer.email}</p>
                <p><span className="text-muted">Phone:</span> {developer.phone}</p>
                <p><span className="text-muted">Location:</span> {developer.location}</p>
              </div>
              <a
                href={developer.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-5 w-full"
              >
                <WhatsAppIcon width={18} height={18} />
                Chat on WhatsApp
              </a>
            </div>
            <div className="card p-6">
              <h3 className="mb-4 font-semibold">Social Profiles</h3>
              <SocialLinks size="lg" />
            </div>
          </div>

          <ClientOnly
            fallback={
              <div className="card p-6 lg:col-span-3 md:p-8" aria-hidden>
                <div className="mb-4 h-10 animate-pulse rounded-lg bg-surface-2" />
                <div className="mb-4 h-10 animate-pulse rounded-lg bg-surface-2" />
                <div className="mb-5 h-32 animate-pulse rounded-lg bg-surface-2" />
                <div className="h-11 animate-pulse rounded-lg bg-surface-2" />
              </div>
            }
          >
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="card p-6 lg:col-span-3 md:p-8"
            >
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Full Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="you@email.com"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  autoComplete="off"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Describe your project or inquiry..."
                />
              </div>

              {status === "success" && (
                <div className="mb-4 flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle size={16} /> Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle size={16} /> Failed to send. Please try WhatsApp instead.
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full" disabled={status === "loading"}>
                <Send size={18} />
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
