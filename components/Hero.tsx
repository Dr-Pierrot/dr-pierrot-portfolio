"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

const coderData = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Web Developer", "Software Engineer", "Fullstack Developer"],
  seniority: "Junior",
  location: "Philippines",
  skills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "CSS",
      "HTML",
    ],
    backend: ["Laravel", "Node.js", "PHP", "WordPress"],
    database: ["MySQL", "MongoDB"],
    tools: ["Git", "GitHub", "Figma"],
  },
};

const SkillBlock = ({
  label,
  skills,
  delay,
}: {
  label: string;
  skills: string[];
  delay: number;
}) => (
  <div
    style={{
      animation: `fade-in-up 0.6s ease-out ${delay}s both`,
    }}
  >
    <div
      style={{
        fontFamily: T.font.mono,
        fontSize: "11px",
        color: T.color.textMuted,
        marginBottom: "8px",
      }}
    >
      // {label}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
      {skills.map((s) => (
        <span
          key={s}
          style={{
            padding: "3px 10px",
            background: T.color.bgAlt,
            border: `1px solid ${T.color.border}`,
            borderRadius: "6px",
            color: T.color.text,
            fontSize: "12px",
            fontFamily: T.font.mono,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const tags = coderData.roles;
  const totalSkills = Object.values(coderData.skills).flat().length;

  return (
    <>
      <style>{`
        ${T.fontImport}

        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-fade { animation: fade-in-up 0.7s ease-out both; }
        .hero-fade-delay { animation: fade-in-up 0.7s ease-out 0.15s both; }

        .hero-tag {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .hero-btn-primary {
          padding: 12px 26px;
          background: ${T.color.gradientButton};
          color: #fff;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: ${T.font.body};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 1px 2px rgba(17,24,39,0.15);
        }
        .hero-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15,118,110,0.28);
        }

        .hero-btn-ghost {
          padding: 12px 26px;
          background: transparent;
          color: ${T.color.text};
          border: 1px solid ${T.color.border};
          border-radius: 8px;
          font-family: ${T.font.body};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .hero-btn-ghost:hover {
          border-color: ${T.color.borderStrong};
          background: ${T.color.bgAlt};
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: T.color.gradientHero,
          fontFamily: T.font.body,
          padding: "6.5rem 1.5rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* soft decorative blobs — subtle, not busy */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-10%",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "3.5rem",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT */}
          <div
            className={mounted ? "hero-fade" : ""}
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: T.color.accentSoft,
                border: `1px solid ${T.color.accentBorder}`,
                borderRadius: "999px",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: T.color.accent,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: T.color.accentText,
                }}
              >
                Available for work
              </span>
            </div>

            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: T.color.textMuted,
                  margin: "0 0 6px",
                }}
              >
                Hi, I&apos;m
              </p>
              <h1
                style={{
                  fontFamily: T.font.heading,
                  fontWeight: 700,
                  fontSize: "clamp(2rem,5vw,3.2rem)",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    background: T.color.gradientText,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {coderData.name}
                </span>
              </h1>
              <p
                style={{
                  fontSize: "17px",
                  color: T.color.textSecondary,
                  margin: "10px 0 0",
                }}
              >
                <span style={{ color: T.color.accentText, fontWeight: 600 }}>
                  {coderData.roles[coderData.roles.length - 1]}
                </span>{" "}
                · also known as{" "}
                <span
                  style={{
                    fontFamily: T.font.mono,
                    color: T.color.text,
                  }}
                >
                  {coderData.alias}
                </span>{" "}
                on GitHub
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {tags.map((t, i) => {
                const palettes = [
                  {
                    bg: T.color.accentSoft,
                    border: T.color.accentBorder,
                    text: T.color.accentText,
                  },
                  {
                    bg: T.color.accent2Soft,
                    border: T.color.accent2Border,
                    text: T.color.accent2Text,
                  },
                  {
                    bg: T.color.accent3Soft,
                    border: T.color.accent3Border,
                    text: T.color.accent3Text,
                  },
                ];
                const p = palettes[i % palettes.length];
                return (
                  <span
                    key={t}
                    className="hero-tag"
                    style={{
                      background: p.bg,
                      border: `1px solid ${p.border}`,
                      color: p.text,
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>

            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "16px",
                maxWidth: "460px",
                lineHeight: 1.75,
              }}
            >
              I build scalable web applications end to end — from REST APIs and
              databases to polished, responsive interfaces. Based in the
              Philippines, and open to new projects, freelance work, and
              collaboration opportunities.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "0.25rem",
              }}
            >
              <a href="#projects" className="hero-btn-primary">
                View my work
              </a>
              <a
                href="https://github.com/Dr-Pierrot"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost"
              >
                GitHub profile
              </a>
            </div>
          </div>

          {/* RIGHT — skills card */}
          <div className={mounted ? "hero-fade-delay" : ""}>
            <div
              style={{
                background: T.color.bg,
                border: `1px solid ${T.color.border}`,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(17,24,39,0.06)",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background: T.color.bgAlt,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `1px solid ${T.color.border}`,
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#E5E7EB", "#E5E7EB", "#E5E7EB"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "12px",
                    color: T.color.textMuted,
                  }}
                >
                  skills.ts
                </span>
              </div>

              <div
                style={{
                  padding: "20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <SkillBlock
                  label="frontend"
                  skills={coderData.skills.frontend}
                  delay={0.05}
                />
                <SkillBlock
                  label="backend"
                  skills={coderData.skills.backend}
                  delay={0.1}
                />
                <SkillBlock
                  label="database"
                  skills={coderData.skills.database}
                  delay={0.15}
                />
                <SkillBlock
                  label="tools"
                  skills={coderData.skills.tools}
                  delay={0.2}
                />
              </div>

              <div
                style={{
                  padding: "12px 20px",
                  borderTop: `1px solid ${T.color.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "11px",
                    color: T.color.textMuted,
                  }}
                >
                  {totalSkills} skills
                </span>
                <span
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "11px",
                    color: T.color.textMuted,
                  }}
                >
                  {coderData.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
