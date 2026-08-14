import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { T } from "@/lib/theme";
import { Tag } from "@/components/editorial";
import { getProject, projects } from "@/lib/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactMe from "@/components/ContactMe";
import CaseStudyCover from "@/components/CaseStudyCover";

export async function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name} — Dr-Pierrot`, description: project.desc } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return <div style={{ background: T.color.paper }}>
    <style>{`
      .case-shell { max-width: 1180px; margin: 0 auto; padding: 0 clamp(1.25rem,4vw,2.75rem); }
      .case-hero { position: relative; overflow: hidden; background: ${T.color.ink}; color: ${T.color.paper}; padding: clamp(7rem,14vw,10.5rem) 0 clamp(3.5rem,7vw,5.5rem); }
      .case-hero-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(220px,.42fr); gap: 3rem; align-items: end; }
      .case-ghost-number { position: absolute; right: clamp(1rem,7vw,6rem); bottom: -2.4rem; font: 500 clamp(11rem,29vw,25rem)/.8 ${T.font.display}; color: rgba(245,246,242,.055); user-select: none; }
      .case-back { color: ${T.color.darkTextSecondary}; font: 500 .76rem ${T.font.mono}; letter-spacing: .05em; text-decoration: none; }
      .case-back:hover { color: ${T.color.accentBright}; }
      .case-title { max-width: 840px; margin: 1.2rem 0 0; font: 500 clamp(2.8rem,7vw,6.2rem)/.95 ${T.font.display}; letter-spacing: -.055em; }
      .case-facts { display: grid; gap: 1.1rem; padding: 1.25rem 0 0; border-top: 1px solid ${T.color.darkBorder}; }
      .case-fact-label { font: 500 .67rem ${T.font.mono}; letter-spacing: .1em; text-transform: uppercase; color: ${T.color.darkTextSecondary}; }
      .case-fact-value { margin-top: .28rem; font: 500 .9rem ${T.font.heading}; color: ${T.color.darkText}; }
      .case-cover-wrap { margin-top: clamp(-1rem,-3vw,-2.5rem); position: relative; z-index: 1; }
      .case-content { max-width: 780px; margin: 0 auto; padding: clamp(3.5rem,8vw,6.5rem) clamp(1.25rem,4vw,2.75rem) 0; }
      .case-section { padding: clamp(2.5rem,6vw,4.5rem) 0; border-top: 1px solid ${T.color.border}; }
      .case-section:first-child { border-top: 0; padding-top: 0; }
      .case-eyebrow { font: 500 .7rem ${T.font.mono}; letter-spacing: .11em; text-transform: uppercase; color: ${T.color.accent}; }
      .case-heading { max-width: 650px; margin: .7rem 0 1.1rem; font: 500 clamp(1.8rem,3.5vw,2.75rem)/1.05 ${T.font.display}; letter-spacing: -.03em; color: ${T.color.ink}; }
      .case-body { margin: 0; font: 400 1.04rem/1.8 ${T.font.body}; color: ${T.color.textSecondary}; }
      .case-step { display: grid; grid-template-columns: 48px minmax(0,1fr); gap: 1rem; padding: 1.25rem 0; border-top: 1px solid ${T.color.border}; }
      .case-step:first-child { border-top-color: ${T.color.borderStrong}; }
      .case-details { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem,7vw,5rem); }
      .case-outcome { position: relative; overflow: hidden; background: ${T.color.accentSoft}; padding: clamp(1.75rem,5vw,3.25rem); border-left: 3px solid ${T.color.accent}; }
      .case-nav { max-width: 1180px; margin: 0 auto; display:grid; grid-template-columns: 1fr 1fr; }
      .case-nav-link { padding: 2rem clamp(1.25rem,4vw,2.75rem); color: inherit; text-decoration: none; transition: background .2s ease; }
      .case-nav-link:hover { background: ${T.color.accentSoft}; }
      @media (max-width: 700px) { .case-hero-grid, .case-details, .case-nav { grid-template-columns: 1fr; } .case-hero-grid { gap: 2rem; } .case-nav-link:first-child { border-bottom: 1px solid ${T.color.border}; border-right: 0 !important; } }
    `}</style>
    <Header />
    <main>
      <section className="case-hero">
        <span className="case-ghost-number">{String(project.id).padStart(2, "0")}</span>
        <div className="case-shell case-hero-grid" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <Link className="case-back" href="/#work">← Back to selected work</Link>
            <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", alignItems: "center", marginTop: "2.5rem" }}><span style={{ font: "500 .72rem " + T.font.mono, color: T.color.accentBright, letterSpacing: ".1em", textTransform: "uppercase" }}>{project.type} · {project.year}</span><Tag variant={project.status === "Complete" ? "accent" : "accent2"}>{project.status}</Tag></div>
            <h1 className="case-title">{project.name}</h1>
            <p style={{ maxWidth: 670, margin: "1.3rem 0 0", color: T.color.darkTextSecondary, font: "400 clamp(1rem,2vw,1.18rem)/1.7 " + T.font.body }}>{project.dek}</p>
          </div>
          <aside className="case-facts" aria-label="Project facts">
            {[{ label: "Role", value: project.role }, { label: "Scope", value: project.type }, { label: "Year", value: String(project.year) }].map((fact) => <div key={fact.label}><div className="case-fact-label">{fact.label}</div><div className="case-fact-value">{fact.value}</div></div>)}
          </aside>
        </div>
      </section>
      <div className="case-shell case-cover-wrap"><CaseStudyCover src={project.cover} alt={project.name} index={project.id} /></div>
      <article className="case-content">
        <section className="case-section"><div className="case-eyebrow">01 — The brief</div><h2 className="case-heading">A problem worth solving.</h2><p className="case-body">{project.challenge}</p></section>
        <section className="case-section"><div className="case-eyebrow">02 — The approach</div><h2 className="case-heading">Build from the system outward.</h2>{project.approach.map((step, stepIndex) => <div className="case-step" key={step}><span style={{ font: "500 .76rem " + T.font.mono, color: T.color.accent }}>{String(stepIndex + 1).padStart(2, "0")}</span><p className="case-body">{step}</p></div>)}</section>
        <section className="case-section"><div className="case-details"><div><div className="case-eyebrow">What it includes</div><ul style={{ listStyle: "none", padding: 0, margin: "1.25rem 0 0" }}>{project.features.map((feature) => <li key={feature} style={{ padding: ".72rem 0", borderTop: `1px solid ${T.color.border}`, color: T.color.text, font: "400 .93rem/1.45 " + T.font.body }}><span style={{ color: T.color.accent, marginRight: 9 }}>—</span>{feature}</li>)}</ul></div><div><div className="case-eyebrow">Technology</div><div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: "1.25rem" }}>{project.stack.map((item) => <Tag key={item}>{item}</Tag>)}</div></div></div></section>
        <section className="case-section"><div className="case-outcome"><div className="case-eyebrow">03 — Where it landed</div><p style={{ margin: ".8rem 0 0", color: T.color.ink, font: "italic 500 clamp(1.35rem,3vw,2rem)/1.45 " + T.font.display }}>{project.outcome}</p></div><a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", marginTop: "2rem", padding: "13px 20px", background: T.color.ink, color: T.color.paper, textDecoration: "none", font: "600 .84rem " + T.font.heading }}>View repository on GitHub ↗</a></section>
      </article>
      <nav style={{ borderTop: `1px solid ${T.color.border}` }} aria-label="Project navigation"><div className="case-nav"><Link className="case-nav-link" href={`/projects/${previous.slug}`} style={{ borderRight: `1px solid ${T.color.border}` }}><div className="case-eyebrow">← Previous project</div><div style={{ marginTop: 7, color: T.color.ink, font: "500 1.35rem " + T.font.display }}>{previous.name}</div></Link><Link className="case-nav-link" href={`/projects/${next.slug}`} style={{ textAlign: "right" }}><div className="case-eyebrow">Next project →</div><div style={{ marginTop: 7, color: T.color.ink, font: "500 1.35rem " + T.font.display }}>{next.name}</div></Link></div></nav>
    </main>
    <ContactMe /><Footer />
  </div>;
}
