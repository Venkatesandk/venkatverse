"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Code2, Network, Layout, Bot, Database, Server,
} from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  api: Network,
  layout: Layout,
  ai: Bot,
  database: Database,
  server: Server,
};

export function Services() {
  return (
    <section id="services" className="section bg-surface/50">
      <div className="container-main">
        <div className="gsap-reveal mb-10 text-center md:mb-14">
          <span className="section-label">Services</span>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-desc mx-auto">
            End-to-end development services tailored for businesses, startups, and enterprises.
          </p>
        </div>

        <div className="gsap-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card gsap-stagger-item p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
