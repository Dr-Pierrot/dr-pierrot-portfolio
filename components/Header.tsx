"use client";
import React from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Products", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Community", href: "#" },
  ];
  const rightLinks = [
    { label: "Help", href: "#" },
    { label: "Sign In", href: "#" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700&display=swap');

        .drp-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          font-family: 'Share Tech Mono', monospace;
          transition: all 0.3s ease;
        }

        .drp-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 64px;
          position: relative;
          background: rgba(4,0,0,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(180,0,0,0.25);
          transition: all 0.3s ease;
        }

        .drp-header-inner.scrolled {
          background: rgba(2,0,0,0.98);
          border-bottom-color: rgba(180,0,0,0.4);
          box-shadow: 0 4px 40px rgba(150,0,0,0.15);
        }

        /* Top red accent line */
        .drp-header-line {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #660000 20%, #cc0000 50%, #660000 80%, transparent 100%);
        }

        /* Nav links */
        .drp-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }
        .drp-nav-right {
          justify-content: flex-end;
        }

        .drp-nav a {
          font-size: 11px;
          letter-spacing: 2px;
          color: #666;
          text-decoration: none;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .drp-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #cc0000;
          transition: width 0.2s ease;
          box-shadow: 0 0 6px rgba(200,0,0,0.5);
        }
        .drp-nav a:hover {
          color: #cc0000;
        }
        .drp-nav a:hover::after {
          width: 100%;
        }

        /* Sign Up button */
        .drp-signup {
          padding: 7px 18px;
          background: transparent;
          border: 1px solid rgba(180,0,0,0.6);
          border-radius: 3px;
          color: #cc0000;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .drp-signup::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(180,0,0,0);
          transition: background 0.2s;
        }
        .drp-signup:hover {
          color: #fff;
          border-color: #cc0000;
          box-shadow: 0 0 16px rgba(200,0,0,0.3), inset 0 0 16px rgba(200,0,0,0.1);
        }

        /* Logo */
        .drp-logo-wrap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          cursor: pointer;
          text-decoration: none;
        }
        .drp-logo-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(180,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          position: relative;
          transition: all 0.3s;
          overflow: hidden;
        }
        .drp-logo-ring::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, #cc0000 25%, transparent 50%, #cc0000 75%, transparent 100%);
          animation: spin-border 4s linear infinite;
          z-index: 0;
        }
        .drp-logo-ring::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: #000;
          z-index: 1;
        }
        .drp-logo-ring img {
          width: 38px;
          height: 38px;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
          z-index: 2;
        }
        .drp-logo-ring:hover {
          box-shadow: 0 0 24px rgba(200,0,0,0.4);
          transform: scale(1.05);
        }
        .drp-logo-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #660000;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .drp-logo-wrap:hover .drp-logo-name {
          color: #cc0000;
        }

        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Corner decorations */
        .drp-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
        }
        .drp-corner-tl { top: 0; left: 0; border-top: 1px solid #cc0000; border-left: 1px solid #cc0000; }
        .drp-corner-tr { top: 0; right: 0; border-top: 1px solid #cc0000; border-right: 1px solid #cc0000; }
        .drp-corner-bl { bottom: 0; left: 0; border-bottom: 1px solid #cc0000; border-left: 1px solid #cc0000; }
        .drp-corner-br { bottom: 0; right: 0; border-bottom: 1px solid #cc0000; border-right: 1px solid #cc0000; }

        /* Mobile hamburger */
        .drp-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .drp-burger span {
          display: block;
          width: 22px;
          height: 1px;
          background: #cc0000;
          transition: all 0.25s;
          transform-origin: center;
        }
        .drp-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .drp-burger.open span:nth-child(2) { opacity: 0; }
        .drp-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile overlay */
        .drp-mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(2,0,0,0.97);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .drp-mobile-menu.open {
          transform: translateX(0);
        }
        .drp-mobile-menu::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,0,0,0.03) 3px, rgba(200,0,0,0.03) 4px);
          pointer-events: none;
        }
        .drp-mobile-menu a {
          font-family: 'Orbitron', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #444;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.2s;
          position: relative;
        }
        .drp-mobile-menu a:hover {
          color: #cc0000;
          text-shadow: 0 0 20px rgba(200,0,0,0.4);
        }
        .drp-mobile-divider {
          width: 40px;
          height: 1px;
          background: rgba(180,0,0,0.3);
        }

        @media (max-width: 768px) {
          .drp-nav { display: none; }
          .drp-burger { display: flex; }
          .drp-signup-desktop { display: none; }
        }
      `}</style>

      {/* Top red line */}
      <div className="drp-header-line" />

      <header className="drp-header">
        <div className={`drp-header-inner${scrolled ? " scrolled" : ""}`}>
          {/* Corner accents */}
          <div className="drp-corner drp-corner-tl" />
          <div className="drp-corner drp-corner-tr" />
          <div className="drp-corner drp-corner-bl" />
          <div className="drp-corner drp-corner-br" />

          {/* Left nav */}
          <nav className="drp-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`drp-burger${isMenuOpen ? " open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Centered Logo */}
          <a href="#" className="drp-logo-wrap" aria-label="DR-PIERROT">
            <div className="drp-logo-ring">
              <img src="/favicon-512x512.png" alt="DR-PIERROT Logo" />
            </div>
            <span className="drp-logo-name">DR-PIERROT</span>
          </a>

          {/* Right nav */}
          <nav className="drp-nav drp-nav-right">
            {rightLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href="#" className="drp-signup drp-signup-desktop">
              Sign Up
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div className={`drp-mobile-menu${isMenuOpen ? " open" : ""}`}>
        {/* Logo in mobile menu */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: "1rem",
          }}
        >
          <div className="drp-logo-ring" style={{ width: 64, height: 64 }}>
            <img
              src="/favicon-512x512.png"
              alt="DR-PIERROT Logo"
              style={{ width: 52, height: 52 }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              letterSpacing: "4px",
              color: "#660000",
            }}
          >
            DR-PIERROT
          </span>
        </div>

        <div className="drp-mobile-divider" />

        {[...navLinks, ...rightLinks].map((l) => (
          <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)}>
            {l.label}
          </a>
        ))}

        <div className="drp-mobile-divider" />

        <a
          href="#"
          onClick={() => setIsMenuOpen(false)}
          style={{
            padding: "12px 32px",
            border: "1px solid rgba(180,0,0,0.6)",
            borderRadius: "3px",
            color: "#cc0000",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          SIGN UP
        </a>
      </div>
    </>
  );
}
