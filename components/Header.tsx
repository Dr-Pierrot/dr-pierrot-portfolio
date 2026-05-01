"use client";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navLinks   = [{ label: "Grimoire", href: "#" }, { label: "Relics", href: "#" }, { label: "Coven", href: "#" }];
  const rightLinks = [{ label: "Confess", href: "#" }, { label: "Enter",   href: "#" }];
  const allLinks   = [...navLinks, ...rightLinks];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── Header bar ── */
        .dem-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          font-family: 'Crimson Text', serif;
          /* Hide header when menu is open on mobile */
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1), opacity 0.3s ease;
        }
        .dem-header.menu-open {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .dem-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* Increased height & vertical padding for breathing room */
          padding: 0 2.5rem;
          height: 80px;
          position: relative;
          background: rgba(6, 2, 2, 0.96);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(139, 0, 0, 0.5);
          transition: all 0.35s ease;
          overflow: hidden;
        }
        .dem-header-inner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% -20%, rgba(100,0,0,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .dem-header-inner.scrolled {
          background: rgba(3, 1, 1, 0.99);
          border-bottom-color: rgba(180, 0, 0, 0.7);
          box-shadow: 0 4px 60px rgba(120,0,0,0.35), 0 1px 0 rgba(200,0,0,0.25);
        }

        /* ── Ember particles ── */
        .dem-ember {
          position: absolute;
          width: 2px; height: 2px; border-radius: 50%;
          background: #ff4400;
          pointer-events: none;
          animation: ember-float 4s ease-in infinite;
          opacity: 0;
        }
        @keyframes ember-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-60px) translateX(var(--drift, 20px)); opacity: 0; }
        }

        /* ── Nav links ── */
        .dem-nav {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          flex: 1;
        }
        .dem-nav-right { justify-content: flex-end; }

        .dem-nav a {
          font-family: 'Crimson Text', serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: #6b2020;
          text-decoration: none;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.25s;
        }
        .dem-nav a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #8b0000, #ff3300);
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(255,50,0,0.6);
        }
        .dem-nav a:hover { color: #cc2200; }
        .dem-nav a:hover::after { width: 100%; }

        /* ── CTA button ── */
        .dem-seal-btn {
          padding: 8px 20px;
          background: transparent;
          border: 1px solid rgba(139,0,0,0.65);
          border-radius: 2px;
          color: #8b0000;
          font-family: 'Cinzel Decorative', serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .dem-seal-btn:hover {
          color: #ff2200;
          border-color: #8b0000;
          box-shadow: 0 0 20px rgba(139,0,0,0.45), inset 0 0 16px rgba(80,0,0,0.18);
          background: rgba(60,0,0,0.15);
        }

        /* ── Centred logo ── */
        .dem-logo-wrap {
          position: absolute;
          left: 50%; transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          text-decoration: none;
        }
        .dem-sigil-ring {
          width: 54px; height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050000;
          position: relative;
          transition: all 0.3s;
        }
        .dem-sigil-ring::before {
          content: '';
          position: absolute; inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,  #8b0000 15%,
            transparent 30%, #cc2200 45%,
            transparent 60%, #8b0000 75%,
            transparent 90%, transparent 100%
          );
          animation: sigil-spin 8s linear infinite;
        }
        .dem-sigil-ring::after {
          content: '';
          position: absolute; inset: 2px;
          border-radius: 50%;
          background: #060101;
          z-index: 1;
        }
        .dem-sigil-ring img {
          width: 42px; height: 42px;
          object-fit: cover;
          border-radius: 50%;
          position: relative; z-index: 2;
          filter: sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.7);
        }
        .dem-sigil-ring:hover {
          box-shadow: 0 0 30px rgba(180,0,0,0.55), 0 0 60px rgba(100,0,0,0.25);
        }
        .dem-logo-name {
          font-family: 'Cinzel Decorative', serif;
          font-size: 7px;
          letter-spacing: 3px;
          color: #4a1010;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .dem-logo-wrap:hover .dem-logo-name { color: #8b0000; }

        @keyframes sigil-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Corner marks ── */
        .dem-corner-mark {
          position: absolute;
          font-size: 11px;
          color: rgba(100,0,0,0.45);
          pointer-events: none; line-height: 1;
        }
        .dem-corner-mark.tl { top: 8px;  left: 12px;  }
        .dem-corner-mark.tr { top: 8px;  right: 12px; }
        .dem-corner-mark.bl { bottom: 8px; left: 12px;  }
        .dem-corner-mark.br { bottom: 8px; right: 12px; }

        /* ── Blood drip border ── */
        .dem-drip {
          position: absolute;
          bottom: -18px; left: 0; right: 0;
          width: 100%; height: 20px;
          pointer-events: none; z-index: 10;
        }

        /* ── Hamburger ── */
        .dem-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          z-index: 2;
          position: relative;
        }
        .dem-burger span {
          display: block;
          width: 24px; height: 1px;
          background: #8b0000;
          transition: all 0.28s;
          transform-origin: center;
        }
        .dem-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg);  background: #cc2200; }
        .dem-burger.open span:nth-child(2) { opacity: 0; }
        .dem-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); background: #cc2200; }

        /* ── Mobile full-screen menu ── */
        /*
          The menu is a fixed full-screen overlay that covers
          the entire viewport (top:0). Since the header slides
          away when the menu opens, the menu has the whole screen
          to itself with no overlap.
        */
        .dem-mobile-menu {
          position: fixed;
          inset: 0;
          background: #040101;
          z-index: 110;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.2rem;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .dem-mobile-menu.open { transform: translateX(0); }

        /* Hellfire vignette inside menu */
        .dem-mobile-menu::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 55% at 50% 100%, rgba(120,0,0,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 80% 55% at 50% 0%,   rgba(60,0,0,0.3)  0%, transparent 60%);
          pointer-events: none;
        }
        /* Crack texture */
        .dem-mobile-menu::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            170deg, transparent, transparent 80px,
            rgba(80,0,0,0.04) 80px, rgba(80,0,0,0.04) 81px
          );
          pointer-events: none;
        }

        .dem-mobile-menu a {
          font-family: 'Cinzel Decorative', serif;
          font-size: 15px;
          letter-spacing: 4px;
          color: #3a1010;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s;
          position: relative; z-index: 1;
        }
        .dem-mobile-menu a:hover {
          color: #cc2200;
          text-shadow: 0 0 30px rgba(200,50,0,0.5);
        }
        .dem-mobile-divider {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,0,0,0.45), transparent);
        }

        /* ── Close button inside mobile menu ── */
        .dem-menu-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(60,0,0,0.35);
          border: 1px solid rgba(120,0,0,0.45);
          border-radius: 2px;
          color: #6b2020;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.25s;
          z-index: 2;
          clip-path: polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
        }
        .dem-menu-close:hover {
          background: rgba(100,0,0,0.5);
          color: #cc2200;
          box-shadow: 0 0 16px rgba(139,0,0,0.35);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .dem-nav { display: none; }
          .dem-seal-desktop { display: none; }
          .dem-burger { display: flex; }
          /* More breathing room on mobile */
          .dem-header-inner { padding: 0 1.2rem; height: 72px; }
        }
      `}</style>

      {/* ── Header bar (slides up & hides when menu opens) ── */}
      <header className={`dem-header${isMenuOpen ? " menu-open" : ""}`}>
        <div className={`dem-header-inner${scrolled ? " scrolled" : ""}`}>

          {/* Ember particles */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="dem-ember" style={{
              left: `${10 + i * 11}%`,
              bottom: "8px",
              animationDelay: `${i * 0.55}s`,
              animationDuration: `${3 + (i % 3)}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * (10 + i * 4)}px`,
            } as React.CSSProperties} />
          ))}

          {/* Corner runes */}
          <span className="dem-corner-mark tl">⛧</span>
          <span className="dem-corner-mark tr">⛧</span>
          <span className="dem-corner-mark bl">✦</span>
          <span className="dem-corner-mark br">✦</span>

          {/* Left nav */}
          <nav className="dem-nav">
            {navLinks.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
          </nav>

          {/* Hamburger (mobile only) */}
          <button
            className={`dem-burger${isMenuOpen ? " open" : ""}`}
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span /><span /><span />
          </button>

          {/* Centred logo */}
          <a href="#" className="dem-logo-wrap" aria-label="DR-PIERROT">
            <div className="dem-sigil-ring">
              <img src="/favicon-512x512.png" alt="DR-PIERROT" />
            </div>
            <span className="dem-logo-name">DR-PIERROT</span>
          </a>

          {/* Right nav */}
          <nav className="dem-nav dem-nav-right">
            {rightLinks.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
            <a href="#" className="dem-seal-btn dem-seal-desktop">Pledge</a>
          </nav>
        </div>

        {/* Blood drip SVG border */}
        <svg className="dem-drip" viewBox="0 0 1440 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L1440,0 L1440,4
            Q1380,4 1370,8 Q1360,14 1355,18 Q1350,14 1345,8 Q1335,4 1320,4
            Q1280,4 1270,8 Q1265,14 1260,20 Q1255,14 1250,8 Q1240,4 1200,4
            Q1160,4 1150,7 Q1145,12 1140,18 Q1135,12 1130,7 Q1120,4 1080,4
            Q1040,4 1030,9 Q1025,16 1020,20 Q1015,16 1010,9 Q1000,4 960,4
            Q920,4 910,7 Q905,12 900,17 Q895,12 890,7 Q880,4 840,4
            Q800,4 790,8 Q785,14 780,20 Q775,14 770,8 Q760,4 720,4
            Q680,4 670,7 Q665,12 660,16 Q655,12 650,7 Q640,4 600,4
            Q560,4 550,9 Q545,15 540,20 Q535,15 530,9 Q520,4 480,4
            Q440,4 430,8 Q425,13 420,18 Q415,13 410,8 Q400,4 360,4
            Q320,4 310,7 Q305,12 300,17 Q295,12 290,7 Q280,4 240,4
            Q200,4 190,9 Q185,15 180,20 Q175,15 170,9 Q160,4 120,4
            Q80,4 70,7 Q65,12 60,16 Q55,12 50,7 Q40,4 0,4 Z"
            fill="rgba(100,0,0,0.75)"
          />
        </svg>
      </header>

      {/* ── Full-screen mobile menu (z-index above header) ── */}
      <div className={`dem-mobile-menu${isMenuOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">

        {/* Explicit close button in the menu */}
        <button className="dem-menu-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>

        {/* Logo inside menu */}
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBottom:"0.5rem",position:"relative",zIndex:1 }}>
          <div className="dem-sigil-ring" style={{ width:64,height:64 }}>
            <img src="/favicon-512x512.png" alt="DR-PIERROT" style={{ width:52,height:52 }} />
          </div>
          <span style={{ fontFamily:"'Cinzel Decorative',serif",fontSize:8,letterSpacing:"4px",color:"#4a1010" }}>DR-PIERROT</span>
        </div>

        <div className="dem-mobile-divider" />

        {/* All nav links */}
        {allLinks.map(l => (
          <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)}>{l.label}</a>
        ))}

        <div className="dem-mobile-divider" />

        {/* CTA */}
        <a
          href="#"
          onClick={() => setIsMenuOpen(false)}
          style={{
            padding:"12px 38px",
            border:"1px solid rgba(139,0,0,0.6)",
            color:"#8b0000",
            fontFamily:"'Cinzel Decorative',serif",
            fontSize:"10px",
            letterSpacing:"3px",
            textTransform:"uppercase",
            textDecoration:"none",
            position:"relative", zIndex:1,
            clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            transition:"all 0.25s",
          }}
        >
          Pledge
        </a>

      </div>
    </>
  );
}
