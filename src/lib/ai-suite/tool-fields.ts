import type { AISuiteToolSlug } from "@/types";

export interface ToolField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export const toolFields: Record<AISuiteToolSlug, ToolField[]> = {
  "resume-builder": [
    { name: "targetRole", label: "Target Role", type: "text", placeholder: "e.g. Lead PHP & ERP Application Developer" },
    { name: "highlights", label: "Extra Highlights (optional)", type: "textarea", rows: 3, placeholder: "Specific domain focus, ERP/AI modules..." },
  ],
  "interview-coach": [
    {
      name: "focus",
      label: "Interview Focus",
      type: "select",
      required: true,
      options: [
        { value: "full-stack", label: "Full Stack / ERP & AI" },
        { value: "php", label: "PHP / CodeIgniter / MySQL" },
        { value: "react", label: "React / Next.js" },
      ],
    },
    {
      name: "level",
      label: "Experience Level",
      type: "select",
      required: true,
      options: [
        { value: "mid", label: "Mid-Level" },
        { value: "senior", label: "Senior" },
        { value: "lead", label: "Lead" },
      ],
    },
  ],
  "code-reviewer": [
    {
      name: "language",
      label: "Language",
      type: "select",
      required: true,
      options: [
        { value: "php", label: "PHP" },
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "python", label: "Python" },
      ],
    },
    { name: "code", label: "Paste Your Code", type: "textarea", required: true, rows: 10, placeholder: "Paste code here for review..." },
  ],
  "project-explainer": [],
  "cover-letter": [
    { name: "company", label: "Company Name", type: "text", required: true, placeholder: "Company Name" },
    { name: "jobTitle", label: "Job Title", type: "text", required: true, placeholder: "Lead / Senior PHP Application Developer" },
    { name: "motivation", label: "Why this company? (optional)", type: "textarea", rows: 2, placeholder: "What excites you about this role..." },
  ],
  "voice-assistant": [],
  "email-writer": [
    { name: "recipient", label: "Recipient", type: "text", required: true, placeholder: "Hiring Manager or Engineering Lead" },
    { name: "purpose", label: "Email Purpose", type: "text", required: true, placeholder: "Interview follow-up or ERP consulting" },
    {
      name: "tone",
      label: "Tone",
      type: "select",
      options: [
        { value: "professional", label: "Professional" },
        { value: "friendly", label: "Friendly" },
      ],
    },
  ],
  "career-advisor": [
    {
      name: "currentLevel",
      label: "Current Level",
      type: "select",
      required: true,
      options: [
        { value: "junior", label: "Junior (0–2 yrs)" },
        { value: "mid-level", label: "Mid-Level (2–4 yrs)" },
        { value: "senior", label: "Senior / Lead (4+ yrs)" },
      ],
    },
    { name: "goals", label: "Career Goals", type: "textarea", required: true, rows: 3, placeholder: "e.g. Advance to Lead Application Developer or Enterprise Architect..." },
  ],
};
