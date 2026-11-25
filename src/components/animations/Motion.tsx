"use client";

import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "in" | "scale";
  className?: string;
}

/**
 * Immediate-visibility wrapper: prevents tall mobile sections from getting
 * stuck at opacity: 0 when IntersectionObserver thresholds don't fire cleanly.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
