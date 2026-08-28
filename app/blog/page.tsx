/**
 * Blog Listing Page
 *
 * Displays all published blog posts with filtering and search.
 */

import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getBlogStats } from "@/lib/blog";
import ArticleCard from "@/components/ArticleCard";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog - Jaycee Capulong | Web Development Insights",
  description:
    "Read about web development, TypeScript, React, and modern development practices. Insights and tutorials from a fullstack developer.",
  path: "/blog",
  type: "website",
});

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts(2);
  const recentPosts = getAllPosts({ limit: 20 });
  const stats = getBlogStats();

  return (
    <div className="min-h-screen bg-ed-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-ed-text-muted hover:text-ed-accent transition-colors group"
          >
            <svg 
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
            {"// insights and tutorials"}
          </p>

          <h1 className="mb-6 bg-ed-gradient-text bg-clip-text font-ed-heading text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-transparent">
            Blog
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-ed-text-muted">
            Thoughts on web development, TypeScript, React, and the
            ever-evolving world of modern development.
          </p>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-ed-heading text-2xl font-bold text-ed-accent">
                {stats.publishedPosts}
              </div>
              <div className="text-ed-text-muted">Articles</div>
            </div>
            <div className="text-center">
              <div className="font-ed-heading text-2xl font-bold text-ed-accent">
                {stats.totalWords.toLocaleString()}
              </div>
              <div className="text-ed-text-muted">Words</div>
            </div>
            <div className="text-center">
              <div className="font-ed-heading text-2xl font-bold text-ed-accent">
                {stats.tags}
              </div>
              <div className="text-ed-text-muted">Topics</div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 font-ed-heading text-2xl font-bold text-ed-text">
              Featured Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="mb-8 font-ed-heading text-2xl font-bold text-ed-text">
            All Articles
          </h2>

          {recentPosts.length === 0 ? (
            <div className="rounded-xl bg-ed-surface border border-ed-border p-12 text-center">
              <p className="text-ed-text-muted">
                No articles published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts
                .filter((post) => !post.frontmatter.featured) // Don't repeat featured posts
                .map((post) => (
                  <ArticleCard key={post.slug} post={post} variant="default" />
                ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 rounded-2xl bg-ed-gradient-subtle p-8 text-center">
          <h3 className="mb-4 font-ed-heading text-xl font-bold text-ed-text">
            Stay Updated
          </h3>
          <p className="mb-6 text-ed-text-muted">
            Get notified when I publish new articles about web development and
            technology.
          </p>
          <button className="rounded-lg bg-ed-gradient-button px-6 py-3 font-ed-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            Subscribe to Newsletter
          </button>
        </section>
      </main>
    </div>
  );
}