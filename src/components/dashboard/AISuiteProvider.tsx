"use client";

import { useEffect, useState } from "react";
import { AISuiteModal } from "./AISuiteModal";
import type { AISuiteToolSlug } from "@/types";

export function AISuiteProvider() {
  const [activeTool, setActiveTool] = useState<AISuiteToolSlug | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<AISuiteToolSlug>).detail;
      if (slug) setActiveTool(slug);
    };
    window.addEventListener("open-ai-suite", handler);
    return () => window.removeEventListener("open-ai-suite", handler);
  }, []);

  if (!activeTool) return null;

  return <AISuiteModal tool={activeTool} onClose={() => setActiveTool(null)} />;
}

export function openAISuiteTool(slug: AISuiteToolSlug) {
  window.dispatchEvent(new CustomEvent("open-ai-suite", { detail: slug }));
}
