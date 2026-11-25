import type {
  BlogPost,
  Certificate,
  Experience,
  FAQ,
  LearningActivity,
  ProfessionalCert,
  Project,
  ProjectHighlightGroup,
  Service,
  Skill,
  Testimonial,
} from "@/types";

import {
  getExperienceLabel,
  getExperiencePlusLabel,
  getExperienceValue,
} from "@/lib/experience";

/** Joined July 2021 — experience is calculated dynamically at runtime */
export const CAREER_JOINED = "July 2021";

export const developer = {
  name: "Venkatesan D",
  firstName: "Venkatesan",
  lastName: "D",
  role: "Lead Application Developer",
  headline: "Enterprise PHP & ERP Architecture · Modern Web & Private AI",
  tagline: "I architect reliable ERP platforms, REST APIs, and private AI workflows.",
  get heroSubheadline() {
    return `Lead Application Developer · ${getExperiencePlusLabel()} · PHP 7/8, CodeIgniter 3/4, MySQL`;
  },
  get experience() {
    return getExperienceLabel();
  },
  get experiencePlus() {
    return getExperiencePlusLabel();
  },
  location: "Coimbatore, Tamil Nadu, India",
  email: "venkatvs131@gmail.com",
  phone: "+91 96882 13541",
  phoneRaw: "919688213541",
  get bio() {
    const label = getExperienceLabel();
    return `Lead Application Developer with ${label} of enterprise software engineering experience at eNova Software. Promoted three times from Junior Software Developer to Lead Application Developer. Primary specialization in PHP 7/8, CodeIgniter 3/4, MySQL, enterprise ERP architecture, REST API development, LMS integration, HRMS & payroll, and biometric device integration — serving 5,000+ institutional users across 20+ production modules. Additional technical specialization in React, Next.js, Python, AWS (EC2/S3), Gemini AI, and private AI inference using Ollama and vLLM.`;
  },
  heroDescription:
    "Promoted 3× at eNova Software. Architected 20+ enterprise ERP modules for educational institutions — admissions, LMS integration, HRMS & payroll, biometric attendance, online exams, and private AI (Ollama / vLLM) serving 5,000+ users.",
  taglines: [
    "Lead Application Developer · PHP 7/8 & CodeIgniter 3/4",
    "3× Promoted · 20+ Enterprise ERP Modules in Production",
    "LMS Integration · HRMS & Payroll · Biometric Attendance",
    "React & Next.js · Python · Private AI (Ollama / vLLM) · AWS",
  ],
  social: {
    github: "https://github.com/Venkatesandk",
    linkedin: "https://linkedin.com/in/venkatesan-devaraj",
    instagram: "https://www.instagram.com/_s_i_n_g_l_e_b_o_i",
    whatsapp:
      "https://wa.me/919688213541?text=Hello%20Venkatesan%2C%20I%20would%20like%20to%20discuss%20a%20role%20or%20project.",
    email: "mailto:venkatvs131@gmail.com",
  },
  calendarUrl:
    "https://wa.me/919688213541?text=Hi%20Venkatesan%2C%20I%27d%20like%20to%20schedule%20a%2030-minute%20interview.",
  hirePitch:
    "3× Promoted · 20+ ERP Modules · 5,000+ Users · LMS & Biometric Integration · Private AI (Ollama / vLLM)",
  specialties: [
    "PHP 7/8 & CodeIgniter 3/4",
    "20+ Enterprise ERP Modules",
    "LMS & Biometric Integration",
    "HRMS & Automated Payroll",
    "Private AI (Ollama / vLLM) & AWS",
  ],
  resumeUrl: "/resume.pdf",
  photoUrl: "/profile-avatar.png",
  photoFullUrl: "/profile.png",
  siteUrl: "https://venkatverse.vercel.app",
  responseTime: "Responds within 24 hours",
};

export const technicalSpecializations = {
  primary: {
    badge: "Core Specialization",
    title: "PHP & Enterprise ERP Architecture",
    summary:
      "Deep production ownership of modular PHP 7/8 and CodeIgniter 3/4 systems, MySQL data modeling, secure REST APIs, and campus/HR operations.",
    areas: [
      {
        title: "PHP 7/8 & CodeIgniter 3/4",
        detail:
          "Modular MVC architecture, thin controllers, service layers, CI3 maintenance & CI4 greenfield migration.",
      },
      {
        title: "Enterprise ERP & MySQL",
        detail:
          "20+ interconnected academic & finance modules; query and index tuning (8s down to <1.2s on high-traffic reports).",
      },
      {
        title: "HRMS, Payroll & Biometrics",
        detail:
          "Automated salary computation for 200+ staff across 4 branches with .NET biometric punch ingestion via REST APIs.",
      },
      {
        title: "LMS & REST API Integration",
        detail:
          "Versioned REST APIs (/api/v1), JWT auth, RBAC, audit trails, and idempotent LMS–ERP enrollment/progress sync.",
      },
    ],
  },
  additional: {
    badge: "Additional Specialization",
    title: "Modern Web, Cloud & Private AI Inference",
    summary:
      "Complementing enterprise PHP backends with React/Next.js interfaces, Python services, AWS infrastructure, and on-premise LLM deployments.",
    areas: [
      {
        title: "Private AI (Ollama & vLLM)",
        detail:
          "On-premise Admission AI assistants for enquiry chat, eligibility guidance, and document Q&A with institutional data kept on-prem.",
      },
      {
        title: "React, Next.js & Python",
        detail:
          "Interactive proctoring frontends, modern TypeScript dashboards, and Python inference/media-processing gateways.",
      },
      {
        title: "Cloud AI & AWS (EC2 / S3)",
        detail:
          "Gemini API integration for question paper generation, AWS S3 signed media storage, and EC2 production deployments.",
      },
      {
        title: "Online Exam Infrastructure",
        detail:
          "Remote examination workflows supporting 1,000+ concurrent candidates with anti-cheat hooks and result processing.",
      },
    ],
  },
};

export const aboutContent = {
  intro:
    "Promoted three times since joining in July 2021 — progressing from Junior Software Developer to Lead Application Developer at eNova Software. I architect and deliver enterprise-grade ERP, LMS, HRMS, and AI-assisted systems for educational institutions, government projects, and corporate teams.",
  impacts: [
    "Architected 20+ ERP modules in production serving 5,000+ institutional users across Tamil Nadu (verified scale)",
    "Unified 12+ campus workflows into a single ERP platform — reducing manual admin effort by ~60% (estimated)",
    "Integrated LMS modules (courses, enrollments, content hooks, progress) with ERP student & academic records",
    "Built Admission AI on private Ollama & vLLM inference servers — enquiry chat, eligibility guidance, and document Q&A without sending campus data to public clouds",
    "Built Online Examination portal supporting 1,000+ concurrent candidates with AWS S3-backed proctoring (verified capacity)",
    "Reduced payroll processing time by ~50% (estimated) through biometric attendance sync and automated salary computation across 200+ employees",
    "Optimized MySQL reporting queries from 8s to under 1.2s on high-traffic academic modules",
    "Led a 3-developer team, mentored junior engineers, and introduced Gemini AI question generation",
  ],
  closing:
    "Core depth in PHP 7/8, CodeIgniter 3/4, MySQL, and REST APIs — paired with React, Next.js, Python, AWS, and private LLM serving (Ollama / vLLM). Open to Lead and Senior Application Developer roles where I can own architecture and delivery end to end.",
};

export const getResumeSummary = () =>
  `Lead Application Developer with ${getExperienceLabel()} of enterprise software engineering experience (since July 2021), specializing in PHP 7/8, CodeIgniter 3/4, MySQL, and enterprise ERP/HRMS platforms. Promoted three consecutive times at eNova Software, where I architect and deliver Educational ERP (20+ modules, 5,000+ institutional users), LMS integrations, biometric attendance & payroll systems, and online exam portals (1,000+ concurrent users). Additional specialization in React, Next.js, Python, AWS (EC2/S3), Gemini AI, and private AI inference using Ollama and vLLM for Admission AI. Proven track record in REST API design, MySQL query optimization, team leadership, and mentoring.`;

export const resumeSummary = getResumeSummary();

export function getLiveStats() {
  return [
    { label: "Enterprise Modules", value: 20, suffix: "+" },
    { label: "Years Experience", value: getExperienceValue(), suffix: "" },
    { label: "Promotions Earned", value: 3, suffix: "×" },
    { label: "Institutional Users", value: 5000, suffix: "+" },
  ];
}

export const services: Service[] = [
  {
    id: "1",
    title: "Enterprise PHP & ERP Development",
    description:
      "PHP 7/8 & CodeIgniter (CI3/CI4) modules — admissions, academics, finance, HRMS, and audit-ready admin portals.",
    icon: "code",
  },
  {
    id: "2",
    title: "REST API & Biometric Integration",
    description:
      "Versioned REST APIs, JWT auth, RBAC, mobile backends, and .NET biometric hardware sync pipelines.",
    icon: "api",
  },
  {
    id: "3",
    title: "LMS & Admission AI Systems",
    description:
      "LMS–ERP synchronization (courses, enrollments, progress) and private Ollama / vLLM Admission AI assistants.",
    icon: "lms",
  },
  {
    id: "4",
    title: "Modern Frontend (React / Next.js)",
    description:
      "Responsive enterprise dashboards and portals built with React, Next.js, TypeScript, JavaScript, and AJAX.",
    icon: "layout",
  },
  {
    id: "5",
    title: "MySQL Architecture & Optimization",
    description:
      "Normalized schemas, composite indexing, slow-query tuning, and high-traffic reporting architectures.",
    icon: "database",
  },
  {
    id: "6",
    title: "Cloud AI & AWS Deployment",
    description:
      "AWS EC2/S3 deployments, signed media storage, Gemini AI workflows, and predictable release pipelines.",
    icon: "ai",
  },
  {
    id: "7",
    title: "Online Exam & Proctoring Platforms",
    description:
      "High-concurrency assessment workflows, anti-cheat monitoring hooks, and automated semester result engines.",
    icon: "server",
  },
  {
    id: "8",
    title: "Technical Leadership & Mentoring",
    description:
      "Architecture reviews, MVC service standards, sprint planning, and engineering mentorship.",
    icon: "users",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Project Manager",
    company: "eNova Software",
    content:
      "Venkatesan led our HRMS project team of 3 and delivered a robust biometric attendance and payroll system ahead of schedule. His PHP and CodeIgniter expertise is outstanding.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Technical Lead",
    company: "eNova Software",
    content:
      "He architected our Online Exam Portal with real-time proctoring, AWS S3 video storage, and Python APIs. A reliable full stack developer who handles complex requirements with ease.",
    rating: 5,
  },
  {
    id: "3",
    name: "Arun Menon",
    role: "Senior Manager",
    company: "Government Project",
    content:
      "Venkatesan contributed to government projects ensuring regulatory compliance. From CodeIgniter backends to React frontends and AWS deployments — he delivers secure, high-quality solutions.",
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is your primary technical specialization?",
    answer:
      "My core specialization is enterprise PHP 7/8, CodeIgniter 3 & 4, MySQL, REST API development, and modular ERP/HRMS architecture — including LMS integration, payroll engines, and biometric attendance pipelines. I also build React/Next.js frontends, Python services, AWS deployments, and private AI inference stacks using Ollama and vLLM.",
  },
  {
    id: "2",
    question: "Are you available for full-time or contract roles?",
    answer:
      "Yes. I am open to Lead / Senior Application Developer (PHP / Full-Stack) roles as well as enterprise ERP & HRMS architecture consulting. Based in Coimbatore, India — available for remote, hybrid, or relocation opportunities.",
  },
  {
    id: "3",
    question: "How have you used private AI (Ollama / vLLM) in production?",
    answer:
      "For campus Admission AI, institutions needed enquiry chat, eligibility guidance, and document Q&A without sending student records or fee rules to external public clouds. I deployed Ollama and vLLM inference servers connected via a Python gateway to CodeIgniter ERP workflows so all inference runs on-premise.",
  },
  {
    id: "4",
    question: "How do you distinguish individual ownership vs. team leadership?",
    answer:
      "As Lead Application Developer, I own system architecture, database schema design, critical modules (payroll engine, LMS sync, LLM gateway, query optimization), code reviews, and AWS releases while leading and mentoring a 3-developer team.",
  },
  {
    id: "5",
    question: "How can recruiters request an interview or verify your work?",
    answer:
      "You can download my latest resume via the OTP-verified modal, review the 60-second executive brief at /recruiter, inspect all 8 anonymized enterprise case studies, or click 'Request Interview' anywhere on the page to submit preferred dates and times directly.",
  },
];

export const skills: Skill[] = [
  { name: "PHP 7/8", level: 95, category: "backend", tier: "Core" },
  { name: "CodeIgniter 3/4", level: 92, category: "backend", tier: "Core" },
  { name: "REST API", level: 92, category: "backend", tier: "Core" },
  { name: "MySQL", level: 90, category: "database", tier: "Core" },
  { name: "JavaScript", level: 90, category: "frontend", tier: "Core" },
  { name: "jQuery / AJAX", level: 88, category: "frontend", tier: "Proficient" },
  { name: "HTML5 / CSS3", level: 90, category: "frontend", tier: "Core" },
  { name: "Git / GitHub", level: 85, category: "devops", tier: "Proficient" },
  { name: "AWS EC2 & S3", level: 80, category: "devops", tier: "Proficient" },
  { name: "React", level: 78, category: "frontend", tier: "Proficient" },
  { name: "Next.js", level: 78, category: "frontend", tier: "Proficient" },
  { name: "Python", level: 78, category: "backend", tier: "Proficient" },
  { name: "Ollama (On-Prem)", level: 74, category: "ai", tier: "Working" },
  { name: "vLLM", level: 70, category: "ai", tier: "Working" },
  { name: "Gemini API", level: 76, category: "ai", tier: "Proficient" },
  { name: "AWS Bedrock", level: 55, category: "ai", tier: "Exploring" },
];

export const experienceCompany = {
  name: "eNova Software and Hardware Solutions Pvt. Ltd.",
  location: "Coimbatore, Tamil Nadu, India",
  period: "July 2021 – Present",
  get tenureLabel() {
    return getExperienceLabel();
  },
  heading: "Career Progression & Technical Ownership",
};

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Lead Application Developer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "July 2025 – Present",
    current: true,
    description:
      "Lead architecture, development, and production deployment of enterprise ERP platforms serving 5,000+ institutional users. Own engineering standards, team delivery, LMS integration, and private AI workflows.",
    responsibilities: [
      "Define modular MVC + Service architecture for a 20+ module Educational ERP; established coding standards adopted across the team.",
      "Lead sprint planning, code reviews, and production releases for a 3-developer engineering team.",
      "Designed LMS–ERP REST synchronization — course catalogs, batch enrollments, content hooks, and progress tracking.",
      "Built Admission AI assistants on private Ollama / vLLM servers for enquiry chat, eligibility guidance, and document Q&A with campus data kept on-prem.",
      "Integrated Gemini AI APIs for automated question paper generation — reducing faculty preparation effort by ~40% (estimated).",
      "Tuned slow MySQL academic reporting queries from 8s down to under 1.2s via composite indexing and query refactoring.",
      "Own AWS EC2/S3 production deployment workflows with zero-downtime release checklists.",
    ],
    technologies: [
      "PHP 7/8",
      "CodeIgniter 3/4",
      "MySQL",
      "REST API",
      "JavaScript",
      "React",
      "Next.js",
      "Python",
      "Ollama",
      "vLLM",
      "Gemini API",
      "AWS EC2/S3",
    ],
  },
  {
    id: "2",
    role: "Senior Programmer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "June 2024 – July 2025",
    description:
      "Spearheaded the HRMS payroll engine and core ERP modules. Designed normalized database schemas and built JWT-authenticated REST APIs for mobile and device integrations.",
    responsibilities: [
      "Architected and delivered the HRMS payroll engine — automated salary computation for 200+ employees across 4 branches.",
      "Designed normalized MySQL schemas for 8 ERP modules; indexing strategy cut query response time by ~55% (estimated).",
      "Mentored 2 junior developers through structured code reviews and pair programming, lowering post-release defects by ~30% (estimated).",
      "Built versioned REST APIs (/api/v1) for mobile clients secured with JWT authentication and request throttling.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "jQuery", "AJAX", "REST API", "JWT", "Git"],
  },
  {
    id: "3",
    role: "Programmer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "April 2023 – June 2024",
    description:
      "Delivered 6 production ERP modules for educational institutions — fees, library, examination, inventory, student management, and lab allocation.",
    responsibilities: [
      "Delivered 6 production ERP modules (Fees, Library, Examination, Inventory, Student Management, Lab Allocation) on schedule.",
      "Built AJAX-driven administrative interfaces reducing full-page reloads by ~70% (estimated).",
      "Engineered the semester exam result processor — auto-generating marksheets for 3,000+ students per semester.",
      "Implemented role-based operational reports used by principals, faculty, and finance departments.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "AJAX", "jQuery", "HTML5", "CSS3"],
  },
  {
    id: "4",
    role: "Junior Software Developer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "July 2021 – April 2023",
    description:
      "Built production PHP/CodeIgniter modules, MySQL schemas, biometric sync integrations, and government compliance workflows. Promoted within 21 months of joining.",
    responsibilities: [
      "Contributed to biometric attendance integration — syncing .NET Windows device punch logs with CodeIgniter HRMS via REST API.",
      "Developed 4 government-project modules with compliance-ready audit trails and role-based access control (RBAC).",
      "Designed and normalized 15+ MySQL tables for student management, reducing data redundancy by ~40% (estimated).",
      "Shipped first production feature within 3 months and earned promotion to Programmer within 21 months.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "HTML5", "CSS3", "JavaScript", "jQuery"],
  },
];

export const majorProjectGroups: ProjectHighlightGroup[] = [
  {
    id: "edu-erp",
    title: "Educational ERP",
    items: [
      "Student Admission",
      "LMS Integration",
      "Admission AI (Ollama / vLLM)",
      "Examination Management",
      "Fee Management",
      "Library Management",
      "Inventory Management",
      "HRMS",
      "Online Examination",
      "Mentor-Mentee System",
      "Certificate Generation",
      "Student Lab Allocation",
      "AI Question Generation",
      "Dashboard & Reports",
    ],
  },
  {
    id: "lms-ai",
    title: "LMS & Admission AI",
    items: [
      "Course & Enrollment Sync",
      "Learning Progress Tracking",
      "Content / SCORM Hooks",
      "Enquiry Chatbot (Ollama)",
      "Eligibility & Fee Guidance (vLLM)",
      "Document Q&A Assistant",
      "Counsellor Copilot",
      "Private On-Prem LLM Serving",
    ],
  },
  {
    id: "hrms",
    title: "HRMS, Payroll & Biometrics",
    items: [
      "Employee Lifecycle",
      "Biometric Attendance (.NET Sync)",
      "Shift & Leave Rules",
      "Automated Payroll",
      "Salary Processing",
      "Role-Based Access Control",
    ],
  },
  {
    id: "tickets",
    title: "Ticket Management & Web CMS",
    items: [
      "Customer Support Ticketing",
      "Product & License Tracking",
      "SLA Escalation Alerts",
      "CodeIgniter 4 CMS",
      "SEO & REST Integrations",
    ],
  },
];

export const keyAchievements: string[] = [
  "Promoted three consecutive times since July 2021 — Junior Software Developer → Programmer → Senior Programmer → Lead Application Developer.",
  "Architected 20+ production ERP modules serving 5,000+ institutional users across Tamil Nadu.",
  "Integrated LMS courses, enrollments, and progress tracking directly with ERP student & academic records.",
  "Deployed private Admission AI assistants on Ollama & vLLM servers, keeping sensitive campus records on-premise.",
  "Built an Online Examination portal supporting 1,000+ concurrent candidates with AWS S3-backed proctoring.",
  "Engineered biometric attendance integration (.NET + CodeIgniter REST API) and automated payroll for 200+ staff across 4 branches (~50% faster payroll cycle, estimated).",
  "Unified 12+ campus workflows into one ERP platform (~60% reduction in manual admin work, estimated).",
  "Optimized MySQL academic reporting queries from 8s to under 1.2s under high concurrent load.",
  "Integrated Gemini AI for automated question paper generation — first cloud AI feature in the ERP suite.",
  "Led a 3-developer team, established MVC coding standards, and mentored junior engineers.",
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "educational-erp",
    category: "Enterprise ERP",
    title: "Educational ERP",
    description:
      "Multi-module campus management platform uniting admissions, academics, fees, examinations, library, inventory, mentor-mentee workflows, certificates, lab allocation, and AI question generation.",
    overview:
      "An enterprise campus ERP built on PHP and CodeIgniter serving 5,000+ students, faculty, and administrative staff across multiple departments and campuses. Designed with strict module boundaries so academic, financial, and reporting workflows share a single source of truth.",
    image: "/projects/edu-erp-dashboard.jpg",
    previewVariant: "screenshot",
    technologies: ["PHP 7/8", "CodeIgniter 3/4", "MySQL", "JavaScript", "AJAX", "jQuery", "REST API", "Gemini API"],
    architecture:
      "CodeIgniter modular MVC with thin controllers, dedicated domain service classes, versioned REST APIs (/api/v1), and shared auth/audit libraries.",
    problem:
      "Educational institutions relied on disconnected spreadsheets and legacy tools for admissions, fees, library, exams, and certificates — leading to duplicate student records and slow manual reconciliation.",
    existingLimitations: [
      "Separate departmental databases caused student status mismatches between admissions, fee counters, and exam halls.",
      "Monolithic SQL reporting queries took up to 8 seconds during semester result and fee-collection peaks.",
      "No unified role-based audit trail for sensitive fee waivers, marksheet edits, or certificate issuance.",
    ],
    solution:
      "Architected 20+ interconnected ERP modules over a normalized MySQL core with role-based access control, AJAX operational dashboards, automated marksheet generation (3,000+ students/semester), and Gemini AI-assisted question paper generation.",
    role: "Lead Application Developer — system architecture, core academic/exam modules, query tuning & team leadership",
    ownership: "Technical Leadership",
    ownershipDetails:
      "Owned overall ERP architecture, coding standards, MySQL optimization, and production releases while leading a 3-developer team across module delivery.",
    responsibilities: [
      "Defined thin-controller + service-layer folder structure and shared authentication/audit libraries.",
      "Built core examination result processing (3,000+ marksheets per semester) and fee/lab allocation modules.",
      "Integrated Gemini AI APIs for automated question bank and paper generation.",
      "Tuned slow MySQL joins and composite indexes, cutting heavy report latency from 8s to <1.2s.",
    ],
    databaseArchitecture: [
      "Normalized MySQL schema spanning 15+ core student/academic tables with foreign-key integrity.",
      "Composite indexes on `(academic_year_id, department_id, student_id)` for sub-second semester reports.",
      "Immutable audit-log tables capturing user ID, timestamp, IP, and before/after payloads for financial and exam edits.",
    ],
    apiIntegrations: [
      "Versioned internal REST endpoints (`/api/v1`) serving mobile portals and cross-module sync.",
      "Google Gemini API integration with server-side prompt templates for question generation.",
      "Downstream hooks to LMS Integration and Admission AI services.",
    ],
    securityConsiderations: [
      "Role-Based Access Control (RBAC) isolating principal, faculty, finance, and student privileges.",
      "Parameterized Query Builder statements, CSRF token validation, and output escaping across all forms.",
      "Detailed audit trails on marksheet overrides, fee concessions, and certificate generation.",
    ],
    performanceImprovements: [
      "MySQL reporting query latency reduced from 8s to <1.2s via indexing and query refactoring.",
      "AJAX partial updates eliminated ~70% of full-page reloads (estimated) in daily admin workflows.",
    ],
    impact:
      "Unified 12+ campus workflows for 5,000+ users; ~60% estimated reduction in manual admin work across 20+ live modules.",
    metrics: [
      "20+ ERP modules in production (verified)",
      "5,000+ institutional users served (verified)",
      "3,000+ semester marksheets auto-generated",
      "8s → <1.2s MySQL report latency",
      "~60% less manual admin effort (estimated)",
    ],
    confidentialityNote:
      "Client institution names, student records, and private ERP URLs are excluded under confidentiality obligations. All screenshots and architecture summaries are anonymized.",
    caseStudyUrl: "/projects/educational-erp",
    featured: true,
  },
  {
    id: "1b",
    slug: "lms-integration",
    category: "AI & EdTech",
    title: "LMS Integration",
    description:
      "Bidirectional REST synchronization connecting Learning Management System courses, batches, enrollments, content hooks, and learning progress with the Educational ERP.",
    overview:
      "Bridges the gap between academic administration (ERP) and digital course delivery (LMS). ERP remains the authoritative source for student identity, fee eligibility, and batch rosters while the LMS handles course materials and learner engagement.",
    image: "/projects/edu-erp-dashboard.jpg",
    previewVariant: "lms-sync",
    technologies: ["PHP 7/8", "CodeIgniter", "MySQL", "REST API", "JavaScript", "AJAX"],
    architecture:
      "Event-driven and scheduled REST synchronization layer between CodeIgniter ERP services and LMS course/enrollment endpoints with idempotency keys.",
    problem:
      "Campuses operated standalone LMS platforms that had no awareness of ERP student enrollments, batch transfers, or fee holds — forcing staff to manually re-enter rosters and causing enrollment drift.",
    existingLimitations: [
      "Manual CSV imports/exports created duplicate student accounts and stale batch enrollments.",
      "Mentors and academic heads had zero visibility into LMS course progress inside ERP mentor-mentee dashboards.",
      "Network interruptions during bulk enrollment sync caused partial writes and orphaned records.",
    ],
    solution:
      "Engineered idempotent REST API sync pipelines for course catalogs, batch rosters, student enrollments, and SCORM/content progress hooks, paired with nightly reconciliation jobs and faculty progress views.",
    role: "Lead Application Developer — sync architecture, REST contracts & reconciliation engine",
    ownership: "Individual Ownership",
    ownershipDetails:
      "Designed the integration contract, idempotent payload schema, nightly reconciliation job, and faculty ERP dashboard widgets end to end.",
    responsibilities: [
      "Defined canonical mapping between ERP student/batch IDs and LMS course enrollments.",
      "Implemented idempotent REST sync endpoints with retry-safe transaction logs.",
      "Built nightly reconciliation jobs to repair missed webhook/API updates from offline delays.",
      "Surfaced learner completion metrics inside ERP mentor-mentee and exam-readiness views.",
    ],
    databaseArchitecture: [
      "Mapping tables linking `erp_student_id`, `batch_id`, and `lms_enrollment_id` with unique composite keys.",
      "Sync-state and idempotency log tables recording payload checksums, HTTP status, and retry counts.",
    ],
    apiIntegrations: [
      "REST APIs for course catalog sync, batch enrollment/unenrollment, and progress webhook ingestion.",
      "Content / SCORM completion hooks feeding directly into ERP mentor dashboards.",
    ],
    securityConsiderations: [
      "Signed API token authentication between ERP and LMS servers with timestamped payloads.",
      "Strict academic eligibility checks ensuring deactivated or unverified accounts cannot auto-enroll.",
    ],
    performanceImprovements: [
      "Eliminated manual CSV roster uploads through incremental delta sync and nightly batch reconciliation.",
      "Cached course progress summaries inside ERP tables so mentor dashboards load without blocking on live LMS calls.",
    ],
    impact:
      "Single source of truth across academic ERP and LMS learning activity; eliminated duplicate enrollment fixes.",
    metrics: [
      "Idempotent course & enrollment sync",
      "Real-time progress visible to faculty & mentors",
      "Nightly reconciliation preventing roster drift",
    ],
    confidentialityNote:
      "Institutional LMS endpoints and sample course datasets are anonymized to protect partner privacy.",
    caseStudyUrl: "/projects/lms-integration",
    featured: true,
  },
  {
    id: "2",
    slug: "hrms-payroll",
    category: "HR & Operations",
    title: "HRMS & Payroll",
    description:
      "Enterprise HR platform automating employee lifecycle management, shift & leave policies, multi-branch payroll computation, and role-based self-service.",
    overview:
      "A production Human Resource Management System engineered to replace manual spreadsheet payroll across 4 institutional branches and 200+ employees, integrated directly with biometric attendance logs and leave approvals.",
    image: "/projects/hrms-dashboard.png",
    previewVariant: "screenshot",
    technologies: ["PHP 7/8", "CodeIgniter", "MySQL", "REST API", "JWT", "AJAX", "jQuery"],
    architecture:
      "CodeIgniter MVC core with isolated payroll calculation services, MySQL transactional salary ledger, and JWT-secured mobile REST endpoints.",
    problem:
      "HR teams spent days every month manually reconciling attendance registers, leave balances, overtime, and deductions across 4 branches — resulting in payroll delays and calculation discrepancies.",
    existingLimitations: [
      "Spreadsheet-based payroll formulas were fragile and lacked multi-branch approval trails.",
      "Attendance discrepancies between branch registers and central HR delayed monthly salary runs.",
      "Employees had no self-service portal for leave requests or payslip access.",
    ],
    solution:
      "Built an automated payroll computation engine tied to verified biometric attendance and leave rules, multi-level approval workflows, downloadable payslips, and JWT-secured mobile APIs.",
    role: "Senior Programmer / Team Lead — payroll engine, database schema, RBAC & mobile APIs",
    ownership: "Technical Leadership",
    ownershipDetails:
      "Led a 3-developer team and personally architected the payroll computation engine, MySQL schema, and JWT mobile APIs.",
    responsibilities: [
      "Architected automated monthly salary computation rules (basic, allowances, lop, leave deductions, statutory fields).",
      "Led a team of 3 developers through sprint reviews and code quality gates.",
      "Built JWT-authenticated REST APIs with rate limiting for employee mobile check-ins and payslips.",
      "Established RBAC boundaries separating HR Admin, Branch Manager, and Employee views.",
    ],
    databaseArchitecture: [
      "Normalized tables for employees, branch assignments, salary structures, leave ledgers, and locked monthly payroll runs.",
      "Transactional locks preventing edits to finalized payroll periods while preserving audit history.",
    ],
    apiIntegrations: [
      "Internal sync with Biometric Attendance punch-log pipeline.",
      "JWT-secured REST APIs for mobile HR app integration.",
    ],
    securityConsiderations: [
      "JWT token verification + rate limiting on mobile API endpoints.",
      "Strict RBAC ensuring salary structures and bank details are accessible only to authorized HR roles.",
    ],
    performanceImprovements: [
      "Indexed attendance aggregation queries (~55% estimated query latency improvement across ERP/HRMS schemas).",
      "Automated batch payroll generation cutting monthly processing cycle by ~50% (estimated).",
    ],
    impact:
      "Automated payroll for 200+ employees across 4 branches and reduced payroll processing time by ~50% (estimated).",
    metrics: [
      "200+ employees across 4 branches (verified)",
      "~50% faster payroll processing (estimated)",
      "JWT-secured mobile & HR REST APIs",
      "Led 3-developer delivery team",
    ],
    confidentialityNote:
      "Employee salary records and organizational structures shown in mockups are completely anonymized.",
    caseStudyUrl: "/projects/hrms-payroll",
    featured: true,
  },
  {
    id: "1c",
    slug: "admission-ai",
    category: "AI & EdTech",
    title: "Admission AI (Ollama / vLLM)",
    description:
      "On-premise Admission AI assistant powered by private Ollama and vLLM inference servers for enquiry chat, eligibility guidance, fee FAQs, and document Q&A.",
    overview:
      "Designed for institutions that require AI-assisted admission counselling without sending applicant documents, seat matrices, or fee policies to external cloud LLM APIs. Combines CodeIgniter admission workflows with a Python LLM gateway.",
    image: "/projects/edu-erp-dashboard.jpg",
    previewVariant: "admission-ai",
    technologies: ["Python", "Ollama", "vLLM", "PHP", "CodeIgniter", "REST API", "MySQL"],
    architecture:
      "CodeIgniter Admission ERP -> Python OpenAI-compatible LLM gateway -> Ollama (campus/dev serving) & vLLM (high-throughput concurrent inference) grounded in ERP rules.",
    problem:
      "Admission counsellors handled repetitive seasonal enquiries on eligibility, fee slabs, and document checklists, while institutional privacy policies prohibited uploading applicant documents to public cloud LLMs.",
    existingLimitations: [
      "Public cloud LLM APIs conflicted with campus data-residency and student-document privacy rules.",
      "Static FAQ pages could not answer multi-condition course eligibility or fee-slab questions.",
      "Counsellors manually looked up scattered circulars during peak admission drives.",
    ],
    solution:
      "Deployed private LLM inference servers using Ollama for rapid model iteration and vLLM for concurrent production throughput, fronted by a Python gateway that injects grounded ERP eligibility rules and enforces refusal/escalation guardrails.",
    role: "Lead Application Developer — private LLM gateway, ERP grounding & prompt guardrails",
    ownership: "Individual Ownership",
    ownershipDetails:
      "Researched, architected, and deployed the Ollama/vLLM inference pipeline, Python gateway, and ERP integration.",
    responsibilities: [
      "Configured Ollama and vLLM inference servers for private on-premise model hosting.",
      "Built a Python gateway exposing OpenAI-compatible endpoints to CodeIgniter admission modules.",
      "Grounded prompts in real ERP course eligibility, seat summaries, fee slabs, and document checklists.",
      "Added confidence guardrails instructing the assistant to escalate policy edge cases to human counsellors.",
    ],
    databaseArchitecture: [
      "MySQL tables storing structured course eligibility criteria, fee slabs, document requirements, and enquiry conversation logs.",
      "Audit logs tracking counsellor escalations and grounded prompt context IDs.",
    ],
    apiIntegrations: [
      "Python FastAPI/HTTP gateway bridging CodeIgniter ERP and Ollama / vLLM inference APIs.",
      "ERP rule-lookup endpoints injecting verified institutional context into each session.",
    ],
    securityConsiderations: [
      "Self-hosted on-premise inference (Ollama / vLLM): models execute inside institutional hardware/LAN, applicant documents and fee policies are parsed locally, and admission enquiries do not call third-party LLM APIs.",
      "System prompt constraints prevent policy fabrication, enforce human counsellor escalation, and log escalated queries for ERP audit review.",
    ],
    performanceImprovements: [
      "vLLM continuous batching enabled smooth handling of concurrent admission-season enquiry bursts.",
      "Pre-structured ERP context snippets minimized prompt token overhead and response latency.",
    ],
    impact:
      "Enabled instant, campus-hosted enquiry responses and counsellor copilots grounded in verified ERP policies.",
    metrics: [
      "Self-hosted Ollama + vLLM runtime (institutional LAN)",
      "Local document Q&A — no external LLM API calls",
      "ERP-grounded eligibility, fee & audit-logged escalations",
    ],
    confidentialityNote:
      "Private campus model endpoints, circulars, and applicant records are strictly omitted.",
    caseStudyUrl: "/projects/admission-ai",
    featured: true,
  },
  {
    id: "3",
    slug: "online-examination",
    category: "AI & EdTech",
    title: "Online Examination",
    description:
      "High-concurrency remote assessment platform supporting 1,000+ simultaneous candidates with React proctoring capture, Python processing APIs, and AWS S3 evidence storage.",
    overview:
      "Built to run large-scale institutional and remote exams reliably even under fluctuating candidate network conditions. Combines a CodeIgniter exam/result core with a React test-taker interface, Python media service, and AWS S3.",
    image: "/projects/exam-portal-dashboard.png",
    previewVariant: "screenshot",
    technologies: ["PHP", "CodeIgniter", "MySQL", "React", "Python", "AWS S3", "AJAX"],
    architecture:
      "React candidate UI with local chunk buffering + Python media/proctoring service + AWS S3 encrypted storage + CodeIgniter exam scheduling & result engine.",
    problem:
      "Institutions conducting remote assessments faced browser disconnects, lack of verifiable proctoring evidence, and bottlenecks when publishing results for large cohorts.",
    existingLimitations: [
      "Synchronous media uploads blocked or crashed exam sessions on slow campus/home connections.",
      "Basic timer-only portals lacked tab-focus monitoring and auditable video/snapshot evidence.",
      "Manual answer collation delayed semester and entrance result publishing.",
    ],
    solution:
      "Engineered resilient client-side chunk queuing with AWS S3 signed URL uploads, tab-focus and camera proctoring flags, and an automated scoring/analytics dashboard for exam controllers.",
    role: "Full-Stack Developer — React candidate flows, Python APIs, AWS S3 integration & result engine",
    ownership: "Team Contribution",
    ownershipDetails:
      "Collaborated across frontend and backend teams, owning proctoring upload resilience, AWS S3 signed media pipelines, and exam administration dashboards.",
    responsibilities: [
      "Built React candidate exam UI with camera checks, tab-focus warnings, and graceful local chunk queuing.",
      "Integrated Python media processing endpoints with encrypted AWS S3 bucket storage and signed URLs.",
      "Implemented admin review dashboards surfacing proctoring flags without blocking active candidates.",
      "Built automated objective scoring and result publication workflows.",
    ],
    databaseArchitecture: [
      "MySQL tables for exam schedules, question banks, randomized candidate responses, proctoring flag events, and S3 object keys.",
    ],
    apiIntegrations: [
      "Python REST service handling proctoring metadata and S3 pre-signed upload coordination.",
      "AWS S3 encrypted media storage with time-limited signed playback URLs for reviewers.",
    ],
    securityConsiderations: [
      "Encrypted S3 storage with short-lived pre-signed URLs (no public bucket access).",
      "Server-authoritative exam timers, randomized question ordering, and tab-switch event logging.",
    ],
    performanceImprovements: [
      "Supported 1,000+ concurrent exam candidates smoothly via asynchronous media chunking.",
      "Graceful offline/lag queue prevented candidate test loss during transient network drops.",
    ],
    impact:
      "Delivered reliable remote examinations for 1,000+ concurrent candidates with auditable AWS S3 proctoring evidence.",
    metrics: [
      "1,000+ concurrent candidates supported (verified)",
      "AWS S3 encrypted proctoring & signed URLs",
      "Resilient local chunk queuing on slow networks",
    ],
    confidentialityNote:
      "Candidate media, question banks, and institutional exam schedules are excluded for security.",
    caseStudyUrl: "/projects/online-examination",
    featured: false,
  },
  {
    id: "6",
    slug: "biometric-attendance",
    category: "HR & Operations",
    title: "Biometric Attendance",
    description:
      "Hardware-to-cloud attendance pipeline syncing multi-campus .NET biometric device listeners with a CodeIgniter HRMS REST API and nightly reconciliation.",
    overview:
      "Replaced error-prone manual attendance sheets across branches by connecting physical biometric terminals to the central HRMS via a Windows .NET listener service and idempotent CodeIgniter REST endpoints.",
    image: "/projects/hrms-dashboard.png",
    previewVariant: "biometric",
    technologies: [".NET Listener", "PHP", "CodeIgniter", "MySQL", "REST API", "Cron Reconciliation"],
    architecture:
      "On-site Windows .NET device listener -> buffered HTTPS push -> CodeIgniter REST API -> MySQL idempotent punch logs -> nightly shift reconciliation job.",
    problem:
      "Manual punch-card exports and disconnected campus biometric machines caused duplicate entries, missed offline punches, timezone drift, and delayed monthly payroll.",
    existingLimitations: [
      "USB/manual log exports required daily IT intervention and broke during device network outages.",
      "Duplicate rapid finger scans corrupted check-in/check-out pairing.",
      "No automated reconciliation between raw device punches and HR shift schedules.",
    ],
    solution:
      "Built an idempotent CodeIgniter REST ingestion pipeline receiving normalized punch events from .NET Windows listeners, deduplicating rapid scans with composite keys, and running nightly shift-rule reconciliation.",
    role: "Application Developer — REST ingestion API, deduplication keys & shift reconciliation",
    ownership: "Individual Ownership",
    ownershipDetails:
      "Owned the CodeIgniter REST ingestion API, MySQL punch-log schema, idempotent deduplication logic, and nightly reconciliation cron.",
    responsibilities: [
      "Designed REST ingestion endpoints consuming normalized punch batches from .NET device listeners.",
      "Added idempotent composite keys (`device_id`, `employee_code`, `punch_timestamp`) to eliminate duplicates.",
      "Built nightly reconciliation jobs applying shift rules, grace periods, and leave overrides.",
      "Added audit logs for manual HR regularization requests.",
    ],
    databaseArchitecture: [
      "Raw `biometric_punch_logs` table with unique deduplication constraints.",
      "Reconciled `daily_attendance_summary` table linking shift definitions, in/out times, and payroll status.",
    ],
    apiIntegrations: [
      "Windows .NET biometric SDK listener pushing JSON punch batches over REST.",
      "Downstream feed directly into the HRMS Payroll computation engine.",
    ],
    securityConsiderations: [
      "Device/branch API keys authenticating incoming .NET listener sync requests.",
      "Immutable raw punch table separating hardware logs from HR-approved adjustments.",
    ],
    performanceImprovements: [
      "Batch ingestion + offline device buffering kept sync reliable across intermittent campus links.",
      "Pre-aggregated daily summaries prevented heavy raw-log scans during payroll generation.",
    ],
    impact:
      "Eliminated manual punch-sheet cleanup across 4 branches and enabled verified, audit-ready payroll runs.",
    metrics: [
      "Idempotent .NET-to-CodeIgniter REST sync",
      "Multi-branch offline buffer & nightly reconciliation",
      "Direct audit-ready feed into HRMS payroll",
    ],
    confidentialityNote:
      "Hardware serial numbers, branch IPs, and employee biometric IDs are omitted.",
    caseStudyUrl: "/projects/biometric-attendance",
    featured: false,
  },
  {
    id: "4",
    slug: "ticket-management",
    category: "HR & Operations",
    title: "Ticket Management System",
    description:
      "B2B support & product operations portal managing customer tickets, installed product tracking, license renewals, email/SMS notifications, and SLA escalations.",
    overview:
      "Built for software support teams managing multiple institutional clients, tracking software product versions, upcoming license expirations, and SLA response deadlines from a unified queue.",
    image: "/projects/ticket-dashboard.png",
    previewVariant: "screenshot",
    technologies: ["PHP", "CodeIgniter", "MySQL", "AJAX", "jQuery", "SMTP / SMS Alerts"],
    architecture:
      "CodeIgniter MVC ticketing state machine with product/license registry, automated SLA timers, and multi-channel alert dispatchers.",
    problem:
      "Support requests arrived via scattered phone calls and emails with no visibility into client product versions, license renewal dates, or breached SLA response times.",
    existingLimitations: [
      "Ad-hoc email threads caused missed follow-ups and unclear ticket ownership.",
      "Support engineers lacked immediate visibility into active vs. expired software licenses.",
      "No automated escalation when high-priority issues approached SLA deadlines.",
    ],
    solution:
      "Delivered a structured ticketing portal linking every ticket to client product & license records, complete with priority-based SLA timers, automated email/SMS notifications, and escalation queues.",
    role: "Application Developer — ticket lifecycle, license tracker & SLA notification engine",
    ownership: "Individual Ownership",
    ownershipDetails:
      "Designed and implemented the ticketing workflow, license renewal tracker, and automated email/SMS SLA notification jobs.",
    responsibilities: [
      "Built ticket lifecycle workflows (Open, Assigned, In Progress, Escalated, Resolved, Closed) with activity timelines.",
      "Linked client product installations and license renewal dates directly to support tickets.",
      "Automated email and SMS alerts for ticket updates, SLA breach warnings, and upcoming license renewals.",
    ],
    databaseArchitecture: [
      "Relational MySQL tables for clients, software products, license contracts, ticket threads, and SLA policy thresholds.",
    ],
    apiIntegrations: [
      "SMTP email notifications and SMS gateway hooks for real-time customer and engineer alerts.",
    ],
    securityConsiderations: [
      "Role-scoped access separating internal support engineers, team leads, and client reporters.",
      "Validated file attachments and sanitized ticket thread HTML.",
    ],
    performanceImprovements: [
      "AJAX queue filtering and indexed status/priority columns kept support dashboards responsive as ticket volume scaled.",
    ],
    impact:
      "Improved first-response SLA visibility and gave operations teams proactive license-renewal tracking.",
    metrics: [
      "Automated SLA breach alerts (Email / SMS)",
      "Integrated product & license renewal registry",
      "Structured multi-tier escalation workflow",
    ],
    confidentialityNote:
      "Client organization names, license keys, and support ticket contents are anonymized.",
    caseStudyUrl: "/projects/ticket-management",
    featured: false,
  },
  {
    id: "5",
    slug: "website-cms",
    category: "Web Platforms",
    title: "Website CMS",
    description:
      "CodeIgniter 4 content management platform enabling non-technical teams to publish SEO-optimized pages, manage media, and integrate external REST APIs.",
    overview:
      "Built on CodeIgniter 4 to give institutional and business teams complete control over public web pages, announcements, forms, and metadata without developer intervention for routine updates.",
    image: "/projects/website-cms-dashboard.png",
    previewVariant: "screenshot",
    technologies: ["CodeIgniter 4", "PHP 8", "MySQL", "AJAX", "jQuery", "Bootstrap"],
    architecture:
      "CodeIgniter 4 namespaced MVC with filter middleware, dynamic slug routing, SEO meta management, and REST API connectors.",
    problem:
      "Organizations relied on static HTML websites that required developer edits for every announcement, event update, or SEO meta adjustment.",
    existingLimitations: [
      "Hardcoded HTML pages slowed content updates and caused inconsistent meta tags across routes.",
      "Legacy forms lacked centralized validation, spam protection, and admin lead visibility.",
    ],
    solution:
      "Delivered a clean CI4 CMS featuring role-protected admin editing, dynamic SEO fields (title, description, slugs), responsive Bootstrap layouts, authentication, and third-party REST API hooks.",
    role: "Full-Stack Developer — CI4 architecture, admin CMS, auth filters & SEO routing",
    ownership: "Individual Ownership",
    ownershipDetails:
      "Built the CodeIgniter 4 MVC structure, authentication filters, dynamic CMS editor, and SEO routing.",
    responsibilities: [
      "Set up CodeIgniter 4 namespaced controllers, route filters, and service helpers.",
      "Built admin CRUD interfaces for pages, announcements, banners, and SEO metadata.",
      "Integrated third-party REST APIs and responsive mobile-first layouts.",
    ],
    databaseArchitecture: [
      "MySQL tables for dynamic pages, SEO metadata, media assets, admin users, and lead submissions.",
    ],
    apiIntegrations: [
      "Third-party REST API connectors for enquiry forwarding and external content feeds.",
    ],
    securityConsiderations: [
      "CI4 route filter middleware for admin authentication, CSRF protection, and strict input validation.",
      "Safe slug sanitization and XSS-escaped public template rendering.",
    ],
    performanceImprovements: [
      "Lightweight server-rendered CI4 views with clean semantic HTML and minimal frontend bloat.",
    ],
    impact:
      "Empowered non-technical editors to publish SEO-ready pages independently with fast page loads.",
    metrics: [
      "CodeIgniter 4 namespaced MVC architecture",
      "Admin-managed SEO metadata & dynamic slugs",
      "Filter-protected auth & REST integrations",
    ],
    confidentialityNote:
      "Client domain names and editorial content are anonymized.",
    caseStudyUrl: "/projects/website-cms",
    featured: false,
  },
];

/** Academic education (strictly separate from certifications & learning) */
export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Bachelor of Computer Applications (BCA)",
    issuer: "RVS College of Arts & Science, Bharathiar University",
    date: "2021",
    image: "/certificates/bca.jpg",
  },
  {
    id: "2",
    title: "Higher Secondary Certificate (HSC)",
    issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore",
    date: "2018",
    image: "/certificates/hsc.jpg",
  },
  {
    id: "3",
    title: "Secondary School Leaving Certificate (SSLC)",
    issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore",
    date: "2016",
    image: "/certificates/sslc.jpg",
  },
];

/** Verified platform assessments & course completions (learning activities separated below) */
export const professionalCerts: ProfessionalCert[] = [
  {
    id: "pc1",
    title: "PHP Developer",
    issuer: "HackerRank",
    date: "2024",
    badge: "PHP",
    kind: "Skill Assessment",
  },
  {
    id: "pc2",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    date: "2024",
    badge: "JS",
    kind: "Skill Assessment",
  },
  {
    id: "pc3",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    date: "2023",
    badge: "SQL",
    kind: "Skill Assessment",
  },
  {
    id: "pc5",
    title: "Prompt Engineering",
    issuer: "Google AI",
    date: "2025",
    badge: "AI",
    kind: "Course Completion",
  },
  {
    id: "pc6",
    title: "Python Basics",
    issuer: "Microsoft Learn",
    date: "2024",
    badge: "PY",
    kind: "Course Completion",
  },
];

/** Ongoing learning & upskilling — kept explicitly separate from earned certifications */
export const learningActivities: LearningActivity[] = [
  {
    id: "la1",
    title: "AWS Certified Cloud Practitioner (Preparation)",
    provider: "AWS Training & Certification",
    status: "In Progress",
    focus: "Cloud fundamentals, IAM, EC2, S3, VPC, and cost governance alongside production AWS usage.",
  },
  {
    id: "la2",
    title: "High-Throughput Private LLM Inference",
    provider: "Ollama & vLLM Ecosystem",
    status: "Ongoing Practice",
    focus: "Quantization trade-offs, KV-cache sizing, and ERP-grounded RAG evaluation for campus deployments.",
  },
];

export const githubRepos = [
  {
    name: "venkatverse",
    desc: "Production portfolio — Next.js App Router, AI Suite, OTP resume flow & Upstash Redis analytics",
    lang: "TypeScript",
    url: "https://github.com/Venkatesandk/venkatverse",
  },
  {
    name: "Website",
    desc: "Public web portfolio iteration & frontend component experiments",
    lang: "JavaScript / PHP",
    url: "https://github.com/Venkatesandk/Website",
  },
  {
    name: "Venkatesandk",
    desc: "GitHub profile overview — stack summary, engineering focus & contact links",
    lang: "Markdown",
    url: "https://github.com/Venkatesandk/Venkatesandk",
  },
];

/** Single canonical source of truth for technical skills, categories & proficiency tiers */
export const skillCategories: import("@/types").SkillCategoryGroup[] = [
  {
    id: "backend",
    title: "Core Backend (Primary)",
    items: [
      { name: "PHP 7/8", tier: "Core", level: 95 },
      { name: "CodeIgniter 3/4", tier: "Core", level: 92 },
      { name: "REST APIs (JWT / RBAC)", tier: "Core", level: 92 },
      { name: "Python", tier: "Proficient", level: 78 },
    ],
  },
  {
    id: "architecture",
    title: "Enterprise Architecture",
    items: [
      { name: "Modular ERP (20+ Modules)", tier: "Core", level: 94 },
      { name: "LMS Integration", tier: "Core", level: 90 },
      { name: "HRMS & Payroll", tier: "Core", level: 90 },
      { name: "Biometric Sync (.NET)", tier: "Proficient", level: 86 },
      { name: "RBAC & Audit Trails", tier: "Core", level: 90 },
    ],
  },
  {
    id: "database",
    title: "Database Engineering",
    items: [
      { name: "MySQL & Query Tuning", tier: "Core", level: 90 },
      { name: "Schema Normalization", tier: "Core", level: 90 },
      { name: "Composite Indexing", tier: "Proficient", level: 88 },
      { name: "Academic Reporting", tier: "Proficient", level: 88 },
    ],
  },
  {
    id: "frontend",
    title: "Modern Frontend",
    items: [
      { name: "JavaScript (ES6+)", tier: "Core", level: 90 },
      { name: "jQuery / AJAX", tier: "Proficient", level: 88 },
      { name: "React", tier: "Proficient", level: 78 },
      { name: "Next.js", tier: "Proficient", level: 78 },
      { name: "TypeScript", tier: "Proficient", level: 78 },
      { name: "HTML5 / CSS3", tier: "Core", level: 90 },
    ],
  },
  {
    id: "ai",
    title: "AI Engineering (Additional)",
    items: [
      { name: "Ollama (On-Prem Lab)", tier: "Working", level: 74 },
      { name: "vLLM (Concurrent Serving)", tier: "Working", level: 70 },
      { name: "Admission AI Grounding", tier: "Proficient", level: 78 },
      { name: "Gemini API", tier: "Proficient", level: 76 },
      { name: "AWS Bedrock", tier: "Exploring", level: 55 },
      { name: "Prompt Guardrails", tier: "Working", level: 74 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Delivery",
    items: [
      { name: "AWS EC2 & S3", tier: "Proficient", level: 80 },
      { name: "Vercel", tier: "Proficient", level: 82 },
      { name: "Git / GitHub", tier: "Proficient", level: 85 },
      { name: "Zero-Downtime Releases", tier: "Proficient", level: 84 },
    ],
  },
  {
    id: "frameworks",
    title: "UI & Frameworks",
    items: [
      { name: "CodeIgniter 4", tier: "Core", level: 92 },
      { name: "Next.js App Router", tier: "Proficient", level: 78 },
      { name: "React 19", tier: "Proficient", level: 78 },
      { name: "Tailwind CSS", tier: "Proficient", level: 84 },
      { name: "Bootstrap", tier: "Proficient", level: 86 },
    ],
  },
  {
    id: "leadership",
    title: "Engineering Leadership",
    items: [
      { name: "Team Lead (3+ Devs)", tier: "Core", level: 88 },
      { name: "Code Reviews & Standards", tier: "Core", level: 88 },
      { name: "Mentoring Juniors", tier: "Proficient", level: 86 },
      { name: "Stakeholder Estimation", tier: "Proficient", level: 85 },
    ],
  },
];

export const whyHireMe = [
  {
    title: "3× Promoted Since July 2021",
    desc: "Junior Software Developer to Lead Application Developer at eNova Software — consistent ownership and delivery.",
  },
  {
    title: "Enterprise PHP & ERP at Scale",
    desc: "20+ modules in production serving 5,000+ institutional users with sub-1.2s MySQL reporting.",
  },
  {
    title: "LMS, HRMS & Biometric Integration",
    desc: "End-to-end ERP–LMS sync, automated multi-branch payroll, and .NET biometric hardware pipelines.",
  },
  {
    title: "Private AI Inference (Ollama / vLLM)",
    desc: "Production-minded on-prem Admission AI assistants keeping campus records inside institutional infrastructure.",
  },
  {
    title: "Full-Stack & AWS Ownership",
    desc: "From CodeIgniter REST APIs to React/Next.js frontends and AWS EC2/S3 releases.",
  },
  {
    title: "Team Leadership & Mentoring",
    desc: "Established MVC service standards, led sprints for 3+ developers, and mentored junior engineers.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Biometric Attendance with PHP & CodeIgniter",
    excerpt: "How we integrated biometric devices using .NET and synced data with a CodeIgniter HRMS.",
    date: "2025-12-15",
    readTime: "8 min",
    tags: ["PHP", "CodeIgniter", "HRMS"],
    slug: "biometric-attendance-php",
    content: [
      "At eNova Software, our HRMS needed reliable attendance from biometric devices across campuses. Manual punch sheets were error-prone and delayed payroll.",
      "We used a .NET listener service on Windows to collect device punches, then pushed normalized records to a CodeIgniter REST API. MySQL stored employee mappings, shift rules, and punch logs.",
      "Key challenges included duplicate punches, offline device buffering, and timezone consistency. We added idempotent insert keys and a nightly reconciliation job.",
      "Result: HR teams cut attendance cleanup time dramatically, and payroll could run from verified punch data with audit trails for compliance.",
    ],
  },
  {
    id: "2",
    title: "Online Exam Proctoring with React, Python & AWS S3",
    excerpt: "Architecting secure remote exams with video capture, anti-cheating, and cloud storage.",
    date: "2025-10-20",
    readTime: "10 min",
    tags: ["React", "Python", "AWS"],
    slug: "online-exam-proctoring-aws",
    content: [
      "Remote exams need more than a timer — institutions wanted camera checks, tab focus warnings, and durable video evidence.",
      "The frontend (React) handled candidate UI and media capture. A Python service processed upload jobs and metadata. AWS S3 stored encrypted exam media with signed URLs.",
      "We designed graceful degradation: if upload lagged, chunks queued locally and resumed. Admin dashboards surfaced flags for review without blocking the entire exam.",
      "Impact: institutions could run large concurrent sessions with clearer evidence for malpractice reviews and faster result publishing.",
    ],
  },
  {
    id: "3",
    title: "CodeIgniter 4 vs CI3: Migration Lessons from Production",
    excerpt: "Practical insights from migrating and building new projects on CodeIgniter 4.",
    date: "2025-08-05",
    readTime: "6 min",
    tags: ["PHP", "CodeIgniter"],
    slug: "codeigniter-4-migration",
    content: [
      "CI3 still powers many enterprise modules we maintain, while new products ship on CI4. Running both taught us what to migrate first — and what to leave alone.",
      "CI4’s namespaces, improved routing, and services make APIs cleaner. Session and filter middleware reduce ad-hoc auth helpers we previously copied between projects.",
      "Migration tip: start with new modules and shared libraries (mail, auth, audit). Leave stable payroll/attendance cores until regression suites are ready.",
      "For teams on PHP 8+, CI4 is the better default for greenfield work; CI3 remains viable when risk outweighs rewrite cost.",
    ],
  },
  {
    id: "4",
    title: "How I Structure Enterprise PHP Apps for Scale",
    excerpt: "Folder layout, API versioning, and logging patterns I use for ERP-style systems.",
    date: "2026-03-12",
    readTime: "7 min",
    tags: ["PHP", "Architecture", "ERP"],
    slug: "enterprise-php-app-structure",
    content: [
      "ERP systems grow module by module. Without clear boundaries, admission, fees, and exams end up sharing tangled helpers.",
      "I keep Controllers thin, push business rules into Services, and isolate DB access. Shared cross-cutting concerns (auth, audit, mail) live in a common library.",
      "API versioning (`/api/v1`) protects mobile clients when admin UIs evolve. Structured logs with request IDs make production debugging far faster.",
      "This structure helped us ship AI question generation and lab allocation without rewriting the entire academic core.",
    ],
  },
  {
    id: "5",
    title: "Private Admission AI with Ollama & vLLM",
    excerpt:
      "How we served campus admission chatbots on private Ollama / vLLM servers instead of public cloud LLMs.",
    date: "2026-06-18",
    readTime: "9 min",
    tags: ["AI", "Ollama", "vLLM", "ERP"],
    slug: "admission-ai-ollama-vllm",
    content: [
      "Admission desks answer the same questions every season — eligibility, fee slabs, document checklists, and course options. Cloud LLM APIs are powerful, but many campuses refuse to send student documents or fee rules outside their network.",
      "We deployed Ollama for campus/lab model serving (fast iteration, simple model pulls) and vLLM for higher-concurrency inference when enquiry traffic spiked. A thin Python gateway exposed OpenAI-compatible endpoints to the CodeIgniter Admission module.",
      "The ERP supplied grounded context: course eligibility rules, seat availability summaries, fee structures, and required documents. Prompts instructed the model to refuse inventing policies and to escalate to a counsellor when confidence was low.",
      "Result: faster enquiry handling, private inference under institutional control, and a reusable pattern for LMS tutoring assistants on the same Ollama / vLLM stack.",
    ],
  },
  {
    id: "6",
    title: "LMS Integration with Educational ERP",
    excerpt:
      "Syncing courses, enrollments, and learning progress between an LMS and a campus ERP without duplicate student records.",
    date: "2026-07-02",
    readTime: "8 min",
    tags: ["LMS", "ERP", "PHP", "API"],
    slug: "lms-integration-educational-erp",
    content: [
      "Many campuses run a separate LMS for courses and content while the ERP owns admissions, fees, and exams. When those systems do not talk, staff re-enter enrollments and student status drifts out of sync.",
      "We designed REST sync APIs from CodeIgniter ERP: course catalogs, batches, student enrollments, and learning progress hooks. The LMS remained the content runtime; ERP stayed the source of truth for identity, fees, and academic eligibility.",
      "Idempotent enrollment payloads and nightly reconciliation jobs handled offline LMS delays. Faculty dashboards pulled progress summaries back into mentor-mentee and exam readiness views.",
      "Outcome: fewer duplicate records, clearer learning + academic visibility, and a clean path to layer LMS tutoring assistants on the same private Ollama / vLLM stack used for Admission AI.",
    ],
  },
];

export const workProcess = [
  {
    step: "01",
    title: "Discover",
    desc: "Clarify business workflows, constraints, data sensitivity, and measurable goals with stakeholders.",
  },
  {
    step: "02",
    title: "Architect",
    desc: "Design normalized MySQL schemas, versioned REST contracts, RBAC boundaries, and module boundaries.",
  },
  {
    step: "03",
    title: "Build & Review",
    desc: "Ship iteratively across PHP/CodeIgniter backends, React/Next.js UIs, and automated integration checks.",
  },
  {
    step: "04",
    title: "Deploy & Scale",
    desc: "AWS/Vercel production rollout, slow-query profiling, audit logging, and ongoing enhancements.",
  },
];

export const availability = {
  status: "Open to Senior & Lead Roles",
  roles: ["Lead / Senior PHP & ERP Engineer", "Full-Stack Architect (PHP + Next.js)", "Enterprise ERP & AI Consulting"],
  notice: "Coimbatore, India (IST) · Open to remote, hybrid, or relocation · Responds within 24 hours",
};

export const stats = getLiveStats();

export const navLinks = [
  { href: "#home", label: "Overview", icon: "home" },
  { href: "#highlights", label: "Highlights", icon: "star" },
  { href: "#specialization", label: "Specialization", icon: "layers" },
  { href: "#projects", label: "Case Studies", icon: "folder" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#skills", label: "Architecture & Skills", icon: "grid" },
  { href: "#ai-highlights", label: "AI Engineering", icon: "sparkles" },
  { href: "#services", label: "Services", icon: "grid" },
  { href: "#certifications", label: "Certs & Education", icon: "award" },
  { href: "/recruiter", label: "Recruiter Brief", icon: "briefcase", badge: "60s" },
  { href: "#ai-suite", label: "AI Toolkit", icon: "bot" },
  { href: "#blog", label: "Articles", icon: "book" },
  { href: "#faq", label: "FAQ", icon: "help" },
  { href: "#contact", label: "Contact", icon: "mail" },
];

export const aiSuiteTools = [
  { id: "1", slug: "resume-builder", title: "Resume Builder", description: "Role-tailored summary & CV from verified profile", icon: "file" },
  { id: "2", slug: "interview-coach", title: "Interview Coach", description: "PHP, ERP, CodeIgniter & full-stack mock prep", icon: "mic" },
  { id: "3", slug: "code-reviewer", title: "Code Reviewer", description: "Security & architecture code scan", icon: "code" },
  { id: "4", slug: "project-explainer", title: "Project Explainer", description: "Client-ready brief for any of the 8 case studies", icon: "lightbulb" },
  { id: "5", slug: "cover-letter", title: "Cover Letter", description: "Grounded cover letter from verified experience", icon: "mail" },
  { id: "6", slug: "voice-assistant", title: "Voice Assistant", description: "Hands-free Q&A on Venkat's profile", icon: "volume" },
  { id: "7", slug: "email-writer", title: "Email Writer", description: "Outreach & follow-up drafts", icon: "send" },
  { id: "8", slug: "career-advisor", title: "Career Advisor", description: "Engineering growth roadmap", icon: "compass" },
] as const;

export const techStack = [
  "PHP 7/8",
  "CodeIgniter 3/4",
  "MySQL",
  "REST API",
  "Python",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "jQuery",
  "AJAX",
  "HTML5",
  "CSS3",
  "Bootstrap",
  "Tailwind CSS",
  "AWS EC2",
  "AWS S3",
  "Vercel",
  "Git",
  "Postman",
  "Ollama",
  "vLLM",
  "Gemini",
  "AWS Bedrock (Exploring)",
  "LMS Integration",
  "Admission AI",
  "JWT",
  "RBAC",
];
