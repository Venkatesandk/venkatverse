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
    return `Lead Application Developer with ${label} of experience at eNova Software (joined July 2021), building enterprise ERP and web applications using PHP, CodeIgniter, MySQL, and JavaScript. Promoted three times from Junior Developer to Lead. Skilled in REST APIs, workflow automation, AWS deployment, and AI-enabled education systems.`;
  },
  taglines: [
    "Lead Application Developer",
    "PHP & CodeIgniter Expert",
    "ERP & HRMS Specialist",
    "AWS & AI Enthusiast",
  ],
  social: {
    github: "https://github.com/Venkatesandk",
    linkedin: "https://linkedin.com/in/venkatesan-devaraj",
    instagram: "https://www.instagram.com/_s_i_n_g_l_e_b_o_i",
    whatsapp: "https://wa.me/919688213541?text=Hello%20Venkatesan%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    email: "mailto:venkatvs131@gmail.com",
  },
  resumeUrl: "/resume.pdf",
  photoUrl: "/profile-avatar.png",
  photoFullUrl: "/profile.png",
};

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
    description: "Custom PHP & CodeIgniter (CI3/CI4) applications built for performance, security, and scale.",
    icon: "code",
  },
  {
    id: "2",
    title: "API Development",
    description: "RESTful APIs, third-party integrations, and biometric device integrations for modern apps.",
    icon: "api",
  },
  {
    id: "3",
    title: "Frontend Development",
    description: "Responsive interfaces with HTML, CSS, JavaScript (ES6+), jQuery, AJAX, and React.",
    icon: "layout",
  },
  {
    id: "4",
    title: "AI & Cloud Integration",
    description: "AWS (EC2, S3, CloudWatch), AWS Bedrock GenAI, and cloud deployment with CI/CD workflows.",
    icon: "ai",
  },
  {
    id: "5",
    title: "Database Design",
    description: "MySQL schema design, query optimization, and reporting systems for data-driven decisions.",
    icon: "database",
  },
  {
    id: "6",
    title: "DevOps & Deployment",
    description: "AWS cloud deployment, Git version control, and production server management.",
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
  { name: "Python", level: 72, category: "backend" },
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
      "Lead design, development, and deployment of enterprise-grade ERP and web applications. Define architecture standards, mentor teams, and drive AI-enabled automation.",
    responsibilities: [
      "Lead the design, development, and deployment of enterprise-grade ERP and web applications.",
      "Define application architecture and development standards for scalable software solutions.",
      "Mentor development teams, perform code reviews, and ensure software quality.",
      "Collaborate with clients and business stakeholders to analyze requirements and deliver business solutions.",
      "Design and develop RESTful APIs and workflow automation.",
      "Optimize application performance and database efficiency.",
      "Manage production deployments, version control, and release planning.",
      "Drive AI-enabled application development and automation initiatives.",
      "Ensure secure, maintainable, and scalable application architecture.",
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
      "Led critical ERP modules, designed databases, mentored juniors, and delivered secure APIs with third-party integrations.",
    responsibilities: [
      "Led development of critical ERP modules.",
      "Designed database structures and optimized SQL queries.",
      "Reviewed code and mentored junior developers.",
      "Developed secure APIs and integrated third-party services.",
      "Participated in requirement gathering and client discussions.",
      "Improved system performance and application security.",
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
      "Built ERP modules for educational institutions including fees, library, exams, inventory, and student management.",
    responsibilities: [
      "Developed ERP modules for educational institutions.",
      "Implemented Fee Management, Library, Examination, Inventory, and Student Management systems.",
      "Created responsive dashboards using JavaScript and AJAX.",
      "Developed reports and analytics modules.",
      "Fixed production issues and optimized application performance.",
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
      "Developed PHP/CodeIgniter web apps, MySQL schemas, CRUD & reports, biometric attendance, and government project modules.",
    responsibilities: [
      "Developed web applications using PHP and CodeIgniter.",
      "Created responsive user interfaces using HTML, CSS, JavaScript, and jQuery.",
      "Designed MySQL database tables and SQL queries.",
      "Implemented CRUD operations and report generation.",
      "Participated in testing, debugging, and deployment activities.",
      "Worked on biometric attendance integration and government projects.",
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
  "Promoted three times within 5 years, progressing from Junior Software Developer to Lead Application Developer.",
  "Successfully delivered multiple enterprise ERP solutions for educational institutions.",
  "Led end-to-end development of mission-critical modules and workflow automation.",
  "Improved application performance through database optimization and code refactoring.",
  "Designed and deployed scalable REST APIs and third-party integrations.",
  "Mentored junior developers and established coding best practices.",
  "Delivered AI-enabled features for educational management systems.",
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
    featured: true,
  },
  {
    id: "3",
    title: "Online Examination",
    description:
      "Secure online examination system with proctoring workflows and result processing.",
    image: "/projects/exam-portal.jpg",
    technologies: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "AJAX"],
    architecture: "Web application with exam workflows, monitoring hooks, and reporting",
    problem:
      "Institutions needed a reliable remote/online exam platform with tracking and analytics.",
    solution:
      "Implemented exam scheduling, candidate flows, anti-cheat controls, result processing, and dashboards for administrators.",
    featured: true,
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
    featured: false,
  },
];

export const certificates: Certificate[] = [
  { id: "1", title: "Bachelor of Computer Applications (BCA)", issuer: "RVS College of Arts & Science, Bharathiar University", date: "2021", image: "/certificates/bca.jpg" },
  { id: "2", title: "Higher Secondary Certificate (HSC)", issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore", date: "2018", image: "/certificates/hsc.jpg" },
  { id: "3", title: "Secondary School Leaving Certificate (SSLC)", issuer: "Sri K Krishnaswamy Naidu HSS, Coimbatore", date: "2016", image: "/certificates/sslc.jpg" },
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
  },
  {
    id: "2",
    title: "Online Exam Proctoring with React, Python & AWS S3",
    excerpt: "Architecting secure remote exams with video capture, anti-cheating, and cloud storage.",
    date: "2025-10-20",
    readTime: "10 min",
    tags: ["React", "Python", "AWS"],
    slug: "online-exam-proctoring-aws",
  },
  {
    id: "3",
    title: "CodeIgniter 4 vs CI3: Migration Lessons from Production",
    excerpt: "Practical insights from migrating and building new projects on CodeIgniter 4.",
    date: "2025-08-05",
    readTime: "6 min",
    tags: ["PHP", "CodeIgniter"],
    slug: "codeigniter-4-migration",
  },
];

export const stats = getLiveStats();

export const navLinks = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "user" },
  { href: "#skills", label: "Skills", icon: "layers" },
  { href: "#projects", label: "Projects", icon: "folder" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#services", label: "Services", icon: "grid" },
  { href: "#ai-suite", label: "AI Suite", icon: "bot", badge: "New" },
  { href: "#achievements", label: "Education", icon: "award" },
  { href: "#blog", label: "Blog", icon: "book" },
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
    title: "Phase 1",
    period: "Q1 2025",
    status: "completed" as const,
    items: ["Portfolio v1", "AI Chat Integration", "Contact API"],
  },
  {
    id: "2",
    title: "Phase 2",
    period: "Q2 2025",
    status: "completed" as const,
    items: ["Dashboard UI", "Analytics Panel", "GitHub Widget"],
  },
  {
    id: "3",
    title: "Phase 3",
    period: "Q3 2025",
    status: "in-progress" as const,
    items: ["AI Suite Tools", "Blog CMS", "Case Studies"],
  },
  {
    id: "4",
    title: "Phase 4",
    period: "Q4 2025",
    status: "upcoming" as const,
    items: ["Chess Bot Game", "Live Coding", "Video Intro"],
  },
  {
    id: "5",
    title: "Phase 5",
    period: "2026",
    status: "upcoming" as const,
    items: ["SaaS Products", "Open Source Libs", "Tech Talks"],
  },
];

export const techStack = [
  "PHP", "CodeIgniter", "JavaScript", "React", "Python",
  "MySQL", "jQuery", "AJAX", "AWS EC2", "AWS S3", "REST API", "Git", "AWS Bedrock",
];
