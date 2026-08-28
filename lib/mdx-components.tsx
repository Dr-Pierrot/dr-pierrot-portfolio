/**
 * MDX Components Configuration
 *
 * Custom components for rendering MDX content with proper
 * styling and functionality.
 */

import { MDXComponents } from "mdx/types";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

// Custom MDX components
export const mdxComponents: MDXComponents = {
  // Headings with proper styling and anchor links
  h1: ({ children, ...props }) => (
    <h1
      className="scroll-mt-20 font-ed-heading text-3xl font-bold tracking-tight text-ed-text mb-6 mt-8"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      className="scroll-mt-20 font-ed-heading text-2xl font-semibold tracking-tight text-ed-text mb-4 mt-8"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      className="scroll-mt-20 font-ed-heading text-xl font-semibold tracking-tight text-ed-text mb-3 mt-6"
      {...props}
    >
      {children}
    </h3>
  ),

  // Paragraphs with proper spacing
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-ed-text" {...props}>
      {children}
    </p>
  ),

  // Links with proper styling
  a: ({ href, children, ...props }) => {
    // External links
    if (href?.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal links
    return (
      <Link
        href={href || "#"}
        className="text-ed-accent-text hover:text-ed-accent underline decoration-dotted underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Code blocks with syntax highlighting
  pre: ({ children, ...props }) => (
    <pre
      className="overflow-x-auto rounded-lg bg-ed-surface p-4 text-sm border border-ed-border mb-6"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, ...props }) => (
    <code
      className="rounded bg-ed-surface px-1.5 py-0.5 text-sm font-mono border border-ed-border"
      {...props}
    >
      {children}
    </code>
  ),

  // Lists with proper styling
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="leading-7 text-ed-text" {...props}>
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-ed-accent pl-4 italic text-ed-text-muted mb-6"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-ed-border" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-ed-surface" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-ed-border bg-ed-paper" {...props}>
      {children}
    </tbody>
  ),

  th: ({ children, ...props }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-ed-text-muted uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-ed-text" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: (props) => <hr className="my-8 border-ed-border" {...props} />,

  // Images with optimization
  img: ({ src, alt, ...props }) => {
    if (!src) return null;

    return (
      <OptimizedImage
        src={src}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg mb-6"
        {...props}
      />
    );
  },
};
