import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/env";

/**
 * Robots.txt Configuration
 * 
 * Controls search engine crawler access and behavior.
 * Allows all crawlers and points to the dynamic sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const SITE_URL = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"], // Prevent crawling of API routes
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
