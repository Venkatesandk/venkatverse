"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/portfolio";

export function FAQPanel() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <HelpCircle size={16} className="text-primary" />
          <p className="panel-title">FAQ</p>
        </div>
        <span className="panel-badge">Recruiter answers</span>
      </div>
      <div className="panel-body space-y-2">
        {faqs.map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id} className="overflow-hidden rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : faq.id)}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
              >
                <span className="text-sm font-semibold">{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted transition ${open ? "rotate-180 text-primary" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-border px-3.5 py-3 text-xs leading-relaxed text-foreground-muted sm:text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
