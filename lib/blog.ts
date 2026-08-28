/**
 * Blog System Utilities
 *
 * Provides utilities for handling MDX blog content, including
 * frontmatter parsing, content processing, and blog management.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Blog post types
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  readingTime?: number;
  image?: string;
  excerpt?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
  excerpt: string;
}

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

/**
 * Get all blog post files from the content directory
 */
function getBlogFiles(): string[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
      return [];
    }
    return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"));
  } catch (error) {
    console.error("Error reading blog files:", error);
    return [];
  }
}

/**
 * Calculate reading time (simple estimation)
 */
function calculateReadingTime(content: string): {
  text: string;
  minutes: number;
  words: number;
} {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // 200 WPM average

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}

/**
 * Parse a single MDX file and extract frontmatter and content
 */
function parseBlogFile(filename: string): BlogPost | null {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Generate excerpt from content (first 160 chars)
    const excerpt =
      data.excerpt ||
      content.replace(/[#*`]/g, "").trim().substring(0, 160) + "...";

    const slug = filename.replace(".mdx", "");

    const frontmatter: BlogFrontmatter = {
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Jaycee Capulong",
      slug: data.slug || slug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || "General",
      featured: Boolean(data.featured),
      published: Boolean(data.published),
      readingTime: data.readingTime || readingTime.minutes,
      image: data.image || null,
      excerpt: data.excerpt || excerpt,
    };

    return {
      slug,
      frontmatter,
      content,
      readingTime,
      excerpt,
    };
  } catch (error) {
    console.error(`Error parsing blog file ${filename}:`, error);
    return null;
  }
}

/**
 * Get all blog posts with optional filtering
 */
export function getAllPosts(
  options: {
    published?: boolean;
    featured?: boolean;
    limit?: number;
    sortBy?: "date" | "title";
    sortOrder?: "asc" | "desc";
  } = {},
): BlogPost[] {
  const {
    published = true,
    featured,
    limit,
    sortBy = "date",
    sortOrder = "desc",
  } = options;

  const files = getBlogFiles();
  const posts = files
    .map(parseBlogFile)
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => !published || post.frontmatter.published)
    .filter(
      (post) =>
        featured === undefined || post.frontmatter.featured === featured,
    );

  // Sort posts
  posts.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    } else {
      const titleA = a.frontmatter.title.toLowerCase();
      const titleB = b.frontmatter.title.toLowerCase();
      return sortOrder === "desc"
        ? titleB.localeCompare(titleA)
        : titleA.localeCompare(titleB);
    }
  });

  return limit ? posts.slice(0, limit) : posts;
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`;
  return parseBlogFile(filename);
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(limit = 3): BlogPost[] {
  return getAllPosts({ featured: true, limit });
}

/**
 * Get recent blog posts
 */
export function getRecentPosts(limit = 5): BlogPost[] {
  return getAllPosts({ limit, sortBy: "date", sortOrder: "desc" });
}

/**
 * Get all unique tags from blog posts
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique categories from blog posts
 */
export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const categoryCount = new Map<string, number>();

  posts.forEach((post) => {
    const category = post.frontmatter.category;
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });

  return Array.from(categoryCount.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Search posts by title, description, or content
 */
export function searchPosts(query: string): BlogPost[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase();

  return getAllPosts().filter((post) => {
    const { title, description, tags, category } = post.frontmatter;
    const content = post.content.toLowerCase();

    return (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      content.includes(searchTerm) ||
      tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      category.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Get blog statistics
 */
export function getBlogStats() {
  const posts = getAllPosts({ published: false }); // Get all posts including drafts
  const publishedPosts = posts.filter((post) => post.frontmatter.published);

  return {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    draftPosts: posts.length - publishedPosts.length,
    featuredPosts: publishedPosts.filter((post) => post.frontmatter.featured)
      .length,
    totalWords: posts.reduce((sum, post) => sum + post.readingTime.words, 0),
    averageReadingTime:
      Math.round(
        posts.reduce((sum, post) => sum + post.readingTime.minutes, 0) /
          posts.length,
      ) || 0,
    tags: getAllTags().length,
    categories: getAllCategories().length,
  };
}
