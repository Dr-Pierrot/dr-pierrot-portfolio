"use client";
import React, { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    name: "Human Resource Management System",
    shortName: "HRMS",
    desc: "A fullstack Human Resource Management System built with Laravel 13 and React/TypeScript via Inertia.js. Manages employee records, payroll workflows, attendance, and automated HR processes for real-world organizational use.",
    stack: [
      "Laravel",
      "TypeScript",
      "React",
      "Inertia.js",
      "MySQL",
      "TailwindCSS",
      "Vite",
    ],
    link: "https://github.com/Dr-Pierrot/human-resource-management-system",
    status: "In Progress",
    type: "Fullstack App",
    icon: "🏛️",
    highlight: true,
  },
  {
    id: 2,
    name: "PSGC API",
    shortName: "PSGC API",
    desc: "A production-ready REST API exposing Philippine Standard Geographic Code (Q1 2026) data — 43,768 records across regions, provinces, cities, municipalities, sub-municipalities, and barangays. Features token-based auth via Laravel Sanctum and full OpenAPI/Swagger documentation.",
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Swagger", "Vite"],
    link: "https://github.com/Dr-Pierrot/psgc-api",
    status: "Complete",
    type: "REST API",
    icon: "🗺️",
    highlight: false,
  },
  {
    id: 3,
    name: "Weather App",
    shortName: "Weather App",
    desc: "A JavaScript weather application that fetches and displays real-time meteorological data with a clean, responsive interface. Demonstrates API integration and dynamic DOM manipulation.",
    stack: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/Dr-Pierrot/weather-app",
    status: "Complete",
    type: "Web App",
    icon: "⚡",
    highlight: false,
  },
  {
    id: 4,
    name: "Todo List v2",
    shortName: "Todo List",
    desc: "A feature-rich task management application with JavaScript. Supports creating, editing, completing, and deleting tasks with local persistence and a polished user experience.",
    stack: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/Dr-Pierrot/todo_list2",
    status: "Complete",
    type: "Web App",
    icon: "📜",
    highlight: false,
  },
  {
    id: 5,
    name: "IDO Prototype",
    shortName: "IDO Proto",
    desc: "A Java desktop application prototype with a fully finished UI design, demonstrating object-oriented architecture, GUI component design, and Java application development patterns.",
    stack: ["Java"],
    link: "https://github.com/Dr-Pierrot/IDOPrototype",
    status: "Complete",
    type: "Desktop App",
    icon: "☕",
    highlight: false,
  },
];

const statusColors: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  "In Progress": {
    bg: "rgba(100,50,0,0.2)",
    border: "rgba(180,80,0,0.45)",
    text: "#cc7700",
    dot: "#cc6600",
  },
  Complete: {
    bg: "rgba(0,50,20,0.2)",
    border: "rgba(0,130,60,0.35)",
    text: "#007733",
    dot: "#009944",
  },
};

/* ── Intersection observer hook ── */
const useInView = (
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.1,
) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

/* ── Featured project card (large) ── */
const FeaturedCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [hovered, setHovered] = useState(false);
  const sc = statusColors[project.status];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered
          ? "linear-gradient(135deg,rgba(22,2,0,0.98),rgba(14,0,0,0.98))"
          : "linear-gradient(135deg,rgba(14,0,0,0.9),rgba(8,0,0,0.9))",
        border: `1px solid ${hovered ? "rgba(200,0,0,0.65)" : "rgba(120,0,0,0.4)"}`,
        borderRadius: "4px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 60px rgba(120,0,0,0.35), 0 0 0 1px rgba(200,0,0,0.1)"
          : "0 0 30px rgba(60,0,0,0.15)",
        gridColumn: "1 / -1",
      }}
    >
      {/* Animated top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: hovered
            ? "linear-gradient(90deg,transparent,#cc2200,#ff4400,#cc2200,transparent)"
            : "linear-gradient(90deg,transparent,rgba(160,0,0,0.6),transparent)",
          boxShadow: hovered ? "0 0 12px rgba(200,50,0,0.6)" : "none",
          transition: "all 0.35s",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-5%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle,rgba(120,0,0,${hovered ? "0.18" : "0.08"}) 0%,transparent 70%)`,
          pointerEvents: "none",
          transition: "all 0.35s",
        }}
      />

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: hovered
            ? "linear-gradient(180deg,transparent,#cc2200,#ff4400,#cc2200,transparent)"
            : "linear-gradient(180deg,transparent,rgba(120,0,0,0.5),transparent)",
          transition: "all 0.35s",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
          flexWrap: "wrap" as const,
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "28px", lineHeight: 1 }}>
            {project.icon}
          </span>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
                flexWrap: "wrap" as const,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "8px",
                  color: "#4a1010",
                  letterSpacing: "3px",
                  textTransform: "uppercase" as const,
                }}
              >
                {project.type}
              </span>
              <span style={{ color: "rgba(100,0,0,0.4)", fontSize: "10px" }}>
                ·
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "8px",
                  color: "#8b2020",
                  letterSpacing: "2px",
                  textTransform: "uppercase" as const,
                }}
              >
                ⛧ Featured
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Cinzel Decorative',serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
                color: hovered ? "#ff4422" : "#cc2200",
                margin: 0,
                letterSpacing: "0.5px",
                transition: "color 0.3s",
              }}
            >
              {project.name}
            </h3>
          </div>
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "5px 14px",
            background: sc.bg,
            border: `1px solid ${sc.border}`,
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: sc.dot,
              boxShadow: `0 0 6px ${sc.dot}`,
              animation: "pulse-blood 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "9px",
              color: sc.text,
              letterSpacing: "1.5px",
              textTransform: "uppercase" as const,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <p
        style={{
          color: "#5a2828",
          fontSize: "14px",
          lineHeight: 1.85,
          fontFamily: "'Crimson Text',serif",
          margin: "0 0 20px",
          maxWidth: "700px",
        }}
      >
        {project.desc}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "7px",
          marginBottom: "20px",
        }}
      >
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              padding: "4px 12px",
              background: "rgba(60,0,0,0.3)",
              border: "1px solid rgba(100,0,0,0.25)",
              borderRadius: "2px",
              color: hovered ? "#c04040" : "#7a3030",
              fontSize: "11px",
              fontFamily: "'Courier New',monospace",
              letterSpacing: "0.5px",
              transition: "color 0.3s",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Cinzel',serif",
          fontSize: "11px",
          color: hovered ? "#cc2200" : "#4a1010",
          letterSpacing: "1.5px",
          transition: "color 0.3s",
        }}
      >
        <span>{hovered ? "⛧ Open Repository" : "View Repository"}</span>
        <span style={{ fontSize: "14px" }}>→</span>
      </div>
    </a>
  );
};

/* ── Standard project card ── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const sc = statusColors[project.status];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column" as const,
        textDecoration: "none",
        background: hovered ? "rgba(16,0,0,0.95)" : "rgba(10,0,0,0.8)",
        border: `1px solid ${hovered ? "rgba(180,0,0,0.55)" : "rgba(100,0,0,0.28)"}`,
        borderRadius: "4px",
        padding: "22px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 40px rgba(100,0,0,0.28)" : "none",
        animation: `fade-in-up 0.7s ease-out ${0.08 * index}s both`,
        height: "100%",
        boxSizing: "border-box" as const,
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg,transparent,#cc2200,transparent)"
            : "linear-gradient(90deg,transparent,rgba(100,0,0,0.4),transparent)",
          transition: "all 0.3s",
        }}
      />

      {/* Glow on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-20%",
            width: "180px",
            height: "180px",
            background:
              "radial-gradient(circle,rgba(100,0,0,0.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "20px", lineHeight: 1 }}>{project.icon}</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 10px",
            background: sc.bg,
            border: `1px solid ${sc.border}`,
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: sc.dot,
              boxShadow: `0 0 5px ${sc.dot}`,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "7px",
              color: sc.text,
              letterSpacing: "1.5px",
              textTransform: "uppercase" as const,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <span
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "7px",
          color: "#3a1010",
          letterSpacing: "2.5px",
          textTransform: "uppercase" as const,
          display: "block",
          marginBottom: "5px",
        }}
      >
        {project.type}
      </span>

      <h3
        style={{
          fontFamily: "'Cinzel',serif",
          fontWeight: 700,
          fontSize: "13px",
          color: hovered ? "#ff4422" : "#8b2020",
          margin: "0 0 10px",
          letterSpacing: "0.5px",
          transition: "color 0.3s",
          lineHeight: 1.4,
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          color: "#4a2020",
          fontSize: "13px",
          lineHeight: 1.75,
          fontFamily: "'Crimson Text',serif",
          margin: "0 0 16px",
          flex: 1,
        }}
      >
        {project.desc}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "5px",
          marginBottom: "14px",
        }}
      >
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              padding: "2px 9px",
              background: "rgba(50,0,0,0.35)",
              border: "1px solid rgba(90,0,0,0.25)",
              borderRadius: "2px",
              color: "#7a3030",
              fontSize: "10px",
              fontFamily: "'Courier New',monospace",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "10px",
          color: hovered ? "#cc2200" : "#3a1010",
          letterSpacing: "1px",
          marginTop: "auto",
          transition: "color 0.3s",
        }}
      >
        {hovered ? "⛧ Open Tome →" : "View Repository →"}
      </div>
    </a>
  );
};

/* ── Main component ── */
const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const featured = projects.filter((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.06; transform:rotate(0deg); }
          50%      { opacity:0.11; transform:rotate(180deg); }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6); opacity:1; }
          50%       { box-shadow:0 0 0 5px rgba(180,0,0,0); opacity:0.7; }
        }
        @keyframes reveal {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ember-float {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          20%  { opacity:0.9; }
          80%  { opacity:0.4; }
          100% { transform:translateY(-80px) translateX(var(--drift,20px)); opacity:0; }
        }

        .proj-revealed    { animation: reveal 0.9s ease-out both; }
        .proj-revealed-d1 { animation: reveal 0.9s ease-out 0.15s both; }
        .proj-revealed-d2 { animation: reveal 0.9s ease-out 0.3s both; }

        .proj-ember {
          position: absolute;
          width: 2px; height: 2px; border-radius: 50%;
          background: radial-gradient(circle,#ff6600 0%,#ff2200 100%);
          pointer-events: none;
          animation: ember-float var(--dur,4s) ease-out var(--delay,0s) infinite;
          opacity: 0;
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        style={{
          width: "100%",
          position: "relative",
          background:
            "radial-gradient(110% 70% at 50% 100%, #100000 0%, #060000 55%, #030000 100%)",
          padding: "5rem 1.5rem",
          overflow: "hidden",
          fontFamily: "'Crimson Text', serif",
        }}
      >
        {/* Top blood drip */}
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
            fill="rgba(80,0,0,0.65)"
          />
        </svg>

        {/* Background pentagram */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "520px",
            color: "rgba(55,0,0,0.05)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            animation: "pulse-sigil 18s ease-in-out infinite",
          }}
        >
          ⛧
        </div>

        {/* Crack texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(172deg,transparent,transparent 90px,rgba(50,0,0,0.025) 90px,rgba(50,0,0,0.025) 91px),repeating-linear-gradient(80deg,transparent,transparent 70px,rgba(40,0,0,0.02) 70px,rgba(40,0,0,0.02) 71px)",
            pointerEvents: "none",
          }}
        />

        {/* Ambient ember particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="proj-ember"
            style={
              {
                left: `${5 + i * 9}%`,
                bottom: `${10 + (i % 3) * 15}%`,
                "--drift": `${(i % 2 === 0 ? 1 : -1) * (15 + i * 5)}px`,
                "--dur": `${3 + (i % 4)}s`,
                "--delay": `${i * 0.6}s`,
              } as React.CSSProperties
            }
          />
        ))}

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section header ── */}
          <div
            className={inView ? "proj-revealed" : ""}
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
                Bound by Blood & Code
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
              Dark Works
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
              Systems summoned from nothing — forged in code, bound to purpose
            </p>
          </div>

          {/* ── Featured project ── */}
          <div
            className={inView ? "proj-revealed-d1" : ""}
            style={{ marginBottom: "1.5rem" }}
          >
            <div style={{ display: "grid", gap: "0" }}>
              {featured.map((p) => (
                <FeaturedCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          {/* ── Rest of projects ── */}
          <div
            className={inView ? "proj-revealed-d2" : ""}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: "14px",
            }}
          >
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

          {/* ── GitHub CTA ── */}
          <div
            className={inView ? "proj-revealed" : ""}
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "2rem",
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
            <p
              style={{
                color: "#3a1010",
                fontSize: "13px",
                fontFamily: "'Crimson Text',serif",
                fontStyle: "italic",
                marginBottom: "1.2rem",
                letterSpacing: "0.5px",
              }}
            >
              More relics lie dormant in the vault
            </p>
            <a
              href="https://github.com/Dr-Pierrot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                background:
                  "linear-gradient(135deg,rgba(80,0,0,0.3),rgba(40,0,0,0.3))",
                border: "1px solid rgba(139,0,0,0.5)",
                borderRadius: "2px",
                color: "#8b2020",
                fontFamily: "'Cinzel',serif",
                fontSize: "11px",
                letterSpacing: "2px",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "all 0.25s",
                clipPath:
                  "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background =
                  "linear-gradient(135deg,rgba(120,0,0,0.4),rgba(70,0,0,0.4))";
                el.style.borderColor = "rgba(200,0,0,0.7)";
                el.style.color = "#ff4422";
                el.style.boxShadow = "0 0 30px rgba(139,0,0,0.35)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background =
                  "linear-gradient(135deg,rgba(80,0,0,0.3),rgba(40,0,0,0.3))";
                el.style.borderColor = "rgba(139,0,0,0.5)";
                el.style.color = "#8b2020";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              <span>⛧</span>
              <span>Enter the GitHub Vault</span>
            </a>
          </div>
        </div>

        {/* Bottom blood drip (flipped) */}
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
            fill="rgba(80,0,0,0.65)"
          />
        </svg>
      </section>
    </>
  );
};

export default Projects;
