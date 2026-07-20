import {
  developer,
  projects,
  skills,
  experiences,
  services,
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
  // Prefer current Gemini 3.x — 2.5 is blocked for many new API keys
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
    return "Gemini free-tier quota is 0 for this API key/project. Create a new key in a new Google AI Studio project, or enable billing: https://aistudio.google.com/apikey";
  }
  if (/quota|rate.?limit/i.test(message)) {
    return "Gemini quota exceeded. Check usage: https://ai.dev/rate-limit — or enable billing / wait and retry.";
  }
  if (/API key|UNAUTHENTICATED|PERMISSION|invalid/i.test(message)) {
    return "Gemini API key is invalid. Create a new key at https://aistudio.google.com/apikey";
  }
  return message;
}

export function buildPortfolioContext(): string {
  const topSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 12)
    .map((s) => `${s.name} (${s.level}%, ${s.category})`)
    .join(", ");

  const projectLines = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} | Tech: ${p.technologies.join(", ")}`
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
- Instagram: ${developer.social.instagram}
- WhatsApp: ${developer.social.whatsapp}

SKILLS
${topSkills}

EXPERIENCE
${expLines}

PROJECTS
${projectLines}

SERVICES
${serviceLines}

RULES
- Answer only about Venkat, his work, skills, projects, hiring, and this portfolio.
- Be friendly, professional, and concise.
- Use clear formatting: numbered lists (1. 2. 3.) or bullet lines starting with "• ".
- Put each project/skill/step on its own line. Do not write dense single paragraphs for lists.
- You may use **bold** for project or section titles.
- If asked how to download the resume: OTP flow (name, email, mobile → verify OTP → download).
- For hire/contact, share email, phone, WhatsApp, and LinkedIn.
- If something is outside this portfolio, politely redirect to WhatsApp or the contact form.
- Do not invent employers, degrees, or projects not listed above.`;
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
      error: "GEMINI_API_KEY is missing in .env.local",
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
        // Stop only on real auth/quota failures — keep trying if a model is deprecated
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
      const msg = error instanceof Error ? error.message : "Network error";
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
