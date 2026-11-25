import {
  developer,
  projects,
  skills,
  experiences,
  services,
  professionalCerts,
  certificates,
  learningActivities,
} from "@/data/portfolio";

export interface GeminiMessage {
  role: "user" | "model";
  text: string;
}

export interface GeminiResult {
  text: string | null;
  error: string | null;
  model?: string;
}

function getApiKey(): string | null {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    null;
  return key || null;
}

function getPreferredModels(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  const defaults = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
  ];
  if (preferred) {
    return [preferred, ...defaults.filter((m) => m !== preferred)];
  }
  return defaults;
}

/** Make Gemini quota/auth errors easier to act on */
export function simplifyGeminiError(message: string): string {
  if (/limit:\s*0/i.test(message) || /free_tier.*limit:\s*0/i.test(message)) {
    return "Gemini free-tier quota is 0 for this API key/project.";
  }
  if (/quota|rate.?limit/i.test(message)) {
    return "Gemini quota exceeded. Please try again shortly.";
  }
  if (/API key|UNAUTHENTICATED|PERMISSION|invalid/i.test(message)) {
    return "Gemini API authentication error.";
  }
  if (/abort|timeout/i.test(message)) {
    return "AI request timed out.";
  }
  return message;
}

export function buildPortfolioContext(): string {
  const topSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .map((s) => `${s.name} (${s.level}%, ${s.category})`)
    .join(", ");

  const projectLines = projects
    .map(
      (p) =>
        `- ${p.title} (${p.ownership}): ${p.description} | Impact: ${p.impact ?? ""} | Tech: ${p.technologies.join(", ")}`
    )
    .join("\n");

  const expLines = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}): ${e.description}`
    )
    .join("\n");

  const serviceLines = services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");

  const certLines = professionalCerts
    .map((c) => `- ${c.title} (${c.issuer}, ${c.date}, ${c.kind})`)
    .join("\n");

  const eduLines = certificates
    .map((c) => `- ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");

  const learningLines = learningActivities
    .map((l) => `- ${l.title} (${l.provider}, ${l.status})`)
    .join("\n");

  return `You are the AI assistant for ${developer.name}'s portfolio website (Venkatverse).

PROFILE
- Name: ${developer.name}
- Role: ${developer.role}
- Experience: ${developer.experience} (joined July 2021)
- Location: ${developer.location}
- Email: ${developer.email}
- Phone: ${developer.phone}
- Bio: ${developer.bio}
- GitHub: ${developer.social.github}
- LinkedIn: ${developer.social.linkedin}
- WhatsApp: ${developer.social.whatsapp}

SKILLS (PHP & Enterprise ERP Primary; AI & Modern Web Additional)
${topSkills}

EXPERIENCE (3x Promoted at eNova Software)
${expLines}

CASE STUDIES
${projectLines}

SERVICES
${serviceLines}

VERIFIED CERTIFICATIONS & ASSESSMENTS
${certLines}

EDUCATION
${eduLines}

CONTINUOUS LEARNING (NOT COMPLETED CERTIFICATIONS)
${learningLines}

STRICT GROUNDING RULES
- Answer ONLY using the verified portfolio facts above.
- NEVER fabricate employers, degrees, certifications, client names, or unverified metrics.
- Do NOT claim Venkat has Laravel certifications or completed AWS certifications (AWS Cloud Practitioner is currently in-progress learning).
- Present PHP 7/8, CodeIgniter 3/4, MySQL, and Enterprise ERP/HRMS as his primary specialization, and React/Next.js, Python, and Private AI (Ollama/vLLM) as additional specializations.
- Use clear formatting: numbered lists (1. 2. 3.) or bullet lines starting with "• ".
- Put each item on its own line and use **bold** for titles.
- If asked how to download the resume: OTP flow (name, email, mobile → verify 6-digit email OTP → download).
- For hiring/interviews: share email, phone, WhatsApp, LinkedIn, or the /recruiter brief and Request Interview modal.
- If a question asks about something not in the portfolio, say so honestly and redirect to WhatsApp or the contact form.`;
}

async function callModel(options: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  contents: Array<{ role: string; parts: Array<{ text: string }> }>;
  temperature: number;
  maxOutputTokens: number;
}): Promise<{ text: string | null; error: string | null }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${options.model}:generateContent?key=${encodeURIComponent(options.apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": options.apiKey,
    },
    signal: AbortSignal.timeout(15_000),
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: options.systemInstruction }],
      },
      contents: options.contents,
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxOutputTokens,
      },
    }),
  });

  const raw = await res.text();
  let data: {
    error?: { message?: string; status?: string };
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
  } = {};

  try {
    data = JSON.parse(raw);
  } catch {
    return { text: null, error: `Invalid Gemini response (${res.status})` };
  }

  if (!res.ok) {
    const msg = simplifyGeminiError(
      data.error?.message ||
      data.error?.status ||
      `Gemini HTTP ${res.status}`
    );
    return { text: null, error: msg };
  }

  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text ?? "")
    .join("")
    .trim();

  if (!text) {
    const reason = data.candidates?.[0]?.finishReason || "empty response";
    return { text: null, error: `Gemini returned no text (${reason})` };
  }

  return { text, error: null };
}

export async function generateWithGemini(options: {
  systemInstruction: string;
  userPrompt: string;
  history?: GeminiMessage[];
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<GeminiResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      text: null,
      error: "GEMINI_API_KEY is not configured on the server",
    };
  }

  const contents = [
    ...(options.history ?? []).map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
    {
      role: "user" as const,
      parts: [{ text: options.userPrompt }],
    },
  ];

  const models = getPreferredModels();
  const errors: string[] = [];

  for (const model of models) {
    try {
      const result = await callModel({
        apiKey,
        model,
        systemInstruction: options.systemInstruction,
        contents,
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxOutputTokens ?? 1024,
      });

      if (result.text) {
        return { text: result.text, error: null, model };
      }

      if (result.error) {
        errors.push(`${model}: ${result.error}`);
        const hardFail =
          /API key not valid|PERMISSION_DENIED|UNAUTHENTICATED|quota|billing|limit:\s*0/i.test(
            result.error
          ) && !/no longer available|not found|not supported/i.test(result.error);
        if (hardFail) {
          return { text: null, error: result.error, model };
        }
        continue;
      }
    } catch (error) {
      const msg = error instanceof Error ? simplifyGeminiError(error.message) : "Network error";
      errors.push(`${model}: ${msg}`);
    }
  }

  return {
    text: null,
    error: errors.join(" | ") || "All Gemini models failed",
  };
}

export function isGeminiConfigured(): boolean {
  return Boolean(getApiKey());
}
