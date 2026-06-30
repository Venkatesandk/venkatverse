# VenkatVerse - Premium Developer Portfolio

A world-class futuristic personal portfolio website built with Next.js, Three.js, and modern web technologies.

## Features

- **Cinematic Loading Screen** - Futuristic holographic boot sequence
- **3D Interactive Environment** - React Three Fiber globe, cubes, skill sphere
- **Glassmorphism UI** - Cyberpunk + Apple-inspired design
- **AI Assistant** - Floating chatbot with portfolio knowledge
- **Command Palette** - Press `Ctrl+K` for quick navigation
- **Theme Switcher** - Dark/Light mode support
- **Animated Sections** - Hero, About, Skills, Experience, Projects, Certificates, Blog, Contact
- **Performance Optimized** - Lazy loading, code splitting, dynamic imports

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **3D:** Three.js, React Three Fiber, Drei
- **Animation:** Framer Motion, GSAP
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Environment Variables

Create a `.env.local` file for production features:

```env
# Optional: OpenAI API for AI assistant
OPENAI_API_KEY=your_key_here

# Optional: Google Gemini API
GEMINI_API_KEY=your_key_here

# Optional: Contact form email
CONTACT_EMAIL=your@email.com
```

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
```

## Customization

Edit `src/data/portfolio.ts` to update:
- Personal information
- Skills and experience
- Projects and certificates
- Blog posts and social links

## License

MIT
