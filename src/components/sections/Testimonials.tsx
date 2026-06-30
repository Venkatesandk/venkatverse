"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/portfolio";

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-main">
        <div className="mb-10 text-center md:mb-14">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client Reviews</h2>
          <p className="section-desc mx-auto">
            What clients say about working with me on real-world projects.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card flex flex-col p-6"
            >
              <Quote size={28} className="mb-4 text-primary/40" />
              <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-muted">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-foreground-muted">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
