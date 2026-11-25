"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Lock, Server, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Lock,
    badge: "On-Premises Inference",
    title: "Private Inference with Ollama & vLLM",
    description:
      "Self-hosted Ollama (campus/lab serving) and vLLM (concurrent throughput) behind a local Python OpenAI-compatible gateway. Applicant documents and ERP fee rules stay on the institutional server without calling public LLM APIs; escalated queries are logged cleanly in ERP.",
    tags: ["Ollama (Local)", "vLLM (On-Prem)", "Python Gateway", "Self-Hosted Data Path"],
    href: "/projects/admission-ai",
  },
  {
    icon: Sparkles,
    badge: "ERP Grounding",
    title: "Admission AI & Question Generation",
    description:
      "Connected CodeIgniter ERP course eligibility rules, fee slabs, and document checklists to grounded prompts with human counsellor escalation, plus optional Gemini API workflows over HTTPS for non-sensitive faculty question paper drafting.",
    tags: ["CodeIgniter ERP", "Gemini API", "Prompt Guardrails", "Counsellor Copilot"],
    href: "/projects/educational-erp",
  },
  {
    icon: Server,
    badge: "Cloud & Infrastructure",
    title: "AWS EC2, S3 & Bedrock Exploration",
    description:
      "Architected encrypted AWS S3 pre-signed media pipelines for 1,000+ concurrent online exam candidates alongside AWS EC2 production deployments, plus hands-on exploration with AWS Bedrock.",
    tags: ["AWS S3 (Production)", "AWS EC2", "AWS Bedrock (Exploring)", "Signed URLs"],
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
        {highlights.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -2 }}
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

