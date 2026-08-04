"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

const profile = {
  alias: "Dr-Pierrot",
  name: "Jaycee Capulong",
  role: "Fullstack Developer",
  location: "Philippines",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
};

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "44px",
        height: "44px",
        background: T.color.text,
        border: `1px solid ${T.color.text}`,
        borderRadius: "10px",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.25s ease",
        zIndex: 200,
        boxShadow: visible ? "0 4px 16px rgba(17,24,39,0.2)" : "none",
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = T.color.accentHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = T.color.text;
      }}
    >
      ↑
    </button>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        ${T.fontImport}

        .footer-nav-link {
          font-size: 13px;
          color: ${T.color.textSecondary};
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-nav-link:hover { color: ${T.color.text}; }

        .footer-social-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: ${T.color.bg};
          border: 1px solid ${T.color.border};
          border-radius: 8px;
          color: ${T.color.textSecondary};
          text-decoration: none;
          transition: all 0.2s;
        }
        .footer-social-btn:hover {
          border-color: ${T.color.borderStrong};
          color: ${T.color.text};
        }
      `}</style>

      <ScrollTop />

      <footer
        style={{
          width: "100%",
          background: T.color.gradientDark,
          fontFamily: T.font.body,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "3.5rem 1.5rem 2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "2.5rem",
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: `1px solid ${T.color.darkBorder}`,
            }}
          >
            {/* Brand */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "14px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/favicon-512x512.png"
                    alt="Dr-Pierrot logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: T.font.heading,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: T.color.darkText,
                      lineHeight: 1,
                    }}
                  >
                    {profile.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: T.color.darkTextSecondary,
                      marginTop: "3px",
                    }}
                  >
                    {profile.role}
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: T.color.darkTextSecondary,
                  fontSize: "13px",
                  lineHeight: 1.7,
                  maxWidth: "240px",
                  margin: 0,
                }}
              >
                Fullstack developer building scalable systems from the
                Philippines.
              </p>

              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: T.color.accent,
                  }}
                />
                <span
                  style={{ fontSize: "12px", color: T.color.darkTextSecondary }}
                >
                  Available for work
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "16px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Navigation
              </div>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "12px",
                }}
              >
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} className="footer-nav-link">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "16px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                }}
              >
                Contact
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "10px",
                }}
              >
                <span
                  style={{ color: T.color.darkTextSecondary, fontSize: "13px" }}
                >
                  {profile.location}
                </span>
                <span
                  style={{
                    color: T.color.darkTextSecondary,
                    fontSize: "13px",
                    wordBreak: "break-word" as const,
                  }}
                >
                  {profile.email}
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap" as const,
              gap: "12px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              © {year} {profile.name}. All rights reserved.
            </p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
              Built with Next.js · Philippines
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
