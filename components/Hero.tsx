"use client";
import React, { useEffect, useRef, useState } from "react";

const coderData = {
  name: "DR-PIERROT",
  role: "Frontend Developer",
  seniority: "Mid-Level",
  location: "Philippines",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "CSS",
    "Figma",
    "GitHub",
    "HTML",
    "Astro",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "Git",
  ],
};

const GlitchText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      },
      3000 + Math.random() * 2000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        animation: glitch ? "glitch 0.2s steps(2) forwards" : "none",
      }}
    >
      {children}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "2px",
              color: "#ff0000",
              opacity: 0.8,
              clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-2px",
              color: "#ff6666",
              opacity: 0.6,
              clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

const CoderProfileCard = () => {
  const lines = [
    <span key="0">
      <span style={{ color: "#cc0000" }}>const</span>{" "}
      <span style={{ color: "#ff6666" }}>coder</span>{" "}
      <span style={{ color: "#cc0000" }}>=</span>{" "}
      <span style={{ color: "#553333" }}>{"{"}</span>
    </span>,
    <span key="1" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#dddddd" }}>name:</span>{" "}
      <span style={{ color: "#553333" }}>&apos;</span>
      <span style={{ color: "#ff3333" }}>{coderData.name}</span>
      <span style={{ color: "#553333" }}>&apos;,</span>
    </span>,
    <span key="2" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#dddddd" }}>role:</span>{" "}
      <span style={{ color: "#553333" }}>&apos;</span>
      <span style={{ color: "#ff3333" }}>{coderData.role}</span>
      <span style={{ color: "#553333" }}>&apos;,</span>
    </span>,
    <span key="3" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#dddddd" }}>seniority:</span>{" "}
      <span style={{ color: "#553333" }}>&apos;</span>
      <span style={{ color: "#ff3333" }}>{coderData.seniority}</span>
      <span style={{ color: "#553333" }}>&apos;,</span>
    </span>,
    <span key="4" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#dddddd" }}>location:</span>{" "}
      <span style={{ color: "#553333" }}>&apos;</span>
      <span style={{ color: "#ff3333" }}>{coderData.location}</span>
      <span style={{ color: "#553333" }}>&apos;,</span>
    </span>,
    <span key="5" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#dddddd" }}>skills:</span>{" "}
      <span style={{ color: "#553333" }}>{"["}</span>
    </span>,
    <span
      key="6"
      style={{
        paddingLeft: "3em",
        display: "flex",
        flexWrap: "wrap",
        gap: "2px",
      }}
    >
      {coderData.skills.map((skill, i) => (
        <span key={skill}>
          <span style={{ color: "#553333" }}>&apos;</span>
          <span style={{ color: "#ff8888" }}>{skill}</span>
          <span style={{ color: "#553333" }}>
            &apos;{i < coderData.skills.length - 1 ? ", " : ""}
          </span>
        </span>
      ))}
    </span>,
    <span key="7" style={{ paddingLeft: "1.5em" }}>
      <span style={{ color: "#553333" }}>{"],"}</span>
    </span>,
    <span key="8">
      <span style={{ color: "#553333" }}>{"  };"}</span>
    </span>,
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0d0000 0%, #110000 50%, #0a0000 100%)",
        border: "1px solid rgba(180,0,0,0.45)",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow:
          "0 0 40px rgba(150,0,0,0.15), inset 0 0 40px rgba(100,0,0,0.05)",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #cc0000, #660000, transparent)",
        }}
      />

      {/* Window chrome */}
      <div
        style={{
          padding: "12px 20px",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(160,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", gap: "7px" }}>
          {["#cc2200", "#662200", "#440000"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 11,
            color: "#660000",
            letterSpacing: "2px",
            fontFamily: "'Courier New', monospace",
          }}
        >
          coder.js
        </span>
      </div>

      {/* Code area */}
      <div style={{ padding: "20px 24px", position: "relative" }}>
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(180,0,0,0.04) 22px, rgba(180,0,0,0.04) 23px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
          {/* Line numbers */}
          <div
            style={{
              paddingRight: "16px",
              color: "#440000",
              fontSize: "12px",
              lineHeight: "1.85",
              textAlign: "right",
              minWidth: "24px",
              fontFamily: "'Courier New', monospace",
              userSelect: "none",
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <code
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              lineHeight: "1.85",
              width: "100%",
            }}
          >
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </code>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: "1px solid rgba(160,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
          color: "#440000",
          letterSpacing: "1px",
          fontFamily: "'Courier New', monospace",
        }}
      >
        <span>UTF-8</span>
        <span>JavaScript</span>
        <span>Ln 12, Col 2</span>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = ["MERN Stack", "Clean Code", "Innovation"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #ff0000; }
          50% { opacity: 0.5; box-shadow: 0 0 2px #ff0000; }
        }

        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .drp-tag {
          padding: 6px 14px;
          background: rgba(180,0,0,0.08);
          border: 1px solid rgba(200,0,0,0.3);
          border-radius: 4px;
          color: #ff4444;
          font-size: 11px;
          letter-spacing: 1.5px;
          font-family: 'Share Tech Mono', monospace;
          transition: all 0.2s;
          cursor: default;
        }
        .drp-tag:hover {
          background: rgba(180,0,0,0.18);
          border-color: rgba(200,0,0,0.6);
          box-shadow: 0 0 10px rgba(200,0,0,0.15);
        }

        .drp-btn-primary {
          padding: 11px 28px;
          background: #990000;
          color: #fff;
          border: 1px solid #cc0000;
          border-radius: 4px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .drp-btn-primary:hover {
          background: #cc0000;
          box-shadow: 0 0 20px rgba(200,0,0,0.35);
          transform: translateY(-1px);
        }
        .drp-btn-primary:active { transform: scale(0.97); }

        .drp-btn-ghost {
          padding: 11px 28px;
          background: transparent;
          color: #cc0000;
          border: 1px solid rgba(180,0,0,0.5);
          border-radius: 4px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .drp-btn-ghost:hover {
          border-color: #cc0000;
          background: rgba(180,0,0,0.08);
          box-shadow: 0 0 12px rgba(200,0,0,0.15);
          transform: translateY(-1px);
        }
        .drp-btn-ghost:active { transform: scale(0.97); }

        .drp-fade { animation: fadeInUp 0.65s ease-out both; }
        .drp-fade-delay { animation: fadeInUp 0.65s ease-out 0.2s both; }

        .drp-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff2222;
          display: inline-block;
          animation: pulse-dot 2s infinite;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Share Tech Mono', monospace",
          overflow: "hidden",
          background:
            "radial-gradient(125% 125% at 50% 100%, #050000 40%, #1a0000 100%)",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,0,0,0.025) 3px, rgba(200,0,0,0.025) 4px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Corner circuit decorations */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            opacity: 0.15,
            pointerEvents: "none",
          }}
          viewBox="0 0 200 200"
        >
          <path
            d="M0,40 L40,40 L40,0"
            fill="none"
            stroke="#cc0000"
            strokeWidth="1"
          />
          <path
            d="M0,80 L80,80 L80,0"
            fill="none"
            stroke="#cc0000"
            strokeWidth="0.5"
          />
          <circle cx="40" cy="40" r="3" fill="#cc0000" />
          <circle cx="80" cy="80" r="2" fill="#cc0000" />
        </svg>
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            opacity: 0.15,
            pointerEvents: "none",
          }}
          viewBox="0 0 200 200"
        >
          <path
            d="M200,160 L160,160 L160,200"
            fill="none"
            stroke="#cc0000"
            strokeWidth="1"
          />
          <path
            d="M200,120 L120,120 L120,200"
            fill="none"
            stroke="#cc0000"
            strokeWidth="0.5"
          />
          <circle cx="160" cy="160" r="3" fill="#cc0000" />
          <circle cx="120" cy="120" r="2" fill="#cc0000" />
        </svg>

        {/* Red glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "-5%",
            width: "35%",
            height: "35%",
            background:
              "radial-gradient(circle, rgba(180,0,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-5%",
            width: "35%",
            height: "35%",
            background:
              "radial-gradient(circle, rgba(180,0,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Main grid */}
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left: Text */}
          <div
            className={mounted ? "drp-fade" : ""}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "rgba(180,0,0,0.12)",
                border: "1px solid rgba(220,0,0,0.35)",
                borderRadius: "999px",
                fontSize: "10px",
                color: "#ff3333",
                letterSpacing: "2px",
                width: "fit-content",
              }}
            >
              <span className="drp-dot" />
              WELCOME TO MY UNIVERSE
            </div>

            {/* Heading */}
            <div>
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: "#ffffff",
                  letterSpacing: "-1px",
                  margin: 0,
                }}
              >
                Hello
                <br />
                I&apos;m{" "}
                <GlitchText>
                  <span
                    style={{
                      color: "#cc0000",
                      textShadow:
                        "0 0 30px rgba(200,0,0,0.4), 0 0 60px rgba(200,0,0,0.15)",
                    }}
                  >
                    DR-PIERROT
                  </span>
                </GlitchText>
              </h1>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {tags.map((t) => (
                <span key={t} className="drp-tag">
                  {t.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                maxWidth: "400px",
                lineHeight: 1.75,
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              JavaScript lover <span style={{ color: "#cc0000" }}>|</span>{" "}
              Crafting frameworks and coding the future from the shadows
              <span style={{ color: "#cc0000" }}> ✦</span>
            </p>

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <button className="drp-btn-primary">LEARN MORE</button>
              <a
                href="https://github.com/Dr-Pierrot"
                target="_blank"
                className="drp-btn-ghost"
              >
                GITHUB
              </a>
            </div>
          </div>

          {/* Right: Code editor */}
          <div className={mounted ? "drp-fade-delay" : ""}>
            <CoderProfileCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
