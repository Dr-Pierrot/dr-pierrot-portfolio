/**
 * Individual Blog Post Page
 *
 * Displays a single blog post with full content and metadata.
 */

import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/seo";
import ArticleContent from "@/components/ArticleContent";
import ArticleCard from "@/components/ArticleCard";
import BlogPostLoading from "./loading";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);

  if (!post) {
    return {};
  }

  return generatePageMetadata({
    title: `${post.frontmatter.title} - Blog | Jaycee Capulong`,
    description: post.frontmatter.description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.frontmatter.image,
    keywords: post.frontmatter.tags,
  });
}

async function BlogPostPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post || !post.frontmatter.published) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = getAllPosts({ limit: 3 })
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.frontmatter.category === post.frontmatter.category,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ed-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="max-w-4xl">
            <ArticleContent post={post} />
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            {/* Table of Contents */}
            <div className="mb-8 rounded-xl bg-ed-surface border border-ed-border p-6">
              <h3 className="mb-4 font-ed-heading text-sm font-semibold text-ed-text uppercase tracking-wider">
                In This Article
              </h3>
              <nav className="space-y-2">
                {/* Simple TOC - would need proper heading extraction in production */}
                <a
                  href="#"
                  className="block text-sm text-ed-text-muted hover:text-ed-accent transition-colors"
                >
                  Introduction
                </a>
                <a
                  href="#"
                  className="block text-sm text-ed-text-muted hover:text-ed-accent transition-colors"
                >
                  Key Concepts
                </a>
                <a
                  href="#"
                  className="block text-sm text-ed-text-muted hover:text-ed-accent transition-colors"
                >
                  Implementation
                </a>
                <a
                  href="#"
                  className="block text-sm text-ed-text-muted hover:text-ed-accent transition-colors"
                >
                  Conclusion
                </a>
              </nav>
            </div>

            {/* Share */}
            <div className="mb-8 rounded-xl bg-ed-surface border border-ed-border p-6">
              <h3 className="mb-4 font-ed-heading text-sm font-semibold text-ed-text uppercase tracking-wider">
                Share Article
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-[#1DA1F2] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80">
                  Twitter
                </button>
                <button className="flex-1 rounded-lg bg-[#0077B5] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80">
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl bg-ed-surface border border-ed-border p-6">
                <h3 className="mb-4 font-ed-heading text-sm font-semibold text-ed-text uppercase tracking-wider">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <ArticleCard
                      key={relatedPost.slug}
                      post={relatedPost}
                      variant="compact"
                      showImage={false}
                      showExcerpt={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostPageContent params={params} />
    </Suspense>
  );
}
