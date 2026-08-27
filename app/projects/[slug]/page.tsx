import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import clsx from "clsx";
import { getProject, projects } from "@/lib/projects";
import { generatePageMetadata, getProjectSchema, getBreadcrumbSchema } from "@/lib/seo";
import Footer from "@/components/Footer";
import ContactMe from "@/components/ContactMe";
import CaseStudyCover from "@/components/CaseStudyCover";
import ProjectGallery from "@/components/ProjectGallery";

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

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  
  if (!project) {
    return {};
  }

  return generatePageMetadata({
    title: project.name,
    description: project.desc,
    path: `/projects/${project.slug}`,
    image: project.cover,
    type: "article",
    keywords: [
      ...project.stack,
      project.type,
      project.role,
      "portfolio",
      "case study",
    ],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  // Type guard: projects array is non-empty (checked by notFound above)
  if (!previous || !next) notFound();

  const facts = [
    { label: "Role", value: project.role },
    { label: "Scope", value: project.type },
    { label: "Year", value: String(project.year) },
  ];

  // Generate structured data
  const projectSchema = getProjectSchema(project);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/#projects" },
    { name: project.name, url: `/projects/${project.slug}` },
  ]);

  return (
    <div className="bg-ed-paper">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main>
        {/* ---------------- HERO ---------------- */}
        <section className="relative overflow-hidden bg-ed-paper-alt pt-[clamp(7rem,14vw,10.5rem)] pb-[clamp(3.5rem,7vw,5.5rem)]">
          <span
            aria-hidden
            className="pointer-events-none absolute right-[clamp(1rem,7vw,6rem)] -bottom-[2.4rem] font-ed-heading text-[clamp(11rem,29vw,25rem)] leading-[0.8] font-semibold text-ed-border select-none"
          >
            {String(project.id).padStart(2, "0")}
          </span>

          <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-end gap-8 px-[clamp(1.25rem,4vw,2.75rem)] md:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)] md:gap-12">
            <div>
              <Link
                href="/#work"
                className="font-ed-mono text-[0.76rem] tracking-[0.05em] text-ed-text-secondary no-underline transition-colors hover:text-ed-accent-text"
              >
                ← Back to selected work
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-[11px]">
                <span className="font-ed-mono text-[0.72rem] tracking-[0.1em] text-ed-accent-text uppercase">
                  {project.type} · {project.year}
                </span>
                <Tag
                  variant={project.status === "Complete" ? "accent" : "accent2"}
                >
                  {project.status}
                </Tag>
              </div>

              <h1 className="m-0 mt-5 max-w-[840px] font-ed-heading text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.02em] text-ed-text">
                {project.name}
              </h1>

              <p className="mt-5 max-w-[670px] font-ed-body text-[clamp(1rem,2vw,1.18rem)] leading-[1.7] text-ed-text-secondary">
                {project.dek}
              </p>
            </div>

            <aside
              aria-label="Project facts"
              className="grid gap-[1.1rem] border-t border-ed-border pt-5"
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <div className="font-ed-mono text-[0.67rem] tracking-[0.1em] text-ed-text-muted uppercase">
                    {fact.label}
                  </div>
                  <div className="mt-1 font-ed-heading text-[0.9rem] font-semibold text-ed-text">
                    {fact.value}
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ---------------- COVER IMAGE ---------------- */}
        <div className="relative z-[1] mx-auto -mt-[clamp(1rem,3vw,2.5rem)] max-w-[1180px] px-[clamp(1.25rem,4vw,2.75rem)]">
          <CaseStudyCover
            src={project.cover}
            alt={project.name}
            index={project.id}
          />
        </div>

        {/* ---------------- CONTENT ---------------- */}
        <article className="mx-auto max-w-[780px] px-[clamp(1.25rem,4vw,2.75rem)] pt-[clamp(3.5rem,8vw,6.5rem)]">
          <section className="py-0">
            <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
              01 — The brief
            </div>
            <h2 className="mt-[0.7rem] mb-[1.1rem] max-w-[650px] font-ed-heading text-[clamp(1.8rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.015em] text-ed-text">
              A problem worth solving.
            </h2>
            <p className="m-0 font-ed-body text-[1.04rem] leading-[1.8] text-ed-text-secondary">
              {project.challenge}
            </p>
          </section>

          <section className="border-t border-ed-border py-[clamp(2.5rem,6vw,4.5rem)]">
            <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
              02 — The approach
            </div>
            <h2 className="mt-[0.7rem] mb-[1.1rem] max-w-[650px] font-ed-heading text-[clamp(1.8rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.015em] text-ed-text">
              Build from the system outward.
            </h2>
            {project.approach.map((step, stepIndex) => (
              <div
                key={step}
                className={clsx(
                  "grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t py-5",
                  stepIndex === 0
                    ? "border-ed-border-strong"
                    : "border-ed-border",
                )}
              >
                <span className="font-ed-mono text-[0.76rem] text-ed-accent-text">
                  {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <p className="m-0 font-ed-body text-[1.04rem] leading-[1.8] text-ed-text-secondary">
                  {step}
                </p>
              </div>
            ))}
          </section>

          <section className="border-t border-ed-border py-[clamp(2.5rem,6vw,4.5rem)]">
            <div className="grid grid-cols-1 gap-[clamp(2rem,7vw,5rem)] md:grid-cols-2">
              <div>
                <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
                  What it includes
                </div>
                <ul className="m-0 mt-5 list-none p-0">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-t border-ed-border py-[0.72rem] font-ed-body text-[0.93rem] leading-[1.45] text-ed-text"
                    >
                      <span className="mr-[9px] text-ed-accent-text">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
                  Technology
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-ed-border py-[clamp(2.5rem,6vw,4.5rem)]">
            <div className="relative overflow-hidden rounded-2xl border-l-[3px] border-ed-accent bg-ed-accent-soft p-[clamp(1.75rem,5vw,3.25rem)]">
              <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
                03 — Where it landed
              </div>
              <p className="mt-[0.8rem] font-ed-heading text-[clamp(1.35rem,3vw,2rem)] leading-[1.45] font-medium text-ed-text italic">
                {project.outcome}
              </p>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-[10px] bg-ed-gradient-button px-5 py-[13px] font-ed-heading text-[0.84rem] font-semibold text-white no-underline transition-all duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(14,124,116,0.32)]"
            >
              View repository on GitHub ↗
            </a>
          </section>
        </article>

        {/* ---------------- GALLERY ---------------- */}
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery images={project.gallery} alt={project.name} />
        )}

        {/* ---------------- PREV / NEXT NAV ---------------- */}
        <nav
          aria-label="Project navigation"
          className="border-t border-ed-border"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 md:grid-cols-2">
            <Link
              href={`/projects/${previous.slug}`}
              className="border-b border-ed-border px-[clamp(1.25rem,4vw,2.75rem)] py-8 text-inherit no-underline transition-colors duration-200 hover:bg-ed-accent-soft md:border-r md:border-b-0"
            >
              <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
                ← Previous project
              </div>
              <div className="mt-[7px] font-ed-heading text-[1.35rem] font-semibold text-ed-text">
                {previous.name}
              </div>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="px-[clamp(1.25rem,4vw,2.75rem)] py-8 text-right text-inherit no-underline transition-colors duration-200 hover:bg-ed-accent-soft"
            >
              <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
                Next project →
              </div>
              <div className="mt-[7px] font-ed-heading text-[1.35rem] font-semibold text-ed-text">
                {next.name}
              </div>
            </Link>
          </div>
        </nav>
      </main>
      <ContactMe />
      <Footer />
    </div>
  );
}
