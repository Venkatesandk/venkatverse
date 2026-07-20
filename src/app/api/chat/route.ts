import { NextResponse } from "next/server";
import { developer, projects, skills, experiences } from "@/data/portfolio";
import { buildPortfolioContext, generateWithGemini } from "@/lib/gemini";

function getLocalAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("about") || lower.includes("venkat") || lower.includes("who")) {
    return [
      `👋 Meet ${developer.name}`,
      "",
      `${developer.role} · ${developer.experience}`,
      `${developer.location}`,
      "",
      developer.bio,
      "",
      "Ask me about projects, skills, experience, or how to hire him.",
    ].join("\n");
  }

  if (lower.includes("php") || lower.includes("project")) {
    const phpProjects = projects.filter((p) =>
      p.technologies.some((t) => {
        const x = t.toLowerCase();
        return x.includes("php") || x.includes("laravel") || x.includes("codeigniter");
      })
    );
    const list = (phpProjects.length ? phpProjects : projects).slice(0, 5);

    return [
      "Here are Venkat's PHP / CodeIgniter projects:",
      "",
      ...list.flatMap((p, i) => [
        `${i + 1}. ${p.title}`,
        `   ${p.description}`,
        `   Tech: ${p.technologies.slice(0, 5).join(", ")}`,
        "",
      ]),
      "Want details on any project? Just ask by name.",
    ].join("\n");
  }

  if (lower.includes("skill")) {
    const top = [...skills].sort((a, b) => b.level - a.level).slice(0, 8);
    return [
      "Venkat's top skills:",
      "",
      ...top.map((s) => `• ${s.name} — ${s.level}% (${s.category})`),
      "",
      "He specializes in PHP, CodeIgniter, MySQL, JavaScript, REST APIs, and AWS.",
    ].join("\n");
  }

  if (lower.includes("experience") || lower.includes("work") || lower.includes("enova")) {
    return [
      `${developer.name} at eNova Software & Hardware Solutions Pvt. Ltd.`,
      `Location: Coimbatore · Tenure: ${developer.experience} (since Jul 2021)`,
      "",
      "Career path:",
      "",
      ...experiences.map(
        (e, i) =>
          `${i + 1}. ${e.role}\n   ${e.period}\n   ${e.description}`
      ),
      "",
      "Promoted 3 times: Junior → Programmer → Senior → Lead Application Developer.",
    ].join("\n");
  }

  if (lower.includes("resume") || lower.includes("download")) {
    return [
      "To download Venkat's resume:",
      "",
      "1. Click Download Resume / Download CV",
      "2. Enter your name, email & mobile",
      "3. Verify the 6-digit OTP sent to your email",
      "4. Resume download starts automatically",
      "",
      "Need help? Ask me or use WhatsApp.",
    ].join("\n");
  }

  if (lower.includes("whatsapp") || lower.includes("contact via whatsapp")) {
    return [
      "Chat with Venkat on WhatsApp:",
      "",
      developer.social.whatsapp,
      "",
      `Phone: ${developer.phone}`,
    ].join("\n");
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) {
    return [
      "Happy to connect! Reach Venkat here:",
      "",
      `• Email: ${developer.email}`,
      `• Phone: ${developer.phone}`,
      `• WhatsApp: ${developer.social.whatsapp}`,
      `• LinkedIn: ${developer.social.linkedin}`,
      "",
      "Or use the contact form on this website.",
    ].join("\n");
  }

  if (lower.includes("ai") || lower.includes("openai") || lower.includes("gemini")) {
    return [
      "Venkat works with AI in real projects:",
      "",
      "• OpenAI & Google Gemini API integrations",
      "• AI question generation for education systems",
      "• AI-enabled ERP / HR workflow automation",
      "",
      "Ask about Educational ERP or AI Suite for more.",
    ].join("\n");
  }

  return [
    "I'm Venkat's AI assistant 👋",
    "",
    "I can help with:",
    "• About Venkat",
    "• PHP / project details",
    "• Skills & experience",
    "• Resume download",
    "• Contact / hire info",
    "",
    'Try: "PHP projects" or "Hire me"',
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const gemini = await generateWithGemini({
      systemInstruction: buildPortfolioContext(),
      userPrompt: message.trim(),
      history: history
        .filter(
          (m: { role?: string; content?: string }) =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .slice(-8)
        .map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          text: m.content,
        })),
      temperature: 0.6,
      maxOutputTokens: 900,
    });

    if (gemini.text) {
      return NextResponse.json({
        reply: gemini.text,
        source: "gemini",
        model: gemini.model,
      });
    }

    return NextResponse.json({
      reply: getLocalAIResponse(message),
      source: "local",
      geminiError: gemini.error,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
