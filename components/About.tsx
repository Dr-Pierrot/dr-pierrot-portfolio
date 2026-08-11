"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";
import GitHubActivity from "@/components/GitHubActivity";

/* ---------------- DATA ---------------- */

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Fullstack Developer", "Web Engineer", "Product‑minded Developer"],
  seniority: "Junior",
  location: "Philippines (GMT+8)",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  bio: "I help startups and small teams turn ideas into reliable web products. I focus on end‑to‑end delivery: from requirements and data modeling to APIs, UI, and deployment. My goal is to ship features that are stable, maintainable, and actually used.",
  currently:
    "Building a Human Resource Management System (HRMS) for internal workflows",
  traits: [
    {
      icon: "🧩",
      label: "Systems thinker",
      desc: "I map requirements to data models, APIs, and UI flows so features scale cleanly instead of becoming technical debt.",
    },
    {
      icon: "🤝",
      label: "Stakeholder translator",
      desc: "I turn vague requests into clear specs, timelines, and trade‑offs that non‑technical stakeholders can understand and approve.",
    },
    {
      icon: "⚙️",
      label: "Execution‑focused",
      desc: "I break work into small, testable increments and ship regularly. I prioritize impact over perfection while keeping quality high.",
    },
    {
      icon: "🔍",
      label: "Problem decomposer",
      desc: "I isolate root causes, validate assumptions, and design solutions that reduce rework and support future changes.",
    },
  ],
  stats: [
    { label: "Repositories", value: "8" },
    { label: "Languages", value: "5+" },
    { label: "Followers", value: "1" },
    { label: "Following", value: "5" },
  ],
};

/* ---------------- HOOKS ---------------- */

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

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
  github:
    "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21",
  linkedin:
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
};

/* ---------------- TRAIT CARD ---------------- */

const TRAIT_PALETTES = [
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
  {
    bg: T.color.accentSoft,
    border: T.color.accentBorder,
    text: T.color.accentText,
  },
];

const TraitCard = ({
  trait,
  delay,
  index,
}: {
  trait: (typeof profile.traits)[0];
  delay: number;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const p = TRAIT_PALETTES[index % TRAIT_PALETTES.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.color.bg,
        border: `1px solid ${hovered ? T.color.borderStrong : T.color.border}`,
        borderRadius: "12px",
        padding: "18px",
        transition: "all 0.22s cubic-bezier(.2,.7,.2,1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(17,24,39,0.06)"
          : "0 1px 2px rgba(17,24,39,0.04)",
        animation: `a-up 0.6s ease-out ${delay}s both`,
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background: p.bg,
          border: `1px solid ${p.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "17px",
          marginBottom: "12px",
        }}
      >
        {trait.icon}
      </div>
      <h4
        style={{
          fontFamily: T.font.heading,
          fontSize: "14px",
          fontWeight: 700,
          color: T.color.text,
          margin: "0 0 6px",
          letterSpacing: "-0.01em",
        }}
      >
        {trait.label}
      </h4>
      <p
        style={{
          color: T.color.textSecondary,
          fontSize: "13px",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {trait.desc}
      </p>
    </div>
  );
};

/* ---------------- ABOUT ---------------- */

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        ${T.fontImport}

        @keyframes a-up {
          from { opacity:0; transform:translateY(18px);}
          to   { opacity:1; transform:none; }
        }
        @keyframes a-in {
          from { opacity:0; transform:translateY(14px) scale(.99);}
          to   { opacity:1; transform:none; }
        }

        .a-revealed     { animation: a-up 0.7s cubic-bezier(.2,.7,.2,1) both; }
        .a-revealed-d1  { animation: a-up 0.7s cubic-bezier(.2,.7,.2,1) 0.08s both; }
        .a-revealed-d2  { animation: a-up 0.7s cubic-bezier(.2,.7,.2,1) 0.16s both; }
        .a-card-in      { animation: a-in 0.8s cubic-bezier(.2,.7,.2,1) 0.12s both; }

        .a-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px;
          background: ${T.color.bg};
          border: 1px solid ${T.color.border};
          border-radius: 10px;
          color: ${T.color.text};
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .a-link:hover {
          border-color: ${T.color.borderStrong};
          background: ${T.color.bgAlt};
          transform: translateY(-1px);
        }

        .a-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          font-family: ${T.font.mono};
          font-size: 12px;
          background: ${T.color.bgAlt};
          border: 1px solid ${T.color.border};
          color: ${T.color.textSecondary};
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.bgAlt,
          padding: "5.5rem 1.5rem 4rem",
          fontFamily: T.font.body,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle grid background like hero */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(${T.color.border} 1px, transparent 1px),
              linear-gradient(90deg, ${T.color.border} 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            opacity: 0.35,
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />

        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* HEADER */}
          <div
            className={inView ? "a-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "3.2rem" }}
          >
            <p
              style={{
                fontFamily: T.font.mono,
                fontSize: "13px",
                color: T.color.accentText,
                margin: "0 0 10px",
              }}
            >
              ~/about
            </p>
            <h2
              style={{
                fontFamily: T.font.heading,
                fontWeight: 800,
                fontSize: "clamp(1.9rem,4.5vw,2.8rem)",
                color: T.color.text,
                margin: "0 0 0.9rem",
                letterSpacing: "-0.02em",
              }}
            >
              About me
            </h2>
            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "15px",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              How I work, what I’m good at, and where I add value
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* LEFT — Identity card */}
            <div
              className={inView ? "a-revealed-d1" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <div
                className="a-card-in"
                style={{
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "14px",
                  padding: "28px",
                  boxShadow:
                    "0 24px 60px -28px rgba(17,24,39,.28), 0 2px 6px rgba(17,24,39,.05)",
                }}
              >
                {/* top bar like editor */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    paddingBottom: "14px",
                    borderBottom: `1px solid ${T.color.border}`,
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    {[T.color.border, T.color.border, T.color.border].map(
                      (c, i) => (
                        <span
                          key={i}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: c,
                            border: `1px solid ${T.color.borderStrong || c}`,
                          }}
                        />
                      ),
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: T.font.mono,
                      fontSize: 12,
                      color: T.color.textMuted,
                    }}
                  >
                    ~/{profile.alias}/profile.ts
                  </span>
                  <span
                    style={{
                      fontFamily: T.font.mono,
                      fontSize: 11,
                      color: T.color.textMuted,
                      opacity: 0.7,
                    }}
                  >
                    TS
                  </span>
                </div>

                {/* identity header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      padding: "3px",
                      background: T.color.gradientButton,
                    }}
                  >
                    <img
                      src="/profile.jpg"
                      alt={profile.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #fff",
                        display: "block",
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: T.font.heading,
                        fontSize: "19px",
                        fontWeight: 700,
                        color: T.color.text,
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {profile.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: T.color.textSecondary,
                        margin: "5px 0 0",
                      }}
                    >
                      {profile.roles.join(" · ")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      <span className="a-chip">@{profile.alias}</span>
                      <span className="a-chip">{profile.seniority} dev</span>
                      <span className="a-chip">{profile.location}</span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: T.color.textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.8,
                    margin: "0 0 20px",
                  }}
                >
                  {profile.bio}
                </p>

                {/* meta rows */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "10px",
                    marginBottom: "22px",
                  }}
                >
                  {[
                    { label: "Base", value: profile.location },
                    { label: "Email", value: profile.email },
                    { label: "Focus", value: "End‑to‑end web products" },
                    { label: "Currently", value: profile.currently },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ display: "flex", gap: "12px", fontSize: "13px" }}
                    >
                      <span
                        style={{
                          color: T.color.textMuted,
                          minWidth: "80px",
                          flexShrink: 0,
                          fontFamily: T.font.mono,
                          fontSize: "12px",
                        }}
                      >
                        {item.label}
                      </span>
                      <span style={{ color: T.color.text }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "8px",
                    marginBottom: "22px",
                  }}
                >
                  {profile.stats.map((s, i) => {
                    const statColors = [
                      T.color.accentText,
                      T.color.accent2Text,
                      T.color.accent3Text,
                      T.color.accentText,
                    ];
                    return (
                      <div
                        key={s.label}
                        style={{
                          background: T.color.bgAlt,
                          border: `1px solid ${T.color.border}`,
                          borderRadius: "10px",
                          padding: "12px 8px",
                          textAlign: "center" as const,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: T.font.heading,
                            fontSize: "18px",
                            fontWeight: 700,
                            color: statColors[i % statColors.length],
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {s.value}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: T.color.textMuted,
                            marginTop: "4px",
                          }}
                        >
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* GitHub activity */}
                <div style={{ marginBottom: "22px" }}>
                  <GitHubActivity />
                </div>

                {/* contact links */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap" as const,
                    gap: "10px",
                  }}
                >
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a-link"
                  >
                    <Icon path={ICONS.github} /> GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="a-link"
                  >
                    <Icon path={ICONS.linkedin} /> LinkedIn
                  </a>
                  <a href={`mailto:${profile.email}`} className="a-link">
                    <Icon path={ICONS.mail} /> Email
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — Traits + quote + active project */}
            <div
              className={inView ? "a-revealed-d2" : ""}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: T.color.textMuted,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                  fontFamily: T.font.mono,
                }}
              >
                // Core competencies
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {profile.traits.map((t, i) => (
                  <TraitCard
                    key={t.label}
                    trait={t}
                    delay={0.06 * i}
                    index={i}
                  />
                ))}
              </div>

              {/* quote / positioning card */}
              <div
                className="a-card-in"
                style={{
                  marginTop: "0.25rem",
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "12px",
                  padding: "20px 22px",
                }}
              >
                <p
                  style={{
                    color: T.color.textSecondary,
                    fontSize: "15px",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  &quot;I’m the developer you bring in when you need someone who
                  can own a feature from idea to production, communicate clearly
                  with non‑technical people, and leave the codebase better than
                  they found it.&quot;
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    color: T.color.textMuted,
                    fontFamily: T.font.mono,
                  }}
                >
                  — {profile.name}
                </div>
              </div>

              {/* active project badge */}
              <div
                className="a-card-in"
                style={{
                  background: T.color.accent2Soft,
                  border: `1px solid ${T.color.accent2Border}`,
                  borderRadius: "12px",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: T.color.accent2,
                    flexShrink: 0,
                    boxShadow: `0 0 0 3px ${T.color.accent2Soft}`,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: T.color.accent2Text,
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "3px",
                      fontFamily: T.font.mono,
                      letterSpacing: ".04em",
                    }}
                  >
                    ACTIVE PROJECT
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: T.color.text,
                      fontWeight: 600,
                    }}
                  >
                    {profile.currently}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
