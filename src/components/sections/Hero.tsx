"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { developer } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroScene3D = dynamic(
  () => import("@/components/three/HeroScene3D").then((m) => m.HeroScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  }
);

const highlights = [
  "Laravel & CodeIgniter Expert",
  "React, Next.js & Vue.js",
  "AI API Integration",
  "REST API & Microservices",
];

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const quality = isLarge ? "high" : "low";

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="hero-mobile-bg absolute inset-0 z-0 md:opacity-40" />

      <div className="container-main relative z-10 grid min-h-[calc(100dvh-var(--nav-height))] items-center gap-8 py-8 md:min-h-screen md:grid-cols-2 md:gap-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="order-2 text-center md:order-1 md:text-left"
        >
          <span className="badge mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for hire
          </span>

          <p className="mb-1 text-sm text-foreground-muted sm:text-base">Hello, I&apos;m</p>
          <h1 className="mb-3 text-[clamp(2rem,8vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight">
            {developer.firstName}{" "}
            <span className="gradient-text">{developer.lastName}</span>
          </h1>

          <div className="mb-4 text-base font-semibold text-primary sm:text-lg">
            <TypingEffect texts={developer.taglines} />
          </div>

          <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-foreground-muted sm:text-base md:mx-0">
            {developer.bio}
          </p>

          <div className="mb-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap md:justify-start">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={17} />
            </a>
            <a href={developer.resumeUrl} className="btn btn-glass">
              <Download size={17} /> Resume
            </a>
            <a
              href={developer.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon width={17} height={17} /> WhatsApp
            </a>
          </div>

          <SocialLinks size="md" className="justify-center md:justify-start" />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground-muted sm:text-sm md:justify-start">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-primary" />
              Coimbatore, IN
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span className="flex items-center gap-1">
              <Briefcase size={14} className="text-primary" />
              {developer.experience}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-1 mx-auto w-full max-w-md md:order-2 md:max-w-none"
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 shadow-[0_0_60px_rgba(14,165,233,0.12)] hero-3d-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
              {mounted && <HeroScene3D quality={quality} />}
            </div>
            <div className="relative border-t border-border bg-surface/80 px-4 py-4 backdrop-blur-sm sm:px-5">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={developer.photoUrl}
                    alt={developer.name}
                    fill
                    sizes="44px"
                    quality={95}
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate font-semibold">{developer.name}</p>
                  <p className="truncate text-xs text-primary">{developer.role}</p>
                </div>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-xs text-foreground-muted">
                    <CheckCircle2 size={13} className="shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {isDesktop ? (
            <p className="mt-2 text-center text-[11px] text-muted md:text-left">
              Drag to rotate · Move mouse to explore
            </p>
          ) : (
            <p className="mt-2 text-center text-[11px] text-muted">
              Drag to interact with 3D scene
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
