"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  bioLines: [
    "I'm a fullstack developer. I build scalable web apps — from the database up to the interface people actually touch.",
    "Right now I'm building a Human Resource Management System, and picking up Vue.js and Svelte along the way.",
  ],
  links: [
    { label: "github", href: "https://github.com/Dr-Pierrot" },
    {
      label: "linkedin",
      href: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
    },
    { label: "email", href: "mailto:capulongako16@gmail.com" },
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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <>
      <style>{`
        ${T.fontImport}

        @keyframes about-in { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform: translateY(0); } }
        .about-in { animation: about-in 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        .about-photo-wrap {
          position: relative;
          width: 260px;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          flex-shrink: 0;
        }
        .about-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 640px) {
          .about-simple-grid { grid-template-columns: 1fr !important; }
          .about-photo-wrap { width: 200px; }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.ink,
          padding: "clamp(4.5rem,10vw,7rem) 1.5rem",
        }}
      >
        <div
          className={`about-simple-grid ${inView ? "about-in" : ""}`}
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "clamp(2rem,5vw,3.25rem)",
            alignItems: "start",
          }}
        >
          <div className="about-photo-wrap">
            <img
              src="/profile.jpg"
              alt={profile.name}
              className="about-photo-img"
            />
          </div>

          <div>
            <h2
              style={{
                fontFamily: T.font.heading,
                fontWeight: 700,
                fontSize: "clamp(1.9rem,4vw,2.4rem)",
                color: T.color.darkText,
                margin: "0 0 1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {profile.name}
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1.75rem",
              }}
            >
              {profile.bioLines.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: T.font.body,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: T.color.darkTextSecondary,
                    margin: 0,
                    maxWidth: "460px",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
