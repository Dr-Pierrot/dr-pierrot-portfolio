"use client";
import React, { useEffect, useRef, useState } from "react";

const profile = {
  name: "Jaycee Capulong",
  alias: "DR-PIERROT",
  role: "Fullstack Developer",
  seniority: "Mid-Level",
  location: "Philippines",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  portfolio: "https://dr-pierrot-portfolio.vercel.app/",
  bio: "A passionate Fullstack Developer focused on building practical, real-world web applications that solve everyday problems. I enjoy turning ideas into functional systems — especially those that improve workflows, automate processes, and enhance user experience.",
  currently: "Building a Human Resource Management System",
  learning: ["Vue.js", "Svelte"],
  traits: [
    {
      icon: "🔥",
      label: "Problem Solver",
      desc: "Turning complex requirements into clean, working systems.",
    },
    {
      icon: "⚗️",
      label: "API Architect",
      desc: "Crafting robust REST APIs with proper auth, docs & structure.",
    },
    {
      icon: "🎨",
      label: "UI Craftsman",
      desc: "Building interfaces that are both functional and visually sharp.",
    },
    {
      icon: "📚",
      label: "Always Learning",
      desc: "Currently expanding into Vue.js and Svelte.",
    },
  ],
  stats: [
    { label: "Repositories", value: "8" },
    { label: "Languages", value: "5+" },
    { label: "Followers", value: "1" },
    { label: "Following", value: "5" },
  ],
};

/* ── Intersection observer hook ── */
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

/* ── Trait card ── */
const TraitCard = ({
  trait,
  delay,
}: {
  trait: (typeof profile.traits)[0];
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(18,0,0,0.9)" : "rgba(10,0,0,0.7)",
        border: `1px solid ${hovered ? "rgba(180,0,0,0.55)" : "rgba(100,0,0,0.25)"}`,
        borderRadius: "3px",
        padding: "18px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 30px rgba(100,0,0,0.25)" : "none",
        animation: `fade-in-up 0.7s ease-out ${delay}s both`,
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg,transparent,#cc2200,transparent)"
            : "linear-gradient(90deg,transparent,rgba(100,0,0,0.35),transparent)",
          transition: "all 0.3s",
        }}
      />
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>{trait.icon}</div>
      <h4
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "11px",
          fontWeight: 600,
          color: hovered ? "#cc2200" : "#7a2020",
          margin: "0 0 6px",
          letterSpacing: "1.5px",
          textTransform: "uppercase" as const,
          transition: "color 0.3s",
        }}
      >
        {trait.label}
      </h4>
      <p
        style={{
          color: "#4a2020",
          fontSize: "13px",
          lineHeight: 1.7,
          fontFamily: "'Crimson Text',serif",
          margin: 0,
        }}
      >
        {trait.desc}
      </p>
    </div>
  );
};

/* ── Main component ── */
const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.07; transform:rotate(0deg); }
          50%      { opacity:0.13; transform:rotate(180deg); }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6); opacity:1; }
          50%       { box-shadow:0 0 0 6px rgba(180,0,0,0); opacity:0.7; }
        }
        @keyframes stat-float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-3px); }
        }
        @keyframes reveal {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes learning-pulse {
          0%,100% { opacity:0.6; border-color:rgba(100,0,0,0.35); }
          50%       { opacity:1;  border-color:rgba(160,0,0,0.7); }
        }

        .about-revealed     { animation: reveal 0.9s ease-out both; }
        .about-revealed-d1  { animation: reveal 0.9s ease-out 0.15s both; }
        .about-revealed-d2  { animation: reveal 0.9s ease-out 0.3s both; }

        .dem-blood-dot {
          width:7px; height:7px; border-radius:50%;
          background:#cc0000;
          animation:pulse-blood 2s infinite;
          display:inline-block;
        }

        .about-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 20px;
          background: rgba(60,0,0,0.2);
          border: 1px solid rgba(120,0,0,0.4);
          border-radius: 2px;
          color: #8b2020;
          font-size: 11px;
          font-family: 'Cinzel', serif;
          letter-spacing: 1.5px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s;
          clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
        }
        .about-link:hover {
          background: rgba(100,0,0,0.3);
          border-color: rgba(200,0,0,0.6);
          color: #ff4422;
          box-shadow: 0 0 18px rgba(139,0,0,0.3);
          transform: translateY(-2px);
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          width: "100%",
          position: "relative",
          background:
            "radial-gradient(120% 80% at 50% 0%, #120000 0%, #080000 55%, #050000 100%)",
          padding: "5rem 1.5rem",
          overflow: "hidden",
          fontFamily: "'Crimson Text', serif",
        }}
      >
        {/* Top blood drip SVG */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "22px",
            pointerEvents: "none",
          }}
          viewBox="0 0 1440 22"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z"
            fill="rgba(80,0,0,0.7)"
          />
        </svg>

        {/* Background pentagram */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "500px",
            color: "rgba(55,0,0,0.05)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            animation: "pulse-sigil 15s ease-in-out infinite",
          }}
        >
          ⛧
        </div>

        {/* Diagonal crack texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(168deg,transparent,transparent 80px,rgba(55,0,0,0.03) 80px,rgba(55,0,0,0.03) 81px),repeating-linear-gradient(82deg,transparent,transparent 60px,rgba(45,0,0,0.02) 60px,rgba(45,0,0,0.02) 61px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section header ── */}
          <div
            className={inView ? "about-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                marginBottom: "1.2rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  maxWidth: "180px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,rgba(139,0,0,0.55))",
                }}
              />
              <span style={{ color: "rgba(139,0,0,0.55)", fontSize: "14px" }}>
                ⛧
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "9px",
                  color: "#3a1010",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                }}
              >
                The Soul Behind the Code
              </span>
              <span style={{ color: "rgba(139,0,0,0.55)", fontSize: "14px" }}>
                ⛧
              </span>
              <div
                style={{
                  flex: 1,
                  maxWidth: "180px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg,rgba(139,0,0,0.55),transparent)",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative',serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,5vw,3.4rem)",
                background:
                  "linear-gradient(180deg,#ffffff 0%,#cc2200 55%,#6b0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "0 0 0.8rem",
              }}
            >
              About Me
            </h2>
            <p
              style={{
                color: "#4a2020",
                fontSize: "15px",
                fontFamily: "'Crimson Text',serif",
                fontStyle: "italic",
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              Know the vessel — its origins, its nature, its purpose
            </p>
          </div>

          {/* ── Two columns ── */}
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
              {/* Main identity card */}
              <div
                style={{
                  background:
                    "linear-gradient(145deg,rgba(14,0,0,0.92),rgba(8,0,0,0.92))",
                  border: "1px solid rgba(130,0,0,0.5)",
                  borderRadius: "4px",
                  padding: "26px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg,transparent,#cc2200,transparent)",
                    boxShadow: "0 0 8px rgba(200,0,0,0.5)",
                  }}
                />

                {/* Name + role */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "radial-gradient(circle,#1a0000,#050000)",
                      border: "1px solid rgba(139,0,0,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      boxShadow:
                        "0 0 20px rgba(100,0,0,0.4),inset 0 0 12px rgba(80,0,0,0.3)",
                    }}
                  >
                    ⛧
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel Decorative',serif",
                        fontSize: "13px",
                        color: "#cc2200",
                        margin: 0,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {profile.alias}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Crimson Text',serif",
                        fontSize: "14px",
                        color: "#6a3030",
                        margin: "3px 0 0",
                        fontStyle: "italic",
                      }}
                    >
                      {profile.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "8px",
                        color: "#3a1010",
                        margin: "5px 0 0",
                        letterSpacing: "2.5px",
                        textTransform: "uppercase" as const,
                      }}
                    >
                      {profile.role} · {profile.seniority}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p
                  style={{
                    color: "#5a2828",
                    fontSize: "14px",
                    lineHeight: 1.85,
                    fontFamily: "'Crimson Text',serif",
                    margin: "0 0 22px",
                    borderLeft: "2px solid rgba(139,0,0,0.4)",
                    paddingLeft: "14px",
                  }}
                >
                  {profile.bio}
                </p>

                {/* Details list */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "12px",
                  }}
                >
                  {[
                    { icon: "📍", label: "Realm", value: profile.location },
                    { icon: "✉️", label: "Summon", value: profile.email },
                    {
                      icon: "🔥",
                      label: "Current Ritual",
                      value: profile.currently,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <span
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: "8px",
                            color: "#3a1010",
                            letterSpacing: "2px",
                            textTransform: "uppercase" as const,
                            display: "block",
                            marginBottom: "1px",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            color: "#7a3535",
                            fontSize: "13px",
                            fontFamily: "'Crimson Text',serif",
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Learning section */}
                <div
                  style={{
                    marginTop: "18px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(80,0,0,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "8px",
                      color: "#3a1010",
                      letterSpacing: "2px",
                      textTransform: "uppercase" as const,
                      display: "block",
                      marginBottom: "9px",
                    }}
                  >
                    ⛧ &nbsp; Mastering New Dark Arts
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap" as const,
                    }}
                  >
                    {profile.learning.map((l) => (
                      <span
                        key={l}
                        style={{
                          padding: "4px 14px",
                          background: "rgba(40,0,0,0.5)",
                          border: "1px dashed rgba(100,0,0,0.5)",
                          borderRadius: "2px",
                          color: "#8b3535",
                          fontSize: "12px",
                          fontFamily: "'Courier New',monospace",
                          animation: "learning-pulse 2.5s ease-in-out infinite",
                        }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
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
                {profile.stats.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(10,0,0,0.75)",
                      border: "1px solid rgba(100,0,0,0.3)",
                      borderRadius: "3px",
                      padding: "14px 8px",
                      textAlign: "center" as const,
                      position: "relative",
                      overflow: "hidden",
                      animation: `stat-float ${2.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                          "linear-gradient(90deg,transparent,rgba(180,0,0,0.45),transparent)",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Cinzel Decorative',serif",
                        fontSize: "17px",
                        color: "#cc2200",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "7px",
                        color: "#3a1010",
                        letterSpacing: "1px",
                        textTransform: "uppercase" as const,
                        marginTop: "5px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
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
                  ⛧ GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  🔗 LinkedIn
                </a>
                <a href={`mailto:${profile.email}`} className="about-link">
                  ✉️ Contact
                </a>
              </div>
            </div>

            {/* RIGHT — Traits */}
            <div
              className={inView ? "about-revealed-d2" : ""}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ marginBottom: "4px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span className="dem-blood-dot" />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "9px",
                      color: "#3a1010",
                      letterSpacing: "3px",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    Nature of the Beast
                  </span>
                </div>
              </div>

              {/* Trait cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {profile.traits.map((t, i) => (
                  <TraitCard key={t.label} trait={t} delay={0.1 * i} />
                ))}
              </div>

              {/* Long-form flavour quote */}
              <div
                style={{
                  marginTop: "0.5rem",
                  background: "rgba(8,0,0,0.7)",
                  border: "1px solid rgba(100,0,0,0.2)",
                  borderRadius: "3px",
                  padding: "20px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg,transparent,rgba(100,0,0,0.35),transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "28px",
                    color: "rgba(139,0,0,0.25)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    color: "#4a2525",
                    fontSize: "15px",
                    lineHeight: 1.9,
                    fontFamily: "'Crimson Text',serif",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  I don&apos;t just write code — I build systems that outlast
                  the moment. Every project is a pact: functionality, clarity,
                  and craft, bound together in working software.
                </p>
                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      flex: 1,
                      background:
                        "linear-gradient(90deg,rgba(100,0,0,0.3),transparent)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "9px",
                      color: "#3a1010",
                      letterSpacing: "2px",
                    }}
                  >
                    DR-PIERROT
                  </span>
                </div>
              </div>

              {/* Currently building callout */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg,rgba(20,5,0,0.8),rgba(10,0,0,0.8))",
                  border: "1px solid rgba(150,50,0,0.35)",
                  borderRadius: "3px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg,transparent,rgba(200,80,0,0.4),transparent)",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#cc4400",
                    flexShrink: 0,
                    boxShadow: "0 0 10px #cc4400,0 0 20px rgba(200,60,0,0.4)",
                    animation: "pulse-blood 2s infinite",
                  }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "8px",
                      color: "#6b3010",
                      letterSpacing: "2px",
                      textTransform: "uppercase" as const,
                      display: "block",
                      marginBottom: "3px",
                    }}
                  >
                    Active Ritual
                  </span>
                  <span
                    style={{
                      fontFamily: "'Crimson Text',serif",
                      fontSize: "14px",
                      color: "#8b4020",
                    }}
                  >
                    {profile.currently}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rune divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "3.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(90deg,transparent,rgba(100,0,0,0.35))",
              }}
            />
            <span style={{ color: "rgba(100,0,0,0.35)", fontSize: "14px" }}>
              ⛧
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(90deg,rgba(100,0,0,0.35),transparent)",
              }}
            />
          </div>
        </div>

        {/* Bottom blood drip SVG (flipped) */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "22px",
            pointerEvents: "none",
            transform: "scaleY(-1)",
          }}
          viewBox="0 0 1440 22"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z"
            fill="rgba(80,0,0,0.7)"
          />
        </svg>
      </section>
    </>
  );
};

export default AboutMe;
