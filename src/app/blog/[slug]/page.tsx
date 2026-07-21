import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, developer } from "@/data/portfolio";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <Link
          href="/#blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>

        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
            <span>By {developer.name}</span>
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-sm font-semibold">Need help building something similar?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/#contact" className="btn btn-primary !w-auto !px-4 !py-2 !text-xs">
                Hire Me
              </Link>
              <a
                href={developer.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass !w-auto !px-4 !py-2 !text-xs"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </article>

        <section className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">More articles</p>
          <ul className="space-y-2">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block rounded-xl border border-border px-4 py-3 transition hover:border-primary/30 hover:bg-surface"
                  >
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{p.readTime} · {p.date}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
