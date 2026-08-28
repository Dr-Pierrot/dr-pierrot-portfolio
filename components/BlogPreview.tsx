/**
 * Blog Preview Component
 *
 * Shows featured blog posts on the homepage with a link to the full blog.
 * Integrates seamlessly with the existing homepage design.
 */

import Link from "next/link";
import { getFeaturedPosts, getAllPosts } from "@/lib/blog";
import ArticleCard from "./ArticleCard";

export default function BlogPreview() {
  const featuredPosts = getFeaturedPosts(2);
  const recentPosts = getAllPosts({ limit: 3 });

  // If we don't have featured posts, show recent posts instead
  const displayPosts =
    featuredPosts.length > 0 ? featuredPosts : recentPosts.slice(0, 2);

  if (displayPosts.length === 0) {
    return null; // Don't render if no posts
  }

  return (
    <section
      id="blog"
      className="w-full bg-ed-paper px-6 py-[clamp(4.5rem,10vw,7rem)]"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
            {"// insights and tutorials"}
          </p>

          <h2 className="mb-6 bg-ed-gradient-text bg-clip-text font-ed-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-transparent">
            Latest Articles
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-ed-text-muted">
            Thoughts on web development, TypeScript, React, and the
            ever-evolving world of modern development.
          </p>
        </div>

        {/* Featured/Recent Posts */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {displayPosts.map((post) => (
            <ArticleCard
              key={post.slug}
              post={post}
              variant="featured"
              showExcerpt={true}
              className="h-full"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-ed-gradient-button px-8 py-4 font-ed-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            View All Articles
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Blog Stats */}
        <div className="mt-12 flex justify-center gap-8 text-sm">
          <div className="text-center">
            <div className="font-ed-heading text-xl font-bold text-ed-accent">
              {recentPosts.length}
            </div>
            <div className="text-ed-text-muted">Articles</div>
          </div>
          <div className="text-center">
            <div className="font-ed-heading text-xl font-bold text-ed-accent">
              {recentPosts
                .reduce((total, post) => total + post.readingTime.words, 0)
                .toLocaleString()}
            </div>
            <div className="text-ed-text-muted">Words</div>
          </div>
          <div className="text-center">
            <div className="font-ed-heading text-xl font-bold text-ed-accent">
              {
                [
                  ...new Set(
                    recentPosts.flatMap((post) => post.frontmatter.tags),
                  ),
                ].length
              }
            </div>
            <div className="text-ed-text-muted">Topics</div>
          </div>
        </div>
      </div>
    </section>
  );
}
