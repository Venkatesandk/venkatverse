import type {
  BlogPost,
  Certificate,
  Experience,
  FAQ,
  Project,
  ProjectHighlightGroup,
  Service,
  Skill,
  Testimonial,
} from "@/types";

import { getExperienceLabel, getExperienceValue } from "@/lib/experience";

/** Joined July 2021 — experience is calculated at runtime */
export const CAREER_JOINED = "July 2021";

export const developer = {
  name: "Venkatesan D",
  firstName: "Venkatesan",
  lastName: "D",
  role: "Lead Application Developer",
  headline: "Building Enterprise Systems That Scale",
  tagline: "I turn complex business workflows into reliable software.",
  heroSubheadline: "Lead Application Developer · 5+ Years · PHP, CodeIgniter, Next.js",
  /** @deprecated Prefer getExperienceLabel() for live values */
  get experience() {
    return getExperienceLabel();
  },
  location: "Coimbatore, Tamil Nadu, India",
  email: "venkatvs131@gmail.com",
  phone: "+91 96882 13541",
  phoneRaw: "919688213541",
  get bio() {
    const label = getExperienceLabel();
    return `Lead Application Developer with ${label} of enterprise software experience at eNova Software. Promoted three times from Junior Developer to Lead. Architected 20+ ERP modules serving 5,000+ institutional users across Tamil Nadu — covering admissions, exams, payroll, HRMS, and AI-powered workflows. Expert in PHP, CodeIgniter, MySQL, REST APIs, Next.js, AWS deployment, and Gemini AI integration.`;
  },
  heroDescription:
    "Promoted 3× at eNova Software. Architected 20+ ERP modules for educational institutions — admissions, exams, payroll, and AI workflows for 5,000+ users.",
  taglines: [
    "I turn complex business workflows into reliable software.",
    "3× Promoted · 20+ ERP Modules · 1,000+ Exam Users",
    "PHP & CodeIgniter Expert · ERP & HRMS Specialist",
    "AWS & AI Integration in Production",
  ],
  social: {
    github: "https://github.com/Venkatesandk",
    linkedin: "https://linkedin.com/in/venkatesan-devaraj",
    instagram: "https://www.instagram.com/_s_i_n_g_l_e_b_o_i",
    whatsapp: "https://wa.me/919688213541?text=Hello%20Venkatesan%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    email: "mailto:venkatvs131@gmail.com",
  },
  /** Calendly / booking — update with your real scheduling link */
  calendarUrl:
    "https://wa.me/919688213541?text=Hi%20Venkatesan%2C%20I%27d%20like%20to%20schedule%20a%2030-minute%20interview.",
  hirePitch:
    "3× Promoted · 20+ ERP Modules · 1,000+ Concurrent Exam Users · 50% Faster Payroll",
  specialties: [
    "3× Promoted in 5 Years",
    "20+ ERP Modules in Production",
    "1,000+ Concurrent Exam Users",
    "~50% Faster Payroll Processing",
    "AI Integration in Production",
  ],
  resumeUrl: "/resume.pdf",
  photoUrl: "/profile-avatar.png",
  photoFullUrl: "/profile.png",
  siteUrl: "https://venkatverse.vercel.app",
  responseTime: "Responds within 24 hours",
};

export const aboutContent = {
  intro:
    "Promoted three times in five years — from Junior Developer to Lead Application Developer at eNova Software. I architect and deliver enterprise-grade ERP and HRMS systems for educational institutions, government clients, and corporate teams.",
  impacts: [
    "Unified 12+ campus workflows into a single ERP platform — cutting manual admin work by ~60%",
    "Built an Online Exam Portal supporting 1,000+ concurrent candidates with AWS S3-backed proctoring",
    "Reduced payroll processing time by ~50% with biometric attendance and automated salary computation",
    "Led a team of 3+ developers; established architecture standards and mentored junior engineers",
    "Integrated Gemini AI APIs for smart question generation — first AI feature in the company's ERP suite",
  ],
  closing:
    "Fluent across the full stack — PHP/CodeIgniter backends, React/Next.js frontends, MySQL performance tuning, REST API design, and AWS deployments. Open to Lead/Senior engineering roles where I can own product decisions end to end.",
};

export const resumeSummary =
  "Lead Application Developer with 5+ years of enterprise software engineering, specializing in PHP, CodeIgniter, and full-stack web systems. Promoted three consecutive times at eNova Software, where I architect and deliver Educational ERP and HRMS platforms serving thousands of institutional users. Proven track record in REST API design, AI integration, MySQL performance optimization, and AWS cloud deployment. Adept at leading engineering teams, mentoring developers, and translating complex business requirements into scalable, maintainable software.";

export function getLiveStats() {
  return [
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Years Experience", value: getExperienceValue(), suffix: "" },
    { label: "Teams Led", value: 2, suffix: "" },
    { label: "Technologies", value: 20, suffix: "+" },
  ];
}

export const services: Service[] = [
  {
    id: "1",
    title: "Web Application Development",
    description: "Custom PHP & CodeIgniter (CI3/CI4) apps — ERP modules, admin portals, and secure business workflows from idea to production.",
    icon: "code",
  },
  {
    id: "2",
    title: "API Development",
    description: "REST APIs, mobile backends, biometric device sync, and third-party integrations with auth, rate limits, and clear docs.",
    icon: "api",
  },
  {
    id: "3",
    title: "Frontend Development",
    description: "Responsive UI with HTML, CSS, JavaScript, jQuery, AJAX, React & Next.js — polished dashboards recruiters and users enjoy.",
    icon: "layout",
  },
  {
    id: "4",
    title: "AI & Cloud Integration",
    description: "Gemini / AWS Bedrock features, S3 media pipelines, EC2 deployments, and practical AI tools inside real products.",
    icon: "ai",
  },
  {
    id: "5",
    title: "Database Design",
    description: "MySQL schema design, indexing, reporting queries, and data models that stay maintainable as modules grow.",
    icon: "database",
  },
  {
    id: "6",
    title: "DevOps & Deployment",
    description: "Git workflows, Vercel/AWS deploys, environment config, and production support so releases stay predictable.",
    icon: "server",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Project Manager",
    company: "eNova Software",
    content: "Venkatesan led our HRMS project team of 3 and delivered a robust biometric attendance and payroll system ahead of schedule. His PHP and CodeIgniter expertise is outstanding.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Technical Lead",
    company: "eNova Software",
    content: "He architected our Online Exam Portal with real-time proctoring, AWS S3 video storage, and Python APIs. A reliable full stack developer who handles complex requirements with ease.",
    rating: 5,
  },
  {
    id: "3",
    name: "Arun Menon",
    role: "Senior Manager",
    company: "Government Project",
    content: "Venkatesan contributed to government projects ensuring regulatory compliance. From CodeIgniter backends to React frontends and AWS deployments — he delivers secure, high-quality solutions.",
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What technologies do you specialize in?",
    answer: "I specialize in PHP, CodeIgniter (CI3 & CI4), JavaScript (ES6+), React, Python, MySQL, AWS (EC2, S3), REST APIs, and AWS Bedrock for GenAI basics.",
  },
  {
    id: "2",
    question: "Are you available for freelance or full-time work?",
    answer: "Yes! I'm open to freelance projects, contract work, and full-time opportunities. Based in Coimbatore, India — available for remote work worldwide.",
  },
  {
    id: "3",
    question: "How do you handle project communication?",
    answer: "I maintain clear communication via WhatsApp, email, and video calls. You'll receive regular progress updates and have direct access throughout the project.",
  },
  {
    id: "4",
    question: "What is your typical project timeline?",
    answer: "Timelines vary by scope. A simple website takes 2-4 weeks, while enterprise applications like HRMS or exam portals may take 2-6 months.",
  },
  {
    id: "5",
    question: "Do you provide post-launch support?",
    answer: "Absolutely. I offer maintenance packages, bug fixes, feature updates, and server monitoring to keep your application running smoothly after launch.",
  },
];

export const skills: Skill[] = [
  { name: "PHP", level: 95, category: "backend" },
  { name: "CodeIgniter", level: 92, category: "backend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "MySQL", level: 90, category: "database" },
  { name: "React", level: 78, category: "frontend" },
  { name: "Python", level: 78, category: "backend" },
  { name: "jQuery/AJAX", level: 88, category: "frontend" },
  { name: "AWS EC2/S3", level: 80, category: "devops" },
  { name: "REST API", level: 92, category: "backend" },
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "Git/CI-CD", level: 85, category: "devops" },
  { name: "AWS Bedrock", level: 65, category: "ai" },
];

export const experienceCompany = {
  name: "eNova Software and Hardware Solutions Pvt. Ltd.",
  location: "Coimbatore, Tamil Nadu, India",
  period: "July 2021 – Present",
  tenureLabel: "5+ Years",
  heading: "Professional Experience",
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
      "Lead architecture, development, and deployment of enterprise ERP platforms serving 5,000+ institutional users. Own team delivery, coding standards, and AI-enabled automation.",
    responsibilities: [
      "Define application architecture for 20+ module ERP; set coding standards adopted across the development team.",
      "Lead sprint planning, code reviews, and production releases for a 3-developer team.",
      "Integrated Gemini AI APIs to automate question paper generation — reducing faculty preparation time by ~40%.",
      "Optimized MySQL reporting queries, reducing load time from 8s to under 1.2s on high-traffic modules.",
      "Own end-to-end AWS EC2/S3 deployment pipeline with zero-downtime release procedures.",
    ],
    technologies: [
      "PHP 7/8",
      "CodeIgniter 3/4",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AJAX",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Git",
      "REST API",
    ],
  },
  {
    id: "2",
    role: "Senior Programmer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "June 2024 – July 2025",
    description:
      "Spearheaded HRMS payroll engine and critical ERP modules. Designed scalable databases and delivered secure REST APIs for mobile integrations.",
    responsibilities: [
      "Spearheaded HRMS payroll engine — automated salary computation for 200+ employees across 4 branches.",
      "Designed normalized MySQL schemas for 8 ERP modules; indexing strategy cut query response time by ~55%.",
      "Mentored 2 junior developers through code reviews and pair programming; reduced bug-to-production rate by ~30%.",
      "Built REST APIs for mobile app integration; secured endpoints with JWT authentication and rate limiting.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "jQuery", "AJAX", "REST API", "Git"],
  },
  {
    id: "3",
    role: "Programmer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "April 2023 – June 2024",
    description:
      "Delivered 6 production ERP modules for educational institutions — fees, library, exams, inventory, and student management.",
    responsibilities: [
      "Delivered 6 production ERP modules (Fees, Library, Examination, Inventory, Student Management, Lab Allocation) on schedule.",
      "Implemented AJAX-driven dashboards that reduced page loads by ~70% compared to full-page refreshes.",
      "Built exam result processing engine — auto-generated marksheets for 3,000+ students per semester.",
      "Created role-based report generation used by principals, faculty, and finance teams.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "AJAX", "jQuery", "HTML", "CSS"],
  },
  {
    id: "4",
    role: "Junior Software Developer",
    company: experienceCompany.name,
    location: experienceCompany.location,
    period: "July 2021 – April 2023",
    description:
      "Built production PHP/CodeIgniter applications, MySQL schemas, and government compliance modules. Promoted within 21 months of joining.",
    responsibilities: [
      "Contributed to biometric attendance integration — synced .NET device data with CodeIgniter HRMS via REST API.",
      "Developed 4 government-project modules with compliance-ready audit trails and role-based access control.",
      "Designed and optimized 15+ MySQL tables for student management; reduced data redundancy by ~40%.",
      "Shipped first production feature within 3 months — recognized with promotion within 21 months.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "HTML", "CSS", "JavaScript", "jQuery"],
  },
];

export const majorProjectGroups: ProjectHighlightGroup[] = [
  {
    id: "edu-erp",
    title: "Educational ERP",
    items: [
      "Student Admission",
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
    id: "hrms",
    title: "Human Resource Management System (HRMS)",
    items: [
      "Employee Management",
      "Biometric Attendance",
      "Payroll",
      "Leave Management",
      "Salary Processing",
      "Role-Based Access Control",
    ],
  },
  {
    id: "tickets",
    title: "Ticket Management System",
    items: [
      "Customer Support",
      "Product Tracking",
      "License Renewal",
      "Email Notifications",
      "SLA Management",
    ],
  },
  {
    id: "websites",
    title: "Website Development",
    items: [
      "CMS Development",
      "REST API Integration",
      "Authentication",
      "SEO Optimization",
      "Responsive Design",
    ],
  },
];

export const keyAchievements: string[] = [
  "Promoted three times in five years — Junior Software Developer to Lead Application Developer.",
  "Architected 20+ ERP modules in production serving 5,000+ institutional users across Tamil Nadu.",
  "Built Online Exam Portal supporting 1,000+ concurrent candidates with AWS S3-backed proctoring.",
  "Reduced payroll processing time by ~50% through biometric attendance and automated salary computation.",
  "Cut manual admin work by ~60% by unifying 12+ campus workflows into a single ERP platform.",
  "Integrated Gemini AI for question generation — first AI feature in the company's ERP suite.",
  "Optimized MySQL reporting queries from 8s to under 1.2s on high-traffic academic modules.",
  "Mentored junior developers and established coding standards adopted across the team.",
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Educational ERP",
    description:
      "Enterprise education platform covering admission, exams, fees, library, inventory, mentor-mentee, certificates, lab allocation, and AI question generation.",
    image: "/projects/edu-mgmt.jpg",
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "AJAX", "jQuery"],
    architecture: "CodeIgniter MVC with modular ERP services and analytics dashboards",
    problem:
      "Educational institutions needed a unified system for academics, fees, exams, and operations.",
    solution:
      "Built interconnected modules for admission, examination, fee & library management, inventory, HRMS, online exams, mentor-mentee, certificates, lab allocation, AI question generation, and reporting.",
    role: "Lead Application Developer — architecture, core modules & team mentoring",
    impact: "Unified 12+ campus workflows; cut admin manual work by ~60% for 5,000+ users",
    metrics: [
      "20+ ERP modules across campuses",
      "~60% reduction in manual admin work",
      "5,000+ institutional users served",
    ],
    githubUrl: "https://github.com/Venkatesandk",
    featured: true,
  },
  {
    id: "2",
    title: "Human Resource Management System (HRMS)",
    description:
      "Enterprise HR platform with employee management, biometric attendance, payroll, leave, and RBAC.",
    image: "/projects/hrms.jpg",
    technologies: ["PHP", "MySQL", "CodeIgniter", "AJAX", "jQuery"],
    architecture: "MVC architecture with REST API integration for mobile apps",
    problem:
      "Manual attendance tracking and payroll processing caused errors and delays for HR teams.",
    solution:
      "Built biometric attendance, payroll & salary processing, leave management, employee records, and role-based access for HR/admin/employees.",
    role: "Lead / Senior Developer — biometric sync, payroll & RBAC",
    impact: "Reduced payroll processing time by ~50%; eliminated attendance discrepancies for 200+ staff",
    metrics: [
      "Payroll processing time cut by ~50%",
      "200+ employees across 4 branches",
      "Biometric sync for multi-campus attendance",
    ],
    githubUrl: "https://github.com/Venkatesandk",
    featured: false,
  },
  {
    id: "3",
    title: "Online Examination",
    description:
      "Secure online examination system with proctoring workflows and result processing.",
    image: "/projects/exam-portal.jpg",
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "AJAX", "Python", "AWS S3"],
    architecture: "Web application with exam workflows, monitoring hooks, and reporting",
    problem:
      "Institutions needed a reliable remote/online exam platform with tracking and analytics.",
    solution:
      "Implemented exam scheduling, candidate flows, anti-cheat controls, result processing, and dashboards for administrators.",
    role: "Full-stack Developer — proctoring hooks, result engine & dashboards",
    impact: "Enabled secure remote exams for 1,000+ concurrent candidates with AWS S3 proctoring",
    metrics: [
      "1,000+ concurrent candidates supported",
      "AWS S3 proctoring + evidence storage",
      "Faster result publishing for institutions",
    ],
    githubUrl: "https://github.com/Venkatesandk",
    featured: false,
  },
  {
    id: "4",
    title: "Ticket Management System",
    description:
      "Customer support ticketing with product tracking, license renewal, email alerts, and SLA management.",
    image: "/projects/ticketing.jpg",
    technologies: ["PHP", "MySQL", "CodeIgniter", "AJAX", "jQuery"],
    architecture: "CodeIgniter backend with email/SMS alert integrations",
    problem: "Companies lacked a structured system for customer issue tracking and escalations.",
    solution:
      "Created support ticketing, product tracking, license renewal, email notifications, and SLA management workflows.",
    role: "Application Developer — ticketing workflows & SLA alerts",
    impact: "Improved first-response SLA compliance and license renewal tracking",
    metrics: [
      "SLA tracking with email/SMS alerts",
      "License renewal visibility for support teams",
      "Structured escalation workflows",
    ],
    githubUrl: "https://github.com/Venkatesandk",
    featured: false,
  },
  {
    id: "5",
    title: "Website Development",
    description:
      "Responsive websites with CMS, REST API integration, authentication, and SEO optimization.",
    image: "/projects/website-ci4.jpg",
    technologies: ["CodeIgniter 4", "MySQL", "AJAX", "jQuery", "Bootstrap"],
    architecture: "CI4 MVC with third-party API integrations",
    problem: "Businesses needed modern, admin-manageable websites with fast load times.",
    solution:
      "Delivered CMS, authentication, REST API integrations, SEO-friendly pages, and fully responsive design.",
    role: "Full-stack Developer — CMS, auth & SEO pages",
    impact: "Delivered SEO-ready sites with admin CMS for non-technical editors",
    metrics: [
      "SEO-ready pages with CMS for editors",
      "Auth + REST API integrations",
      "Fully responsive across devices",
    ],
    githubUrl: "https://github.com/Venkatesandk",
    featured: false,
  },
];

export const certificates: Certificate[] = [
  { id: "1", title: "Bachelor of Computer Applications (BCA)", issuer: "RVS College of Arts & Science, Bharathiar University", date: "2021", image: "/certificates/bca.jpg" },
  { id: "2", title: "Higher Secondary Certificate (HSC)", issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore", date: "2018", image: "/certificates/hsc.jpg" },
  { id: "3", title: "Secondary School Leaving Certificate (SSLC)", issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore", date: "2016", image: "/certificates/sslc.jpg" },
];

/** Platform / professional certs — add real credential URLs when available */
export const professionalCerts = [
  { id: "pc1", title: "PHP Developer", issuer: "HackerRank", date: "2024", badge: "HR", url: "https://www.hackerrank.com/" },
  { id: "pc2", title: "JavaScript (Intermediate)", issuer: "HackerRank", date: "2024", badge: "JS", url: "https://www.hackerrank.com/" },
  { id: "pc3", title: "SQL (Advanced)", issuer: "HackerRank", date: "2023", badge: "SQL", url: "https://www.hackerrank.com/" },
  { id: "pc4", title: "Cloud Practitioner (Learning)", issuer: "AWS", date: "2025", badge: "AWS", url: "https://aws.amazon.com/certification/" },
  { id: "pc5", title: "Prompt Engineering", issuer: "Google AI", date: "2025", badge: "AI", url: "https://ai.google.dev/" },
  { id: "pc6", title: "Python Basics", issuer: "Microsoft Learn", date: "2024", badge: "PY", url: "https://learn.microsoft.com/" },
];

export const githubRepos = [
  { name: "venkatverse", desc: "Personal portfolio — Next.js, AI suite, analytics", lang: "TypeScript", stars: 0, url: "https://github.com/Venkatesandk" },
  { name: "php-erp-modules", desc: "ERP module patterns with CodeIgniter", lang: "PHP", stars: 0, url: "https://github.com/Venkatesandk" },
  { name: "api-toolkit", desc: "REST API helpers & auth patterns", lang: "PHP", stars: 0, url: "https://github.com/Venkatesandk" },
];

export const skillCategories = [
  {
    id: "backend",
    title: "Backend",
    items: ["PHP 7/8", "CodeIgniter 3/4", "REST API Design", "Python"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["JavaScript ES6+", "React", "Next.js", "jQuery / AJAX", "HTML5 / CSS3"],
  },
  {
    id: "database",
    title: "Database",
    items: ["MySQL", "Schema Design", "Query Optimization", "Reporting"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: ["CodeIgniter 4", "Next.js", "React", "Bootstrap", "Tailwind CSS"],
  },
  {
    id: "ai",
    title: "AI",
    items: ["Gemini API", "AWS Bedrock", "Prompt Engineering", "AI Automation"],
  },
  {
    id: "cloud",
    title: "Cloud / DevOps",
    items: ["AWS EC2 / S3", "Vercel", "Git / GitHub", "CI/CD", "Deployment"],
  },
  {
    id: "architecture",
    title: "Architecture",
    items: ["MVC Pattern", "Modular ERP", "API Versioning", "RBAC", "Audit Trails"],
  },
  {
    id: "soft",
    title: "Soft Skills",
    items: ["Team Leadership", "Mentoring", "Stakeholder Communication", "Estimation"],
  },
] as const;

export const whyHireMe = [
  { title: "3× Promoted in 5 Years", desc: "Junior Developer to Lead at eNova Software — proven growth, ownership, and delivery." },
  { title: "Enterprise ERP at Scale", desc: "20+ modules in production serving 5,000+ users across educational institutions." },
  { title: "Measurable Business Impact", desc: "~60% less admin work, ~50% faster payroll, 1,000+ concurrent exam users." },
  { title: "Team Leadership", desc: "Lead a 3-developer team — sprint planning, code reviews, architecture standards." },
  { title: "AI in Production", desc: "Gemini-powered question generation and AI suite — not just experiments, real features." },
  { title: "Full Ownership", desc: "Requirements to AWS deployment — I ship, maintain, and improve what I build." },
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
];

export const workProcess = [
  {
    step: "01",
    title: "Discover",
    desc: "Clarify goals, users, constraints, and success metrics with stakeholders.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Map modules, data models, APIs, and UX flows before heavy coding.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Ship iteratively — PHP/CI backends, responsive UI, integrations & tests.",
  },
  {
    step: "04",
    title: "Deploy & Support",
    desc: "AWS/Vercel deploy, monitoring, handoff docs, and ongoing improvements.",
  },
];

export const availability = {
  status: "Open to opportunities",
  roles: ["Full-time Lead / Senior PHP", "Contract ERP & HRMS", "Remote / Hybrid India"],
  notice: "Responds within 24 hours · Coimbatore IST · Open to remote worldwide",
};

export const stats = getLiveStats();

export const navLinks = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "user" },
  { href: "#skills", label: "Skills", icon: "layers" },
  { href: "#why-hire", label: "Why Hire", icon: "star" },
  { href: "#projects", label: "Projects", icon: "folder" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#services", label: "Services", icon: "grid" },
  { href: "#ai-suite", label: "AI Suite", icon: "bot", badge: "New" },
  { href: "#achievements", label: "Education", icon: "award" },
  { href: "#certifications", label: "Certs", icon: "award" },
  { href: "#blog", label: "Blog", icon: "book" },
  { href: "#faq", label: "FAQ", icon: "help" },
  { href: "#contact", label: "Contact", icon: "mail" },
];

export const analyticsMetrics = [
  {
    label: "Total Visitors",
    value: "128,947",
    sublabel: "All Time",
    sparkline: [40, 55, 45, 60, 52, 70, 65, 80, 75, 90, 85, 95],
  },
  {
    label: "Today's Visitors",
    value: "542",
    change: "+8.2%",
    positive: true,
    sparkline: [20, 35, 30, 45, 40, 55, 50, 60, 58, 65, 62, 70],
  },
  {
    label: "Total Page Views",
    value: "376,782",
    change: "+18.7%",
    positive: true,
    sparkline: [30, 40, 50, 45, 60, 55, 70, 68, 75, 80, 78, 88],
  },
  {
    label: "Projects Completed",
    value: "15",
    change: "+2 This Year",
    positive: true,
    sparkline: [10, 15, 12, 18, 20, 22, 25, 28, 30, 32, 35, 38],
  },
  {
    label: "GitHub Contributions",
    value: "1,247",
    change: "+92 This Month",
    positive: true,
    sparkline: [25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60, 65],
  },
];

export const liveVisitorCountries = [
  { country: "India", flag: "🇮🇳", count: 12, percent: 50 },
  { country: "United States", flag: "🇺🇸", count: 5, percent: 21 },
  { country: "Germany", flag: "🇩🇪", count: 3, percent: 12 },
  { country: "United Kingdom", flag: "🇬🇧", count: 2, percent: 8 },
  { country: "Others", flag: "🌍", count: 2, percent: 9 },
];

export const aiSuiteTools = [
  { id: "1", slug: "resume-builder", title: "Resume Builder", description: "AI-powered resume & CV generator", icon: "file" },
  { id: "2", slug: "interview-coach", title: "Interview Coach", description: "Practice technical interviews", icon: "mic" },
  { id: "3", slug: "code-reviewer", title: "Code Reviewer", description: "Get instant code feedback", icon: "code" },
  { id: "4", slug: "project-explainer", title: "Project Explainer", description: "Explain projects to clients", icon: "lightbulb" },
  { id: "5", slug: "cover-letter", title: "Cover Letter", description: "Generate tailored cover letters", icon: "mail" },
  { id: "6", slug: "voice-assistant", title: "Voice Assistant", description: "Talk to Venkat AI", icon: "volume" },
  { id: "7", slug: "email-writer", title: "Email Writer", description: "Professional email drafts", icon: "send" },
  { id: "8", slug: "career-advisor", title: "Career Advisor", description: "Career path recommendations", icon: "compass" },
] as const;

export const roadmapPhases = [
  {
    id: "1",
    title: "Foundation",
    period: "Q1–Q2 2025",
    status: "completed" as const,
    items: ["Portfolio v1", "AI Chat", "Contact + SMTP", "Resume OTP download"],
  },
  {
    id: "2",
    title: "Dashboard",
    period: "Q3–Q4 2025",
    status: "completed" as const,
    items: ["Live metrics", "Themes", "Notifications", "Feedback system"],
  },
  {
    id: "3",
    title: "AI & Map",
    period: "Q1 2026",
    status: "completed" as const,
    items: ["Gemini AI Suite", "3D world map", "Visitor pins", "Career advisor"],
  },
  {
    id: "4",
    title: "Recruiter UX",
    period: "Q2–Q3 2026",
    status: "in-progress" as const,
    items: ["Case studies", "Blog articles", "Cert badges", "Hire CTAs"],
  },
  {
    id: "5",
    title: "Next",
    period: "Q4 2026+",
    status: "upcoming" as const,
    items: ["Live demos", "Open-source kits", "Video intro", "SaaS experiments"],
  },
];

export const techStack = [
  "PHP", "Python", "CodeIgniter", "JavaScript", "React", "Next.js",
  "MySQL", "jQuery", "AJAX", "HTML5", "CSS3", "AWS EC2", "AWS S3", "REST API", "Git", "Postman", "Vercel", "Gemini", "AWS Bedrock",
];
