import { NextResponse } from "next/server";
import { runAISuiteTool, validToolSlugs } from "@/lib/ai-suite/handlers";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";
import type { AISuiteToolSlug } from "@/types";

function sanitizeInput(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(raw)) {
    if (typeof val === "string") {
      out[key.slice(0, 40)] = val.slice(0, 6000);
    }
  }
  return out;
}

async function callGemini(
  tool: AISuiteToolSlug,
  input: Record<string, string>
) {
  const systemInstruction = `${buildPortfolioContext()}

You are generating output for the AI Suite tool: "${tool}".
Use a professional tone. Be concise, actionable, and well-formatted.
Format rules (important):
- Use markdown headings: ## for main sections, ### for subsections
- Use bullet lists with "- " for each item (one item per line)
- Use **bold** only for key terms or titles inside lines
- Put a blank line between sections
- Do NOT invent employers, certifications, Laravel claims, or unverified metrics
- Personalize strictly from the user's input
Return only the final content the user should read — no preamble about being an AI.`;

  const userPrompt = `Tool: ${tool}
Input JSON:
${JSON.stringify(input, null, 2)}

Generate the best result for this tool using Venkat's verified portfolio data and the user's stated inputs.`;

  return generateWithGemini({
    systemInstruction,
    userPrompt,
    temperature: 0.6,
    maxOutputTokens: 1400,
  });
}

async function callOpenAI(tool: AISuiteToolSlug, input: Record<string, string>): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = `${buildPortfolioContext()}\n\nTool: ${tool}. Be concise, factual, and never fabricate experience or certifications.`;
  const userPrompt = JSON.stringify({ tool, input });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1200,
        temperature: 0.6,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const ip = getRateLimitClientKey(request);
    const limit = checkRateLimit({
      namespace: "ai-suite",
      key: ip,
      maxRequests: 15,
      windowMs: 5 * 60 * 1000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Rate limit reached. Please wait ${limit.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const tool = body.tool as AISuiteToolSlug;
    const input = sanitizeInput(body.input);

    if (!tool || !validToolSlugs.includes(tool)) {
      return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
    }

    const localResult = runAISuiteTool(tool, input);

    const gemini = await callGemini(tool, input);
    if (gemini.text) {
      return NextResponse.json({
        title: localResult.title,
        content: gemini.text,
        source: "gemini",
        model: gemini.model,
      });
    }

    const openaiContent = await callOpenAI(tool, input);
    if (openaiContent) {
      return NextResponse.json({
        title: localResult.title,
        content: openaiContent,
        source: "openai",
      });
    }

    if (gemini.error) {
      console.warn(`[ai-suite:${tool}] falling back to local template:`, gemini.error);
    }

    return NextResponse.json({
      ...localResult,
      source: "local",
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
