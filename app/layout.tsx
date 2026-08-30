import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SkipToContent from "@/components/SkipToContent";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ServiceWorkerRegister from "@/lib/serviceWorker";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import RootLoading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: 'swap',
  preload: false, // Only preload if needed
});

const SITE_URL = "https://dr-pierrot-portfolio.vercel.app";
const SITE_TITLE = "Jaycee Capulong — Fullstack Developer";
const SITE_DESCRIPTION =
  "Hi, I'm Jaycee Capulong, also known as Dr-Pierrot on GitHub. I'm a fullstack developer focused on building practical, scalable web applications — from REST APIs to full product interfaces. This portfolio highlights my projects, technical skills, and ongoing growth in software development.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Jaycee Capulong",
  },
  verification: {
    google: "eDBZFKCxJy--z00bHVxlvMh_b9bgk3n0SrnJlHVA5W0",
    other: {
      "msvalidate.01": "118D32B26853BE29D1E445BDF98815A5",
    },
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Jaycee Capulong",
    "Dr-Pierrot",
    "Fullstack Developer Philippines",
    "Web Developer Philippines",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Jaycee Capulong", url: SITE_URL }],
  creator: "Jaycee Capulong",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-512x512.png",
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Jaycee Capulong — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/profile.jpg"],
  },
};

// Generate structured data
const personSchema = getOrganizationSchema();
const websiteSchema = getWebsiteSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        "font-sans",
      )}
    >
      <body>
        {/* Service Worker Registration */}
        <ServiceWorkerRegister />
        
        {/* Performance Optimization */}
        <PerformanceOptimizer 
          criticalImages={['/profile.jpg', '/hero-bg.webp']}
          enableMonitoring={process.env.NODE_ENV === 'development'}
        />
        
        {/* Google Analytics */}
        <GoogleAnalytics 
          trackPageViews={true}
          trackScrollDepth={true}
          trackErrors={true}
        />
        
        {/* Organization/Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Theme Provider with New Features */}
        <ThemeProvider>
          <SkipToContent />
          <ScrollProgress showOnPages={['/blog/', '/projects/']} />
          <Suspense fallback={<RootLoading />}>{children}</Suspense>
          <BackToTop showAfter={400} />
        </ThemeProvider>
        
        {/* Performance Optimization Components */}
        <PerformanceOptimizer 
          criticalImages={['/profile.jpg', '/hero-bg.webp']}
          enableMonitoring={true}
        />
        <PerformanceDashboard />
        
        {/* Performance Monitor (Development Only) */}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
