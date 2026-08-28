/**
 * SEO Utilities
 *
 * Helper functions and schemas for SEO optimization including
 * structured data (JSON-LD) for better search engine understanding.
 */

import { siteConfig } from "./env";
import { SITE_METADATA } from "./constants";
import type { Project } from "./projects";

/**
 * Organization Schema (JSON-LD)
 * Describes the portfolio owner as a person/organization
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Jaycee Capulong",
    alternateName: "Dr-Pierrot",
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.jpg`,
    jobTitle: "Fullstack Developer",
    description: siteConfig.description,
    email: SITE_METADATA.author.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    sameAs: [SITE_METADATA.author.github, SITE_METADATA.author.linkedin],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Laravel",
      "Node.js",
      "PHP",
      "MySQL",
      "MongoDB",
    ],
  };
}

/**
 * Website Schema (JSON-LD)
 * Describes the portfolio website itself
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
  };
}

/**
 * CreativeWork Schema for Projects (JSON-LD)
 * Describes individual projects as creative works
 */
export function getProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteConfig.url}/projects/${project.slug}#creativework`,
    name: project.name,
    headline: project.dek,
    description: project.desc,
    url: `${siteConfig.url}/projects/${project.slug}`,
    dateCreated: `${project.year}-01-01`,
    dateModified: `${project.year}-01-01`,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    creator: {
      "@id": `${siteConfig.url}/#person`,
    },
    keywords: project.stack.join(", "),
    about: project.type,
    workExample: project.link
      ? {
          "@type": "WebSite",
          url: project.link,
        }
      : undefined,
    image: project.cover ? `${siteConfig.url}${project.cover}` : undefined,
  };
}

/**
 * Breadcrumb Schema (JSON-LD)
 * Provides breadcrumb navigation for better search results
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Portfolio/ItemList Schema (JSON-LD)
 * Describes the collection of projects
 */
export function getPortfolioSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#portfolio`,
    name: "Project Portfolio",
    description: "A collection of fullstack development projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${siteConfig.url}/projects/${project.slug}#creativework`,
        name: project.name,
        url: `${siteConfig.url}/projects/${project.slug}`,
      },
    })),
  };
}

/**
 * Generate page metadata for better SEO
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  keywords,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
}) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || "/profile.jpg";
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title,
    description: description || siteConfig.description,
    keywords: keywords || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || siteConfig.description,
      images: [`${siteConfig.url}${ogImage}`],
    },
  };
}

/**
 * Generate JSON-LD script string for embedding
 * Use this helper to create script tags in your components
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 * />
 */
