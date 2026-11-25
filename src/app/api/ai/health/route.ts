import { NextResponse } from "next/server";
import { generateWithGemini, isGeminiConfigured } from "@/lib/gemini";

/** Quick check: GET /api/ai/health */
export async function GET() {
  if (!isGeminiConfigured()) {
    return NextResponse.json({
      ok: false,
      configured: false,
      status: "fallback-only",
    });
  }

  const result = await generateWithGemini({
    systemInstruction: "Reply with exactly the word OK.",
    userPrompt: "Ping",
    temperature: 0,
    maxOutputTokens: 16,
  });

  return NextResponse.json({
    ok: Boolean(result.text),
    configured: true,
    model: result.model ?? null,
    status: result.text ? "live" : "degraded",
  });
}
