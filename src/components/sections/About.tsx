"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Mail, Phone } from "lucide-react";
import { developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-main">
        <div className="gsap-reveal mb-10 md:mb-14">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Professional Background</h2>
          <p className="section-desc">
            Dedicated full stack developer delivering reliable, scalable solutions for clients worldwide.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 lg:col-span-2"
          >
            <h3 className="mb-4 text-lg font-semibold">Who I Am</h3>
            <p className="mb-4 leading-relaxed text-foreground-muted">{developer.bio}</p>
            <p className="leading-relaxed text-foreground-muted">
              I work with startups, agencies, and enterprises to build web applications that are
              fast, secure, and maintainable. From legacy PHP systems to modern React frontends —
              I bring end-to-end expertise to every project.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium">Connect with me</p>
              <SocialLinks size="lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: MapPin, label: "Location", value: developer.location },
              { icon: Briefcase, label: "Experience", value: developer.experience },
              { icon: Mail, label: "Email", value: developer.email },
              { icon: Phone, label: "Phone", value: developer.phone },
            ].map((item) => (
              <div key={item.label} className="card flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="truncate text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
