import {
  developer,
  experiences,
  getResumeSummary,
  keyAchievements,
  projects,
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
  "job", "team", "teams", "strong", "good", "etc", "including",
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
  lms: ["lms", "learning management", "scorm"],
  hrms: ["hrms", "payroll", "biometric", "attendance"],
  leadership: ["lead", "leadership", "mentor", "mentoring", "team lead"],
  devops: ["devops", "ci/cd", "deployment", "git"],
  bootstrap: ["bootstrap"],
  html: ["html", "html5"],
  css: ["css", "css3"],
  ai: ["ai", "gemini", "genai", "llm", "ollama", "vllm"],
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
    for (const item of cat.items) add(item.name, item.name);
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
  add("LMS Integration", "lms", "scorm");
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

  const extraNeedles = [
    ["docker", "docker"],
    ["kubernetes", "kubernetes"],
    ["laravel", "laravel"],
    ["postgresql", "postgresql"],
    ["mongodb", "mongodb"],
    ["redis", "redis"],
    ["graphql", "graphql"],
  ] as const;

  for (const [needle, key] of extraNeedles) {
    if (lower.includes(needle)) found.add(key);
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
      recommendations: [
        "Paste a fuller job description (role, required skills, responsibilities) for an accurate ATS match.",
      ],
      summary: "Need more JD detail to score this role.",
    };
  }

  const bag = portfolioKeywordBag();
  const jdTokens = extractTokens(jd);
  const jdReqs = detectJdRequirements(jd);

  const matchedLabels = new Set<string>();
  const gapLabels = new Set<string>();

  const verifiedKeys = new Set([
    "php", "codeigniter", "mysql", "javascript", "rest", "erp", "lms", "hrms",
    "leadership", "ai", "aws", "jquery", "ajax", "html", "css", "bootstrap",
    "nextjs", "react", "python", "typescript", "devops",
  ]);

  for (const req of jdReqs) {
    const aliases = ALIASES[req] ?? [req];
    const portfolioHas =
      verifiedKeys.has(req) ||
      skills.some((s) => aliases.some((a) => normalize(s.name).includes(normalize(a).split(" ")[0]))) ||
      projects.some((p) =>
        p.technologies.some((t) => aliases.some((a) => normalize(t).includes(normalize(a).split(" ")[0])))
      );

    const display =
      req === "nextjs" ? "Next.js" :
        req === "codeigniter" ? "CodeIgniter" :
          req === "rest" ? "REST API" :
            req === "lms" ? "LMS Integration" :
              req === "ai" ? "AI / LLM (Ollama, vLLM, Gemini)" :
                req === "leadership" ? "Team Leadership" :
                  req.charAt(0).toUpperCase() + req.slice(1);

    if (portfolioHas) matchedLabels.add(display);
    else gapLabels.add(display);
  }

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
    ? (matchedLabels.size / Math.max(jdReqs.length + gapLabels.size, 1)) * 70
    : 45;
  const overlapScore = considered ? (hit / considered) * 30 : 15;
  let score = Math.round(Math.min(98, Math.max(35, reqScore + overlapScore)));

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
    recommendations.push("Strong alignment — request an interview and download the latest resume PDF.");
    recommendations.push("Focus discussion on Educational ERP (20+ modules), HRMS/Biometrics, and private Ollama/vLLM AI.");
  } else if (score >= 70) {
    recommendations.push("Good match — highlight overlapping PHP/CodeIgniter, MySQL, and REST API architecture.");
    recommendations.push("Review relevant enterprise case studies for architectural depth.");
  } else {
    recommendations.push("Partial match — evaluate transferable ERP, REST API, and MySQL optimization experience.");
    recommendations.push("Address unlisted stack items honestly during technical screening.");
  }

  if (gapLabels.size) {
    recommendations.push(`Not in verified stack: ${[...gapLabels].slice(0, 4).join(", ")} — discuss adjacent experience.`);
  }

  const verdict =
    score >= 90 ? "Excellent Fit" :
      score >= 80 ? "Strong Fit" :
        score >= 70 ? "Good Fit" :
          score >= 55 ? "Partial Fit" :
            "Weak Fit";

  const summary = `${verdict} (${score}/100) for ${developer.name}. Matched ${matchedLabels.size} key areas against ${getResumeSummary().slice(0, 120)}…`;

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
