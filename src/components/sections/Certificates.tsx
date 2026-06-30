"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certificates } from "@/data/portfolio";

export function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="container-main">
        <div className="mb-10 text-center md:mb-14">
          <span className="section-label">Certifications</span>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-5 text-center"
            >
              <Award className="mx-auto mb-3 text-primary" size={28} />
              <h3 className="mb-1 text-sm font-semibold">{cert.title}</h3>
              <p className="text-xs text-primary">{cert.issuer}</p>
              <p className="mt-1 text-xs text-muted">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
