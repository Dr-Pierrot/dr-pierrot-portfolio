"use client";
import React, { useEffect, useMemo, useState } from "react";
import { T } from "@/lib/theme";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const coderData = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Fullstack Developer", "Web Developer", "Software Engineer"],
  seniority: "Junior",
  location: "Tarlac City, Philippines",
  timezone: "GMT+8",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://linkedin.com/in/",
  resume: "/resume.pdf",
  tagline:
    "I build scalable web applications end to end — from REST APIs and database design to polished, accessible, responsive interfaces.",
  stats: [
    { value: "2+", label: "Years building" },
    { value: "15+", label: "Projects shipped" },
    { value: "16", label: "Technologies" },
    { value: "100%", label: "Remote ready" },
  ],
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
  } as Record<string, string[]>,
  currentlyLearning: ["Docker", "PostgreSQL", "Testing"],
};

type TabKey = keyof typeof coderData.skills;

/* ------------------------------------------------------------------ */
/*  TYPEWRITER                                                         */
/* ------------------------------------------------------------------ */

const useTypewriter = (words: string[], speed = 70, pause = 1600) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting
            ? word.slice(0, prev.length - 1)
            : word.slice(0, prev.length + 1),
        ),
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
};

/* ------------------------------------------------------------------ */
/*  SMALL PIECES                                                       */
/* ------------------------------------------------------------------ */

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
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M4 21h16",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  github:
    "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21",
  linkedin:
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  pin: "M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
};

/* code-style line renderer for the editor card */
const CodeLine = ({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", gap: "16px", lineHeight: "1.85" }}>
    <span
      style={{
        width: "18px",
        textAlign: "right" as const,
        color: T.color.textMuted,
        opacity: 0.5,
        userSelect: "none" as const,
        fontSize: "12px",
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: "13px", whiteSpace: "pre" as const }}>
      {children}
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<TabKey>("frontend");
  useEffect(() => setMounted(true), []);

  const typed = useTypewriter(coderData.roles);
  const tabs = useMemo(() => Object.keys(coderData.skills) as TabKey[], []);
  const active = coderData.skills[tab];
  const totalSkills = Object.values(coderData.skills).flat().length;

  const kw = T.color.accent3Text || T.color.accentText; // keyword
  const str = T.color.accent2Text || T.color.accentText; // string
  const fn = T.color.accentText; // identifier

  return (
    <>
      <style>{`
        ${T.fontImport}

        @keyframes hero-up   { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:none; } }
        @keyframes hero-in   { from { opacity:0; transform:translateY(12px) scale(.99);} to { opacity:1; transform:none; } }
        @keyframes hero-ping { 0%{transform:scale(1);opacity:.55} 70%{transform:scale(2.4);opacity:0} 100%{opacity:0} }
        @keyframes hero-blink{ 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes hero-float{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes hero-marquee { from { transform:translateX(0);} to { transform:translateX(-50%);} }
        @keyframes hero-drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-24px,26px)} }

        .h-root{
          position:relative; min-height:100vh; width:100%;
          display:flex; align-items:center;
          background:${T.color.gradientHero};
          font-family:${T.font.body};
          padding:7rem 1.5rem 0;
          overflow:hidden;
        }
        .h-grid-bg{
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(${T.color.border} 1px, transparent 1px),
            linear-gradient(90deg, ${T.color.border} 1px, transparent 1px);
          background-size:64px 64px;
          opacity:.35;
          mask-image:radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%);
          -webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%);
        }
        .h-blob{ position:absolute; border-radius:50%; pointer-events:none; filter:blur(6px); animation:hero-drift 16s ease-in-out infinite; }

        .h-wrap{
          position:relative; z-index:1; width:100%; max-width:1180px; margin:0 auto;
          display:grid; grid-template-columns:1.05fr .95fr; gap:4rem; align-items:center;
          padding-bottom:6rem;
        }
        @media (max-width:900px){
          .h-root{ padding-top:6rem; align-items:flex-start; }
          .h-wrap{ grid-template-columns:1fr; gap:2.5rem; padding-bottom:7rem; }
          .h-card-col{ order:2; }
        }

        .h-col{ display:flex; flex-direction:column; gap:1.4rem; animation:hero-up .8s cubic-bezier(.2,.7,.2,1) both; }

        /* status pill */
        .h-status{
          display:inline-flex; align-items:center; gap:9px; width:fit-content;
          padding:6px 14px 6px 12px; border-radius:999px;
          background:${T.color.accentSoft}; border:1px solid ${T.color.accentBorder};
          font-size:12px; font-weight:600; color:${T.color.accentText};
          letter-spacing:.01em;
        }
        .h-dot{ position:relative; width:7px; height:7px; border-radius:50%; background:${T.color.accent}; }
        .h-dot::after{
          content:''; position:absolute; inset:0; border-radius:50%;
          background:${T.color.accent}; animation:hero-ping 2s ease-out infinite;
        }
        .h-sep{ width:1px; height:12px; background:${T.color.accentBorder}; }

        /* headline */
        .h-eyebrow{ font-family:${T.font.mono}; font-size:13px; color:${T.color.textMuted}; margin:0 0 10px; letter-spacing:.02em; }
        .h-name{
          font-family:${T.font.heading}; font-weight:800; margin:0;
          font-size:clamp(2.4rem,6vw,4.1rem); line-height:1.05; letter-spacing:-.03em;
          background:${T.color.gradientText};
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }
        .h-typeline{
          display:flex; align-items:center; gap:10px; flex-wrap:wrap;
          margin:14px 0 0; font-family:${T.font.mono};
          font-size:clamp(15px,2.2vw,19px); color:${T.color.textSecondary};
        }
        .h-typed{ color:${T.color.text}; font-weight:600; }
        .h-caret{ display:inline-block; width:9px; height:1.05em; background:${T.color.accent}; animation:hero-blink 1s step-end infinite; transform:translateY(2px); border-radius:1px; }

        .h-bio{ color:${T.color.textSecondary}; font-size:16px; line-height:1.8; max-width:520px; margin:0; }
        .h-bio b{ color:${T.color.text}; font-weight:600; }

        /* stats */
        .h-stats{
          display:grid; grid-template-columns:repeat(4,minmax(0,1fr));
          border:1px solid ${T.color.border}; border-radius:14px; overflow:hidden;
          background:${T.color.bg};
        }
        .h-stat{ padding:14px 12px; border-right:1px solid ${T.color.border}; }
        .h-stat:last-child{ border-right:none; }
        .h-stat-v{ font-family:${T.font.heading}; font-weight:700; font-size:20px; color:${T.color.text}; letter-spacing:-.02em; }
        .h-stat-l{ font-size:11px; color:${T.color.textMuted}; margin-top:2px; letter-spacing:.02em; }
        @media (max-width:520px){ .h-stats{ grid-template-columns:repeat(2,1fr);} .h-stat:nth-child(2){border-right:none} .h-stat:nth-child(-n+2){border-bottom:1px solid ${T.color.border}} }

        /* buttons */
        .h-actions{ display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
        .h-btn{
          display:inline-flex; align-items:center; gap:9px;
          padding:13px 24px; border-radius:10px;
          font-family:${T.font.body}; font-size:14px; font-weight:600;
          text-decoration:none; cursor:pointer; transition:all .22s cubic-bezier(.2,.7,.2,1);
        }
        .h-btn-primary{
          background:${T.color.gradientButton}; color:#fff; border:1px solid transparent;
          box-shadow:0 2px 10px rgba(15,118,110,.22);
        }
        .h-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(15,118,110,.32); }
        .h-btn-primary svg{ transition:transform .22s; }
        .h-btn-primary:hover svg{ transform:translateX(3px); }
        .h-btn-ghost{
          background:${T.color.bg}; color:${T.color.text}; border:1px solid ${T.color.border};
        }
        .h-btn-ghost:hover{ border-color:${T.color.borderStrong}; background:${T.color.bgAlt}; transform:translateY(-2px); }

        .h-social{ display:flex; gap:8px; }
        .h-icon-btn{
          display:grid; place-items:center; width:42px; height:42px; border-radius:10px;
          border:1px solid ${T.color.border}; background:${T.color.bg};
          color:${T.color.textSecondary}; transition:all .2s; text-decoration:none;
        }
        .h-icon-btn:hover{ color:${T.color.accentText}; border-color:${T.color.accentBorder}; background:${T.color.accentSoft}; transform:translateY(-2px); }

        /* editor card */
        .h-card-col{ animation:hero-in .9s cubic-bezier(.2,.7,.2,1) .18s both; position:relative; }
        .h-card{
          background:${T.color.bg}; border:1px solid ${T.color.border}; border-radius:16px;
          overflow:hidden; box-shadow:0 24px 60px -28px rgba(17,24,39,.28), 0 2px 6px rgba(17,24,39,.05);
        }
        .h-card-top{
          display:flex; align-items:center; justify-content:space-between;
          padding:11px 14px; background:${T.color.bgAlt}; border-bottom:1px solid ${T.color.border};
        }
        .h-tabs{ display:flex; gap:4px; padding:8px 10px 0; background:${T.color.bgAlt}; border-bottom:1px solid ${T.color.border}; overflow-x:auto; }
        .h-tab{
          appearance:none; border:1px solid transparent; border-bottom:none; background:transparent;
          padding:7px 13px; border-radius:8px 8px 0 0; cursor:pointer;
          font-family:${T.font.mono}; font-size:12px; color:${T.color.textMuted}; white-space:nowrap;
          transition:all .18s;
        }
        .h-tab:hover{ color:${T.color.text}; }
        .h-tab[data-active="true"]{
          background:${T.color.bg}; color:${T.color.text};
          border-color:${T.color.border}; margin-bottom:-1px; padding-bottom:8px;
        }
        .h-code{ padding:18px 18px 14px; font-family:${T.font.mono}; min-height:236px; }
        .h-chip{
          display:inline-block; padding:3px 9px; margin:0 4px 6px 0;
          border-radius:6px; font-family:${T.font.mono}; font-size:12px;
          background:${T.color.bgAlt}; border:1px solid ${T.color.border}; color:${T.color.text};
          transition:all .18s; cursor:default;
        }
        .h-chip:hover{ border-color:${T.color.accentBorder}; background:${T.color.accentSoft}; color:${T.color.accentText}; transform:translateY(-1px); }
        .h-card-bottom{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          padding:10px 16px; border-top:1px solid ${T.color.border}; background:${T.color.bgAlt};
          font-family:${T.font.mono}; font-size:11px; color:${T.color.textMuted};
        }
        .h-badge{
          position:absolute; right:-14px; bottom:-22px; z-index:2;
          display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:12px;
          background:${T.color.bg}; border:1px solid ${T.color.border};
          box-shadow:0 12px 30px -12px rgba(17,24,39,.3);
          animation:hero-float 5.5s ease-in-out infinite;
        }
        @media (max-width:900px){ .h-badge{ right:8px; bottom:-18px; } }

        /* marquee */
        .h-marquee{
          position:absolute; left:0; right:0; bottom:0; z-index:1;
          border-top:1px solid ${T.color.border};
          background:${T.color.bg}; overflow:hidden; padding:11px 0;
          mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
          -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
        }
        .h-marquee-track{ display:flex; width:max-content; animation:hero-marquee 32s linear infinite; }
        .h-marquee:hover .h-marquee-track{ animation-play-state:paused; }
        .h-marquee-item{
          display:inline-flex; align-items:center; gap:10px; padding:0 22px;
          font-family:${T.font.mono}; font-size:12px; color:${T.color.textMuted}; white-space:nowrap;
        }

        @media (prefers-reduced-motion: reduce){
          .h-col,.h-card-col,.h-badge,.h-marquee-track,.h-dot::after{ animation:none !important; }
        }
      `}</style>

      <section className="h-root" id="home">
        <div className="h-grid-bg" />
        <div
          className="h-blob"
          style={{
            top: "-12%",
            right: "-8%",
            width: 460,
            height: 460,
            background:
              "radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          className="h-blob"
          style={{
            bottom: "-18%",
            left: "-10%",
            width: 420,
            height: 420,
            animationDelay: "-6s",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="h-wrap">
          {/* ---------------- LEFT ---------------- */}
          <div className="h-col">
            <div className="h-status">
              <span className="h-dot" />
              Available for work
              <span className="h-sep" />
              <span style={{ opacity: 0.85, fontWeight: 500 }}>
                {coderData.timezone} · Remote
              </span>
            </div>

            <div>
              <p className="h-eyebrow">{"// hi there, my name is"}</p>
              <h1 className="h-name">{coderData.name}</h1>
              <div className="h-typeline">
                <span style={{ color: T.color.textMuted }}>{"<"}</span>
                <span className="h-typed">
                  {mounted ? typed : coderData.roles[0]}
                </span>
                <span className="h-caret" />
                <span style={{ color: T.color.textMuted }}>{"/>"}</span>
              </div>
            </div>

            <p className="h-bio">
              {coderData.tagline} Currently focused on{" "}
              <b>React, Next.js &amp; Laravel</b> — writing clean, typed,
              maintainable code and shipping things that actually get used.
            </p>

            <div className="h-stats">
              {coderData.stats.map((s) => (
                <div className="h-stat" key={s.label}>
                  <div className="h-stat-v">{s.value}</div>
                  <div className="h-stat-l">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="h-actions">
              <a href="#projects" className="h-btn h-btn-primary">
                View my work <Icon path={ICONS.arrow} />
              </a>
              <a href={coderData.resume} className="h-btn h-btn-ghost" download>
                <Icon path={ICONS.download} /> Résumé
              </a>
              <div className="h-social">
                <a
                  className="h-icon-btn"
                  href={coderData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Icon path={ICONS.github} />
                </a>
                <a
                  className="h-icon-btn"
                  href={coderData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Icon path={ICONS.linkedin} />
                </a>
                <a
                  className="h-icon-btn"
                  href={`mailto:${coderData.email}`}
                  aria-label="Email"
                >
                  <Icon path={ICONS.mail} />
                </a>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: T.color.textMuted,
                fontSize: "13px",
              }}
            >
              <Icon path={ICONS.pin} />
              {coderData.location}
            </div>
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="h-card-col">
            <div className="h-card">
              <div className="h-card-top">
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
                  ~/{coderData.alias}/skills.ts
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

              <div
                className="h-tabs"
                role="tablist"
                aria-label="Skill categories"
              >
                {tabs.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    data-active={tab === t}
                    className="h-tab"
                    onClick={() => setTab(t)}
                  >
                    {t}.ts
                  </button>
                ))}
              </div>

              <div className="h-code">
                <CodeLine n={1}>
                  <span style={{ color: kw }}>export const </span>
                  <span style={{ color: fn }}>{tab}</span>
                  <span style={{ color: T.color.textSecondary }}>
                    {": string[] = ["}
                  </span>
                </CodeLine>

                <div style={{ padding: "8px 0 8px 34px" }}>
                  {active.map((s) => (
                    <span className="h-chip" key={s}>
                      <span style={{ color: str }}>&quot;{s}&quot;</span>
                      <span style={{ color: T.color.textMuted }}>,</span>
                    </span>
                  ))}
                </div>

                <CodeLine n={active.length + 2}>
                  <span style={{ color: T.color.textSecondary }}>{"];"}</span>
                </CodeLine>
                <CodeLine n={active.length + 3}> </CodeLine>
                <CodeLine n={active.length + 4}>
                  <span style={{ color: T.color.textMuted }}>
                    {`// ${active.length} in ${tab} · ${totalSkills} total`}
                  </span>
                </CodeLine>
              </div>

              <div className="h-card-bottom">
                <span
                  style={{
                    display: "inline-flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.color.accent,
                      display: "inline-block",
                    }}
                  />
                  main · {coderData.seniority} dev
                </span>
                <span>{totalSkills} skills · UTF-8</span>
              </div>
            </div>

            <div className="h-badge">
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  display: "grid",
                  placeItems: "center",
                  background: T.color.accent2Soft,
                  border: `1px solid ${T.color.accent2Border}`,
                  color: T.color.accent2Text,
                  fontFamily: T.font.mono,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {"{}"}
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    color: T.color.textMuted,
                    fontFamily: T.font.mono,
                    letterSpacing: ".04em",
                  }}
                >
                  CURRENTLY LEARNING
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.color.text,
                  }}
                >
                  {coderData.currentlyLearning.join(" · ")}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- TECH MARQUEE ---------------- */}
        <div className="h-marquee" aria-hidden="true">
          <div className="h-marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} style={{ display: "flex" }}>
                {Object.values(coderData.skills)
                  .flat()
                  .map((s, i) => (
                    <span className="h-marquee-item" key={`${dup}-${s}-${i}`}>
                      <span style={{ color: T.color.accent }}>◆</span>
                      {s}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
