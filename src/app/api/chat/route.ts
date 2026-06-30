import { NextResponse } from "next/server";
import { developer, projects, skills, experiences } from "@/data/portfolio";

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("about") || lower.includes("venkat") || lower.includes("who")) {
    return `${developer.name} is a ${developer.role} with ${developer.experience} of experience based in ${developer.location}. ${developer.bio}`;
  }

  if (lower.includes("php") || lower.includes("project")) {
    const phpProjects = projects.filter((p) =>
      p.technologies.some((t) => t.toLowerCase().includes("php") || t.toLowerCase().includes("laravel") || t.toLowerCase().includes("codeigniter"))
    );
    if (phpProjects.length > 0) {
      return `Here are Venkat's PHP projects:\n\n${phpProjects.map((p) => `• **${p.title}** - ${p.description}`).join("\n")}`;
    }
  }

  if (lower.includes("skill")) {
    return `Venkat's top skills include: ${skills.map((s) => `${s.name} (${s.level}%)`).join(", ")}.`;
  }

  if (lower.includes("experience") || lower.includes("work")) {
    return experiences
      .map((e) => `• **${e.role}** at ${e.company} (${e.period})`)
      .join("\n");
  }

  if (lower.includes("resume") || lower.includes("download")) {
    return `Click "Download CV" on the site to get Venkat's latest resume. You'll need to enter your name, email, and mobile number, then verify with a 6-digit OTP.`;
  }

  if (lower.includes("whatsapp") || lower.includes("contact via whatsapp")) {
    return `You can reach Venkat instantly on WhatsApp: ${developer.social.whatsapp}`;
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) {
    return `You can reach Venkat at ${developer.email} or ${developer.phone}. Use the contact form on the website or connect via LinkedIn!`;
  }

  if (lower.includes("ai") || lower.includes("openai") || lower.includes("gemini")) {
    return `Venkat has experience integrating AI APIs including OpenAI and Google Gemini into production applications. He's built AI-powered HR systems and chatbots.`;
  }

  return `I'm Venkat's AI assistant! I can tell you about his skills, projects, experience, or help you get in touch. Try asking "Tell me about Venkat" or "Show PHP projects".`;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // In production, integrate with OpenAI/Gemini API:
    // const apiKey = process.env.OPENAI_API_KEY;
    // if (apiKey) { ... call OpenAI ... }

    const reply = getAIResponse(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
