import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/env";

/**
 * Dynamic Sitemap Generator
 * 
 * Generates a comprehensive sitemap including:
 * - Static pages (home, about, contact)
 * - Dynamic project pages
 * - Future blog posts (when blog system is implemented)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = siteConfig.url;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.year, 0, 1), // Use project year as last modified
    changeFrequency: project.status === "In Progress" ? "monthly" : "yearly",
    priority: project.highlight ? 0.9 : 0.7,
  }));

  // Combine all pages
  return [...staticPages, ...projectPages];
}
