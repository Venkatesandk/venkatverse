"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

/** Clear, stable number display — avoids flashing 0 and keeps updates readable */
export function AnimatedCounter({ value, duration = 700, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;

    if (to === from) {
      setDisplay(to);
      return;
    }

    // Small jumps: show instantly for clarity
    if (Math.abs(to - from) <= 3) {
      setDisplay(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {Number.isFinite(display) ? display.toLocaleString("en-IN") : "0"}
    </span>
  );
}
