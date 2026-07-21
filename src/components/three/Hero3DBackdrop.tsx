"use client";

/**
 * Hero atmosphere with performance-safe fallback:
 * - Desktop + no reduced-motion → premium Three.js scene
 * - Mobile / reduced-motion / SSR → lightweight CSS orbs (no WebGL cost)
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroScene3D = dynamic(
  () => import("@/components/three/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false }
);

function LiteBackdrop() {
  return (
    <>
      <div className="hero-lite-glow" />
      <div className="hero-lite-orb hero-lite-orb-a" />
      <div className="hero-lite-orb hero-lite-orb-b" />
      <div className="hero-lite-orb hero-lite-orb-c" />
      <div className="hero-lite-ring hero-lite-ring-a" />
      <div className="hero-lite-ring hero-lite-ring-b" />
    </>
  );
}

export function Hero3DBackdrop({ className = "" }: { className?: string }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [reducedMotion, setReducedMotion] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const usePremium3D = mounted && isDesktop && !reducedMotion;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {usePremium3D ? (
        <div className="absolute inset-y-0 right-0 w-full max-w-xl opacity-80">
          <HeroScene3D quality="low" className="h-full w-full" />
        </div>
      ) : (
        <LiteBackdrop />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/55 to-transparent" />
    </div>
  );
}
