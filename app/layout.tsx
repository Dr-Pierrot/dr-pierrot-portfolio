import type { Metadata } from "next";
import "./globals.css";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaycee Capulong",
  alternateName: "Dr-Pierrot",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Fullstack Developer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/Dr-Pierrot",
    "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
