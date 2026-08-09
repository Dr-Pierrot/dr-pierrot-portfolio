"use client";
import React from "react";
import { T } from "@/lib/theme";

const profile = {
  alias: "Dr-Pierrot",
  name: "Jaycee Capulong",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
};

const columns = [
  { title: "Site", links: [{ label: "Work", href: "/#work" }, { label: "About", href: "/#about" }, { label: "Journey", href: "/#journey" }, { label: "Contact", href: "/#contact" }] },
  { title: "Elsewhere", links: [{ label: "GitHub", href: profile.github }, { label: "LinkedIn", href: profile.linkedin }, { label: "Email", href: `mailto:${profile.email}` }] },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ width: "100%", background: T.color.ink, color: T.color.darkText }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr); gap: 2.5rem; }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(3rem,7vw,5rem) clamp(1.25rem,4vw,2.75rem) 2rem" }}>
        <div className="footer-grid" style={{ paddingBottom: "2.5rem", borderBottom: `1px solid ${T.color.darkBorder}` }}>
          <div>
            <div style={{ fontFamily: T.font.display, fontSize: "1.8rem", fontStyle: "italic" }}>{profile.alias}</div>
            <p style={{ fontFamily: T.font.body, fontSize: "0.92rem", lineHeight: 1.7, color: T.color.darkTextSecondary, marginTop: "0.9rem", maxWidth: 280 }}>
              Fullstack developer building practical, real-world web systems from the Philippines.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "1.25rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.color.accentBright }} />
              <span style={{ fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.06em", color: T.color.darkTextSecondary, textTransform: "uppercase" }}>
                Available for work
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.darkTextSecondary, marginBottom: "1rem" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ fontFamily: T.font.body, fontSize: "0.92rem", color: T.color.darkText, textDecoration: "none" }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", paddingTop: "1.5rem" }}>
          <span style={{ fontFamily: T.font.mono, fontSize: "0.74rem", color: T.color.darkTextSecondary }}>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span style={{ fontFamily: T.font.mono, fontSize: "0.74rem", color: T.color.darkTextSecondary }}>
            Built with Next.js, from the Philippines.
          </span>
        </div>
      </div>
    </footer>
  );
}
