"use client";
import React, { useEffect, useState } from "react";

const coderData = {
  name: "DR-PIERROT",
  alias: "Jaycee Capulong",
  role: "Fullstack Developer",
  seniority: "Mid-Level",
  location: "Philippines",
  learning: ["Vue.js", "Svelte"],
  skills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "CSS",
      "HTML",
      "Astro",
    ],
    backend: ["Laravel", "Node.js", "Express", "PHP"],
    database: ["MySQL", "MongoDB", "Firebase"],
    tools: ["Git", "GitHub", "Figma", "Vite", "Swagger"],
  },
};

/* ── Hellfire flicker text ── */
const FlameText = ({ children }: { children: React.ReactNode }) => {
  const [flicker, setFlicker] = useState(false);
  useEffect(() => {
    const id = setInterval(
      () => {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 120 + Math.random() * 80);
      },
      2500 + Math.random() * 2000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        filter: flicker
          ? "brightness(1.6) drop-shadow(0 0 12px #ff3300)"
          : "drop-shadow(0 0 6px #8b0000)",
        transition: "filter 0.05s",
      }}
    >
      {children}
    </span>
  );
};

/* ── Skill Category Block ── */
const SkillBlock = ({
  label,
  icon,
  skills,
  delay,
}: {
  label: string;
  icon: string;
  skills: string[];
  delay: number;
}) => (
  <div
    style={{
      background: "rgba(10,0,0,0.6)",
      border: "1px solid rgba(100,0,0,0.35)",
      borderRadius: "3px",
      padding: "14px 16px",
      position: "relative",
      overflow: "hidden",
      animation: `fade-in-up 0.7s ease-out ${delay}s both`,
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
          "linear-gradient(90deg,transparent,rgba(180,0,0,0.6),transparent)",
      }}
    />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "10px",
      }}
    >
      <span style={{ fontSize: "12px" }}>{icon}</span>
      <span
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "9px",
          color: "#5a1515",
          letterSpacing: "2px",
          textTransform: "uppercase" as const,
        }}
      >
        {label}
      </span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
      {skills.map((s) => (
        <span
          key={s}
          style={{
            padding: "3px 10px",
            background: "rgba(60,0,0,0.3)",
            border: "1px solid rgba(100,0,0,0.25)",
            borderRadius: "2px",
            color: "#c04040",
            fontSize: "11px",
            fontFamily: "'Courier New',monospace",
            letterSpacing: "0.5px",
            transition: "all 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLElement;
            el.style.background = "rgba(100,0,0,0.35)";
            el.style.color = "#ff5533";
            el.style.borderColor = "rgba(180,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLElement;
            el.style.background = "rgba(60,0,0,0.3)";
            el.style.color = "#c04040";
            el.style.borderColor = "rgba(100,0,0,0.25)";
          }}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

/* ── Floating ember ── */
const Ember = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={{
      position: "absolute",
      width: "2px",
      height: "2px",
      borderRadius: "50%",
      background: "radial-gradient(circle,#ff6600 0%,#ff2200 100%)",
      pointerEvents: "none",
      ...style,
    }}
  />
);

/* ── Main Hero ── */
const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [embers, setEmbers] = useState<
    { id: number; style: React.CSSProperties }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    const spawnEmber = () => {
      const id = Date.now() + Math.random();
      const drift = (Math.random() - 0.5) * 120;
      setEmbers((prev) => [
        ...prev.slice(-25),
        {
          id,
          style: {
            left: `${20 + Math.random() * 60}%`,
            bottom: "0",
            animation: `rise-ember ${2.5 + Math.random() * 2}s ease-out forwards`,
            "--drift": `${drift}px`,
          } as React.CSSProperties,
        },
      ]);
    };
    const iv = setInterval(spawnEmber, 400);
    return () => clearInterval(iv);
  }, []);

  const tags = ["Fullstack Dev", "API Architect", "UI Ritualist"];
  const totalSkills = Object.values(coderData.skills).flat().length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes rise-ember {
          0%   { transform:translate(0,0);opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:0.5; }
          100% { transform:translate(var(--drift,0px),-300px);opacity:0; }
        }
        @keyframes fade-in-up {
          from { opacity:0;transform:translateY(28px); }
          to   { opacity:1;transform:translateY(0); }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.12;transform:scale(1) rotate(0deg); }
          50%      { opacity:0.2;transform:scale(1.04) rotate(180deg); }
        }
        @keyframes flicker-bg {
          0%,100% { opacity:1; }
          93% { opacity:0.93; } 94% { opacity:1; }
          96% { opacity:0.96; } 97% { opacity:1; }
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow:0 0 20px rgba(139,0,0,0.4),inset 0 0 10px rgba(60,0,0,0.2); }
          50%       { box-shadow:0 0 40px rgba(180,0,0,0.7),inset 0 0 20px rgba(80,0,0,0.3); }
        }
        @keyframes blood-drip {
          0%   { transform:scaleY(0);opacity:0; }
          40%  { opacity:1; }
          100% { transform:scaleY(1);opacity:0.8; }
        }
        @keyframes learning-pulse {
          0%,100% { opacity:0.6; }
          50% { opacity:1; }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6);opacity:1; }
          50%       { box-shadow:0 0 0 6px rgba(180,0,0,0);opacity:0.7; }
        }

        .dem-hero-wrap { animation:flicker-bg 8s infinite; }
        .dem-fade       { animation:fade-in-up 0.8s ease-out both; }
        .dem-fade-delay { animation:fade-in-up 0.8s ease-out 0.2s both; }

        .dem-tag {
          padding:5px 14px;
          background:rgba(80,0,0,0.12);
          border:1px solid rgba(120,0,0,0.35);
          border-radius:2px; color:#8b2020;
          font-size:10px; letter-spacing:1.5px;
          font-family:'Cinzel',serif; transition:all 0.25s; cursor:default;
          clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
        }
        .dem-tag:hover { background:rgba(120,0,0,0.22);border-color:rgba(160,0,0,0.6);box-shadow:0 0 12px rgba(139,0,0,0.25);color:#cc2200; }

        .dem-btn-primary {
          padding:12px 30px;
          background:linear-gradient(135deg,#6b0000,#3d0000);
          color:#ffccaa; border:1px solid #8b0000; border-radius:2px;
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:2px;
          cursor:pointer; transition:all 0.25s;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          text-transform:uppercase; animation:glow-pulse 3s infinite;
        }
        .dem-btn-primary:hover { background:linear-gradient(135deg,#8b0000,#5a0000);box-shadow:0 0 30px rgba(139,0,0,0.6);transform:translateY(-2px);color:#fff; }
        .dem-btn-primary:active { transform:scale(0.97); }

        .dem-btn-ghost {
          padding:12px 30px; background:transparent; color:#8b0000;
          border:1px solid rgba(120,0,0,0.5); border-radius:2px;
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:2px;
          cursor:pointer; transition:all 0.25s; text-transform:uppercase;
          text-decoration:none; display:inline-block;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
        }
        .dem-btn-ghost:hover { border-color:#8b0000;background:rgba(80,0,0,0.12);transform:translateY(-2px);color:#cc2200; }
        .dem-btn-ghost:active { transform:scale(0.97); }

        .dem-blood-dot {
          width:7px;height:7px;border-radius:50%;background:#cc0000;
          animation:pulse-blood 2s infinite; display:inline-block;
        }
      `}</style>

      <div
        className="dem-hero-wrap"
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Crimson Text',serif",
          overflow: "hidden",
          background:
            "radial-gradient(120% 120% at 50% 110%,#0e0000 30%,#1a0000 65%,#0a0000 100%)",
          padding: "6rem 1.5rem 2rem",
        }}
      >
        {/* Ground hellfire */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "40%",
            background:
              "radial-gradient(ellipse,rgba(120,10,0,0.5) 0%,rgba(80,0,0,0.2) 40%,transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        {/* Top void */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "35%",
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.8) 0%,transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Giant pentagram */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "420px",
            color: "rgba(80,0,0,0.06)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            animation: "pulse-sigil 12s ease-in-out infinite",
          }}
        >
          ⛧
        </div>
        {/* Side vignettes */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "20%",
            background:
              "linear-gradient(90deg,rgba(60,0,0,0.4) 0%,transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "20%",
            background:
              "linear-gradient(270deg,rgba(60,0,0,0.4) 0%,transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Embers */}
        {embers.map((e) => (
          <Ember key={e.id} style={e.style} />
        ))}
        {/* Corner sigils */}
        {[
          "top:2rem;left:2rem",
          "top:2rem;right:2rem",
          "bottom:2rem;left:2rem",
          "bottom:2rem;right:2rem",
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...Object.fromEntries(pos.split(";").map((p) => p.split(":"))),
              fontSize: "18px",
              color: "rgba(100,0,0,0.3)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            ⛧
          </div>
        ))}

        {/* Main grid */}
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "3.5rem",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT */}
          <div
            className={mounted ? "dem-fade" : ""}
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 16px",
                background: "rgba(80,0,0,0.15)",
                border: "1px solid rgba(139,0,0,0.4)",
                width: "fit-content",
              }}
            >
              <span className="dem-blood-dot" />
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "9px",
                  color: "#8b2020",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                Soul Awakened
              </span>
            </div>

            <div>
              <p
                style={{
                  fontFamily: "'Crimson Text',serif",
                  fontSize: "13px",
                  color: "#4a1010",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                ⛧ &nbsp; I am summoned &nbsp; ⛧
              </p>
              <h1
                style={{
                  fontFamily: "'Cinzel Decorative',serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem,4.5vw,3rem)",
                  lineHeight: 1.2,
                  color: "#ffffff",
                  margin: 0,
                  textShadow: "0 0 60px rgba(139,0,0,0.3)",
                }}
              >
                I&apos;m{" "}
                <FlameText>
                  <span
                    style={{
                      background:
                        "linear-gradient(180deg,#cc2200 0%,#8b0000 60%,#4a0000 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    DR-PIERROT
                  </span>
                </FlameText>
              </h1>
              <p
                style={{
                  fontFamily: "'Crimson Text',serif",
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "#4a2020",
                  margin: "4px 0 0",
                  letterSpacing: "1px",
                }}
              >
                {coderData.alias} — {coderData.role}
              </p>
            </div>

            {/* Rune divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,rgba(100,0,0,0.5))",
                }}
              />
              <span style={{ color: "rgba(100,0,0,0.5)", fontSize: "12px" }}>
                ⛧
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg,rgba(100,0,0,0.5),transparent)",
                }}
              />
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {tags.map((t) => (
                <span key={t} className="dem-tag">
                  {t.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p
              style={{
                color: "#4a2020",
                fontSize: "15px",
                maxWidth: "420px",
                lineHeight: 1.8,
                fontFamily: "'Crimson Text',serif",
                fontStyle: "italic",
              }}
            >
              Conjurer of fullstack systems{" "}
              <span style={{ color: "#8b0000", fontStyle: "normal" }}>✦</span>{" "}
              Building REST APIs, scalable web apps, and cursed UIs from the
              depths of the Philippines
              <span style={{ color: "#8b0000" }}> ⛧</span>
            </p>

            {/* Learning */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "9px",
                  color: "#3a1010",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Studying dark arts:
              </span>
              {coderData.learning.map((l) => (
                <span
                  key={l}
                  style={{
                    padding: "2px 10px",
                    background: "rgba(40,0,0,0.4)",
                    border: "1px dashed rgba(100,0,0,0.4)",
                    borderRadius: "2px",
                    color: "#8b3030",
                    fontSize: "11px",
                    fontFamily: "'Courier New',monospace",
                    animation: "learning-pulse 2.5s ease-in-out infinite",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <button className="dem-btn-primary">⛧ Behold My Works</button>
              <a
                href="https://github.com/Dr-Pierrot"
                target="_blank"
                className="dem-btn-ghost"
              >
                GitHub Tome
              </a>
            </div>
          </div>

          {/* RIGHT — Skill Grimoire */}
          <div className={mounted ? "dem-fade-delay" : ""}>
            {/* Blood drips */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "6px",
                paddingLeft: "20%",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "1px",
                    height: `${8 + (i % 3) * 6}px`,
                    background:
                      "linear-gradient(180deg,#6b0000,rgba(100,0,0,0))",
                    borderRadius: "0 0 2px 2px",
                    animation: `blood-drip ${1 + i * 0.3}s ease-out ${i * 0.15}s both`,
                    transformOrigin: "top",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                background:
                  "linear-gradient(160deg,#0c0000 0%,#0f0101 50%,#080000 100%)",
                border: "1px solid rgba(120,0,0,0.5)",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                boxShadow:
                  "0 0 60px rgba(100,0,0,0.2),inset 0 0 60px rgba(60,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg,transparent,#6b0000,#cc2200,#ff4400,#cc2200,#6b0000,transparent)",
                  boxShadow: "0 0 10px #cc2200",
                }}
              />
              <div
                style={{
                  padding: "10px 18px",
                  background: "rgba(0,0,0,0.8)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(100,0,0,0.4)",
                }}
              >
                <div style={{ display: "flex", gap: "7px" }}>
                  {["#7a0000", "#3d0000", "#1a0000"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                        boxShadow: `0 0 4px ${c}`,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#4a0000",
                    letterSpacing: "5px",
                    fontFamily: "'Cinzel',serif",
                  }}
                >
                  ⛧ skills.soul ⛧
                </span>
              </div>

              <div
                style={{
                  padding: "16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <SkillBlock
                  label="Frontend Arts"
                  icon="🔮"
                  skills={coderData.skills.frontend}
                  delay={0.1}
                />
                <SkillBlock
                  label="Backend Rites"
                  icon="⚗️"
                  skills={coderData.skills.backend}
                  delay={0.2}
                />
                <SkillBlock
                  label="Data Vaults"
                  icon="🗄️"
                  skills={coderData.skills.database}
                  delay={0.3}
                />
                <SkillBlock
                  label="Ritual Tools"
                  icon="⚔️"
                  skills={coderData.skills.tools}
                  delay={0.4}
                />
              </div>

              <div
                style={{
                  padding: "10px 18px",
                  borderTop: "1px solid rgba(80,0,0,0.25)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  color: "#2a0000",
                  letterSpacing: "1px",
                  fontFamily: "'Courier New',monospace",
                }}
              >
                <span>⛧ BOUND</span>
                <span>{totalSkills} ARTS MASTERED</span>
                <span>PHILIPPINES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
