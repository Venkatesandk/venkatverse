"use client";

import type { ReactNode } from "react";
import { useMounted } from "@/hooks/useMounted";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Renders children only after mount — avoids hydration mismatches from browser extensions. */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const mounted = useMounted();
  if (!mounted) return fallback;
  return children;
}
