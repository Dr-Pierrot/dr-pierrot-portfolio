"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/theme";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onCaseStudy = pathname?.startsWith("/projects/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <style>{`
        ${T.fontImport}
        .site-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: ${T.font.heading};
        }
        .site-header-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.25rem, 4vw, 2.75rem);
          height: 76px;
          background: rgba(245,246,242,0.86);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .site-header-inner.scrolled {
          border-bottom-color: ${T.color.border};
          box-shadow: 0 1px 0 ${T.color.border};
        }
        .header-logo {
          font-family: ${T.font.display};
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${T.color.ink};
          text-decoration: none;
          display: flex; align-items: baseline; gap: 6px;
        }
        .header-logo em {
          font-style: italic;
          color: ${T.color.accent};
        }
        .header-nav { display: flex; align-items: center; gap: 2.1rem; }
        .header-nav a {
          position: relative;
          font-size: 0.86rem;
          letter-spacing: 0.02em;
          color: ${T.color.textSecondary};
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }
        .header-nav a::after {
          content: '';
          position: absolute; left: 0; bottom: 0;
          width: 0; height: 1px;
          background: ${T.color.accent};
          transition: width 0.25s ease;
        }
        .header-nav a:hover { color: ${T.color.ink}; }
        .header-nav a:hover::after { width: 100%; }
        .header-cta {
          font-family: ${T.font.mono};
          font-size: 0.76rem;
          letter-spacing: 0.04em;
          padding: 9px 18px;
          border: 1px solid ${T.color.ink};
          color: ${T.color.ink};
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .header-cta:hover { background: ${T.color.ink}; color: ${T.color.paper}; }

        .header-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .header-burger span { width: 22px; height: 1.5px; background: ${T.color.ink}; }

        .mobile-menu {
          position: fixed; inset: 0; background: ${T.color.paper}; z-index: 110;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 2rem;
          transform: translateY(-8px); opacity: 0; pointer-events: none;
          transition: all 0.3s ease;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .mobile-menu a {
          font-family: ${T.font.display};
          font-size: 2.2rem;
          color: ${T.color.ink};
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 1px solid ${T.color.border};
        }

        @media (max-width: 820px) {
          .header-nav, .header-cta { display: none; }
          .header-burger { display: flex; }
        }
      `}</style>

      <header className="site-header">
        <div className={`site-header-inner${scrolled || onCaseStudy ? " scrolled" : ""}`}>
          <Link href="/" className="header-logo">
            Dr<em>-</em>Pierrot
          </Link>

          <nav className="header-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <Link href="/#contact" className="header-cta">
            LET&apos;S TALK
          </Link>

          <button
            className="header-burger"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${isMenuOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: T.color.ink,
          }}
        >
          ✕
        </button>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </>
  );
}
