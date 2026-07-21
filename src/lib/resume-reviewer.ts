import {
  developer,
  experiences,
  keyAchievements,
  projects,
  resumeSummary,
  skills,
  skillCategories,
} from "@/data/portfolio";

export interface ResumeReviewResult {
  score: number;
  verdict: string;
  matched: string[];
  gaps: string[];
  strengths: string[];
  recommendations: string[];
  summary: string;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "to", "of", "in", "for", "with", "on", "at", "by",
  "from", "as", "is", "are", "be", "this", "that", "will", "you", "your", "we",
  "our", "their", "have", "has", "had", "can", "must", "should", "able", "using",
  "use", "used", "work", "working", "experience", "experiences", "role", "roles",
  "job", "team", "teams", "strong", "good", "etc", "including", "etc",
]);

const ALIASES: Record<string, string[]> = {
  php: ["php", "php7", "php8"],
  codeigniter: ["codeigniter", "ci3", "ci4", "code igniter"],
  mysql: ["mysql", "sql", "mariadb"],
  javascript: ["javascript", "js", "es6", "ecmascript"],
  jquery: ["jquery"],
  ajax: ["ajax"],
  react: ["react", "reactjs"],
  nextjs: ["next.js", "nextjs", "next"],
  typescript: ["typescript", "ts"],
  python: ["python"],
  aws: ["aws", "ec2", "s3", "bedrock", "amazon web services"],
  rest: ["rest", "restful", "api", "apis"],
  erp: ["erp", "enterprise resource"],
  hrms: ["hrms", "payroll", "biometric", "attendance"],
  leadership: ["lead", "leadership", "mentor", "mentoring", "team lead"],
  devops: ["devops", "ci/cd", "deployment", "git"],
  bootstrap: ["bootstrap"],
  html: ["html", "html5"],
  css: ["css", "css3"],
  ai: ["ai", "gemini", "genai", "llm", "machine learning"],
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9.+#/\s-]/g, " ");
}

function extractTokens(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function portfolioKeywordBag(): Map<string, string> {
  const bag = new Map<string, string>();

  const add = (label: string, ...sources: string[]) => {
    for (const source of sources) {
      const n = normalize(source);
      bag.set(n, label);
      for (const part of n.split(/[\s./-]+/)) {
        if (part.length > 1) bag.set(part, label);
      }
    }
  };

  for (const skill of skills) add(skill.name, skill.name);
  for (const cat of skillCategories) {
    for (const item of cat.items) add(item, item);
  }
  for (const project of projects) {
    add(project.title, project.title, ...project.technologies);
  }
  for (const exp of experiences) {
    add(exp.role, exp.role, ...exp.technologies, ...(exp.responsibilities ?? []));
  }
  for (const [key, aliases] of Object.entries(ALIASES)) {
    add(key, ...aliases);
  }

  add("Next.js", "next.js", "nextjs");
  add("CodeIgniter", "codeigniter", "ci3", "ci4");
  add("REST API", "rest api", "restful");
  add("Team Leadership", "leadership", "mentor", "mentoring");

  return bag;
}

function detectJdRequirements(jd: string): string[] {
  const found = new Set<string>();
  const lower = normalize(jd);

  for (const [label, aliases] of Object.entries(ALIASES)) {
    if (aliases.some((a) => lower.includes(normalize(a)))) {
      found.add(label);
    }
  }

  // Capture common phrase skills
  const phrases = [
    ["codeigniter", "CodeIgniter"],
    ["next.js", "Next.js"],
    ["rest api", "REST API"],
    ["system design", "System Design"],
    ["database design", "Database Design"],
    ["performance optimization", "Performance Optimization"],
    ["team lead", "Team Leadership"],
  ] as const;

  for (const [needle, label] of phrases) {
    if (lower.includes(needle)) found.add(label.toLowerCase().replace(/\s+/g, ""));
  }

  return [...found];
}

export function reviewResumeAgainstJd(jobDescription: string): ResumeReviewResult {
  const jd = jobDescription.trim();
  if (jd.length < 40) {
    return {
      score: 0,
      verdict: "Job description too short",
      matched: [],
      gaps: [],
      strengths: [],
      recommendations: ["Paste a fuller job description (role, required skills, responsibilities) for an accurate ATS match."],
      summary: "Need more JD detail to score this role.",
    };
  }

  const bag = portfolioKeywordBag();
  const jdTokens = extractTokens(jd);
  const jdReqs = detectJdRequirements(jd);

  const matchedLabels = new Set<string>();
  const gapLabels = new Set<string>();

  // Score known requirement aliases
  for (const req of jdReqs) {
    const aliases = ALIASES[req] ?? [req];
    const has = aliases.some((a) => {
      const n = normalize(a);
      return [...bag.keys()].some((k) => k.includes(n) || n.includes(k));
    });
    // Portfolio always has these core skills if in ALIASES and in skills/projects
    const portfolioHas =
      skills.some((s) => aliases.some((a) => normalize(s.name).includes(normalize(a).split(" ")[0]))) ||
      projects.some((p) =>
        p.technologies.some((t) => aliases.some((a) => normalize(t).includes(normalize(a).split(" ")[0])))
      ) ||
      ["php", "codeigniter", "mysql", "javascript", "rest", "erp", "hrms", "leadership", "ai", "aws", "jquery", "ajax", "html", "css", "bootstrap", "nextjs", "react"].includes(req);

    const display =
      req === "nextjs" ? "Next.js" :
      req === "codeigniter" ? "CodeIgniter" :
      req === "rest" ? "REST API" :
      req === "ai" ? "AI Integration" :
      req === "leadership" ? "Team Leadership" :
      req.charAt(0).toUpperCase() + req.slice(1);

    if (portfolioHas) matchedLabels.add(display);
    else gapLabels.add(display);
  }

  // Token overlap boost
  let hit = 0;
  let considered = 0;
  for (const token of jdTokens) {
    if (token.length < 3) continue;
    considered += 1;
    if (bag.has(token) || [...bag.keys()].some((k) => k.includes(token) || token.includes(k))) {
      hit += 1;
      const label = bag.get(token);
      if (label) matchedLabels.add(label);
    }
  }

  const reqScore = jdReqs.length
    ? (matchedLabels.size / Math.max(jdReqs.length, 1)) * 70
    : 45;
  const overlapScore = considered ? (hit / considered) * 30 : 15;
  let score = Math.round(Math.min(98, Math.max(35, reqScore + overlapScore)));

  // Senior/lead JD bonus if portfolio has leadership
  if (/lead|senior|architect/i.test(jd) && /lead|mentor|promoted/i.test(developer.bio + keyAchievements.join(" "))) {
    score = Math.min(98, score + 4);
  }

  const strengths = [
    `${developer.role} with ${developer.experience} at eNova Software`,
    "3× promoted — Junior → Lead Application Developer",
    ...projects.slice(0, 3).map((p) => `${p.title}: ${p.impact ?? p.description}`),
    ...keyAchievements.slice(0, 2),
  ].slice(0, 5);

  const recommendations: string[] = [];
  if (score >= 85) {
    recommendations.push("Strong match — book an interview and send the resume PDF with this JD noted.");
    recommendations.push("Lead with Educational ERP + HRMS + Online Exam metrics in the first conversation.");
  } else if (score >= 70) {
    recommendations.push("Good match — emphasize overlapping tech and quantify impact in your cover note.");
    recommendations.push("Mirror 3–5 exact keywords from the JD in your resume summary.");
  } else {
    recommendations.push("Partial match — highlight transferable ERP/API experience and address skill gaps honestly.");
    recommendations.push("Consider a short cover letter explaining adjacent experience for missing keywords.");
  }

  if (gapLabels.size) {
    recommendations.push(`Address gaps: ${[...gapLabels].slice(0, 4).join(", ")} — note learning status or related work.`);
  }

  recommendations.push(`Use portfolio AI Cover Letter tool with this JD for a tailored outreach email.`);

  const verdict =
    score >= 90 ? "Excellent Fit" :
    score >= 80 ? "Strong Fit" :
    score >= 70 ? "Good Fit" :
    score >= 55 ? "Partial Fit" :
    "Weak Fit";

  const summary = `${verdict} (${score}/100) for ${developer.name}. Matched ${matchedLabels.size} key requirements against ${resumeSummary.slice(0, 120)}…`;

  return {
    score,
    verdict,
    matched: [...matchedLabels].slice(0, 12),
    gaps: [...gapLabels].slice(0, 8),
    strengths,
    recommendations: recommendations.slice(0, 5),
    summary,
  };
}

export function formatResumeReviewMarkdown(result: ResumeReviewResult): string {
  return `## ATS Match: ${result.score}/100 — ${result.verdict}

${result.summary}

### Matched Keywords
${result.matched.length ? result.matched.map((m) => `- **${m}**`).join("\n") : "- None detected"}

### Potential Gaps
${result.gaps.length ? result.gaps.map((g) => `- ${g}`).join("\n") : "- No major gaps detected"}

### Candidate Strengths
${result.strengths.map((s) => `- ${s}`).join("\n")}

### Recommendations
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;
}
