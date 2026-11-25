import { NextResponse } from "next/server";
import { developer, projects, skills, experiences } from "@/data/portfolio";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";
import { checkRateLimit, getRateLimitClientKey } from "@/lib/rate-limit";

function getLocalAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("about") || lower.includes("venkat") || lower.includes("who")) {
    return [
      `Meet **${developer.name}**`,
      "",
      `${developer.role} · ${developer.experience} (Since July 2021)`,
      `${developer.location}`,
      "",
      developer.bio,
      "",
      "Ask me about case studies, PHP/ERP skills, career progression, or requesting an interview.",
    ].join("\n");
  }

  if (lower.includes("php") || lower.includes("project") || lower.includes("erp") || lower.includes("case")) {
    const phpProjects = projects.filter((p) =>
      p.technologies.some((t) => {
        const x = t.toLowerCase();
        return x.includes("php") || x.includes("codeigniter");
      })
    );
    const list = (phpProjects.length ? phpProjects : projects).slice(0, 6);

    return [
      "Here are Venkat's enterprise PHP / CodeIgniter & AI projects:",
      "",
      ...list.flatMap((p, i) => [
        `${i + 1}. **${p.title}** (${p.ownership})`,
        `   ${p.description}`,
        `   Tech: ${p.technologies.slice(0, 5).join(", ")}`,
        "",
      ]),
      "Open any project card to read the full case study.",
    ].join("\n");
  }

  if (lower.includes("skill")) {
    const top = [...skills].sort((a, b) => b.level - a.level).slice(0, 10);
    return [
      "Venkat's verified technical expertise:",
      "",
      ...top.map((s) => `• **${s.name}** — ${s.level}% (${s.category})`),
      "",
      "Primary focus: PHP 7/8, CodeIgniter 3/4, MySQL, REST APIs, ERP & HRMS. Additional focus: React/Next.js, Python, Ollama/vLLM, and AWS.",
    ].join("\n");
  }

  if (lower.includes("experience") || lower.includes("work") || lower.includes("enova")) {
    return [
      `**${developer.name}** at eNova Software and Hardware Solutions Pvt. Ltd.`,
      `Location: Coimbatore · Tenure: ${developer.experience} (since Jul 2021)`,
      "",
      "Career progression (3× promoted):",
      "",
      ...experiences.map(
        (e, i) =>
          `${i + 1}. **${e.role}** (${e.period})\n   ${e.description}`
      ),
    ].join("\n");
  }

  if (lower.includes("resume") || lower.includes("download")) {
    return [
      "To download Venkat's latest resume:",
      "",
      "1. Click **Download Resume**",
      "2. Enter your name, email & mobile",
      "3. Verify the 6-digit OTP sent to your email",
      "4. Resume PDF download starts automatically",
    ].join("\n");
  }

  if (lower.includes("whatsapp")) {
    return [
      "Chat with Venkat on WhatsApp:",
      "",
      developer.social.whatsapp,
      "",
      `Phone: ${developer.phone}`,
    ].join("\n");
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("interview")) {
    return [
      "Connect with Venkat or request an interview:",
      "",
      `• Email: ${developer.email}`,
      `• Phone: ${developer.phone}`,
      `• WhatsApp: ${developer.social.whatsapp}`,
      `• LinkedIn: ${developer.social.linkedin}`,
      "",
      "You can also use the **Request Interview** button or the **Recruiter Brief (/recruiter)**.",
    ].join("\n");
  }

  if (lower.includes("ai") || lower.includes("gemini") || lower.includes("ollama") || lower.includes("vllm") || lower.includes("lms") || lower.includes("admission")) {
    return [
      "Venkat's AI & EdTech engineering highlights:",
      "",
      "• **LMS Integration**: Courses, enrollments, and learning progress synced with Educational ERP via REST APIs",
      "• **Admission AI (Ollama / vLLM)**: Private on-prem inference for enquiry chat, eligibility guidance, and document Q&A",
      "• **Gemini AI**: Automated question paper generation inside the ERP suite",
      "• **AWS (EC2 / S3 / Bedrock familiarity)**: Cloud hosting and signed proctoring media storage",
    ].join("\n");
  }

  return [
    "I'm Venkat's portfolio assistant.",
    "",
    "Ask me about:",
    "• **Enterprise ERP, LMS, HRMS, Biometric & AI projects**",
    "• **PHP 7/8, CodeIgniter 3/4, MySQL & Next.js skills**",
    "• **Career progression (3× promoted since July 2021)**",
    "• **Resume download & interview booking**",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const ip = getRateLimitClientKey(request);
    const limit = checkRateLimit({
      namespace: "chat",
      key: ip,
      maxRequests: 20,
      windowMs: 5 * 60 * 1000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Rate limit reached. Please wait ${limit.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const message = body.message;
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }
    if (message.trim().length > 1500) {
      return NextResponse.json({ error: "Message is too long (max 1500 characters)." }, { status: 400 });
    }

    const gemini = await generateWithGemini({
      systemInstruction: buildPortfolioContext(),
      userPrompt: message.trim(),
      history: history
        .filter(
          (m: { role?: string; content?: string }) =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.length <= 2000
        )
        .slice(-8)
        .map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          text: m.content,
        })),
      temperature: 0.5,
      maxOutputTokens: 900,
    });

    if (gemini.text) {
      return NextResponse.json({
        reply: gemini.text,
        source: "gemini",
        model: gemini.model,
      });
    }

    if (gemini.error) {
      console.warn("[chat] Gemini fallback:", gemini.error);
    }

    return NextResponse.json({
      reply: getLocalAIResponse(message),
      source: "local",
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
