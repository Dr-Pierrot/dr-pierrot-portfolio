"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ---------------- ICON ---------------- */

const Icon = ({ path }: { path: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
};

/* ---------------- HEADER ---------------- */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

        :root { --header-h: 68px; }

        @keyframes hdr-up { from { opacity:0; transform:translateY(-12px);} to { opacity:1; transform:none; } }
        @key(hdr-fade) { from { opacity:0; } to { opacity:1; } }

        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          font-family: ${T.font.body};
        }
        .site-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: var(--header-h);
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${T.color.border};
          transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          animation: hdr-up .6s cubic-bezier(.2,.7,.2,1) both;
        }
        .site-header-inner.scrolled {
          box-shadow: 0 1px 0 ${T.color.border}, 0 10px 28px rgba(17,24,39,0.06);
          background: rgba(255,255,255,0.96);
        }

        .header-nav { display: flex; align-items: center; gap: 1.6rem; }
        .header-nav a {
          font-size: 14px;
          font-weight: 500;
          color: ${T.color.textSecondary};
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.2s;
        }
        .header-nav a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: ${T.color.accent};
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .header-nav a:hover { color: ${T.color.text}; }
        .header-nav a:hover::after { width: 100%; }

        .header-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: ${T.color.text};
          color: #fff;
          border: 1px solid ${T.color.text};
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(.2,.7,.2,1);
          box-shadow: 0 2px 10px rgba(15,118,110,0.18);
          animation: hdr-fade .6s ease-out both;
        }
        .header-cta:hover {
          background: ${T.color.accentHover};
          border-color: ${T.color.accentHover};
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15,118,110,0.28);
        }
        .header-cta svg { transition: transform 0.22s; }
        .header-cta:hover svg { transform: translateX(3px); }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-mark {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid ${T.color.border};
          background: #fff;
        }
        .logo-mark img {
          width: 100%; height: 100%;
          object-fit: contain;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .logo-name {
          font-family: ${T.font.heading};
          font-weight: 700;
          font-size: 15px;
          color: ${T.color.text};
          letter-spacing: -0.01em;
        }
        .logo-role {
          font-size: 11px;
          color: ${T.color.textMuted};
        }

        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .burger span {
          display: block;
          width: 22px; height: 2px;
          border-radius: 2px;
          background: ${T.color.text};
          transition: all 0.25s;
        }
        .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #fff;
          z-index: 110;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transform: translateY(-100%);
          transition: transform 0.35s ease, opacity 0.35s ease;
          opacity: 0;
          pointer-events: none;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .mobile-menu a {
          font-family: ${T.font.heading};
          font-size: 20px;
          font-weight: 600;
          color: ${T.color.text};
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background 0.15s ease, color 0.15s ease, transform 0.2s ease;
          animation: hdr-up .45s cubic-bezier(.2,.7,.2,1) both;
        }
        .mobile-menu a:nth-child(2) { animation-delay: 0.05s; }
        .mobile-menu a:nth-child(3) { animation-delay: 0.1s; }
        .mobile-menu a:nth-child(4) { animation-delay: 0.15s; }
        .mobile-menu a:nth-child(5) { animation-delay: 0.2s; }
        .mobile-menu a:hover { color: ${T.color.accent}; background: ${T.color.bgAlt}; transform: translateY(-1px); }

        .menu-close {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: ${T.color.bgAlt};
          border: 1px solid ${T.color.border};
          border-radius: 10px;
          color: ${T.color.text};
          font-size: 16px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .menu-close:hover { background: ${T.color.border}; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-cta-desktop { display: none; }
          .burger { display: flex; }
          .site-header-inner { padding: 0 1.25rem; height: 62px; }
        }

        @media (prefers-reduced-motion: reduce){
          .site-header-inner, .header-cta, .mobile-menu a { animation: none !important; }
        }
      `}</style>

      <header className="site-header">
        <div className={`site-header-inner${scrolled ? " scrolled" : ""}`}>
          <a href="#home" className="logo-wrap" aria-label="Jaycee Capulong">
            <div className="logo-mark">
              <img src="/favicon-512x512.png" alt="Dr-Pierrot logo" />
            </div>
            <div className="logo-text">
              <span className="logo-name">Jaycee Capulong</span>
              <span className="logo-role">Fullstack Developer</span>
            </div>
          </a>

          <nav className="header-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a
              href="mailto:capulongako16@gmail.com"
              className="header-cta header-cta-desktop"
            >
              Get in touch <Icon path={ICONS.arrowRight} />
            </a>
            <button
              className={`burger${isMenuOpen ? " open" : ""}`}
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${isMenuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="menu-close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="mailto:capulongako16@gmail.com"
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 26px",
            background: T.color.text,
            color: "#fff",
            borderRadius: "10px",
            fontFamily: T.font.heading,
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 2px 10px rgba(15,118,110,0.18)",
          }}
        >
          Get in touch <Icon path={ICONS.arrowRight} />
        </a>
      </div>
    </>
  );
}
