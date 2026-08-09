"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";
import { Kicker, SectionHead, ArrowLink } from "@/components/editorial";

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: "Web Developer · Software Engineer · Fullstack Developer",
  seniority: "Junior",
  location: "Philippines",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  bio: "I'm a fullstack developer focused on building practical, real-world web applications that solve everyday problems — the kind of software that replaces a spreadsheet or a manual process with something that just works. I enjoy the whole stack: modeling the data, building the API, and shaping the interface people actually touch.",
  currently: "Building a Human Resource Management System",
};

const skillGroups: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "CSS", "HTML", "Astro"] },
  { label: "Backend", items: ["Laravel", "Node.js", "PHP"] },
  { label: "Database", items: ["MySQL", "MongoDB", "Firebase"] },
  { label: "Tools", items: ["Git", "GitHub", "Figma", "WordPress"] },
];

const traits = [
  { n: "01", label: "Problem solver", desc: "Turning ambiguous requirements into clean, working systems." },
  { n: "02", label: "API architect", desc: "REST APIs with proper auth, documentation, and structure." },
  { n: "03", label: "UI craftsman", desc: "Interfaces that are functional first, sharp second." },
  { n: "04", label: "Always learning", desc: "Currently expanding into Vue.js and Svelte." },
];

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        @keyframes about-in { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .about-in { animation: about-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .skill-row { display: flex; align-items: baseline; gap: 1.1rem; padding: 14px 0; border-bottom: 1px solid ${T.color.border}; }
        .skill-row:last-child { border-bottom: none; }
        .skill-label { font-family: ${T.font.mono}; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: ${T.color.textMuted}; width: 92px; flex-shrink: 0; }
        .skill-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-chip { font-family: ${T.font.body}; font-size: 0.86rem; color: ${T.color.text}; }
        .skill-chip:not(:last-child)::after { content: '·'; margin-left: 0.5rem; color: ${T.color.borderStrong}; }
        .trait-card { padding: 1.4rem 0; border-top: 1px solid ${T.color.border}; }
        .trait-card:last-child { border-bottom: 1px solid ${T.color.border}; }
        .about-grid { display: grid; grid-template-columns: minmax(0,1.1fr) minmax(0,0.9fr); gap: clamp(2.5rem,6vw,5rem); margin-top: 3rem; }
        @media (max-width: 820px) { .about-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section id="about" ref={sectionRef} style={{ width: "100%", background: T.color.paper, padding: "clamp(4rem,8vw,6.5rem) 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.75rem)" }}>
          <div className={inView ? "about-in" : ""}>
            <SectionHead kicker="02 — About" title={<>The person <em style={{ fontStyle: "italic", color: T.color.accent }}>behind</em> the commits</>} />
          </div>

          <div className="about-grid">
            {/* LEFT column */}
            <div className={inView ? "about-in" : ""}>
              <p style={{ fontFamily: T.font.display, fontSize: "clamp(1.3rem,2.2vw,1.6rem)", lineHeight: 1.5, color: T.color.text, fontWeight: 400, margin: 0 }}>
                {profile.bio}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem", marginTop: "2.5rem" }}>
                {[
                  { label: "Based in", value: profile.location },
                  { label: "Role", value: profile.roles },
                  { label: "Level", value: profile.seniority },
                  { label: "Currently", value: profile.currently },
                ].map((row) => (
                  <div key={row.label}>
                    <div style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.textMuted, marginBottom: 4 }}>
                      {row.label}
                    </div>
                    <div style={{ fontFamily: T.font.body, fontSize: "0.95rem", color: T.color.text }}>{row.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1.6rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <ArrowLink href={profile.github} external>GitHub</ArrowLink>
                <ArrowLink href={profile.linkedin} external>LinkedIn</ArrowLink>
                <ArrowLink href={`mailto:${profile.email}`}>{profile.email}</ArrowLink>
              </div>

              {/* Traits */}
              <div style={{ marginTop: "3rem" }}>
                {traits.map((t) => (
                  <div key={t.n} className="trait-card" style={{ display: "flex", gap: "1.2rem" }}>
                    <span style={{ fontFamily: T.font.mono, fontSize: "0.78rem", color: T.color.accent, paddingTop: 3 }}>{t.n}</span>
                    <div>
                      <div style={{ fontFamily: T.font.heading, fontSize: "0.98rem", fontWeight: 600, color: T.color.text }}>{t.label}</div>
                      <div style={{ fontFamily: T.font.body, fontSize: "0.88rem", color: T.color.textSecondary, marginTop: 3 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT column — capability index */}
            <div className={inView ? "about-in" : ""}>
              <div style={{ background: T.color.surface, border: `1px solid ${T.color.border}`, padding: "clamp(1.5rem,3vw,2.5rem)" }}>
                <Kicker>Capability index</Kicker>
                <div style={{ marginTop: "1.2rem" }}>
                  {skillGroups.map((g) => (
                    <div className="skill-row" key={g.label}>
                      <span className="skill-label">{g.label}</span>
                      <span className="skill-items">
                        {g.items.map((s) => (
                          <span className="skill-chip" key={s}>{s}</span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  background: T.color.ink,
                  color: T.color.darkText,
                  padding: "1.75rem clamp(1.5rem,3vw,2.25rem)",
                  position: "relative",
                }}
              >
                <span style={{ fontFamily: T.font.display, fontSize: "2.4rem", color: T.color.accentBright, lineHeight: 1, display: "block" }}>“</span>
                <p style={{ fontFamily: T.font.display, fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.55, margin: "0.5rem 0 0" }}>
                  I don&apos;t just write code — I build systems that outlast the moment they were written for.
                </p>
                <div style={{ marginTop: "1.2rem", fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.06em", color: T.color.darkTextSecondary }}>
                  — {profile.alias}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
