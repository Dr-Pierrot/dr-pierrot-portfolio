import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Layers3,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./portfolio.css";

const projects = [
  {
    number: "01",
    label: "Flagship build · In progress",
    title: "Human Resource\nManagement System",
    description:
      "A full employee-lifecycle platform designed to make people operations more organized, transparent, and reliable.",
    details: ["Employee records", "Payroll computation", "Attendance & leave"],
    stack: ["Laravel", "React", "TypeScript", "MySQL"],
    href: "https://github.com/Dr-Pierrot/human-resource-management-system",
    accent: "coral",
  },
  {
    number: "02",
    label: "API design · Complete",
    title: "PSGC API",
    description:
      "A developer-ready REST API making Philippine geographic data simple to integrate, authenticate, and explore.",
    details: ["43,768 geographic records", "Sanctum authentication", "Swagger / OpenAPI docs"],
    stack: ["Laravel", "PHP", "MySQL", "OpenAPI"],
    href: "https://github.com/Dr-Pierrot/psgc-api",
    accent: "violet",
  },
  {
    number: "03",
    label: "Frontend fundamentals · Complete",
    title: "Weather App",
    description:
      "A responsive, real-time weather experience that brings live API data into a considered, usable interface.",
    details: ["Live API integration", "Async data handling", "Responsive interface"],
    stack: ["JavaScript", "HTML", "CSS", "API"],
    href: "https://github.com/Dr-Pierrot/weather-app",
    accent: "blue",
  },
];

const skills = [
  ["Frontend", "React · Next.js · TypeScript · Tailwind CSS"],
  ["Backend", "Laravel · PHP · Node.js · REST APIs"],
  ["Data", "MySQL · MongoDB · Relational design"],
  ["Workflow", "Git · GitHub · Swagger · Vite"],
];

export default function Home() {
  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jaycee Capulong home">
          <span className="brand-mark">JC</span>
          <span>Jaycee Capulong</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="mailto:capulongako16@gmail.com">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> Available for opportunities</div>
          <h1>Building the <em>useful</em><br />parts of the web.</h1>
          <p className="hero-intro">
            I&apos;m Jaycee Capulong — a full-stack developer from the Philippines who turns everyday operational problems into fast, thoughtful digital products.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={18} /></a>
            <a className="text-link" href="https://github.com/Dr-Pierrot" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-frame">
            <Image src="/profile.jpg" alt="Jaycee Capulong" fill priority sizes="(max-width: 700px) 80vw, 410px" className="portrait" />
          </div>
          <div className="portrait-note note-top"><Sparkles size={16} /> Problem solver</div>
          <div className="portrait-note note-bottom"><span className="online-dot" /> Based in PH</div>
          <div className="portrait-label">FULL-STACK<br /><strong>DEVELOPER</strong></div>
        </div>
        <div className="hero-footer">
          <span>Scroll to discover</span><span className="hero-line" />
          <span>2026 portfolio</span>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio highlights">
        <div><strong>3+</strong><span>Years of hands-on<br />learning & building</span></div>
        <div><strong>5+</strong><span>Core languages &<br />frameworks</span></div>
        <div><strong>Full</strong><span>Stack—from data models<br />to polished interfaces</span></div>
        <div><strong>PH</strong><span>Open to remote<br />collaboration</span></div>
      </section>

      <section className="statement section-pad" id="about">
        <p className="section-kicker">01 — The approach</p>
        <div className="statement-grid">
          <h2>I pair <em>systems thinking</em> with an eye for the human on the other side of the screen.</h2>
          <div className="statement-side">
            <p>I enjoy the entire arc of product development: breaking down a complex workflow, shaping a reliable backend, and delivering an interface people actually want to use.</p>
            <a className="text-link" href="mailto:capulongako16@gmail.com">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="principles">
          <article><Code2 size={25} /><h3>Built to work</h3><p>Practical applications that solve a clear, real-world problem.</p></article>
          <article><Layers3 size={25} /><h3>Thoughtful by default</h3><p>Clean architecture and accessible interfaces, considered together.</p></article>
          <article><Database size={25} /><h3>Ready to grow</h3><p>Structured data and APIs that make future expansion less painful.</p></article>
        </div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-heading">
          <div><p className="section-kicker">02 — Selected work</p><h2>Projects with a<br /><em>purpose.</em></h2></div>
          <p>Examples of systems and interfaces I&apos;ve built while deepening my craft across the stack.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.number}>
              <div className="project-index"><span>{project.number}</span><span>{project.label}</span></div>
              <div className="project-body">
                <h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{project.description}</p>
                <ul>{project.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
              </div>
              <div className="project-end">
                <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`} className="project-link"><ArrowUpRight size={24} /></a>
              </div>
            </article>
          ))}
        </div>
        <a className="all-work" href="https://github.com/Dr-Pierrot" target="_blank" rel="noreferrer"><Code2 size={18} /> Browse all repositories <ArrowUpRight size={17} /></a>
      </section>

      <section className="capabilities section-pad">
        <div className="capabilities-intro"><p className="section-kicker">03 — Capabilities</p><h2>A versatile toolkit,<br /><em>kept intentional.</em></h2><p>I choose tools based on what the product needs—not what is loudest at the moment.</p></div>
        <div className="skill-list">{skills.map(([name, detail], index) => <div className="skill-row" key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p><ArrowUpRight size={18} /></div>)}</div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-kicker">04 — Get in touch</p>
        <h2>Have a problem worth<br /><em>solving?</em></h2>
        <p>Whether you&apos;re building a product, improving a workflow, or need a developer who cares about the details, I&apos;d love to hear about it.</p>
        <a className="button button-light" href="mailto:capulongako16@gmail.com">Write me an email <Mail size={18} /></a>
        <div className="contact-meta"><span><MapPin size={15} /> Philippines</span><a href="https://ph.linkedin.com/in/jaycee-capulong-9a37922b9" target="_blank" rel="noreferrer"><ArrowUpRight size={15} /> LinkedIn</a><a href="https://github.com/Dr-Pierrot" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub</a></div>
      </section>

      <footer className="site-footer"><span>© 2026 Jaycee Capulong</span><span>Designed & built with care · Next.js</span></footer>
    </main>
  );
}
