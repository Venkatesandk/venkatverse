"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 h-[var(--nav-height)] transition-colors",
          scrolled ? "glass border-b border-border" : "bg-background/80 backdrop-blur-md"
        )}
      >
        <div className="container-main flex h-full items-center justify-between gap-3">
          <a href="#home" className="shrink-0 text-base font-bold sm:text-lg">
            Venkat<span className="text-primary">.dev</span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground-muted hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground-muted"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            <a href="#contact" className="btn btn-primary !hidden !min-h-9 !py-2 !px-3.5 !text-sm sm:!inline-flex">
              Hire Me
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
          <nav className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col bg-surface shadow-2xl">
            <div className="flex h-[var(--nav-height)] items-center justify-between border-b border-border px-4">
              <span className="font-bold">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3.5 text-base font-medium text-foreground-muted active:bg-surface-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="border-t border-border p-4 pb-safe">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary">
                Hire Me
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
