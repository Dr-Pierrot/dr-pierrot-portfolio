"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          padding: 0 2.5rem;
          height: 72px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid ${T.color.border};
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .site-header-inner.scrolled {
          box-shadow: 0 1px 0 ${T.color.border}, 0 4px 20px rgba(17,24,39,0.05);
        }

        .header-nav { display: flex; align-items: center; gap: 2rem; }

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
          transition: width 0.2s ease;
        }
        .header-nav a:hover { color: ${T.color.text}; }
        .header-nav a:hover::after { width: 100%; }

        .header-cta {
          padding: 8px 18px;
          background: ${T.color.text};
          color: #fff;
          border: 1px solid ${T.color.text};
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        .header-cta:hover {
          background: ${T.color.accentHover};
          border-color: ${T.color.accentHover};
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-mark {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
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
          font-weight: 600;
          font-size: 15px;
          color: ${T.color.text};
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
          transition: transform 0.35s ease;
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu a {
          font-family: ${T.font.heading};
          font-size: 20px;
          font-weight: 600;
          color: ${T.color.text};
          text-decoration: none;
        }
        .mobile-menu a:hover { color: ${T.color.accent}; }

        .menu-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: ${T.color.bgAlt};
          border: 1px solid ${T.color.border};
          border-radius: 8px;
          color: ${T.color.text};
          font-size: 16px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-cta-desktop { display: none; }
          .burger { display: flex; }
          .site-header-inner { padding: 0 1.25rem; height: 64px; }
        }
      `}</style>

      <header className="site-header">
        <div className={`site-header-inner${scrolled ? " scrolled" : ""}`}>
          <a href="#" className="logo-wrap" aria-label="Jaycee Capulong">
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

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="#contact" className="header-cta header-cta-desktop">
              Get in touch
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
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          style={{
            padding: "12px 32px",
            background: T.color.text,
            color: "#fff",
            borderRadius: "8px",
            fontFamily: T.font.heading,
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
