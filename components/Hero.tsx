"use client";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { T } from "@/lib/theme";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const coderData = {
  name: "Jaycee Capulong",
  alias: "Dr-Pierrot",
  roles: ["Web Developer", "Software Engineer", "Fullstack Developer"],
  seniority: "Junior",
  location: "Tarlac City, Philippines",
  timezone: "GMT+8",
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  resume: "/resume.pdf",
  tagline:
    "I build scalable web applications end to end — from REST APIs and database design to polished, accessible, responsive interfaces.",
  stats: [
    { value: "8+", label: "Repositories" },
    { value: "5+", label: "Languages" },
    { value: "16+", label: "Technologies" },
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
      "Astro",
    ],
    backend: ["Laravel", "Node.js", "PHP", "WordPress"],
    database: ["MySQL", "MongoDB"],
    tools: ["Git", "GitHub", "Figma"],
  } as Record<string, string[]>,
  currentlyLearning: ["Vue.js", "Svelte"],
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

const Icon = ({ path, className }: { path: string; className?: string }) => (
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
    className={className}
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
  <div className="flex gap-4 leading-[1.85]">
    <span className="w-[18px] select-none text-right text-[12px] text-ed-text-muted/50">
      {n}
    </span>
    <span className="whitespace-pre text-[13px]">{children}</span>
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
    <section
      id="home"
      className="relative flex min-h-screen w-full items-start overflow-hidden bg-ed-gradient-hero px-6 pt-24 font-ed-body heromd:items-center heromd:pt-28"
    >
      {/* faint grid, masked to a soft ellipse */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 opacity-[0.35] [background-size:64px_64px]",
          "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_30%,transparent_100%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_30%,transparent_100%)]",
          "bg-[linear-gradient(var(--color-ed-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-ed-border)_1px,transparent_1px)]",
        )}
      />
      <div
        className="pointer-events-none absolute animate-ed-drift rounded-full blur-[6px] motion-reduce:animate-none"
        style={{
          top: "-12%",
          right: "-8%",
          width: 460,
          height: 460,
          background:
            "radial-gradient(circle, rgba(14,124,116,0.16) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute animate-ed-drift rounded-full blur-[6px] motion-reduce:animate-none"
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

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 pb-28 heromd:grid-cols-[1.05fr_0.95fr] heromd:gap-16 heromd:pb-24">
        {/* ---------------- LEFT ---------------- */}
        <div className="order-1 flex animate-ed-up flex-col gap-[1.4rem] motion-reduce:animate-none">
          <div className="inline-flex w-fit items-center gap-[9px] rounded-full border border-ed-accent-border bg-ed-accent-soft py-1.5 pr-3.5 pl-3 text-[13.5px] font-semibold tracking-[0.01em] text-ed-accent-text">
            <span className="relative inline-flex h-[7px] w-[7px]">
              <span className="absolute inset-0 animate-ping rounded-full bg-ed-accent motion-reduce:animate-none" />
              <span className="relative inline-block h-[7px] w-[7px] rounded-full bg-ed-accent" />
            </span>
            Available for work
            <span className="h-3 w-px bg-ed-accent-border" />
            <span className="font-medium opacity-85">
              {coderData.timezone} · Remote
            </span>
          </div>

          <div>
            <p className="mb-2.5 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
              {"// hi there, my name is"}
            </p>
            <h1 className="m-0 bg-ed-gradient-text bg-clip-text font-ed-heading text-[clamp(2.4rem,6vw,4.1rem)] font-bold leading-[1.08] tracking-[-0.03em] text-transparent">
              {coderData.name}
            </h1>
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5 font-ed-mono text-[clamp(16px,2.2vw,19px)] text-ed-text-secondary">
              <span className="text-ed-text-muted">{"<"}</span>
              <span className="font-semibold text-ed-text">
                {mounted ? typed : coderData.roles[0]}
              </span>
              <span className="h-[1.05em] w-[9px] translate-y-[2px] animate-ed-blink rounded-[1px] bg-ed-accent motion-reduce:animate-none" />
              <span className="text-ed-text-muted">{"/>"}</span>
            </div>
          </div>

          <p className="m-0 max-w-[520px] text-[17px] leading-[1.75] text-ed-text-secondary">
            {coderData.tagline} Currently focused on{" "}
            <b className="font-semibold text-ed-text">
              React, Next.js &amp; Laravel
            </b>{" "}
            — writing clean, typed, maintainable code and shipping things that
            actually get used.
          </p>

          <div className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-ed-border bg-ed-surface herosm:grid-cols-4">
            {coderData.stats.map((s, i) => (
              <div
                key={s.label}
                className={clsx(
                  "px-3 py-3.5",
                  i < 2 && "border-b border-ed-border",
                  i % 2 === 0 && "border-r border-ed-border",
                  "herosm:border-b-0",
                  i === coderData.stats.length - 1
                    ? "herosm:border-r-0"
                    : "herosm:border-r herosm:border-ed-border",
                )}
              >
                <div className="font-ed-heading text-xl font-bold tracking-[-0.02em] text-ed-text">
                  {s.value}
                </div>
                <div className="mt-[3px] font-ed-body text-[12.5px] tracking-[0.01em] text-ed-text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-[9px] rounded-[10px] border border-transparent bg-ed-gradient-button px-6 py-[13px] text-[15px] font-semibold text-white no-underline shadow-[0_2px_10px_rgba(14,124,116,0.22)] transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(14,124,116,0.32)]"
            >
              View my work
              <Icon
                path={ICONS.arrow}
                className="transition-transform duration-[220ms] group-hover:translate-x-[3px]"
              />
            </a>
            <a
              href={coderData.resume}
              download
              className="inline-flex items-center gap-[9px] rounded-[10px] border border-ed-border bg-ed-surface px-6 py-[13px] text-[15px] font-semibold text-ed-text no-underline transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:border-ed-border-strong hover:bg-ed-paper-alt"
            >
              <Icon path={ICONS.download} /> Résumé
            </a>
            <div className="flex gap-2">
              <a
                className="grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-ed-border bg-ed-surface text-ed-text-secondary no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-ed-accent-border hover:bg-ed-accent-soft hover:text-ed-accent-text"
                href={coderData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Icon path={ICONS.github} />
              </a>
              <a
                className="grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-ed-border bg-ed-surface text-ed-text-secondary no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-ed-accent-border hover:bg-ed-accent-soft hover:text-ed-accent-text"
                href={coderData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Icon path={ICONS.linkedin} />
              </a>
              <a
                className="grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-ed-border bg-ed-surface text-ed-text-secondary no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-ed-accent-border hover:bg-ed-accent-soft hover:text-ed-accent-text"
                href={`mailto:${coderData.email}`}
                aria-label="Email"
              >
                <Icon path={ICONS.mail} />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-[7px] text-sm text-ed-text-muted">
            <Icon path={ICONS.pin} />
            {coderData.location}
          </div>
        </div>

        {/* ---------------- RIGHT ---------------- */}
        <div className="relative order-2 animate-ed-in motion-reduce:animate-none">
          <div className="overflow-hidden rounded-2xl border border-ed-border bg-ed-surface shadow-[0_24px_60px_-28px_rgba(11,19,16,0.28),0_2px_6px_rgba(11,19,16,0.05)]">
            <div className="flex items-center justify-between border-b border-ed-border bg-ed-paper-alt px-3.5 py-[11px]">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full border border-ed-border-strong bg-ed-border"
                  />
                ))}
              </div>
              <span className="font-ed-mono text-xs text-ed-text-muted">
                ~/{coderData.alias}/skills.ts
              </span>
              <span className="font-ed-mono text-[11px] text-ed-text-muted opacity-70">
                TS
              </span>
            </div>

            <div
              className="flex gap-1 overflow-x-auto border-b border-ed-border bg-ed-paper-alt px-2.5 pt-2"
              role="tablist"
              aria-label="Skill categories"
            >
              {tabs.map((t) => {
                const isActive = tab === t;
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(t)}
                    className={clsx(
                      "cursor-pointer appearance-none whitespace-nowrap rounded-t-lg border border-b-0 px-[13px] py-[7px] font-ed-mono text-[13px] transition-all duration-[180ms]",
                      isActive
                        ? "-mb-px border-ed-border bg-ed-surface pb-2 text-ed-text"
                        : "border-transparent bg-transparent text-ed-text-muted hover:text-ed-text",
                    )}
                  >
                    {t}.ts
                  </button>
                );
              })}
            </div>

            <div className="min-h-[236px] px-[18px] pt-[18px] pb-3.5 font-ed-mono">
              <CodeLine n={1}>
                <span style={{ color: kw }}>export const </span>
                <span style={{ color: fn }}>{tab}</span>
                <span className="text-ed-text-secondary">
                  {": string[] = ["}
                </span>
              </CodeLine>

              <div className="py-2 pl-[34px]">
                {active.map((s) => (
                  <span
                    key={s}
                    className="mr-1 mb-1.5 inline-block cursor-default rounded-md border border-ed-border bg-ed-paper-alt px-[9px] py-[3px] font-ed-mono text-[13px] text-ed-text transition-all duration-[180ms] hover:-translate-y-px hover:border-ed-accent-border hover:bg-ed-accent-soft hover:text-ed-accent-text"
                  >
                    <span style={{ color: str }}>&quot;{s}&quot;</span>
                    <span className="text-ed-text-muted">,</span>
                  </span>
                ))}
              </div>

              <CodeLine n={active.length + 2}>
                <span className="text-ed-text-secondary">{"];"}</span>
              </CodeLine>
              <CodeLine n={active.length + 3}> </CodeLine>
              <CodeLine n={active.length + 4}>
                <span className="text-ed-text-muted">
                  {`// ${active.length} in ${tab} · ${totalSkills} total`}
                </span>
              </CodeLine>
            </div>

            <div className="flex items-center justify-between gap-2.5 border-t border-ed-border bg-ed-paper-alt px-4 py-2.5 font-ed-mono text-xs text-ed-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-ed-accent" />
                main · {coderData.seniority} dev
              </span>
              <span>{totalSkills} skills · UTF-8</span>
            </div>
          </div>

          <div
            className={clsx(
              "absolute z-[2] flex items-center gap-2.5 rounded-xl border border-ed-border bg-ed-surface px-3.5 py-2.5",
              "animate-ed-float shadow-[0_12px_30px_-12px_rgba(11,19,16,0.3)] motion-reduce:animate-none",
              "right-2 bottom-[-18px] heromd:right-[-14px] heromd:bottom-[-22px]",
            )}
          >
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-ed-accent2-border bg-ed-accent2-soft font-ed-mono text-[13px] font-bold text-ed-accent2-text">
              {"{}"}
            </span>
            <span>
              <span className="block font-ed-mono text-[10px] tracking-[0.04em] text-ed-text-muted">
                CURRENTLY LEARNING
              </span>
              <span className="block text-[13px] font-semibold text-ed-text">
                {coderData.currentlyLearning.join(" · ")}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- TECH MARQUEE ---------------- */}
      <div
        className="group/marquee absolute inset-x-0 bottom-0 z-[1] overflow-hidden border-t border-ed-border bg-ed-surface py-[11px] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-hidden="true"
      >
        <div className="flex w-max animate-ed-marquee motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {Object.values(coderData.skills)
                .flat()
                .map((s, i) => (
                  <span
                    key={`${dup}-${s}-${i}`}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap px-[22px] font-ed-mono text-[13px] text-ed-text-muted"
                  >
                    <span className="text-ed-accent">◆</span>
                    {s}
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
