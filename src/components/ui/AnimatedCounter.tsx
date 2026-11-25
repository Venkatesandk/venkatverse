"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

/** Animates numeric updates smoothly while respecting prefers-reduced-motion. */
export function AnimatedCounter({ value, duration = 650, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (to === from || Math.abs(to - from) <= 2 || prefersReduced) {
      const raf = window.requestAnimationFrame(() => setDisplay(to));
      return () => window.cancelAnimationFrame(raf);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {Number.isFinite(display) ? display.toLocaleString("en-IN") : "0"}
    </span>
  );
}
