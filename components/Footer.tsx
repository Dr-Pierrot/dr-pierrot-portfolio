"use client";
import Image from "next/image";
import Link from "next/link";

const profile = {
  alias: "Dr-Pierrot",
  name: "Jaycee Capulong",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
};

const columns = [
  {
    title: "Site",
    links: [
      { label: "Home", href: "/#home" },
      { label: "Works", href: "/#works" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: profile.github },
      { label: "LinkedIn", href: profile.linkedin },
      { label: "Email", href: `mailto:${profile.email}` },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-ed-border bg-ed-paper-alt">
      <div className="mx-auto max-w-[1240px] px-[clamp(1.25rem,4vw,2.75rem)] pt-[clamp(3rem,7vw,5rem)] pb-8">
        <div className="grid grid-cols-2 gap-10 border-b border-ed-border pb-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              aria-label={`${profile.alias} home`}
              className="inline-flex items-center no-underline"
            >
              <Image
                src="/favicon-512x512.png"
                alt="Dr-Pierrot logo"
                width={46}
                height={46}
              />
            </Link>
            <p className="mt-3.5 max-w-[280px] font-ed-body text-[0.92rem] leading-[1.7] text-ed-text-secondary">
              Fullstack developer building practical, real-world web systems
              from the Philippines.
            </p>
            <div className="mt-5 inline-flex w-fit items-center gap-[9px] rounded-full border border-ed-accent-border bg-ed-accent-soft py-1.5 pr-3.5 pl-3 text-[13px] font-semibold tracking-[0.01em] text-ed-accent-text">
              <span className="relative inline-flex h-[7px] w-[7px]">
                <span className="absolute inset-0 animate-ping rounded-full bg-ed-accent motion-reduce:animate-none" />
                <span className="relative inline-block h-[7px] w-[7px] rounded-full bg-ed-accent" />
              </span>
              Available for work
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="mb-4 font-ed-mono text-[11px] tracking-[0.08em] text-ed-text-muted uppercase">
                {col.title}
              </div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-ed-body text-[0.92rem] text-ed-text no-underline transition-colors duration-200 hover:text-ed-accent-text"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="font-ed-mono text-[0.74rem] text-ed-text-muted">
            © {year} {profile.name}. All rights reserved.
          </span>
          <span className="font-ed-mono text-[0.74rem] text-ed-text-muted">
            Built with Next.js, from the Philippines.
          </span>
        </div>
      </div>
    </footer>
  );
}
