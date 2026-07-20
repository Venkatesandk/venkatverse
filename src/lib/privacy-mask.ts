import { maskEmail } from "@/lib/mailer";

/** Mask a person's name for public UI — e.g. "Hari" → "H•••" */
export function maskName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "•••";
  if (trimmed.length === 1) return `${trimmed}•`;
  const visible = trimmed.slice(0, 1);
  const hidden = Math.min(trimmed.length - 1, 4);
  return `${visible}${"•".repeat(hidden)}`;
}

/** Mask message body — encrypted-style blocks, no readable content */
export function maskMessage(message: string) {
  if (!message.trim()) return "████████ (private)";
  const blocks = Math.min(4, Math.ceil(message.length / 8));
  return `${"█".repeat(8)} `.repeat(blocks).trim() + " (private)";
}

export { maskEmail };
