'use client';

/**
 * Article Content Component
 * 
 * Renders blog content with proper styling and metadata.
 * Simplified version without external MDX dependencies.
 */

import { BlogPost } from '@/lib/blog';
import Link from 'next/link';

interface ArticleContentProps {
  post: BlogPost;
  showHeader?: boolean;
  showMeta?: boolean;
  className?: string;
}

export default function ArticleContent({ 
  post, 
  showHeader = true,
  showMeta = true,
  className = ''
}: ArticleContentProps) {
  const { frontmatter, content, readingTime } = post;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Simple markdown-to-HTML conversion
  const renderContent = (mdxContent: string) => {
    let html = mdxContent
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 text-ed-text">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6 text-ed-text">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-2 mt-4 text-ed-text">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-ed-surface px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^\- (.+)$/gm, '<li class="mb-1">$1</li>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-ed-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1>') || paragraph.includes('<h2>') || paragraph.includes('<h3>') || paragraph.includes('<li>')) {
          return paragraph;
        }
        if (paragraph.includes('<li>')) {
          return `<ul class="list-disc ml-6 mb-4">${paragraph}</ul>`;
        }
        if (paragraph.trim() && !paragraph.includes('<')) {
          return `<p class="mb-4 leading-7 text-ed-text">${paragraph}</p>`;
        }
        return paragraph;
      })
      .join('\n');

    return html;
  };

  return (
    <article className={`max-w-none ${className}`}>
      {showHeader && (
        <header className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ed-text-muted mb-6">
            <Link href="/" className="hover:text-ed-accent transition-colors">
              Home
            </Link>
            <span>→</span>
            <Link
              href="/blog"
              className="hover:text-ed-accent transition-colors"
            >
              Blog
            </Link>
            <span>→</span>
            <span className="text-ed-text">{frontmatter.title}</span>
          </nav>

          {/* Article Meta */}
          {showMeta && (
            <div className="flex items-center gap-3 text-sm text-ed-text-muted mb-6">
              <span className="inline-flex items-center rounded-md bg-ed-surface px-3 py-1 text-sm font-medium text-ed-text border border-ed-border">
                {frontmatter.category}
              </span>
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
              <span>•</span>
              <span>{readingTime.text}</span>
              <span>•</span>
              <span>By {frontmatter.author}</span>
            </div>
          )}

          {/* Featured Badge */}
          {frontmatter.featured && (
            <div className="inline-flex items-center rounded-full bg-ed-gradient-button px-4 py-2 text-sm font-semibold text-white mb-6">
              ⭐ Featured Article
            </div>
          )}

          {/* Title and Description */}
          <h1 className="font-ed-heading text-4xl font-bold tracking-tight text-ed-text mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-xl text-ed-text-muted leading-8 mb-6">
            {frontmatter.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-ed-accent/10 px-3 py-1 text-sm font-medium text-ed-accent"
              >
                #{tag}
              </span>
            ))}
          </div>

          <hr className="border-ed-border mb-8" />
        </header>
      )}

      {/* Content */}
      <div className="max-w-none">
        <div dangerouslySetInnerHTML={{ __html: renderContent(content) }} />
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-ed-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-ed-text-muted">
            <p>Published on {formatDate(frontmatter.date)}</p>
            <p>Last updated: {formatDate(frontmatter.date)}</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-ed-accent hover:text-ed-accent transition-colors text-sm font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
