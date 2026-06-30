"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-36 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted hover:text-primary md:bottom-6"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
