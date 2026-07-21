"use client";

/**
 * Lightweight CSS-only hero atmosphere — no Three.js on first paint.
 * Keeps motion without blocking page load.
 */
export function Hero3DBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="hero-lite-glow" />
      <div className="hero-lite-orb hero-lite-orb-a" />
      <div className="hero-lite-orb hero-lite-orb-b" />
      <div className="hero-lite-orb hero-lite-orb-c" />
      <div className="hero-lite-ring hero-lite-ring-a" />
      <div className="hero-lite-ring hero-lite-ring-b" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/50 to-transparent" />
    </div>
  );
}
