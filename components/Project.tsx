"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { T } from "@/lib/theme";
import { Tag } from "@/components/editorial";
import { ALL_TYPES, projects } from "@/lib/projects";

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
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
    <section id="works" ref={sectionRef} className="projects-section">
      <style>{`
        @keyframes project-reveal { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .project-reveal { animation: project-reveal .8s cubic-bezier(.16,1,.3,1) both; }
        .projects-section { background: ${T.color.paper}; padding: clamp(4.75rem, 9vw, 8rem) 0; }
        .projects-shell { max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 2.75rem); }
        .project-kicker { font: 500 ${T.type.kicker} ${T.font.mono}; letter-spacing: .12em; text-transform: uppercase; color: ${T.color.accent}; }
        .project-filter { font: 500 .72rem ${T.font.mono}; letter-spacing: .04em; color: ${T.color.textMuted}; background: transparent; border: 1px solid ${T.color.border}; padding: .55rem .8rem; cursor: pointer; transition: .2s ease; }
        .project-filter:hover, .project-filter[aria-pressed="true"] { color: ${T.color.paper}; background: ${T.color.ink}; border-color: ${T.color.ink}; }
        .project-feature { position: relative; display: grid; grid-template-columns: minmax(260px, .9fr) minmax(0, 1.1fr); min-height: 410px; margin-top: 3rem; overflow: hidden; color: ${T.color.paper}; text-decoration: none; background: ${T.color.ink}; }
        .project-feature::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(125deg, transparent 48%, rgba(20,184,166,.13) 100%); }
        .project-feature:hover .project-feature-arrow { transform: translate(5px,-5px); background: ${T.color.accent}; }
        .project-feature:hover .project-number { transform: scale(1.04); color: rgba(245,246,242,.16); }
        .project-feature-visual { position: relative; display: flex; align-items: flex-end; padding: clamp(1.5rem, 4vw, 2.75rem); overflow: hidden; background: linear-gradient(145deg, ${T.color.inkSoft}, ${T.color.dark}); border-right: 1px solid ${T.color.darkBorder}; }
        .project-number { position: absolute; top: -1.1rem; right: -.3rem; font: 500 clamp(10rem,25vw,20rem)/.8 ${T.font.display}; color: rgba(245,246,242,.09); transition: .45s cubic-bezier(.16,1,.3,1); }
        .project-feature-copy { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; padding: clamp(1.75rem,5vw,4rem); }
        .project-feature-title { max-width: 650px; margin: .9rem 0 1rem; font: 500 clamp(2rem,4.2vw,4rem)/1 ${T.font.display}; letter-spacing: -.035em; }
        .project-feature-arrow { display: grid; width: 48px; height: 48px; place-items: center; margin-top: 2rem; border: 1px solid ${T.color.darkBorder}; border-radius: 50%; font: 400 1.25rem ${T.font.heading}; transition: .25s ease; }
        .project-list { margin-top: 1.25rem; border-top: 1px solid ${T.color.border}; }
        .project-row { display: grid; grid-template-columns: 70px minmax(0,1fr) auto; gap: 1.25rem; align-items: center; padding: 1.6rem 0; border-bottom: 1px solid ${T.color.border}; color: inherit; text-decoration: none; transition: padding .25s ease, background .25s ease; }
        .project-row:hover { padding-right: .75rem; padding-left: .75rem; background: ${T.color.accentSoft}; }
        .project-row:hover .project-row-title { color: ${T.color.accent}; }
        .project-row-index { font: 500 .74rem ${T.font.mono}; color: ${T.color.textMuted}; }
        .project-row-title { font: 500 clamp(1.35rem,2.6vw,2rem)/1.1 ${T.font.display}; color: ${T.color.ink}; transition: color .2s ease; }
        .project-row-arrow { color: ${T.color.accent}; font: 400 1.3rem ${T.font.heading}; }
        @media (max-width: 720px) { .project-feature { grid-template-columns: 1fr; min-height: 0; } .project-feature-visual { min-height: 180px; border-right: 0; border-bottom: 1px solid ${T.color.darkBorder}; } .project-row { grid-template-columns: 38px minmax(0,1fr); } .project-row-arrow { display: none; } }
      `}</style>

      <div className="projects-shell">
        <div
          className={inView ? "project-reveal" : ""}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="project-kicker">04 — Selected work</div>
            <h2
              style={{
                fontFamily: T.font.display,
                fontWeight: 500,
                fontSize: T.type.h2,
                letterSpacing: "-.035em",
                lineHeight: 1,
                color: T.color.ink,
                margin: ".7rem 0 0",
              }}
            >
              Built with intent.
              <br />
              <em style={{ color: T.color.accent }}>Made to be used.</em>
            </h2>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}
            aria-label="Filter projects"
          >
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                className="project-filter"
                aria-pressed={filter === type}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {showFeatured && (
          <Link
            href={`/projects/${featured.slug}`}
            className={`project-feature${inView ? " project-reveal" : ""}`}
          >
            <div className="project-feature-visual">
              <span className="project-number">
                {String(featured.id).padStart(2, "0")}
              </span>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Tag variant="accent2">{featured.status}</Tag>
                <p
                  style={{
                    maxWidth: 235,
                    margin: "1rem 0 0",
                    fontFamily: T.font.body,
                    fontSize: ".9rem",
                    lineHeight: 1.6,
                    color: T.color.darkTextSecondary,
                  }}
                >
                  {featured.type} · {featured.year}
                </p>
              </div>
            </div>
            <div className="project-feature-copy">
              <div>
                <span
                  className="project-kicker"
                  style={{ color: T.color.accentBright }}
                >
                  Featured case study
                </span>
                <h3 className="project-feature-title">{featured.name}</h3>
                <p
                  style={{
                    maxWidth: 560,
                    margin: 0,
                    fontFamily: T.font.body,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: T.color.darkTextSecondary,
                  }}
                >
                  {featured.dek}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "1rem",
                }}
              >
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}
                >
                  {featured.stack.slice(0, 4).map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
                <span className="project-feature-arrow" aria-hidden>
                  ↗
                </span>
              </div>
            </div>
          </Link>
        )}

        <div
          className={inView ? "project-reveal" : ""}
          style={{ marginTop: showFeatured ? "1.25rem" : "3rem" }}
        >
          <div className="project-list">
            {visibleProjects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                className="project-row"
                key={project.id}
              >
                <span className="project-row-index">
                  {String(project.id).padStart(2, "0")}
                </span>
                <div>
                  <div className="project-row-title">{project.name}</div>
                  <div
                    style={{
                      display: "flex",
                      gap: ".65rem",
                      flexWrap: "wrap",
                      marginTop: ".55rem",
                      fontFamily: T.font.mono,
                      fontSize: ".7rem",
                      letterSpacing: ".04em",
                      color: T.color.textMuted,
                    }}
                  >
                    <span>{project.type}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                    <span>·</span>
                    <span
                      style={{
                        color:
                          project.status === "Complete"
                            ? T.color.accentText
                            : T.color.accent2Text,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <span className="project-row-arrow" aria-hidden>
                  ↗
                </span>
              </Link>
            ))}
            {!visibleProjects.length && (
              <p
                style={{
                  padding: "2rem 0",
                  margin: 0,
                  color: T.color.textMuted,
                  fontFamily: T.font.body,
                }}
              >
                No projects in this category.
              </p>
            )}
          </div>
        </div>
        <p style={{ margin: "2.25rem 0 0", textAlign: "center" }}>
          <a
            href="https://github.com/Dr-Pierrot"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              font: "500 .78rem " + T.font.mono,
              color: T.color.textSecondary,
              textDecoration: "none",
              borderBottom: `1px solid ${T.color.borderStrong}`,
              paddingBottom: 3,
            }}
          >
            Explore the full GitHub archive ↗
          </a>
        </p>
      </div>
    </section>
  );
}
