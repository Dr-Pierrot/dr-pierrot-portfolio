"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";
import { SectionHead } from "@/components/editorial";
import GitHubActivity from "@/components/GitHubActivity";

const milestones = [
  {
    year: "2024",
    title: "Started shipping real projects",
    desc: "Moved past tutorials into building complete apps end to end — a Java Swing desktop prototype with proper MVC architecture, then a vanilla-JS weather app and a rebuilt todo manager, each one fixing what the last one got wrong.",
  },
  {
    year: "2025",
    title: "Went fullstack, backend-first",
    desc: "Picked up Laravel and shipped the PSGC API — a production REST API covering 43,768 Philippine geographic records, with Sanctum auth and full Swagger documentation. First project built for other developers to actually consume.",
  },
  {
    year: "2025",
    title: "Took on a full system, not just a feature",
    desc: "Started building a Human Resource Management System solo — the full employee lifecycle, payroll, attendance, and access control, using Laravel + React/TypeScript via Inertia.js. Currently in progress.",
  },
  {
    year: "Now",
    title: "Expanding the toolkit",
    desc: "Learning Vue.js and Svelte to round out frontend range, while continuing to harden the HRMS toward something a real HR team could run day to day.",
  },
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

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        @keyframes journey-in { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .journey-in { animation: journey-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .journey-row { display: grid; grid-template-columns: 90px 110px minmax(0,1fr); gap: 1.5rem; padding: 1.9rem 0; border-top: 1px solid ${T.color.border}; align-items: baseline; }
        .journey-row:last-child { border-bottom: 1px solid ${T.color.border}; }
        @media (max-width: 720px) {
          .journey-row { grid-template-columns: 1fr; gap: 0.4rem; }
        }
      `}</style>

      <section id="journey" ref={sectionRef} style={{ width: "100%", background: T.color.paperAlt, padding: "clamp(4rem,8vw,6.5rem) 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.75rem)" }}>
          <div className={inView ? "journey-in" : ""}>
            <SectionHead
              kicker="03 — Journey"
              title={<>Two years of <em style={{ fontStyle: "italic", color: T.color.accent }}>building</em>, in order</>}
              lede="Not a résumé of job titles — a record of what got built, and what each project taught the next one."
            />
          </div>

          <div className={inView ? "journey-in" : ""} style={{ marginTop: "2.5rem" }}>
            {milestones.map((m, i) => (
              <div className="journey-row" key={i}>
                <span style={{ fontFamily: T.font.mono, fontSize: "0.78rem", color: T.color.textMuted }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: T.font.display, fontSize: "1.15rem", color: T.color.accent, fontStyle: "italic" }}>
                  {m.year}
                </span>
                <div>
                  <div style={{ fontFamily: T.font.heading, fontWeight: 600, fontSize: "1.05rem", color: T.color.text }}>
                    {m.title}
                  </div>
                  <p style={{ fontFamily: T.font.body, fontSize: "0.94rem", lineHeight: 1.7, color: T.color.textSecondary, margin: "0.5rem 0 0", maxWidth: 640 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={inView ? "journey-in" : ""} style={{ marginTop: "3rem" }}>
            <GitHubActivity />
          </div>
        </div>
      </section>
    </>
  );
}
