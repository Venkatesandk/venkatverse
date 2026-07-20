import { NextResponse } from "next/server";
import { runAISuiteTool, validToolSlugs } from "@/lib/ai-suite/handlers";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";
import type { AISuiteToolSlug } from "@/types";

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
- Do NOT write dense single paragraphs for roadmaps or lists
- Personalize strictly from the user's input (level, goals, etc.) — do NOT give beginner advice to seniors
Return only the final content the user should read — no preamble about being an AI.`;

  const userPrompt = `Tool: ${tool}
Input JSON:
${JSON.stringify(input, null, 2)}

Generate the best result for this tool using Venkat's real portfolio data and the user's stated goals.`;

  return generateWithGemini({
    systemInstruction,
    userPrompt,
    temperature: 0.7,
    maxOutputTokens: 1400,
  });
}

async function callOpenAI(tool: AISuiteToolSlug, input: Record<string, string>): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = `You are Venkat's portfolio AI assistant. Tool: ${tool}. Use professional tone. Be concise and actionable. Personalize to the user's level and goals.`;
  const userPrompt = JSON.stringify({ tool, input });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1200,
        temperature: 0.7,
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
    const body = await request.json();
    const tool = body.tool as AISuiteToolSlug;
    const input = (body.input ?? {}) as Record<string, string>;

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
        geminiError: gemini.error,
      });
    }

    return NextResponse.json({
      ...localResult,
      source: "local",
      geminiError: gemini.error,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
