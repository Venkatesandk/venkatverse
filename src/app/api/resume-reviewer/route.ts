import { NextResponse } from "next/server";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";
import {
  formatResumeReviewMarkdown,
  reviewResumeAgainstJd,
} from "@/lib/resume-reviewer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobDescription = String(body.jobDescription ?? "").trim();
    const roleTitle = String(body.roleTitle ?? "").trim();

    if (jobDescription.length < 40) {
      return NextResponse.json(
        { error: "Paste a job description with at least 40 characters." },
        { status: 400 }
      );
    }

    const local = reviewResumeAgainstJd(
      roleTitle ? `${roleTitle}\n\n${jobDescription}` : jobDescription
    );

    const gemini = await generateWithGemini({
      systemInstruction: `${buildPortfolioContext()}

You are an ATS Resume Reviewer for Venkatesan's portfolio.
Given a job description, evaluate how well Venkat's real profile matches.
Return markdown with:
## ATS Match: XX/100 — Verdict
### Matched Keywords (bullets)
### Potential Gaps (bullets)
### Candidate Strengths (bullets with metrics)
### Recommendations (numbered, actionable for recruiters/candidates)
Be honest. Do not invent skills Venkat does not have. Prefer quantified impact.`,
      userPrompt: `Role title: ${roleTitle || "Not specified"}

Job description:
${jobDescription}

Local analysis (use as baseline, refine if needed):
Score: ${local.score}
Matched: ${local.matched.join(", ")}
Gaps: ${local.gaps.join(", ")}`,
      temperature: 0.4,
      maxOutputTokens: 1200,
    });

    if (gemini.text) {
      return NextResponse.json({
        ...local,
        content: gemini.text,
        source: "gemini",
        model: gemini.model,
      });
    }

    return NextResponse.json({
      ...local,
      content: formatResumeReviewMarkdown(local),
      source: "local",
      geminiError: gemini.error,
    });
  } catch (err) {
    console.error("[resume-reviewer]", err);
    return NextResponse.json({ error: "Failed to review resume" }, { status: 500 });
  }
}
