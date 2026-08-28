/**
 * Application Constants
 * 
 * Centralized configuration for site-wide constants,
 * metadata, and configuration values.
 */

import { siteConfig } from './env';

// Site Metadata
export const SITE_METADATA = {
  title: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  author: {
    name: 'Dr. Pierrot',
    email: 'capulongako16@gmail.com',
    github: 'https://github.com/Dr-Pierrot',
    linkedin: 'https://linkedin.com/in/dr-pierrot',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@drpierrot',
  },
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/Dr-Pierrot',
  linkedin: 'https://linkedin.com/in/dr-pierrot',
  email: 'mailto:capulongako16@gmail.com',
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  formats: ['image/webp', 'image/avif'],
  quality: 85,
  sizes: {
    thumbnail: 400,
    small: 640,
    medium: 1024,
    large: 1920,
    xlarge: 2560,
  },
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Contact Form Configuration
export const CONTACT_FORM_CONFIG = {
  maxMessageLength: 1000,
  maxSubjectLength: 100,
  rateLimitWindow: 60000, // 1 minute in milliseconds
  rateLimitMax: 3, // Max 3 submissions per window
} as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Full Stack',
  'Frontend',
  'Backend',
  'E-commerce',
  'CMS',
  'API',
  'Other',
] as const;

// Technologies
export const TECHNOLOGIES = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Vue.js',
    'HTML5',
    'CSS3',
  ],
  backend: [
    'Node.js',
    'Express',
    'Python',
    'Django',
    'PHP',
    'Laravel',
  ],
  database: [
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Firebase',
  ],
  tools: [
    'Git',
    'Docker',
    'AWS',
    'Vercel',
    'Figma',
    'VS Code',
  ],
} as const;

// Blog Configuration
export const BLOG_CONFIG = {
  postsPerPage: 10,
  excerptLength: 160,
  dateFormat: 'MMMM dd, yyyy',
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: SITE_METADATA.title,
  titleTemplate: `%s | ${SITE_METADATA.title}`,
  description: SITE_METADATA.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  imageOptimization: true,
  lazyLoading: true,
  preloadCriticalAssets: true,
  minifyOutput: true,
} as const;

// Accessibility Configuration
export const A11Y_CONFIG = {
  skipToContentId: 'main-content',
  reducedMotionQuery: '(prefers-reduced-motion: reduce)',
  highContrastQuery: '(prefers-contrast: high)',
} as const;

// API Routes
export const API_ROUTES = {
  contact: '/api/contact',
  resume: '/api/resume',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  documentation: '/docs',
  changelog: '/CHANGELOG.md',
  contributing: '/docs/CONTRIBUTING.md',
} as const;
