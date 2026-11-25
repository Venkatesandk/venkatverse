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

export type ProjectCategory =
  | "Enterprise ERP"
  | "AI & EdTech"
  | "HR & Operations"
  | "Web Platforms";

export type OwnershipType =
  | "Technical Leadership"
  | "Individual Ownership"
  | "Team Contribution";

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string;
  overview: string;
  image: string;
  previewVariant?: "screenshot" | "lms-sync" | "admission-ai" | "biometric";
  technologies: string[];
  architecture: string;
  problem: string;
  existingLimitations: string[];
  solution: string;
  role?: string;
  ownership: OwnershipType;
  ownershipDetails: string;
  responsibilities: string[];
  databaseArchitecture: string[];
  apiIntegrations: string[];
  securityConsiderations: string[];
  performanceImprovements: string[];
  impact?: string;
  /** Quantified outcomes for recruiters */
  metrics?: string[];
  confidentialityNote?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  responsibilities?: string[];
  technologies: string[];
  current?: boolean;
}

export interface ProjectHighlightGroup {
  id: string;
  title: string;
  items: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

/** Platform / verified certifications & assessments (separate from education & learning) */
export interface ProfessionalCert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  kind: "Skill Assessment" | "Course Completion";
  url?: string;
}

export interface LearningActivity {
  id: string;
  title: string;
  provider: string;
  status: "In Progress" | "Ongoing Practice";
  focus: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content: string[];
}

export type SkillTier = "Core" | "Proficient" | "Working" | "Exploring";

export interface Skill {
  name: string;
  level: number;
  category: "backend" | "frontend" | "devops" | "ai" | "database";
  tier?: SkillTier;
}

export interface SkillCategoryEntry {
  name: string;
  tier: SkillTier;
  level: number;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  items: SkillCategoryEntry[];
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
