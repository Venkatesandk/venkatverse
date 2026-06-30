import type {
  BlogPost,
  Certificate,
  Experience,
  FAQ,
  Project,
  Service,
  Skill,
  Testimonial,
} from "@/types";

export const developer = {
  name: "Venkatesan D",
  firstName: "Venkatesan",
  lastName: "D",
  role: "Senior Full Stack PHP Developer",
  experience: "4+ Years",
  location: "Coimbatore, Tamil Nadu, India",
  email: "venkatesan@example.com",
  phone: "+91 98765 43210",
  phoneRaw: "919876543210",
  bio: "Passionate Full Stack Developer with 4+ years of experience building scalable web applications. Expert in PHP ecosystems (CodeIgniter, Laravel) with modern frontend skills in React, Next.js, and Vue. AI enthusiast integrating cutting-edge APIs into production systems.",
  taglines: [
    "Full Stack Developer",
    "PHP Expert",
    "Backend Engineer",
    "AI Enthusiast",
  ],
  social: {
    github: "https://github.com/venkatesan-d",
    linkedin: "https://linkedin.com/in/venkatesan-d",
    instagram: "https://instagram.com/venkatesan_d",
    whatsapp: "https://wa.me/919876543210?text=Hello%20Venkatesan%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    email: "mailto:venkatesan@example.com",
  },
  resumeUrl: "/resume.pdf",
};

export const services: Service[] = [
  {
    id: "1",
    title: "Web Application Development",
    description: "Custom PHP, Laravel & CodeIgniter applications built for performance, security, and scale.",
    icon: "code",
  },
  {
    id: "2",
    title: "API Development",
    description: "RESTful APIs, third-party integrations, and microservices architecture for modern apps.",
    icon: "api",
  },
  {
    id: "3",
    title: "Frontend Development",
    description: "Responsive React, Next.js & Vue.js interfaces with clean UX and fast load times.",
    icon: "layout",
  },
  {
    id: "4",
    title: "AI Integration",
    description: "OpenAI & Google Gemini API integration for chatbots, automation, and smart features.",
    icon: "ai",
  },
  {
    id: "5",
    title: "Database Design",
    description: "MySQL, PostgreSQL & MongoDB schema design, optimization, and migration support.",
    icon: "database",
  },
  {
    id: "6",
    title: "DevOps & Deployment",
    description: "Docker containerization, Linux server setup, and production deployment pipelines.",
    icon: "server",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Project Manager",
    company: "Tech Solutions Pvt Ltd",
    content: "Venkatesan delivered our enterprise HR system ahead of schedule. His Laravel expertise and AI integration skills are exceptional. Highly recommended for complex PHP projects.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "CEO",
    company: "Digital Innovations",
    content: "Outstanding developer! He transformed our e-commerce platform and improved performance by 300%. Professional communication and always meets deadlines.",
    rating: 5,
  },
  {
    id: "3",
    name: "Arun Menon",
    role: "CTO",
    company: "StartupHub",
    content: "Venkatesan is our go-to full stack developer. From CodeIgniter legacy systems to modern React frontends — he handles everything with expertise.",
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What technologies do you specialize in?",
    answer: "I specialize in PHP (Laravel, CodeIgniter), JavaScript (React, Next.js, Vue.js), Node.js, MySQL/PostgreSQL, Docker, and AI API integrations (OpenAI, Gemini).",
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
    answer: "Timelines vary by scope. A simple website takes 2-4 weeks, while enterprise applications may take 2-6 months. I provide detailed estimates after understanding your requirements.",
  },
  {
    id: "5",
    question: "Do you provide post-launch support?",
    answer: "Absolutely. I offer maintenance packages, bug fixes, feature updates, and server monitoring to keep your application running smoothly after launch.",
  },
];

export const skills: Skill[] = [
  { name: "PHP", level: 95, category: "backend" },
  { name: "CodeIgniter", level: 90, category: "backend" },
  { name: "Laravel", level: 88, category: "backend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "Vue", level: 80, category: "frontend" },
  { name: "Next.js", level: 82, category: "frontend" },
  { name: "Node", level: 78, category: "backend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "MySQL", level: 88, category: "database" },
  { name: "Docker", level: 75, category: "devops" },
  { name: "Git", level: 92, category: "devops" },
  { name: "REST API", level: 93, category: "backend" },
  { name: "AI", level: 80, category: "ai" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Pvt Ltd",
    period: "2023 - Present",
    description:
      "Leading development of enterprise PHP applications using Laravel and CodeIgniter 4. Architecting REST APIs, integrating AI features with OpenAI and Gemini APIs, and mentoring junior developers.",
    technologies: ["Laravel", "React", "MySQL", "Docker", "OpenAI API"],
  },
  {
    id: "2",
    role: "Full Stack PHP Developer",
    company: "Digital Innovations",
    period: "2021 - 2023",
    description:
      "Built and maintained multiple client projects using CodeIgniter 3/4 and Vue.js. Implemented payment gateways, real-time notifications, and optimized database queries for high-traffic applications.",
    technologies: ["CodeIgniter", "Vue.js", "PostgreSQL", "jQuery", "REST API"],
  },
  {
    id: "3",
    role: "Junior PHP Developer",
    company: "WebCraft Studios",
    period: "2020 - 2021",
    description:
      "Developed custom CMS solutions and e-commerce platforms. Gained expertise in MVC architecture, Bootstrap, and responsive web design principles.",
    technologies: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "HTML/CSS"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered HR Management System",
    description:
      "Enterprise HR platform with AI-driven resume screening and interview scheduling.",
    image: "/projects/hr-system.jpg",
    technologies: ["Laravel", "React", "MySQL", "OpenAI API", "Docker"],
    architecture: "Microservices with Laravel API backend and React SPA frontend",
    problem:
      "Manual resume screening was consuming 40+ hours weekly for HR teams.",
    solution:
      "Built AI integration using OpenAI API for automated resume parsing, skill matching, and candidate ranking with 85% accuracy.",
    liveUrl: "https://demo.example.com",
    githubUrl: "https://github.com/venkatesan-d/hr-system",
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce Marketplace",
    description:
      "Multi-vendor marketplace with real-time inventory and payment processing.",
    image: "/projects/ecommerce.jpg",
    technologies: ["CodeIgniter 4", "Vue.js", "MySQL", "Stripe API"],
    architecture: "Monolithic MVC with Vue.js components and REST API layer",
    problem:
      "Existing platform couldn't handle concurrent users during flash sales.",
    solution:
      "Implemented Redis caching, database indexing, and queue-based order processing, improving throughput by 300%.",
    liveUrl: "https://shop.example.com",
    githubUrl: "https://github.com/venkatesan-d/marketplace",
    featured: true,
  },
  {
    id: "3",
    title: "Real-Time Analytics Dashboard",
    description:
      "Business intelligence dashboard with live data visualization and reporting.",
    image: "/projects/analytics.jpg",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js", "WebSocket"],
    architecture: "Next.js SSR with Node.js microservice for real-time data streaming",
    problem: "Stakeholders needed real-time insights without manual report generation.",
    solution:
      "Created WebSocket-powered dashboard with automated PDF reports and scheduled email digests.",
    githubUrl: "https://github.com/venkatesan-d/analytics",
    featured: true,
  },
  {
    id: "4",
    title: "Gemini AI Chat Assistant",
    description:
      "Custom chatbot platform integrated with Google Gemini API for customer support.",
    image: "/projects/chatbot.jpg",
    technologies: ["Laravel", "React", "Gemini API", "PostgreSQL"],
    architecture: "API-first Laravel backend with React chat interface",
    problem: "Customer support team overwhelmed with repetitive queries.",
    solution:
      "Deployed AI chatbot handling 70% of tier-1 support tickets with seamless human handoff.",
    liveUrl: "https://chat.example.com",
    featured: false,
  },
];

export const certificates: Certificate[] = [
  { id: "1", title: "Laravel Certified Developer", issuer: "Laravel", date: "2024", image: "/certificates/laravel.jpg" },
  { id: "2", title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023", image: "/certificates/aws.jpg" },
  { id: "3", title: "React Advanced Patterns", issuer: "Frontend Masters", date: "2023", image: "/certificates/react.jpg" },
  { id: "4", title: "Docker & Kubernetes", issuer: "Udemy", date: "2022", image: "/certificates/docker.jpg" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Integrating OpenAI API with Laravel: A Complete Guide",
    excerpt: "Learn how to build AI-powered features in your Laravel applications with OpenAI's API.",
    date: "2025-12-15",
    readTime: "8 min",
    tags: ["Laravel", "AI", "OpenAI"],
    slug: "openai-laravel-integration",
  },
  {
    id: "2",
    title: "CodeIgniter 4 vs Laravel: When to Use Which",
    excerpt: "A practical comparison of PHP frameworks based on real project experience.",
    date: "2025-10-20",
    readTime: "6 min",
    tags: ["PHP", "CodeIgniter", "Laravel"],
    slug: "codeigniter-vs-laravel",
  },
  {
    id: "3",
    title: "Building Real-Time Apps with Next.js and WebSockets",
    excerpt: "Step-by-step guide to implementing real-time features in modern React applications.",
    date: "2025-08-05",
    readTime: "10 min",
    tags: ["Next.js", "WebSocket", "React"],
    slug: "nextjs-websockets-realtime",
  },
];

export const stats = [
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
];

export const navLinks = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "user" },
  { href: "#skills", label: "Skills", icon: "layers" },
  { href: "#projects", label: "Projects", icon: "folder" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#services", label: "Services", icon: "grid" },
  { href: "#ai-suite", label: "AI Suite", icon: "bot", badge: "New" },
  { href: "#achievements", label: "Achievements", icon: "award" },
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
    value: "48",
    change: "+3 This Month",
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
  "PHP", "Laravel", "CodeIgniter", "React", "Next.js", "Vue.js",
  "Node.js", "MySQL", "PostgreSQL", "Docker", "REST API", "OpenAI", "Gemini",
];
