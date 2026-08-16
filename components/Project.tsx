"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ALL_TYPES, projects } from "@/lib/projects";

type TagVariant = "neutral" | "accent" | "accent2" | "accent3";

const TAG_VARIANTS: Record<TagVariant, string> = {
  neutral: "border-ed-border bg-ed-paper-alt text-ed-text-secondary",
  accent: "border-ed-accent-border bg-ed-accent-soft text-ed-accent-text",
  accent2: "border-ed-accent2-border bg-ed-accent2-soft text-ed-accent2-text",
  accent3: "border-ed-accent3-border bg-ed-accent3-soft text-ed-accent3-text",
};

const Tag = ({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: TagVariant;
}) => (
  <span
    className={clsx(
      "inline-block rounded-[3px] border px-2.5 py-[3px] font-ed-mono text-[0.72rem] tracking-[0.02em]",
      TAG_VARIANTS[variant],
    )}
  >
    {children}
  </span>
);

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const featured = projects.find((project) => project.highlight);
  const visibleProjects = projects.filter(
    (project) =>
      project.id !== featured?.id &&
      (filter === "All" || project.type === filter),
  );
  const showFeatured =
    featured && (filter === "All" || featured.type === filter);

  return (
    <section
      id="works"
      className="w-full bg-ed-paper-alt py-[clamp(4.75rem,9vw,8rem)]"
    >
      <div className="mx-auto max-w-[1240px] px-[clamp(1.25rem,4vw,2.75rem)]">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2.5 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
              {"// this is what i do"}
            </p>
            <h2 className="m-0 font-ed-heading text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ed-text">
              Built with intent.
              <br />
              <em className="text-ed-accent-text not-italic">
                Made to be used.
              </em>
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-[7px]"
            aria-label="Filter projects"
          >
            {ALL_TYPES.map((type) => {
              const active = filter === type;
              return (
                <button
                  key={type}
                  aria-pressed={active}
                  onClick={() => setFilter(type)}
                  className={clsx(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 font-ed-mono text-[12px] tracking-[0.02em] transition-all duration-200",
                    active
                      ? "border-ed-text bg-ed-text text-ed-paper"
                      : "border-ed-border text-ed-text-muted hover:border-ed-border-strong hover:text-ed-text",
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- FEATURED PROJECT ---------------- */}
        {showFeatured && (
          <Link
            href={`/projects/${featured.slug}`}
            className="group relative mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-ed-border bg-ed-surface no-underline shadow-[0_24px_60px_-28px_rgba(11,19,16,0.28),0_2px_6px_rgba(11,19,16,0.05)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-24px_rgba(11,19,16,0.32)] md:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]"
          >
            <div className="relative flex min-h-[180px] items-end overflow-hidden border-b border-ed-border bg-ed-paper-alt p-6 md:min-h-0 md:border-r md:border-b-0 md:p-11">
              <span className="pointer-events-none absolute top-8 -right-1 font-ed-heading text-[clamp(6rem,20vw,14rem)] leading-[0.8] font-semibold text-ed-border transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                {String(featured.id).padStart(2, "0")}
              </span>
              <div className="relative z-10">
                <Tag variant="accent2">{featured.status}</Tag>
                <p className="mt-4 max-w-[235px] font-ed-body text-[0.9rem] leading-[1.6] text-ed-text-secondary">
                  {featured.type} · {featured.year}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-8 p-6 md:p-12">
              <div>
                <span className="font-ed-mono text-[13px] tracking-[0.12em] text-ed-accent-text uppercase">
                  Featured case study
                </span>
                <h3 className="mt-3 mb-4 max-w-[650px] font-ed-heading text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-ed-text">
                  {featured.name}
                </h3>
                <p className="m-0 max-w-[560px] font-ed-body text-base leading-[1.7] text-ed-text-secondary">
                  {featured.dek}
                </p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-[7px]">
                  {featured.stack.slice(0, 4).map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
                <span
                  aria-hidden
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ed-border font-ed-heading text-xl text-ed-text transition-all duration-250 ease-out group-hover:-translate-y-[5px] group-hover:translate-x-[5px] group-hover:border-ed-accent group-hover:bg-ed-accent group-hover:text-white"
                >
                  ↗
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ---------------- PROJECT LIST ---------------- */}
        <div
          className={clsx(
            "border-t border-ed-border",
            showFeatured ? "mt-5" : "mt-12",
          )}
        >
          {visibleProjects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="group grid grid-cols-[38px_1fr] items-center gap-5 border-b border-ed-border px-0 py-6 text-inherit no-underline transition-[padding,background-color] duration-200 hover:bg-ed-accent-soft hover:px-3 md:grid-cols-[70px_1fr_auto]"
            >
              <span className="font-ed-mono text-[0.74rem] text-ed-text-muted">
                {String(project.id).padStart(2, "0")}
              </span>
              <div>
                <div className="font-ed-heading text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.1] font-semibold text-ed-text transition-colors duration-200 group-hover:text-ed-accent-text">
                  {project.name}
                </div>
                <div className="mt-2 flex flex-wrap gap-[10px] font-ed-mono text-[0.7rem] tracking-[0.04em] text-ed-text-muted">
                  <span>{project.type}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <span>·</span>
                  <span
                    className={clsx(
                      project.status === "Complete"
                        ? "text-ed-accent-text"
                        : "text-ed-accent2-text",
                    )}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <span
                aria-hidden
                className="hidden font-ed-heading text-[1.3rem] text-ed-accent-text md:block"
              >
                ↗
              </span>
            </Link>
          ))}
          {!visibleProjects.length && (
            <p className="m-0 py-8 font-ed-body text-ed-text-muted">
              No projects in this category.
            </p>
          )}
        </div>

        <p className="mt-9 text-center">
          <a
            href="https://github.com/Dr-Pierrot"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-ed-border-strong pb-[3px] font-ed-mono text-[0.78rem] font-medium text-ed-text-secondary no-underline transition-colors duration-200 hover:border-ed-accent hover:text-ed-accent-text"
          >
            Explore the full GitHub archive ↗
          </a>
        </p>
      </div>
    </section>
  );
}
