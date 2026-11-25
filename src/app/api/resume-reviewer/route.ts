import { NextResponse } from "next/server";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";
import {
  formatResumeReviewMarkdown,
  reviewResumeAgainstJd,
} from "@/lib/resume-reviewer";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getRateLimitClientKey(request);
    const limit = checkRateLimit({
      namespace: "resume-reviewer",
      key: ip,
      maxRequests: 12,
      windowMs: 5 * 60 * 1000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Rate limit reached. Please try again in ${limit.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const jobDescription = String(body.jobDescription ?? "").trim().slice(0, 10000);
    const roleTitle = String(body.roleTitle ?? "").trim().slice(0, 120);

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

You are an ATS Resume Reviewer for Venkatesan D's portfolio.
Given a job description, evaluate how well Venkat's real verified profile matches.
Return markdown with:
## ATS Match: XX/100 — Verdict
### Matched Keywords (bullets)
### Potential Gaps (bullets)
### Candidate Strengths (bullets with verified metrics)
### Recommendations (numbered, actionable for recruiters)
Be honest. NEVER invent skills or certifications Venkat does not have.`,
      userPrompt: `Role title: ${roleTitle || "Not specified"}

Job description:
${jobDescription}

Local analysis (use as baseline, refine if needed):
Score: ${local.score}
Matched: ${local.matched.join(", ")}
Gaps: ${local.gaps.join(", ")}`,
      temperature: 0.35,
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

    if (gemini.error) {
      console.warn("[resume-reviewer] Gemini fallback:", gemini.error);
    }

    return NextResponse.json({
      ...local,
      content: formatResumeReviewMarkdown(local),
      source: "local",
    });
  } catch (err) {
    console.error("[resume-reviewer]", err);
    return NextResponse.json({ error: "Failed to review resume" }, { status: 500 });
  }
}
