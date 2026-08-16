"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type AccentKey = "accent" | "accent2" | "accent3";

const steps: { n: string; title: string; desc: string; accent: AccentKey }[] = [
  {
    n: "01",
    title: "Understand the problem",
    desc: "Before touching a data model, I map out who uses the system and what breaks in their current workflow.",
    accent: "accent",
  },
  {
    n: "02",
    title: "Design the data first",
    desc: "Schema and API contracts get shaped before UI — the interface should reflect real structure, not paper over a messy one.",
    accent: "accent2",
  },
  {
    n: "03",
    title: "Build in vertical slices",
    desc: "One working feature end to end, then the next — so there's always something real to look at, not a pile of half-finished layers.",
    accent: "accent3",
  },
  {
    n: "04",
    title: "Ship, then harden",
    desc: "Get it working, get it used, then tighten auth, edge cases, and performance based on what actually breaks.",
    accent: "accent",
  },
];

/* Per-accent Tailwind class bundles for the roadmap nodes and card hover glow —
   cycles teal / amber / indigo, same palette Hero uses for its badge/chips. */
const ACCENT_STYLES: Record<
  AccentKey,
  { badge: string; ring: string; cardHover: string; label: string }
> = {
  accent: {
    badge: "border-ed-accent-border bg-ed-accent-soft text-ed-accent-text",
    ring: "ring-ed-accent/15",
    cardHover:
      "hover:border-ed-accent-border hover:shadow-[0_16px_40px_-24px_rgba(14,124,116,0.35)]",
    label: "text-ed-accent-text",
  },
  accent2: {
    badge: "border-ed-accent2-border bg-ed-accent2-soft text-ed-accent2-text",
    ring: "ring-ed-accent2/15",
    cardHover:
      "hover:border-ed-accent2-border hover:shadow-[0_16px_40px_-24px_rgba(245,158,11,0.35)]",
    label: "text-ed-accent2-text",
  },
  accent3: {
    badge: "border-ed-accent3-border bg-ed-accent3-soft text-ed-accent3-text",
    ring: "ring-ed-accent3/15",
    cardHover:
      "hover:border-ed-accent3-border hover:shadow-[0_16px_40px_-24px_rgba(99,102,241,0.35)]",
    label: "text-ed-accent3-text",
  },
};

/* Purely decorative — used only to draw the accent progress line in on
   scroll. If this never fires for any reason, the line just stays at its
   resting state; no actual content depends on it. */
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

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="process"
      className="w-full bg-ed-paper py-[clamp(4rem,8vw,6.5rem)]"
    >
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1240px] px-[clamp(1.25rem,4vw,2.75rem)]"
      >
        {/* ---------------- HEADER (matches Hero's eyebrow / heading style) ---------------- */}
        <div className="max-w-[640px]">
          <p className="mb-2.5 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
            {"// how i work"}
          </p>
          <h2 className="m-0 bg-ed-gradient-text bg-clip-text font-ed-heading text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-transparent">
            From requirement to running system
          </h2>
          <p className="mt-4 max-w-[520px] text-[1.05rem] leading-[1.7] text-ed-text-secondary">
            A repeatable roadmap I follow on every project, from the first
            requirement to something real running in production.
          </p>
        </div>

        {/* ---------------- DESKTOP: horizontal roadmap ---------------- */}
        <div className="relative mt-16 hidden md:block">
          {/* dashed track — always visible */}
          <div className="pointer-events-none absolute top-[19px] right-[19px] left-[19px] h-px overflow-hidden">
            <div className="h-full bg-[repeating-linear-gradient(90deg,var(--color-ed-border)_0_8px,transparent_8px_16px)]" />
          </div>
          {/* animated accent line, draws in on scroll — purely decorative */}
          <div
            className={clsx(
              "pointer-events-none absolute top-[19px] right-[19px] left-[19px] h-px origin-left bg-gradient-to-r from-ed-accent via-ed-accent2 to-ed-accent3 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              inView ? "scale-x-100" : "scale-x-0",
            )}
          />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const a = ACCENT_STYLES[s.accent];
              return (
                <div key={s.n}>
                  <div
                    className={clsx(
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-ed-mono text-sm font-bold ring-4",
                      a.badge,
                      a.ring,
                    )}
                  >
                    {i + 1}
                  </div>

                  <div
                    className={clsx(
                      "mt-6 h-full rounded-2xl border border-ed-border bg-ed-surface p-5 shadow-[0_2px_6px_rgba(11,19,16,0.05)] transition-all duration-300",
                      "hover:-translate-y-1",
                      a.cardHover,
                    )}
                  >
                    <span
                      className={clsx(
                        "font-ed-mono text-[11px] font-semibold tracking-[0.14em]",
                        a.label,
                      )}
                    >
                      STEP {s.n}
                    </span>
                    <h3 className="mt-2 font-ed-heading text-[1.05rem] font-semibold leading-snug text-ed-text">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-[1.7] text-ed-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- MOBILE: vertical roadmap ---------------- */}
        <div className="relative mt-12 md:hidden">
          <div className="pointer-events-none absolute top-2 bottom-2 left-4 w-px overflow-hidden">
            <div className="h-full w-full bg-[repeating-linear-gradient(180deg,var(--color-ed-border)_0_8px,transparent_8px_16px)]" />
          </div>
          <div
            className={clsx(
              "pointer-events-none absolute top-2 bottom-2 left-4 w-px origin-top bg-gradient-to-b from-ed-accent via-ed-accent2 to-ed-accent3 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              inView ? "scale-y-100" : "scale-y-0",
            )}
          />

          <div className="flex flex-col gap-8">
            {steps.map((s, i) => {
              const a = ACCENT_STYLES[s.accent];
              return (
                <div key={s.n} className="relative pl-12">
                  <div
                    className={clsx(
                      "absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 font-ed-mono text-xs font-bold ring-4",
                      a.badge,
                      a.ring,
                    )}
                  >
                    {i + 1}
                  </div>

                  <div className="rounded-2xl border border-ed-border bg-ed-surface p-4 shadow-[0_2px_6px_rgba(11,19,16,0.05)]">
                    <span
                      className={clsx(
                        "font-ed-mono text-[11px] font-semibold tracking-[0.14em]",
                        a.label,
                      )}
                    >
                      STEP {s.n}
                    </span>
                    <h3 className="mt-1.5 font-ed-heading text-base font-semibold leading-snug text-ed-text">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.7] text-ed-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
