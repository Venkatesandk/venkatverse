import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-3 text-xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        This link is empty or outdated. Head back to the portfolio to explore projects, experience, and contact options.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/" className="btn btn-primary !w-auto">
          Go to Home
        </Link>
        <Link href="/#contact" className="btn btn-glass !w-auto">
          Contact
        </Link>
        <Link href="/#projects" className="btn btn-glass !w-auto">
          Projects
        </Link>
      </div>
    </main>
  );
}
