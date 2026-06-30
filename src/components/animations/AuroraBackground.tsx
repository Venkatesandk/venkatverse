"use client";

import { useEffect, useState } from "react";

interface StarStyle {
  width: number;
  height: number;
  top: string;
  left: string;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
}

function createStars(count: number): StarStyle[] {
  return Array.from({ length: count }, () => ({
    width: Math.random() * 2 + 1,
    height: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.7 + 0.3,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 3 + 2}s`,
  }));
}

export function AuroraBackground() {
  const [stars, setStars] = useState<StarStyle[]>([]);

  useEffect(() => {
    setStars(createStars(80));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="animate-aurora absolute -top-1/2 left-0 h-full w-[200%] opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, var(--aurora-1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, var(--aurora-2) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, var(--aurora-3) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={star}
          />
        ))}
      </div>
    </div>
  );
}
