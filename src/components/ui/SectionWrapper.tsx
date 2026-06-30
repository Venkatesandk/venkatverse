"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
  align = "left",
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("section-padding relative", className)}>
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={cn("mb-14", align === "center" && "text-center")}
          >
            {subtitle && (
              <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
                <span className="h-px w-8 bg-primary/50" />
                <p className="badge">{subtitle}</p>
                <span className="h-px w-8 bg-primary/50" />
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                {title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="gradient-text">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
