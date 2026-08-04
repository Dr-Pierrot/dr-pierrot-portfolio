"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Web Developer", "Software Engineer", "Fullstack Developer"],
  seniority: "Junior",
  location: "Philippines",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  bio: "A passionate fullstack developer focused on building practical, real-world web applications that solve everyday problems. I enjoy turning ideas into functional systems — especially those that improve workflows, automate processes, and enhance user experience.",
  currently: "Building a Human Resource Management System",
  traits: [
    {
      icon: "🎯",
      label: "Problem solver",
      desc: "Turning complex requirements into clean, working systems.",
    },
    {
      icon: "🔌",
      label: "API architect",
      desc: "Crafting robust REST APIs with proper auth, docs, and structure.",
    },
    {
      icon: "🖥️",
      label: "UI craftsman",
      desc: "Building interfaces that are both functional and visually sharp.",
    },
    {
      icon: "🚀",
      label: "Fast learner",
      desc: "Quick to pick up new tools, frameworks, and workflows.",
    },
  ],
  stats: [
    { label: "Repositories", value: "8" },
    { label: "Languages", value: "5+" },
    { label: "Followers", value: "1" },
    { label: "Following", value: "5" },
  ],
};

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

const TRAIT_PALETTES = [
  { bg: T.color.accentSoft, border: T.color.accentBorder },
  { bg: T.color.accent2Soft, border: T.color.accent2Border },
  { bg: T.color.accent3Soft, border: T.color.accent3Border },
  { bg: T.color.accentSoft, border: T.color.accentBorder },
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
        borderRadius: "10px",
        padding: "18px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 20px rgba(17,24,39,0.06)" : "none",
        animation: `fade-in-up 0.6s ease-out ${delay}s both`,
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "9px",
          background: p.bg,
          border: `1px solid ${p.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          marginBottom: "12px",
        }}
      >
        {trait.icon}
      </div>
      <h4
        style={{
          fontFamily: T.font.heading,
          fontSize: "14px",
          fontWeight: 600,
          color: T.color.text,
          margin: "0 0 6px",
        }}
      >
        {trait.label}
      </h4>
      <p
        style={{
          color: T.color.textSecondary,
          fontSize: "13px",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {trait.desc}
      </p>
    </div>
  );
};

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        ${T.fontImport}
        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes reveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .about-revealed    { animation: reveal 0.7s ease-out both; }
        .about-revealed-d1 { animation: reveal 0.7s ease-out 0.1s both; }
        .about-revealed-d2 { animation: reveal 0.7s ease-out 0.2s both; }

        .about-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 18px;
          background: ${T.color.bg};
          border: 1px solid ${T.color.border};
          border-radius: 8px;
          color: ${T.color.text};
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        .about-link:hover {
          border-color: ${T.color.borderStrong};
          background: ${T.color.bgAlt};
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.bgAlt,
          padding: "5rem 1.5rem",
          fontFamily: T.font.body,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div
            className={inView ? "about-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
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
                fontWeight: 700,
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                color: T.color.text,
                margin: "0 0 0.8rem",
              }}
            >
              About me
            </h2>
            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "15px",
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              A quick look at who I am, what I do, and what I&apos;m working on
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* LEFT — Identity */}
            <div
              className={inView ? "about-revealed-d1" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <div
                style={{
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "12px",
                  padding: "28px",
                  boxShadow: "0 1px 3px rgba(17,24,39,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    marginBottom: "22px",
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
                        fontWeight: 600,
                        color: T.color.text,
                        margin: 0,
                      }}
                    >
                      {profile.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: T.color.textSecondary,
                        margin: "4px 0 0",
                      }}
                    >
                      {profile.roles.join(" · ")}
                    </p>
                    <p
                      style={{
                        fontFamily: T.font.mono,
                        fontSize: "12px",
                        color: T.color.textMuted,
                        margin: "4px 0 0",
                      }}
                    >
                      @{profile.alias} · {profile.seniority}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: T.color.textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.8,
                    margin: "0 0 22px",
                  }}
                >
                  {profile.bio}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "12px",
                  }}
                >
                  {[
                    { label: "Location", value: profile.location },
                    { label: "Email", value: profile.email },
                    { label: "Currently", value: profile.currently },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ display: "flex", gap: "12px", fontSize: "13px" }}
                    >
                      <span
                        style={{
                          color: T.color.textMuted,
                          minWidth: "70px",
                          flexShrink: 0,
                        }}
                      >
                        {item.label}
                      </span>
                      <span style={{ color: T.color.text }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
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
                        background: T.color.bg,
                        border: `1px solid ${T.color.border}`,
                        borderRadius: "10px",
                        padding: "14px 8px",
                        textAlign: "center" as const,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: T.font.heading,
                          fontSize: "18px",
                          fontWeight: 700,
                          color: statColors[i % statColors.length],
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

              {/* Contact links */}
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
                  className="about-link"
                >
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  LinkedIn
                </a>
                <a href={`mailto:${profile.email}`} className="about-link">
                  Email
                </a>
              </div>
            </div>

            {/* RIGHT — Traits */}
            <div
              className={inView ? "about-revealed-d2" : ""}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: T.color.textMuted,
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                What I bring
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
                    delay={0.08 * i}
                    index={i}
                  />
                ))}
              </div>

              <div
                style={{
                  marginTop: "0.5rem",
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "10px",
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
                  &quot;I don&apos;t just write code — I build systems that
                  outlast the moment. Every project is functionality, clarity,
                  and craft, bound together in working software.&quot;
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    color: T.color.textMuted,
                  }}
                >
                  — {profile.name}
                </div>
              </div>

              <div
                style={{
                  background: T.color.accent2Soft,
                  border: `1px solid ${T.color.accent2Border}`,
                  borderRadius: "10px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: T.color.accent2,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: T.color.accent2Text,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: "3px",
                    }}
                  >
                    Active project
                  </span>
                  <span style={{ fontSize: "14px", color: T.color.text }}>
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
