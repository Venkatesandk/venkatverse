"use client";

import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  // Bold **text**, then italic *text* (avoid matching **)
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic text-foreground-muted">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function stripMarkdownHeading(line: string): string {
  return line.replace(/^#{1,6}\s+/, "").trim();
}

/**
 * Renders AI replies (markdown-ish) as readable UI — headings, bullets, bold.
 */
export function FormattedAIContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  return (
    <div className={`space-y-2.5 text-sm leading-relaxed ${className}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={i} className="h-2" aria-hidden />;
        }

        // Horizontal rule
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
          return <hr key={i} className="my-3 border-border" />;
        }

        // Headings ## / ###
        const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
        if (heading) {
          const level = heading[1].length;
          const text = stripMarkdownHeading(trimmed);
          if (level === 1) {
            return (
              <h2 key={i} className="pt-1 text-base font-bold tracking-tight text-foreground">
                {renderInline(text)}
              </h2>
            );
          }
          if (level === 2) {
            return (
              <h3
                key={i}
                className="mt-3 border-l-2 border-primary pl-3 text-[15px] font-bold text-foreground first:mt-0"
              >
                {renderInline(text)}
              </h3>
            );
          }
          return (
            <h4 key={i} className="mt-2 text-[13px] font-semibold uppercase tracking-wide text-primary">
              {renderInline(text)}
            </h4>
          );
        }

        // Numbered list: 1. item
        const numbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numbered) {
          return (
            <div key={i} className="flex gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                {numbered[1]}
              </span>
              <p className="min-w-0 flex-1 break-words text-foreground">{renderInline(numbered[2])}</p>
            </div>
          );
        }

        // Bullets: - * •
        const bullet = trimmed.match(/^([•\-\*])\s+(.*)$/);
        if (bullet) {
          return (
            <div key={i} className="flex gap-2.5 pl-0.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="min-w-0 flex-1 break-words text-foreground">{renderInline(bullet[2])}</p>
            </div>
          );
        }

        // Indented continuation
        if (/^\s{2,}/.test(line)) {
          return (
            <p key={i} className="pl-7 text-xs break-words text-muted">
              {renderInline(trimmed)}
            </p>
          );
        }

        // Plain paragraph — treat ALL CAPS short lines as section labels
        if (/^[A-Z][A-Z0-9\s&/–—-]{8,}$/.test(trimmed) && trimmed.length < 60) {
          return (
            <p key={i} className="mt-2 text-[11px] font-bold uppercase tracking-wider text-primary">
              {trimmed}
            </p>
          );
        }

        return (
          <p key={i} className="break-words text-foreground-muted">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
