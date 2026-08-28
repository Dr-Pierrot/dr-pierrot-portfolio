"use client";

/**
 * Article Card Component
 *
 * Displays blog post previews with metadata, reading time,
 * and proper analytics tracking.
 */

import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { trackNavigation } from "@/lib/analytics";
import OptimizedImage from "./OptimizedImage";

interface ArticleCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  showImage?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export default function ArticleCard({
  post,
  variant = "default",
  showImage = true,
  showExcerpt = true,
  className = "",
}: ArticleCardProps) {
  const { slug, frontmatter, readingTime } = post;

  const handleClick = () => {
    trackNavigation("blog_post", `/blog/${slug}`);
  };

  if (variant === "compact") {
    return (
      <article className={`group ${className}`}>
        <Link href={`/blog/${slug}`} onClick={handleClick} className="block">
          <div className="flex items-start gap-4">
            {showImage && frontmatter.image && (
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-ed-surface">
                <OptimizedImage
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-ed-heading text-sm font-semibold text-ed-text group-hover:text-ed-accent transition-colors overflow-hidden">
                <span
                  className="block overflow-hidden text-ellipsis"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {frontmatter.title}
                </span>
              </h3>

              <div className="flex items-center gap-2 mt-1 text-xs text-ed-text-muted">
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{readingTime.text}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className={`group ${className}`}>
        <Link href={`/blog/${slug}`} onClick={handleClick} className="block">
          <div className="rounded-2xl bg-ed-surface border border-ed-border p-6 transition-all duration-300 hover:border-ed-accent hover:shadow-lg hover:-translate-y-1">
            {frontmatter.featured && (
              <div className="inline-flex items-center rounded-full bg-ed-gradient-button px-3 py-1 text-xs font-semibold text-white mb-3">
                ⭐ Featured
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-ed-text-muted mb-3">
              <span className="inline-flex items-center rounded-md bg-ed-surface px-2 py-1 text-xs font-medium text-ed-text border border-ed-border">
                {frontmatter.category}
              </span>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{readingTime.text}</span>
            </div>

            <h2 className="font-ed-heading text-xl font-bold text-ed-text mb-3 group-hover:text-ed-accent transition-colors">
              {frontmatter.title}
            </h2>

            {showExcerpt && (
              <p
                className="text-ed-text-muted text-sm leading-6 mb-4 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {frontmatter.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {frontmatter.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-ed-accent/10 px-2 py-1 text-xs font-medium text-ed-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-ed-accent text-sm font-medium">
                Read more →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={`group ${className}`}>
      <Link href={`/blog/${slug}`} onClick={handleClick} className="block">
        <div className="rounded-xl bg-ed-paper border border-ed-border p-5 transition-all duration-300 hover:border-ed-accent hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-xs text-ed-text-muted mb-3">
            <span className="inline-flex items-center rounded-md bg-ed-surface px-2 py-1 text-xs font-medium text-ed-text border border-ed-border">
              {frontmatter.category}
            </span>
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{readingTime.text}</span>
          </div>

          <h3
            className="font-ed-heading text-lg font-semibold text-ed-text mb-2 group-hover:text-ed-accent transition-colors overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {frontmatter.title}
          </h3>

          {showExcerpt && (
            <p
              className="text-ed-text-muted text-sm leading-6 mb-4 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {frontmatter.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {frontmatter.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-ed-accent/10 px-2 py-1 text-xs font-medium text-ed-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-ed-accent text-sm font-medium">Read →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
