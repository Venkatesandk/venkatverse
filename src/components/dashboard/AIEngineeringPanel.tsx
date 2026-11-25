"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Lock, Server, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Lock,
    badge: "On-Premises Privacy",
    title: "Private Inference with Ollama & vLLM",
    description:
      "Deployed Ollama for campus/lab model serving and vLLM for concurrent production traffic behind a Python OpenAI-compatible gateway — keeping applicant documents and fee rules off public clouds.",
    tags: ["Ollama", "vLLM", "Python Gateway", "Zero Cloud Leakage"],
    href: "/projects/admission-ai",
  },
  {
    icon: Sparkles,
    badge: "ERP Grounding",
    title: "Admission AI & Question Generation",
    description:
      "Connected CodeIgniter ERP course eligibility rules, fee slabs, and document checklists to AI prompts with escalation guardrails, plus Gemini AI workflows for faculty question paper generation.",
    tags: ["CodeIgniter ERP", "Gemini API", "Prompt Guardrails", "Counsellor Copilot"],
    href: "/projects/educational-erp",
  },
  {
    icon: Server,
    badge: "Cloud & Infrastructure",
    title: "AWS EC2 / S3 & Bedrock Familiarity",
    description:
      "Architected encrypted AWS S3 pre-signed media pipelines for 1,000+ concurrent online exam candidates alongside EC2 production deployments and AWS Bedrock exploration.",
    tags: ["AWS S3", "AWS EC2", "AWS Bedrock", "Signed URLs"],
    href: "/projects/online-examination",
  },
];

export function AIEngineeringPanel() {
  return (
    <section id="ai-highlights" className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <BrainCircuit size={16} className="text-primary" />
          <div>
            <h2 className="panel-title">AI Engineering Highlights</h2>
            <p className="mt-0.5 text-[11px] text-muted">
              Additional technical specialization — private LLM serving &amp; practical ERP automation
            </p>
          </div>
        </div>
        <span className="panel-badge">Ollama · vLLM · Gemini</span>
      </div>

      <div className="panel-body grid gap-3 md:grid-cols-3">
        {highlights.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col rounded-2xl border border-border bg-surface-2/40 p-4 transition hover:border-primary/35"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <item.icon size={17} />
              </span>
              <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                {item.badge}
              </span>
            </div>

            <h3 className="text-sm font-bold">{item.title}</h3>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground-muted">
              {item.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              href={item.href}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Read architecture case study <ArrowRight size={12} />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

