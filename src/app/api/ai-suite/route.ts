import { NextResponse } from "next/server";
import { runAISuiteTool, validToolSlugs } from "@/lib/ai-suite/handlers";
import type { AISuiteToolSlug } from "@/types";

async function callOpenAI(tool: AISuiteToolSlug, input: Record<string, string>): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = `You are Venkat's portfolio AI assistant. Tool: ${tool}. Use professional tone. Be concise and actionable.`;
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

    const llmContent = await callOpenAI(tool, input);
    if (llmContent) {
      return NextResponse.json({
        title: localResult.title,
        content: llmContent,
        source: "openai",
      });
    }

    return NextResponse.json({ ...localResult, source: "local" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
