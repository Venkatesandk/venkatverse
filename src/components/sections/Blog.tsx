"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import { TitleCover } from "@/components/ui/TitleCover";

export function Blog() {
  return (
    <section id="blog" className="section bg-surface/50">
      <div className="container-main">
        <div className="mb-10 text-center md:mb-14">
          <span className="section-label">Blog</span>
          <h2 className="section-title">Latest Articles</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="card flex flex-col overflow-hidden p-0"
            >
              <TitleCover
                title={post.title}
                badge={post.tags[0] ?? "Article"}
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold leading-snug text-foreground">{post.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground-muted">{post.excerpt}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="badge !text-[10px] !normal-case">{t}</span>
                  ))}
                </div>
                <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
