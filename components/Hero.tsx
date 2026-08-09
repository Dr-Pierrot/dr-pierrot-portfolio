"use client";
import React from "react";
import Image from "next/image";
import { T } from "@/lib/theme";
import { Kicker } from "@/components/editorial";
import { projects } from "@/lib/projects";

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Web Developer", "Software Engineer", "Fullstack Developer"],
  location: "Philippines",
};

const stats = [
  { value: String(projects.length), label: "Shipped projects" },
  { value: "5+", label: "Languages used" },
  { value: "2024", label: "Building since" },
];

export default function Hero() {
  return (
    <>
      <style>{`
        ${T.fontImport}
        @keyframes hero-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-in { animation: hero-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-in-1 { animation: hero-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hero-in-2 { animation: hero-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-in-3 { animation: hero-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both; }

        .hero-photo-frame {
          position: relative;
          aspect-ratio: 4 / 5;
          background: ${T.color.ink};
          overflow: hidden;
        }
        .hero-photo-frame img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(0.55) contrast(1.05);
          transition: filter 0.4s ease;
        }
        .hero-photo-frame:hover img { filter: grayscale(0) contrast(1.02); }

        .hero-role-rail {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-family: ${T.font.mono};
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${T.color.textMuted};
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(260px, 380px);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: end;
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(${stats.length}, auto) 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: baseline;
        }
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr; align-items: start; }
          .hero-grid > div:last-child { flex-direction: row-reverse; max-width: 320px; }
          .hero-stats-grid { grid-template-columns: repeat(3, auto); }
        }
        @media (max-width: 480px) {
          .hero-kicker-rule { display: none; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: T.color.paper,
          paddingTop: "clamp(6.5rem, 14vw, 9rem)",
          paddingBottom: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* faint index number, oversized, bleeding off the corner */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-4vw",
            right: "-2vw",
            fontFamily: T.font.display,
            fontSize: "22vw",
            fontWeight: 300,
            color: T.color.paperAlt,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          01
        </div>

        <div
          className="hero-grid"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 clamp(1.25rem, 4vw, 2.75rem)",
            position: "relative",
          }}
        >
          {/* LEFT: masthead text */}
          <div className={"hero-in"}>
            <div className="hero-kicker-row" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.6rem" }}>
              <Kicker>Portfolio — Issue N°01</Kicker>
              <span className="hero-kicker-rule" style={{ height: 1, flex: 1, background: T.color.border }} />
              <span
                style={{
                  fontFamily: T.font.mono,
                  fontSize: "0.72rem",
                  color: T.color.textMuted,
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                {profile.location}
              </span>
            </div>

            <h1
              style={{
                fontFamily: T.font.display,
                fontWeight: 500,
                fontSize: T.type.display,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                color: T.color.ink,
                margin: 0,
              }}
            >
              {profile.name.split(" ")[0]}
              <br />
              <span style={{ fontStyle: "italic", color: T.color.accent }}>
                {profile.name.split(" ")[1]}
              </span>
            </h1>

            <p
              className={"hero-in-1"}
              style={{
                fontFamily: T.font.body,
                fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                lineHeight: 1.65,
                color: T.color.textSecondary,
                maxWidth: 520,
                margin: "1.75rem 0 0",
              }}
            >
              I build fullstack systems that hold up in production — from
              Laravel APIs serving real government datasets to React
              interfaces people actually enjoy using. Based in the
              Philippines, working with teams anywhere.
            </p>

            <div
              className={"hero-in-2"}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", margin: "2rem 0 0" }}
            >
              {profile.roles.map((r) => (
                <span
                  key={r}
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "0.76rem",
                    letterSpacing: "0.03em",
                    padding: "6px 14px",
                    border: `1px solid ${T.color.border}`,
                    color: T.color.text,
                    background: T.color.surface,
                  }}
                >
                  {r}
                </span>
              ))}
            </div>

            <div className={"hero-in-3"} style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              <a
                href="#work"
                style={{
                  fontFamily: T.font.heading,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: T.color.paper,
                  background: T.color.ink,
                  padding: "13px 28px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                View the work <span aria-hidden>↓</span>
              </a>
              <a
                href="https://github.com/Dr-Pierrot"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: T.font.heading,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: T.color.ink,
                  border: `1px solid ${T.color.borderStrong}`,
                  padding: "13px 28px",
                  textDecoration: "none",
                }}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* RIGHT: photo */}
          <div className={"hero-in-2"} style={{ display: "flex", gap: "1rem" }}>
            <span className="hero-role-rail">{profile.alias} · Est. 2024</span>
            <div className="hero-photo-frame" style={{ flex: 1, position: "relative" }}>
              <Image src="/profile.jpg" alt={profile.name} fill sizes="(max-width: 900px) 100vw, 380px" style={{ objectFit: "cover" }} priority />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "12px 14px",
                  background: "linear-gradient(0deg, rgba(11,19,16,0.85), transparent)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: T.color.accentBright,
                  }}
                />
                <span
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "0.7rem",
                    color: "#F5F6F2",
                    letterSpacing: "0.05em",
                  }}
                >
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={"hero-in-3"}
          style={{
            maxWidth: 1240,
            margin: "clamp(3rem, 6vw, 4.5rem) auto 0",
            padding: "0 clamp(1.25rem, 4vw, 2.75rem)",
          }}
        >
          <div style={{ height: 1, background: T.color.border, marginBottom: "1.5rem" }} />
          <div className="hero-stats-grid">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: T.font.display,
                    fontSize: "2.2rem",
                    color: T.color.ink,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "0.72rem",
                    color: T.color.textMuted,
                    letterSpacing: "0.04em",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
            <div />
          </div>
        </div>
      </section>
    </>
  );
}
