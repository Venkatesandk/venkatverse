import {
  developer,
  skills,
  experiences,
  projects,
  services,
} from "@/data/portfolio";
import type { AISuiteToolSlug } from "@/types";

export interface AISuiteResult {
  title: string;
  content: string;
  meta?: Record<string, string>;
}

const topSkills = skills
  .sort((a, b) => b.level - a.level)
  .slice(0, 8)
  .map((s) => s.name);

function buildResume(input: Record<string, string>): AISuiteResult {
  const targetRole = input.targetRole?.trim() || developer.role;
  const highlights = input.highlights?.trim();
  const expList = experiences
    .map((e) => `• ${e.role} — ${e.company} (${e.period})\n  ${e.description}`)
    .join("\n\n");
  const skillGroups = {
    backend: skills.filter((s) => s.category === "backend").map((s) => s.name),
    frontend: skills.filter((s) => s.category === "frontend").map((s) => s.name),
    other: skills.filter((s) => ["database", "devops", "ai"].includes(s.category)).map((s) => s.name),
  };

  const content = `${developer.name.toUpperCase()}
${developer.location} | ${developer.email} | ${developer.phone}
LinkedIn: ${developer.social.linkedin} | GitHub: ${developer.social.github}

PROFESSIONAL SUMMARY
${developer.bio}

TARGET ROLE: ${targetRole}
Experience: ${developer.experience}

CORE SKILLS
Backend: ${skillGroups.backend.join(", ")}
Frontend: ${skillGroups.frontend.join(", ")}
Tools & AI: ${skillGroups.other.join(", ")}

PROFESSIONAL EXPERIENCE
${expList}

KEY PROJECTS
${projects
  .filter((p) => p.featured)
  .map((p) => `• ${p.title} — ${p.description}\n  Tech: ${p.technologies.join(", ")}`)
  .join("\n\n")}

${highlights ? `ADDITIONAL HIGHLIGHTS\n${highlights}\n` : ""}
EDUCATION & CERTIFICATIONS
Available upon request. Laravel Certified Developer, AWS Cloud Practitioner.`;

  return { title: "Generated Resume", content };
}

function buildInterviewCoach(input: Record<string, string>): AISuiteResult {
  const focus = input.focus?.trim() || "full-stack";
  const level = input.level?.trim() || "senior";

  const questionBank: Record<string, string[]> = {
    php: [
      "Explain the difference between CodeIgniter 3 and 4. When would you choose each?",
      "How do you prevent SQL injection and XSS in Laravel applications?",
      "Describe how you would optimize a slow MySQL query in a production app.",
      "What is your approach to migrating a legacy PHP monolith to a modular architecture?",
      "How do you structure REST APIs in Laravel with authentication and rate limiting?",
    ],
    react: [
      "How do you manage state in a large React application — Context vs Redux vs Zustand?",
      "Explain Server Components in Next.js and when you'd use them.",
      "How do you optimize Core Web Vitals for a React SPA?",
      "Describe your approach to form validation and error handling in React.",
      "How would you implement real-time updates using WebSockets in a Next.js app?",
    ],
    "full-stack": [
      "Walk me through building an enterprise HR system with Laravel and React.",
      "How do you integrate OpenAI or Gemini APIs securely in a production app?",
      "Describe your CI/CD pipeline for deploying a Dockerized PHP + Node stack.",
      "How do you handle authentication across a PHP API and React frontend?",
      "Tell me about a performance bottleneck you solved and how you measured improvement.",
    ],
  };

  const questions = questionBank[focus] ?? questionBank["full-stack"];
  const sampleAnswers = experiences
    .slice(0, 2)
    .map((e) => `At ${e.company}, I ${e.description.split(".")[0].toLowerCase()}.`)
    .join(" ");

  const content = `INTERVIEW PREP — ${focus.toUpperCase()} (${level})

PRACTICE QUESTIONS
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n\n")}

SAMPLE ANSWER FRAMEWORK (STAR)
Situation: Describe a real project from Venkat's portfolio.
Task: Explain the business goal or technical challenge.
Action: Detail technologies used — ${topSkills.slice(0, 5).join(", ")}.
Result: Quantify impact (e.g., 300% throughput improvement, 85% automation).

EXAMPLE FROM EXPERIENCE
${sampleAnswers}

TIPS
• Lead with architecture decisions before code details.
• Mention Docker, REST APIs, and AI integration when relevant.
• Prepare 2 project deep-dives: ${projects
    .filter((p) => p.featured)
    .slice(0, 2)
    .map((p) => p.title)
    .join(" & ")}.`;

  return { title: "Interview Coach Session", content };
}

function buildCodeReview(input: Record<string, string>): AISuiteResult {
  const code = input.code?.trim() || "";
  const language = input.language?.trim() || "php";

  if (!code) {
    return { title: "Code Review", content: "Please paste code to review." };
  }

  const findings: string[] = [];
  const suggestions: string[] = [];

  if (/mysql_query|mysqli_query.*\$_(GET|POST|REQUEST)/i.test(code)) {
    findings.push("🔴 Security: Possible SQL injection — use prepared statements / Eloquent / Query Builder.");
  }
  if (/eval\s*\(|exec\s*\(|shell_exec|system\s*\(/i.test(code)) {
    findings.push("🔴 Security: Dangerous function detected (eval/exec). Avoid in production code.");
  }
  if (/echo\s+\$_(GET|POST|REQUEST)/i.test(code)) {
    findings.push("🔴 Security: Unescaped output may cause XSS. Use htmlspecialchars() or framework escaping.");
  }
  if (/password\s*=\s*['"][^'"]+['"]/i.test(code)) {
    findings.push("🔴 Security: Hardcoded credentials found. Use environment variables.");
  }
  if (/\$_(GET|POST|REQUEST)\s*\[/i.test(code) && !/filter_|htmlspecialchars|e\(|request\(\)/i.test(code)) {
    findings.push("🟡 Security: Raw superglobal usage without sanitization.");
  }
  if (/var\s+\w+/i.test(code) && language === "javascript") {
    suggestions.push("Use const/let instead of var for block scoping.");
  }
  if (code.split("\n").some((line) => line.length > 120)) {
    suggestions.push("Break long lines (>120 chars) for readability.");
  }
  if (!/\/\*\*|\/\/|#/.test(code) && code.split("\n").length > 15) {
    suggestions.push("Add comments for complex logic blocks.");
  }
  if (/function\s+\w+\s*\([^)]{60,}\)/i.test(code)) {
    suggestions.push("Functions with many parameters — consider using DTOs or config objects.");
  }
  if (/SELECT\s+\*/i.test(code)) {
    suggestions.push("Avoid SELECT * — specify columns for performance.");
  }
  if (/sleep\s*\(|usleep\s*\(/i.test(code)) {
    suggestions.push("Blocking sleep in request handlers hurts scalability. Use queues instead.");
  }

  if (findings.length === 0) {
    findings.push("✅ No critical security patterns detected in static scan.");
  }
  if (suggestions.length === 0) {
    suggestions.push("✅ Code structure looks reasonable. Consider unit tests and type hints/TypeScript.");
  }

  const content = `CODE REVIEW — ${language.toUpperCase()}
Lines analyzed: ${code.split("\n").length}

FINDINGS
${findings.map((f) => `• ${f}`).join("\n")}

SUGGESTIONS
${suggestions.map((s) => `• ${s}`).join("\n")}

BEST PRACTICES (${language})
• Validate and sanitize all user input.
• Use framework conventions (Laravel MVC, React hooks, etc.).
• Add error handling and logging for production paths.
• Write tests for critical business logic.

Note: This is a static analysis scan. For deep review, connect an OpenAI/Gemini API key.`;

  return { title: "Code Review Report", content };
}

function buildProjectExplainer(input: Record<string, string>): AISuiteResult {
  const projectId = input.projectId?.trim();
  const project = projects.find((p) => p.id === projectId) ?? projects.find((p) => p.featured) ?? projects[0];

  const content = `CLIENT BRIEF: ${project.title}

THE CHALLENGE
${project.problem}

OUR SOLUTION
${project.solution}

ARCHITECTURE
${project.architecture}

TECHNOLOGIES USED
${project.technologies.join(" • ")}

BUSINESS VALUE
This project demonstrates Venkat's ability to deliver production-grade software with measurable outcomes. Similar engagements include ${services
    .slice(0, 3)
    .map((s) => s.title.toLowerCase())
    .join(", ")}.

NEXT STEPS
${project.liveUrl ? `• View live demo: ${project.liveUrl}\n` : ""}• Schedule a call to discuss a similar solution for your business.
• Contact: ${developer.email} | WhatsApp available on portfolio.`;

  return {
    title: `Project Brief: ${project.title}`,
    content,
    meta: { projectId: project.id },
  };
}

function buildCoverLetter(input: Record<string, string>): AISuiteResult {
  const company = input.company?.trim() || "[Company Name]";
  const jobTitle = input.jobTitle?.trim() || "Full Stack Developer";
  const motivation = input.motivation?.trim() || "I am excited about the opportunity to contribute my expertise.";

  const content = `${developer.name}
${developer.email} | ${developer.phone}
${developer.location}

Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${company}. With ${developer.experience} of experience as a ${developer.role}, I have built scalable web applications across the PHP ecosystem and modern JavaScript frameworks.

${motivation}

In my recent role at ${experiences[0].company}, I ${experiences[0].description.split(".")[0].toLowerCase()}. My technical toolkit includes ${topSkills.join(", ")}, and I have successfully delivered projects such as ${projects[0].title} and ${projects[1]?.title ?? projects[0].title}.

I am particularly drawn to ${company} because of its commitment to innovation. I would welcome the opportunity to discuss how my background in Laravel, React, Next.js, and AI API integration can support your team's goals.

Thank you for your consideration. I look forward to hearing from you.

Sincerely,
${developer.name}`;

  return { title: `Cover Letter — ${company}`, content };
}

function buildEmailWriter(input: Record<string, string>): AISuiteResult {
  const recipient = input.recipient?.trim() || "Client";
  const purpose = input.purpose?.trim() || "project inquiry follow-up";
  const tone = input.tone?.trim() || "professional";

  const greeting = tone === "friendly" ? `Hi ${recipient},` : `Dear ${recipient},`;
  const closing = tone === "friendly" ? "Best," : "Kind regards,";

  const content = `Subject: Re: ${purpose}

${greeting}

Thank you for reaching out regarding ${purpose}. I appreciate your interest in working together.

As a ${developer.role} with ${developer.experience} of experience, I specialize in ${topSkills.slice(0, 4).join(", ")}, and AI-powered application development. I recently completed ${projects[0].title}, where ${projects[0].solution.split(".")[0].toLowerCase()}.

I'd be happy to schedule a brief call to understand your requirements and share a tailored proposal. You can reach me at ${developer.email} or via WhatsApp for a quicker response.

${closing}
${developer.name}
${developer.role}
${developer.social.whatsapp}`;

  return { title: "Email Draft", content };
}

function buildCareerAdvisor(input: Record<string, string>): AISuiteResult {
  const currentLevel = input.currentLevel?.trim() || "mid-level";
  const goals = input.goals?.trim() || "Become a senior full stack developer";

  const content = `CAREER ADVICE — Personalized Path

YOUR PROFILE
Current level: ${currentLevel}
Goals: ${goals}

RECOMMENDED PATH (based on Venkat's journey)

Phase 1 — Foundation (0–2 years)
• Master one PHP framework deeply (Laravel or CodeIgniter).
• Build 2–3 full projects with MySQL, authentication, and REST APIs.
• Learn Git, basic Linux, and deployment fundamentals.

Phase 2 — Full Stack (2–4 years)
• Add React or Vue.js for modern frontends.
• Learn Docker and CI/CD pipelines.
• Contribute to open source or freelance projects for portfolio depth.

Phase 3 — Senior / Specialist (4+ years)
• Architecture: microservices, caching (Redis), queue systems.
• AI integration: OpenAI/Gemini APIs for real product features.
• Mentoring, code reviews, and system design interviews.

SKILLS TO PRIORITIZE FOR YOUR GOAL
${skills
  .sort((a, b) => b.level - a.level)
  .slice(0, 6)
  .map((s) => `• ${s.name} (target ${s.level}%+ proficiency)`)
  .join("\n")}

VENKAT'S EXPERIENCE MAP
${experiences.map((e) => `• ${e.period}: ${e.role} @ ${e.company}`).join("\n")}

ACTION ITEMS THIS MONTH
1. Ship one portfolio project with live demo.
2. Write a technical blog post (see Venkat's blog topics for inspiration).
3. Practice system design for ${goals.includes("senior") ? "senior" : "mid-level"} interviews.
4. Network on LinkedIn — connect with ${developer.location} tech community.

Want 1:1 mentorship? Contact Venkat via the portfolio contact form.`;

  return { title: "Career Roadmap", content };
}

function buildVoiceResponse(input: Record<string, string>): AISuiteResult {
  const transcript = input.transcript?.trim() || "";
  if (!transcript) {
    return { title: "Voice Assistant", content: "No speech detected. Try speaking again." };
  }

  const lower = transcript.toLowerCase();
  let content: string;

  if (lower.includes("skill")) {
    content = `Venkatesan's top skills are ${topSkills.join(", ")}.`;
  } else if (lower.includes("project")) {
    content = `Featured projects include ${projects
      .filter((p) => p.featured)
      .map((p) => p.title)
      .join(", ")}.`;
  } else if (lower.includes("hire") || lower.includes("contact")) {
    content = `You can hire Venkatesan via email at ${developer.email} or WhatsApp on the portfolio.`;
  } else if (lower.includes("experience")) {
    content = `He has ${developer.experience} of experience, currently as ${experiences[0].role} at ${experiences[0].company}.`;
  } else {
    content = `You asked: "${transcript}". Venkatesan is a ${developer.role} based in ${developer.location}. Ask about skills, projects, or hiring!`;
  }

  return { title: "Voice Response", content };
}

const handlers: Record<AISuiteToolSlug, (input: Record<string, string>) => AISuiteResult> = {
  "resume-builder": buildResume,
  "interview-coach": buildInterviewCoach,
  "code-reviewer": buildCodeReview,
  "project-explainer": buildProjectExplainer,
  "cover-letter": buildCoverLetter,
  "voice-assistant": buildVoiceResponse,
  "email-writer": buildEmailWriter,
  "career-advisor": buildCareerAdvisor,
};

export function runAISuiteTool(
  tool: AISuiteToolSlug,
  input: Record<string, string>
): AISuiteResult {
  const handler = handlers[tool];
  if (!handler) {
    return { title: "Error", content: "Unknown tool." };
  }
  return handler(input);
}

export const validToolSlugs = Object.keys(handlers) as AISuiteToolSlug[];
