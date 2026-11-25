import {
  developer,
  skills,
  experiences,
  projects,
  services,
  professionalCerts,
  certificates,
} from "@/data/portfolio";
import type { AISuiteToolSlug } from "@/types";

export interface AISuiteResult {
  title: string;
  content: string;
  meta?: Record<string, string>;
}

const topSkills = [...skills]
  .sort((a, b) => b.level - a.level)
  .slice(0, 8)
  .map((s) => s.name);

function buildResume(input: Record<string, string>): AISuiteResult {
  const targetRole = input.targetRole?.trim() || developer.role;
  const highlights = input.highlights?.trim();
  const expList = experiences
    .map((e) => {
      const bullets = (e.responsibilities ?? [e.description])
        .slice(0, 5)
        .map((r) => `  - ${r}`)
        .join("\n");
      return `• ${e.role} — ${e.company} (${e.period})\n${bullets}`;
    })
    .join("\n\n");
  const skillGroups = {
    backend: skills.filter((s) => s.category === "backend").map((s) => s.name),
    frontend: skills.filter((s) => s.category === "frontend").map((s) => s.name),
    other: skills
      .filter((s) => ["database", "devops", "ai"].includes(s.category))
      .map((s) => s.name),
  };

  const certLine = professionalCerts.map((c) => `${c.title} (${c.issuer}, ${c.date})`).join(", ");
  const degree = certificates[0];

  const content = `${developer.name.toUpperCase()}
${developer.location} | ${developer.email} | ${developer.phone}
LinkedIn: ${developer.social.linkedin} | GitHub: ${developer.social.github}

PROFESSIONAL SUMMARY
${developer.bio}

TARGET ROLE: ${targetRole}
Experience: ${developer.experience} (Since July 2021)

CORE SKILLS
Backend: ${skillGroups.backend.join(", ")}
Frontend: ${skillGroups.frontend.join(", ")}
Database, Cloud & AI: ${skillGroups.other.join(", ")}

PROFESSIONAL EXPERIENCE
${expList}

KEY ENTERPRISE PROJECTS
${projects
      .filter((p) => p.featured)
      .map((p) => `• ${p.title} — ${p.description}\n  Tech: ${p.technologies.join(", ")}`)
      .join("\n\n")}

${highlights ? `ADDITIONAL HIGHLIGHTS\n${highlights}\n` : ""}EDUCATION & VERIFIED ASSESSMENTS
• ${degree.title} — ${degree.issuer} (${degree.date})
• Assessments & Courses: ${certLine}`;

  return { title: "Generated Resume", content };
}

function buildInterviewCoach(input: Record<string, string>): AISuiteResult {
  const focus = input.focus?.trim() || "full-stack";
  const level = input.level?.trim() || "senior";

  const questionBank: Record<string, string[]> = {
    php: [
      "Explain the architectural differences between CodeIgniter 3 and CodeIgniter 4. When do you keep CI3 modules vs. migrating to CI4?",
      "How do you prevent SQL injection, CSRF, and XSS in CodeIgniter applications?",
      "Walk through how you diagnosed and reduced a slow MySQL academic report query from 8s to under 1.2s.",
      "How do you separate Controllers, Services, and database queries in a 20+ module PHP ERP?",
      "How do you design versioned REST APIs (/api/v1) with JWT authentication, idempotency, and rate limiting?",
    ],
    react: [
      "How do you structure state and server-rendered vs. client components in Next.js App Router?",
      "Explain how you handled resilient proctoring media chunk uploads in React on unreliable candidate networks.",
      "How do you optimize Core Web Vitals (LCP, INP, CLS) when using heavy client libraries like Three.js?",
      "Describe your approach to accessible forms, keyboard navigation, and client/server validation.",
      "How do you protect API routes called from a React/Next.js frontend against abuse and XSS?",
    ],
    "full-stack": [
      "Walk me through building an enterprise HRMS payroll engine integrated with .NET biometric attendance devices.",
      "How did you architect private Admission AI using Ollama and vLLM without exposing campus records to public clouds?",
      "How do you design idempotent synchronization between an Educational ERP and an external LMS?",
      "Describe how you scaled an Online Examination portal to 1,000+ concurrent candidates using AWS S3.",
      "What coding standards and review practices did you introduce when leading a 3-developer team?",
    ],
  };

  const questions = questionBank[focus] ?? questionBank["full-stack"];
  const sampleAnswers = experiences
    .slice(0, 2)
    .map((e) => `As ${e.role} at ${e.company}, ${e.description}`)
    .join(" ");

  const content = `INTERVIEW PREP — ${focus.toUpperCase()} (${level})

PRACTICE QUESTIONS
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n\n")}

SAMPLE ANSWER FRAMEWORK (STAR)
Situation: Describe a real module from Venkat's enterprise portfolio (e.g., Educational ERP, HRMS Payroll, LMS Sync, or Admission AI).
Task: Clarify the operational bottleneck or privacy/scale constraint.
Action: Detail the architecture and stack — ${topSkills.slice(0, 5).join(", ")}.
Result: Cite verified outcomes (e.g., 20+ modules serving 5,000+ users, 1,000+ concurrent exam candidates, 8s → <1.2s query tuning).

EXPERIENCE CONTEXT
${sampleAnswers}

TIPS
• Lead with module boundaries, database indexing, and security trade-offs before syntax details.
• Distinguish individual architectural ownership from 3-developer team leadership.
• Prepare 2 deep-dives: ${projects
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
    findings.push("🔴 Security: Possible SQL injection — use prepared statements or CodeIgniter Query Builder bindings.");
  }
  if (/eval\s*\(|exec\s*\(|shell_exec|system\s*\(/i.test(code)) {
    findings.push("🔴 Security: Dangerous execution function detected (eval/exec/shell_exec). Remove in production code.");
  }
  if (/echo\s+\$_(GET|POST|REQUEST)/i.test(code)) {
    findings.push("🔴 Security: Unescaped output may cause XSS. Use esc() / htmlspecialchars() before rendering.");
  }
  if (/password\s*=\s*['"][^'"]+['"]/i.test(code)) {
    findings.push("🔴 Security: Hardcoded credentials detected. Move secrets to server environment variables.");
  }
  if (/\$_(GET|POST|REQUEST)\s*\[/i.test(code) && !/filter_|htmlspecialchars|esc\(|getPost|getGet/i.test(code)) {
    findings.push("🟡 Security: Raw superglobal access without framework validation or escaping.");
  }
  if (/var\s+\w+/i.test(code) && language === "javascript") {
    suggestions.push("Use const/let instead of var for block scoping.");
  }
  if (code.split("\n").some((line) => line.length > 120)) {
    suggestions.push("Break long lines (>120 chars) for readability during code reviews.");
  }
  if (!/\/\*\*|\/\/|#/.test(code) && code.split("\n").length > 15) {
    suggestions.push("Add concise docblocks explaining non-obvious business rules or invariants.");
  }
  if (/function\s+\w+\s*\([^)]{60,}\)/i.test(code)) {
    suggestions.push("Functions with many parameters — consider a typed request/DTO object.");
  }
  if (/SELECT\s+\*/i.test(code)) {
    suggestions.push("Avoid SELECT * — list required columns explicitly and verify composite MySQL indexes.");
  }
  if (/sleep\s*\(|usleep\s*\(/i.test(code)) {
    suggestions.push("Blocking sleep in HTTP handlers hurts concurrency. Offload to background jobs/cron.");
  }

  if (findings.length === 0) {
    findings.push("✅ No critical security patterns detected in static scan.");
  }
  if (suggestions.length === 0) {
    suggestions.push("✅ Code structure looks clean. Add boundary validation and unit/integration tests.");
  }

  const content = `CODE REVIEW — ${language.toUpperCase()}
Lines analyzed: ${code.split("\n").length}

FINDINGS
${findings.map((f) => `• ${f}`).join("\n")}

SUGGESTIONS
${suggestions.map((s) => `• ${s}`).join("\n")}

BEST PRACTICES (${language})
• Validate and sanitize all user input at the controller/API boundary.
• Keep controllers thin; isolate business logic in Services and parameterized DB queries.
• Add structured error logging without leaking internal traces to clients.
• Write tests for critical payroll, permission, or state-transition logic.

Note: Static pattern scan fallback — connect GEMINI_API_KEY on the server for deeper AI review.`;

  return { title: "Code Review Report", content };
}

function buildProjectExplainer(input: Record<string, string>): AISuiteResult {
  const projectId = input.projectId?.trim();
  const project =
    projects.find((p) => p.id === projectId || p.slug === projectId) ??
    projects.find((p) => p.featured) ??
    projects[0];

  const content = `CASE STUDY BRIEF: ${project.title}

OVERVIEW
${project.overview}

BUSINESS PROBLEM
${project.problem}

SOLUTION ARCHITECTURE
${project.architecture}
${project.solution}

OWNERSHIP & RESPONSIBILITIES
• ${project.ownership}: ${project.ownershipDetails}
${project.responsibilities.map((r) => `• ${r}`).join("\n")}

TECHNOLOGIES USED
${project.technologies.join(" • ")}

MEASURED & REPORTED IMPACT
${(project.metrics ?? [project.impact ?? ""]).filter(Boolean).map((m) => `• ${m}`).join("\n")}

NEXT STEPS
• Explore full case study: ${developer.siteUrl}/projects/${project.slug}
• Related capabilities: ${services.slice(0, 3).map((s) => s.title).join(", ")}
• Contact: ${developer.email} | WhatsApp or Interview Request on portfolio.`;

  return {
    title: `Case Study Brief: ${project.title}`,
    content,
    meta: { projectId: project.id, slug: project.slug },
  };
}

function buildCoverLetter(input: Record<string, string>): AISuiteResult {
  const company = input.company?.trim() || "[Company Name]";
  const jobTitle = input.jobTitle?.trim() || "Lead / Senior Application Developer";
  const motivation =
    input.motivation?.trim() ||
    "I am eager to bring enterprise architecture discipline and end-to-end delivery ownership to your engineering team.";

  const content = `${developer.name}
${developer.email} | ${developer.phone}
${developer.location}

Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${company}. With ${developer.experience} of production experience (since July 2021) — currently serving as ${developer.role} at ${experiences[0].company} — I specialize in architecting scalable PHP 7/8, CodeIgniter 3/4, and MySQL enterprise applications alongside modern React/Next.js and private AI workflows.

${motivation}

Over three consecutive promotions from Junior Software Developer to Lead Application Developer, I have architected 20+ ERP modules serving 5,000+ institutional users, integrated LMS course and enrollment syncs, automated multi-branch HRMS payroll with .NET biometric attendance, and deployed private Admission AI assistants on Ollama and vLLM. I have also supported 1,000+ concurrent online exam candidates with React, Python, and AWS S3.

I would welcome the opportunity to discuss how my background in enterprise PHP architecture, REST API design, MySQL performance tuning, and team leadership can contribute to ${company}'s engineering roadmap.

Thank you for your time and consideration.

Sincerely,
${developer.name}`;

  return { title: `Cover Letter — ${company}`, content };
}

function buildEmailWriter(input: Record<string, string>): AISuiteResult {
  const recipient = input.recipient?.trim() || "Hiring Team";
  const purpose = input.purpose?.trim() || "opportunity / project inquiry";
  const tone = input.tone?.trim() || "professional";

  const greeting = tone === "friendly" ? `Hi ${recipient},` : `Dear ${recipient},`;
  const closing = tone === "friendly" ? "Best," : "Kind regards,";

  const content = `Subject: Re: ${purpose}

${greeting}

Thank you for reaching out regarding ${purpose}. I appreciate the opportunity to connect.

As a ${developer.role} with ${developer.experience} of experience at eNova Software, I specialize in PHP 7/8, CodeIgniter 3/4, MySQL, REST APIs, and enterprise ERP/HRMS platforms — alongside React/Next.js, AWS, and private AI deployments (Ollama / vLLM). Recently, I led the architecture of our 20+ module Educational ERP serving 5,000+ users, including LMS integration and on-premise Admission AI.

I would be glad to schedule a brief call to discuss your requirements or role expectations. You can reach me directly at ${developer.email}, via WhatsApp, or through the interview request form on Venkatverse.

${closing}
${developer.name}
${developer.role}
${developer.siteUrl}`;

  return { title: "Email Draft", content };
}

function buildCareerAdvisor(input: Record<string, string>): AISuiteResult {
  const currentLevel = input.currentLevel?.trim() || "mid-level";
  const goals = input.goals?.trim() || "Advance to Lead Application Developer";
  const lowerGoal = `${currentLevel} ${goals}`.toLowerCase();

  const isArchitect =
    /architect|solution architect|system design|microservices|cloud/.test(lowerGoal);
  const isSenior =
    /senior|lead|4\+|architect|manager|mentor/.test(lowerGoal) ||
    currentLevel.toLowerCase().includes("senior") ||
    currentLevel.toLowerCase().includes("lead");
  const isJunior =
    /junior|fresher|0–2|0-2|entry/.test(lowerGoal) && !isSenior && !isArchitect;

  let pathBlock: string;
  let skillFocus: string[];
  let actionItems: string[];

  if (isArchitect || (isSenior && /architect|cloud|microservice|ai/.test(lowerGoal))) {
    pathBlock = `Phase 1 — Architecture foundations (0–6 months)
• Deepen system design: caching, async queues, MySQL indexing/partitioning, and clean module boundaries.
• Document end-to-end architecture for an enterprise ERP / HRMS workflow using ADRs.
• Strengthen AWS fundamentals (EC2, S3, RDS, IAM, VPC) with production runbooks.

Phase 2 — Integration & Private AI (6–18 months)
• Design idempotent REST contracts and reconciliation jobs across external systems (e.g., LMS or biometric hardware).
• Add observability (structured logs, request IDs, latency metrics) to high-traffic endpoints.
• Build privacy-safe AI gateways using Ollama / vLLM or cloud APIs with grounding and rate limits.

Phase 3 — Solution Architect readiness (18–36 months)
• Lead cross-team architecture reviews, security threat modeling, and non-functional requirements.
• Mentor senior engineers and practice system-design trade-off interviews.`;
    skillFocus = [
      "System design & ADRs",
      "MySQL performance & schema architecture",
      "AWS infrastructure & security",
      "Idempotent REST & event integration",
      "Private AI serving (Ollama / vLLM) & guardrails",
      "Technical leadership & mentoring",
    ];
    actionItems = [
      "Write one Architecture Decision Record (ADR) for a production ERP or API module.",
      "Profile and optimize your slowest database query with EXPLAIN.",
      "Implement rate limits, timeouts, and grounded fallbacks on an AI endpoint.",
      "Run a peer architecture review with teammates this month.",
    ];
  } else if (isSenior) {
    pathBlock = `Phase 1 — Senior ownership (0–6 months)
• Own an enterprise module end-to-end: schema, REST API, UI, security, and production rollout.
• Establish coding standards and thorough pull-request reviews.
• Document runbooks for high-stakes processes (e.g., payroll or exam runs).

Phase 2 — Lead depth (6–18 months)
• Drive automated testing, zero-downtime release checklists, and query profiling.
• Introduce modern frontend or Python/AI capabilities where they solve real bottlenecks.
• Mentor junior developers consistently.

Phase 3 — Staff / Lead progression (18–36 months)
• Influence product roadmap, estimation accuracy, and cross-module architecture.
• Practice senior/lead system design case studies.`;
    skillFocus = [
      "PHP 7/8 & CodeIgniter 3/4",
      "MySQL indexing & query tuning",
      "REST API versioning & JWT/RBAC",
      "React / Next.js collaboration",
      "AWS EC2/S3 deployment",
      "Mentoring & sprint leadership",
    ];
    actionItems = [
      "Ship one measurable latency or reliability improvement and document the before/after.",
      "Publish a technical post from a real production lesson.",
      "Practice senior system design walkthroughs weekly.",
      `Expand your engineering network in ${developer.location} and remote communities.`,
    ];
  } else if (isJunior) {
    pathBlock = `Phase 1 — Core backend foundations (0–2 years)
• Master PHP 7/8 and a structured MVC framework like CodeIgniter 4.
• Build real CRUD + RBAC + MySQL projects with normalized schemas and REST APIs.
• Learn Git branching, input validation, and SQL injection/XSS prevention.

Phase 2 — Full-Stack growth (2–4 years)
• Add React or Next.js for responsive modern interfaces.
• Learn basic AWS deployment (EC2, S3) and slow-query debugging.
• Own small production modules end to end.

Phase 3 — Senior path (4+ years)
• Architecture boundaries, idempotent integrations, caching, and mentoring juniors.`;
    skillFocus = [...skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 6)
      .map((s) => `${s.name} (target ${s.level}%+)`);
    actionItems = [
      "Build and deploy one complete full-stack project with clean documentation.",
      "Write one technical article explaining a bug or integration you solved.",
      "Practice core PHP, SQL, and REST API fundamentals weekly.",
      "Seek regular code review feedback from senior engineers.",
    ];
  } else {
    pathBlock = `Phase 1 — Strengthen core stack (0–6 months)
• Deepen PHP + MySQL + REST API fundamentals on production features.
• Improve frontend delivery with JavaScript ES6+ and React/Next.js.
• Practice writing clean Service classes instead of fat controllers.

Phase 2 — Mid → Senior (6–24 months)
• Own modules end-to-end with validation, audit logs, and performance profiling.
• Learn AWS deployment basics and automated regression checks.
• Ship practical AI or external-system integrations safely.

Phase 3 — Senior path (24–36 months)
• Lead code reviews, mentor juniors, and practice system design.`;
    skillFocus = [...skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 6)
      .map((s) => `${s.name} (target ${s.level}%+)`);
    actionItems = [
      "Refactor one complex controller into testable service methods.",
      "Write one short technical case study from your recent work.",
      "Practice senior-level database and API design questions.",
      "Connect with engineering leads on LinkedIn.",
    ];
  }

  const content = `CAREER ADVICE — Personalized Path

YOUR PROFILE
Current level: ${currentLevel}
Goals: ${goals}

RECOMMENDED PATH (grounded in Venkat's progression)

${pathBlock}

SKILLS TO PRIORITIZE
${skillFocus.map((s) => `• ${s}`).join("\n")}

VENKAT'S VERIFIED PROGRESSION
${experiences.map((e) => `• ${e.period}: ${e.role} @ ${e.company}`).join("\n")}

ACTION ITEMS THIS MONTH
${actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}`;

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
    content = `Venkatesan's core specialization is PHP 7/8, CodeIgniter 3 and 4, MySQL, REST APIs, and enterprise ERP architecture, alongside React, Next.js, Python, AWS, and private AI with Ollama and vLLM.`;
  } else if (lower.includes("project") || lower.includes("erp") || lower.includes("lms") || lower.includes("ai")) {
    content = `His key enterprise projects include Educational ERP, LMS Integration, HRMS and Payroll, Admission AI on Ollama and vLLM, Online Examination, Biometric Attendance, Ticket Management, and Website CMS.`;
  } else if (lower.includes("hire") || lower.includes("contact") || lower.includes("interview")) {
    content = `You can contact Venkatesan at ${developer.email}, request an interview directly on the portfolio, or reach him on WhatsApp.`;
  } else if (lower.includes("experience")) {
    content = `He has ${developer.experience} of experience since July 2021, promoted three times at eNova Software to his current role as Lead Application Developer.`;
  } else {
    content = `You asked: "${transcript}". Venkatesan is a ${developer.role} in ${developer.location} specializing in PHP, CodeIgniter, enterprise ERP, and private AI workflows.`;
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
