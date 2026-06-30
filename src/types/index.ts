export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  architecture: string;
  problem: string;
  solution: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "backend" | "frontend" | "devops" | "ai" | "database";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  sublabel?: string;
  change?: string;
  positive?: boolean;
  sparkline: number[];
}

export interface AISuiteTool {
  id: string;
  slug: AISuiteToolSlug;
  title: string;
  description: string;
  icon: string;
}

export type AISuiteToolSlug =
  | "resume-builder"
  | "interview-coach"
  | "code-reviewer"
  | "project-explainer"
  | "cover-letter"
  | "voice-assistant"
  | "email-writer"
  | "career-advisor";

export interface AISuiteRequest {
  tool: AISuiteToolSlug;
  input: Record<string, string>;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  period: string;
  status: "completed" | "in-progress" | "upcoming";
  items: string[];
}

export interface LiveVisitorCountry {
  country: string;
  flag: string;
  count: number;
  percent: number;
}
