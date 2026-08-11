"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

/* Local composite gradient — mirrors the one in Hero.tsx so the CTA buttons
   match; built from theme primitives since it isn't a shared token yet. */
const gradientButton = `linear-gradient(135deg, ${T.color.ink} 0%, ${T.color.accent} 140%)`;

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
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

  // Lightweight scrollspy so the active nav pill tracks the section in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        ${T.fontImport}

        @keyframes nav-drop { from { opacity:0; transform:translateY(-10px);} to { opacity:1; transform:none; } }
        @keyframes nav-ping { 0%{transform:scale(1);opacity:.6} 70%{transform:scale(2.2);opacity:0} 100%{opacity:0} }
        @keyframes menu-item-in { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:none; } }

        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          font-family: ${T.font.body};
          padding: 14px 1.5rem 0;
          animation: nav-drop .6s cubic-bezier(.2,.7,.2,1) both;
        }
        .site-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 10px 0 14px;
          height: 64px;
          border-radius: 16px;
          background: rgba(245,246,242,0.72);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border: 1px solid ${T.color.border};
          box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset;
          transition: box-shadow .25s ease, border-color .25s ease, background .25s ease, height .25s ease;
        }
        .site-header-inner.scrolled {
          height: 58px;
          background: rgba(255,255,255,0.92);
          border-color: ${T.color.borderStrong};
          box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 30px -16px rgba(11,19,16,.18);
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-mark {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: ${gradientButton};
          font-family: ${T.font.mono};
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          box-shadow: 0 4px 14px -4px rgba(14,124,116,.45);
          transition: transform .25s cubic-bezier(.2,.7,.2,1);
        }
        .logo-wrap:hover .logo-mark { transform: rotate(-8deg) scale(1.05); }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .logo-name {
          font-family: ${T.font.heading};
          font-weight: 700;
          font-size: 14.5px;
          color: ${T.color.text};
          letter-spacing: -.01em;
        }
        .logo-role {
          font-family: ${T.font.mono};
          font-size: 10.5px;
          color: ${T.color.textMuted};
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px;
          border-radius: 12px;
          background: ${T.color.paperAlt};
          border: 1px solid ${T.color.border};
        }
        .header-nav a {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          color: ${T.color.textSecondary};
          text-decoration: none;
          padding: 8px 15px;
          border-radius: 8px;
          transition: color .2s ease, background .2s ease;
        }
        .header-nav a:hover { color: ${T.color.text}; }
        .header-nav a[data-active="true"] {
          color: ${T.color.text};
          background: ${T.color.surface};
          box-shadow: 0 1px 0 ${T.color.border}, 0 4px 10px -6px rgba(11,19,16,.15);
        }
        .header-nav a[data-active="true"]::before {
          content: '';
          position: absolute;
          left: 9px; bottom: 6px;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: ${T.color.accent};
        }

        .header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .header-status {
          display: none;
          align-items: center; gap: 7px;
          padding: 6px 11px;
          border-radius: 999px;
          background: ${T.color.accentSoft};
          border: 1px solid ${T.color.accentBorder};
          font-size: 11px; font-weight: 600;
          color: ${T.color.accentText};
          white-space: nowrap;
        }
        .header-dot { position: relative; width: 6px; height: 6px; border-radius: 50%; background: ${T.color.accent}; }
        .header-dot::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: ${T.color.accent}; animation: nav-ping 2s ease-out infinite;
        }

        .header-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          background: ${gradientButton};
          color: #fff;
          border: 1px solid transparent;
          border-radius: 10px;
          font-family: ${T.font.body};
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 10px -2px rgba(14,124,116,.35);
          transition: transform .2s cubic-bezier(.2,.7,.2,1), box-shadow .2s ease;
          white-space: nowrap;
        }
        .header-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -8px rgba(14,124,116,.5);
        }

        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin: -8px -6px -8px 0;
        }
        .burger span {
          display: block;
          width: 20px; height: 2px;
          border-radius: 2px;
          background: ${T.color.text};
          transition: all 0.25s;
        }
        .burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(245,246,242,0.98);
          backdrop-filter: blur(10px);
          z-index: 110;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.6rem;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .mobile-menu.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .mobile-menu a {
          font-family: ${T.font.display};
          font-size: 24px;
          font-weight: 600;
          color: ${T.color.text};
          text-decoration: none;
          opacity: 0;
        }
        .mobile-menu.open a { animation: menu-item-in .5s cubic-bezier(.2,.7,.2,1) both; }
        .mobile-menu a:hover { color: ${T.color.accent}; }

        .menu-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: ${T.color.paperAlt};
          border: 1px solid ${T.color.border};
          border-radius: 10px;
          color: ${T.color.text};
          font-size: 16px;
          cursor: pointer;
        }

        @media (min-width: 860px) { .header-status { display: inline-flex; } }

        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-cta-desktop { display: none; }
          .header-status { display: none; }
          .burger { display: flex; }
          .site-header { padding: 10px 1rem 0; }
          .site-header-inner { padding: 0 8px 0 12px; height: 60px; }
          .logo-role { display: none; }
        }
      `}</style>

      <header className="site-header">
        <div className={`site-header-inner${scrolled ? " scrolled" : ""}`}>
          <a href="#home" className="logo-wrap" aria-label="Jaycee Capulong">
            <div className="logo-mark">{"{ }"}</div>
            <div className="logo-text">
              <span className="logo-name">Jaycee Capulong</span>
              <span className="logo-role">Fullstack Developer</span>
            </div>
          </a>

          <nav className="header-nav" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-active={activeHref === l.href}
                onClick={() => setActiveHref(l.href)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <span className="header-status">
              <span className="header-dot" />
              Available for work
            </span>
            <a href="#contact" className="header-cta header-cta-desktop">
              Let&apos;s talk
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
        {navLinks.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => {
              setActiveHref(l.href);
              setIsMenuOpen(false);
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          style={{
            padding: "12px 32px",
            background: gradientButton,
            color: "#fff",
            borderRadius: "10px",
            fontFamily: T.font.heading,
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            opacity: 0,
            animation: isMenuOpen
              ? `menu-item-in .5s cubic-bezier(.2,.7,.2,1) ${navLinks.length * 0.06}s both`
              : "none",
          }}
        >
          Let&apos;s talk
        </a>
      </div>
    </>
  );
}
