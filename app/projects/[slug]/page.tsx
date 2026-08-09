import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { T } from "@/lib/theme";
import { Tag, HRule } from "@/components/editorial";
import { projects, getProject } from "@/lib/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactMe from "@/components/ContactMe";
import CaseStudyCover from "@/components/CaseStudyCover";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Dr-Pierrot`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div style={{ background: T.color.paper }}>
      <style>{`
        .cs-split { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        .cs-prevnext { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) {
          .cs-split { grid-template-columns: 1fr; }
          .cs-prevnext { grid-template-columns: 1fr; }
        }
      `}</style>
      <Header />

      <article style={{ paddingTop: "clamp(6.5rem,14vw,9rem)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.75rem)" }}>
          <Link
            href="/#work"
            style={{
              fontFamily: T.font.mono,
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              color: T.color.textMuted,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ← Back to work
          </Link>

          <div style={{ marginTop: "1.75rem", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.font.mono, fontSize: "0.75rem", color: T.color.accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {project.type} · {project.year}
            </span>
            <Tag variant={project.status === "Complete" ? "accent" : "accent2"}>{project.status}</Tag>
          </div>

          <h1
            style={{
              fontFamily: T.font.display,
              fontWeight: 500,
              fontSize: "clamp(2.3rem,5.5vw,4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: T.color.ink,
              margin: "0.9rem 0 0",
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontFamily: T.font.body,
              fontSize: "1.15rem",
              lineHeight: 1.7,
              color: T.color.textSecondary,
              maxWidth: 680,
              margin: "1.25rem 0 0",
            }}
          >
            {project.dek}
          </p>

          <div style={{ display: "flex", gap: "clamp(1.5rem,4vw,3rem)", flexWrap: "wrap", margin: "2.5rem 0" }}>
            {[
              { label: "Role", value: project.role },
              { label: "Year", value: String(project.year) },
              { label: "Status", value: project.status },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: T.font.mono, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.textMuted }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: T.font.heading, fontSize: "0.95rem", color: T.color.text, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.75rem)" }}>
          <CaseStudyCover src={project.cover} alt={project.name} index={project.id} />
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(3rem,7vw,5rem) clamp(1.25rem,4vw,2.75rem) 0" }}>
          {/* Challenge */}
          <section>
            <h2 style={{ fontFamily: T.font.display, fontSize: "1.6rem", color: T.color.ink, marginBottom: "0.9rem" }}>The problem</h2>
            <p style={{ fontFamily: T.font.body, fontSize: "1.02rem", lineHeight: 1.8, color: T.color.textSecondary }}>{project.challenge}</p>
          </section>

          <div style={{ margin: "2.75rem 0" }}><HRule /></div>

          {/* Approach */}
          <section>
            <h2 style={{ fontFamily: T.font.display, fontSize: "1.6rem", color: T.color.ink, marginBottom: "1.25rem" }}>The approach</h2>
            <div>
              {project.approach.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "1.1rem", padding: "1.1rem 0", borderTop: i === 0 ? "none" : `1px solid ${T.color.border}` }}>
                  <span style={{ fontFamily: T.font.mono, fontSize: "0.78rem", color: T.color.accent, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontFamily: T.font.body, fontSize: "0.98rem", lineHeight: 1.75, color: T.color.textSecondary, margin: 0 }}>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ margin: "2.75rem 0" }}><HRule /></div>

          {/* Features + stack side by side */}
          <section className="cs-split">
            <div>
              <h3 style={{ fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.textMuted, marginBottom: "1rem" }}>
                Key features
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {project.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 8, fontFamily: T.font.body, fontSize: "0.92rem", color: T.color.text, marginBottom: "0.6rem", lineHeight: 1.5 }}>
                    <span style={{ color: T.color.accent }}>—</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.textMuted, marginBottom: "1rem" }}>
                Stack
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
          </section>

          <div style={{ margin: "2.75rem 0" }}><HRule /></div>

          {/* Outcome */}
          <section style={{ background: T.color.ink, color: T.color.darkText, padding: "clamp(1.75rem,4vw,2.5rem)" }}>
            <h3 style={{ fontFamily: T.font.mono, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.color.accentBright, marginBottom: "1rem" }}>
              Where it landed
            </h3>
            <p style={{ fontFamily: T.font.display, fontStyle: "italic", fontSize: "1.25rem", lineHeight: 1.6, margin: 0 }}>
              {project.outcome}
            </p>
          </section>

          <div style={{ margin: "2.75rem 0 4rem" }}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: T.font.heading,
                fontWeight: 600,
                fontSize: "0.95rem",
                color: T.color.paper,
                background: T.color.ink,
                padding: "14px 30px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              View repository on GitHub ↗
            </a>
          </div>
        </div>

        {/* Prev / Next */}
        <div style={{ borderTop: `1px solid ${T.color.border}` }}>
          <div className="cs-prevnext">
            <Link
              href={`/projects/${prev.slug}`}
              style={{ padding: "2.25rem clamp(1.25rem,4vw,2.75rem)", textDecoration: "none", borderRight: `1px solid ${T.color.border}` }}
            >
              <div style={{ fontFamily: T.font.mono, fontSize: "0.7rem", color: T.color.textMuted, letterSpacing: "0.06em" }}>← PREVIOUS</div>
              <div style={{ fontFamily: T.font.display, fontSize: "1.2rem", color: T.color.ink, marginTop: 6 }}>{prev.name}</div>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              style={{ padding: "2.25rem clamp(1.25rem,4vw,2.75rem)", textDecoration: "none", textAlign: "right" }}
            >
              <div style={{ fontFamily: T.font.mono, fontSize: "0.7rem", color: T.color.textMuted, letterSpacing: "0.06em" }}>NEXT →</div>
              <div style={{ fontFamily: T.font.display, fontSize: "1.2rem", color: T.color.ink, marginTop: 6 }}>{next.name}</div>
            </Link>
          </div>
        </div>
      </article>

      <ContactMe />
      <Footer />
    </div>
  );
}
