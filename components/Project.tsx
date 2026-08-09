"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { T } from "@/lib/theme";
import { SectionHead, Tag } from "@/components/editorial";
import { projects, ALL_TYPES } from "@/lib/projects";

const STATUS_DOT: Record<string, string> = {
  "In Progress": T.color.accent2,
  "Complete": T.color.accent,
};

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.05 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [filter, setFilter] = useState("All");

  const featured = projects.find((p) => p.highlight);
  const rest = projects.filter((p) => p.id !== featured?.id && (filter === "All" || p.type === filter));

  return (
    <>
      <style>{`
        @keyframes proj-in { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .proj-in { animation: proj-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }

        .filter-chip {
          font-family: ${T.font.mono}; font-size: 0.74rem; letter-spacing: 0.04em;
          padding: 6px 14px; border: 1px solid ${T.color.border}; background: transparent;
          color: ${T.color.textMuted}; cursor: pointer; transition: all 0.2s ease;
        }
        .filter-chip.active { background: ${T.color.ink}; color: ${T.color.paper}; border-color: ${T.color.ink}; }
        .filter-chip:hover:not(.active) { border-color: ${T.color.borderStrong}; color: ${T.color.text}; }

        .toc-row { display: block; text-decoration: none; color: inherit; border-top: 1px solid ${T.color.border}; padding: 1.9rem 0; transition: padding-left 0.25s ease; }
        .toc-row:last-child { border-bottom: 1px solid ${T.color.border}; }
        .toc-row:hover { padding-left: 0.75rem; }
        .toc-row-inner { display: grid; grid-template-columns: 56px minmax(0,1fr) auto; gap: 1.25rem; align-items: center; }
        .toc-title { font-family: ${T.font.display}; font-size: clamp(1.2rem,2.4vw,1.7rem); color: ${T.color.ink}; transition: color 0.2s ease; }
        .toc-row:hover .toc-title { color: ${T.color.accent}; }
        .toc-arrow { font-family: ${T.font.heading}; font-size: 1.3rem; color: ${T.color.textMuted}; transition: transform 0.25s ease, color 0.2s ease; }
        .toc-row:hover .toc-arrow { transform: translateX(4px); color: ${T.color.accent}; }

        .featured-cover {
          aspect-ratio: 16/10; background: ${T.color.ink};
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .featured-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(1.5rem,4vw,3rem); margin-top: 3rem; text-decoration: none; color: inherit; }
        @media (max-width: 780px) {
          .toc-row-inner { grid-template-columns: 32px minmax(0,1fr); }
          .toc-arrow { display: none; }
          .featured-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="work" ref={sectionRef} style={{ width: "100%", background: T.color.paper, padding: "clamp(4rem,8vw,6.5rem) 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.75rem)" }}>
          <div className={inView ? "proj-in" : ""} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <SectionHead
              kicker="04 — Selected work"
              title={<>Five projects, <em style={{ fontStyle: "italic", color: T.color.accent }}>zero</em> filler</>}
              lede="Real systems, not clones — a production API, an in-progress HRMS, and the fundamentals work behind them."
            />
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {ALL_TYPES.map((t) => (
                <button key={t} className={`filter-chip${filter === t ? " active" : ""}`} onClick={() => setFilter(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Featured project spread */}
          {featured && (filter === "All" || featured.type === filter) && (
            <Link
              href={`/projects/${featured.slug}`}
              className={`featured-grid${inView ? " proj-in" : ""}`}
            >
              <div className="featured-cover">
                <span style={{ fontFamily: T.font.display, fontSize: "5rem", color: "rgba(245,246,242,0.14)" }}>
                  {String(featured.id).padStart(2, "0")}
                </span>
                <span style={{ position: "absolute", top: 16, left: 16 }}>
                  <Tag variant="accent2">{featured.status}</Tag>
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.accent }}>
                  Featured — {featured.type} · {featured.year}
                </span>
                <h3 style={{ fontFamily: T.font.display, fontSize: "clamp(1.6rem,3vw,2.3rem)", color: T.color.ink, margin: "0.6rem 0 0.9rem", lineHeight: 1.1 }}>
                  {featured.name}
                </h3>
                <p style={{ fontFamily: T.font.body, fontSize: "1rem", lineHeight: 1.7, color: T.color.textSecondary, margin: 0, maxWidth: 520 }}>
                  {featured.dek}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.4rem" }}>
                  {featured.stack.slice(0, 5).map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
                <span style={{ fontFamily: T.font.heading, fontSize: "0.92rem", fontWeight: 600, color: T.color.ink, marginTop: "1.6rem", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Read the case study <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          )}

          {/* Contents-page list */}
          <div className={inView ? "proj-in" : ""} style={{ marginTop: "3rem" }}>
            {rest.map((p) => (
              <Link href={`/projects/${p.slug}`} className="toc-row" key={p.id}>
                <div className="toc-row-inner">
                  <span style={{ fontFamily: T.font.mono, fontSize: "0.85rem", color: T.color.textMuted }}>
                    {String(p.id).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="toc-title">{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.font.mono, fontSize: "0.72rem", color: T.color.textMuted }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[p.status] }} />
                        {p.status}
                      </span>
                      <span style={{ color: T.color.borderStrong }}>·</span>
                      <span style={{ fontFamily: T.font.mono, fontSize: "0.72rem", color: T.color.textMuted }}>{p.type}</span>
                      <span style={{ color: T.color.borderStrong }}>·</span>
                      <span style={{ fontFamily: T.font.mono, fontSize: "0.72rem", color: T.color.textMuted }}>{p.year}</span>
                    </div>
                  </div>
                  <span className="toc-arrow" aria-hidden>→</span>
                </div>
              </Link>
            ))}
            {rest.length === 0 && (
              <div style={{ padding: "3rem 0", textAlign: "center", color: T.color.textMuted, fontFamily: T.font.body }}>
                No projects in this category.
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="https://github.com/Dr-Pierrot"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: T.font.mono, fontSize: "0.82rem", letterSpacing: "0.04em", color: T.color.textSecondary, textDecoration: "none", borderBottom: `1px solid ${T.color.borderStrong}`, paddingBottom: 2 }}
            >
              See everything on GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
