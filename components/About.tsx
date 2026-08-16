"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const profile = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  role: "Fullstack Developer",
  seniority: "Junior",
  location: "Tarlac City, Philippines",
  currentlyBuilding: "a Human Resource Management System",
  learning: ["Vue.js", "Svelte"],
  bioLines: [
    "I'm a fullstack developer. I build scalable web apps — from the database up to the interface people actually touch.",
    "Right now I'm building a Human Resource Management System, and picking up Vue.js and Svelte along the way.",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/Dr-Pierrot",
      icon: "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21",
    },
    {
      label: "LinkedIn",
      href: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
      icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
    },
    {
      label: "Email",
      href: "mailto:capulongako16@gmail.com",
      icon: "M3 6h18v12H3zM3 7l9 6 9-6",
    },
  ],
};

/* Purely decorative — used only to trigger the photo's entrance transition.
   No content is ever hidden behind this; worst case it just doesn't animate. */
const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="about"
      className="w-full bg-ed-paper-alt px-6 py-[clamp(4.5rem,10vw,7rem)]"
    >
      <div
        ref={sectionRef}
        className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-12 md:grid-cols-[300px_1fr] md:gap-16"
      >
        {/* ---------------- PHOTO COLUMN ---------------- */}
        <div className="mx-auto w-fit md:mx-0">
          <div
            className={clsx(
              "relative aspect-[4/5] w-[240px] overflow-hidden rounded-2xl border border-ed-border bg-ed-surface shadow-[0_24px_60px_-28px_rgba(11,19,16,0.28),0_2px_6px_rgba(11,19,16,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[300px]",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            <img
              src="/profile.jpg"
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ---------------- TEXT COLUMN ---------------- */}
        <div>
          <p className="mb-2.5 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
            {"// about me"}
          </p>

          <h2 className="m-0 bg-ed-gradient-text bg-clip-text font-ed-heading text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-transparent">
            {profile.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-ed-mono text-[13px] text-ed-text-muted">
            <span>{profile.alias}</span>
            <span aria-hidden>·</span>
            <span>
              {profile.role} · {profile.seniority}
            </span>
            <span aria-hidden>·</span>
            <span>{profile.location}</span>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {profile.bioLines.map((line, i) => (
              <p
                key={i}
                className="m-0 max-w-[480px] text-base leading-[1.75] text-ed-text-secondary"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 inline-flex flex-wrap items-center gap-2.5 rounded-xl border border-ed-border bg-ed-surface px-4 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] border border-ed-accent2-border bg-ed-accent2-soft font-ed-mono text-xs font-bold text-ed-accent2-text">
              {"{}"}
            </span>
            <span>
              <span className="block font-ed-mono text-[10px] tracking-[0.04em] text-ed-text-muted">
                CURRENTLY BUILDING
              </span>
              <span className="block text-[13px] font-semibold text-ed-text">
                {profile.currentlyBuilding}
              </span>
            </span>
            <span className="mx-1 hidden h-8 w-px bg-ed-border sm:block" />
            <span>
              <span className="block font-ed-mono text-[10px] tracking-[0.04em] text-ed-text-muted">
                LEARNING
              </span>
              <span className="block text-[13px] font-semibold text-ed-text">
                {profile.learning.join(" · ")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
