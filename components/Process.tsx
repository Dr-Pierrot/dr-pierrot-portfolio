"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";
import { SectionHead } from "@/components/editorial";

const steps = [
  {
    n: "01",
    title: "Understand the problem",
    desc: "Before touching a data model, I map out who uses the system and what breaks in their current workflow.",
  },
  {
    n: "02",
    title: "Design the data first",
    desc: "Schema and API contracts get shaped before UI — the interface should reflect real structure, not paper over a messy one.",
  },
  {
    n: "03",
    title: "Build in vertical slices",
    desc: "One working feature end to end, then the next — so there's always something real to look at, not a pile of half-finished layers.",
  },
  {
    n: "04",
    title: "Ship, then harden",
    desc: "Get it working, get it used, then tighten auth, edge cases, and performance based on what actually breaks.",
  },
];

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        @keyframes process-in { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .process-in { animation: process-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .process-card { padding: 1.75rem 1.5rem; border-left: 1px solid ${T.color.darkBorder}; }
        .process-card:first-child { border-left: none; }
        .process-grid { display: grid; grid-template-columns: repeat(4,1fr); margin-top: 3rem; }
        @media (max-width: 820px) {
          .process-grid { grid-template-columns: 1fr 1fr; }
          .process-card { border-left: none; border-top: 1px solid ${T.color.darkBorder}; }
          .process-card:nth-child(odd) { border-left: none; }
          .process-card:first-child, .process-card:nth-child(2) { border-top: none; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr; }
          .process-card:nth-child(2) { border-top: 1px solid ${T.color.darkBorder}; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: T.color.ink,
          padding: "clamp(4rem,8vw,6.5rem) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,2.75rem)",
          }}
          ref={sectionRef}
        >
          <div className={inView ? "process-in" : ""}>
            <SectionHead
              kicker="How I work"
              title={
                <span style={{ color: T.color.darkText }}>
                  From requirement to{" "}
                  <span style={{ color: T.color.accentBright }}>
                    running system
                  </span>
                </span>
              }
              dark
            />
          </div>

          <div className={`process-grid${inView ? " process-in" : ""}`}>
            {steps.map((s) => (
              <div className="process-card" key={s.n}>
                <div
                  style={{
                    fontFamily: T.font.mono,
                    fontSize: "0.78rem",
                    color: T.color.accentBright,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: T.font.heading,
                    fontWeight: 600,
                    fontSize: "1.02rem",
                    color: T.color.darkText,
                    margin: "0.9rem 0 0.6rem",
                  }}
                >
                  {s.title}
                </div>
                <p
                  style={{
                    fontFamily: T.font.body,
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    color: T.color.darkTextSecondary,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
