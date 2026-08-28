"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import OptimizedImage from "./OptimizedImage";
import { trackNavigation } from "@/lib/analytics";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Lightweight scrollspy so the active nav pill tracks the section in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] animate-ed-nav-drop px-4 pt-2.5 pb-0 font-ed-body motion-reduce:animate-none md:px-6 md:pt-3.5">
        <div
          className={clsx(
            "mx-auto flex max-w-[1180px] items-center justify-between gap-6 rounded-2xl border pr-2.5 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-[box-shadow,border-color,background-color,height] duration-250 backdrop-blur-[14px] backdrop-saturate-[1.6] md:pl-3.5",
            scrolled
              ? "h-[58px] border-ed-border-strong bg-ed-surface/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_30px_-16px_rgba(11,19,16,0.18)] md:h-[58px]"
              : "h-[60px] border-ed-border bg-ed-paper/72 md:h-16",
          )}
        >
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 no-underline"
            aria-label="Jaycee Capulong"
            onClick={() => trackNavigation('#home', window.location.hash)}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ed-gradient-button font-ed-mono text-[13px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(14,124,116,0.45)] transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-rotate-[8deg] group-hover:scale-105">
              <OptimizedImage 
                src="/favicon-512x512.png" 
                alt="Dr-Pierrot logo" 
                width={36}
                height={36}
                className="h-full w-full"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col leading-[1.15]">
              <span className="font-ed-heading text-base font-bold tracking-[-0.01em] text-ed-text">
                Jaycee Capulong
              </span>
              <span className="hidden font-ed-body text-xs text-ed-text-muted md:block">
                Fullstack Developer
              </span>
            </div>
          </a>

          <nav
            className="hidden items-center gap-0.5 rounded-xl border border-ed-border bg-ed-paper-alt p-1 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => {
              const isActive = activeHref === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setActiveHref(l.href)}
                  className={clsx(
                    "relative rounded-lg px-[15px] py-2 text-[14.5px] font-medium no-underline transition-colors duration-200",
                    isActive
                      ? "bg-ed-surface text-ed-text shadow-[0_1px_0_var(--color-ed-border),0_4px_10px_-6px_rgba(11,19,16,0.15)]"
                      : "text-ed-text-secondary hover:text-ed-text",
                  )}
                >
                  {isActive && (
                    <span className="absolute bottom-1.5 left-[9px] h-1 w-1 rounded-full bg-ed-accent" />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="hidden items-center gap-[7px] whitespace-nowrap rounded-full border border-ed-accent-border bg-ed-accent-soft px-3 py-[7px] font-ed-body text-[13px] font-semibold text-ed-accent-text navstatus:inline-flex">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ed-accent motion-reduce:animate-none" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-ed-accent" />
              </span>
              Available for work
            </span>
            <a
              href="#contact"
              className="hidden items-center gap-[7px] whitespace-nowrap rounded-[10px] border border-transparent bg-ed-gradient-button px-[18px] py-[9px] font-ed-body text-[14.5px] font-semibold text-white no-underline shadow-[0_2px_10px_-2px_rgba(14,124,116,0.35)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(14,124,116,0.5)] md:inline-flex"
            >
              Let&apos;s talk
            </a>
            <button
              className="mt-[-8px] mr-[-6px] mb-[-8px] flex flex-col gap-[5px] border-none bg-transparent p-2 md:hidden"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={clsx(
                  "block h-0.5 w-5 rounded-sm bg-ed-text transition-all duration-[250ms]",
                  isMenuOpen && "translate-y-[6.5px] rotate-45",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-5 rounded-sm bg-ed-text transition-all duration-[250ms]",
                  isMenuOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-5 rounded-sm bg-ed-text transition-all duration-[250ms]",
                  isMenuOpen && "-translate-y-[6.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[110] flex -translate-y-2 flex-col items-center justify-center gap-[1.6rem] bg-ed-paper/98 opacity-0 backdrop-blur-[10px] transition-[opacity,transform] duration-300 pointer-events-none",
          isMenuOpen && "translate-y-0 opacity-100 pointer-events-auto",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="absolute top-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-ed-border bg-ed-paper-alt text-base text-ed-text"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            style={{ animationDelay: `${i * 0.06}s` }}
            className={clsx(
              "font-ed-heading text-[26px] font-semibold text-ed-text no-underline opacity-0 hover:text-ed-accent",
              isMenuOpen && "animate-ed-menu-in",
            )}
            onClick={() => {
              setActiveHref(l.href);
              setIsMenuOpen(false);
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          style={{
            animationDelay: isMenuOpen
              ? `${navLinks.length * 0.06}s`
              : undefined,
          }}
          className={clsx(
            "rounded-[10px] bg-ed-gradient-button px-8 py-3 font-ed-heading text-[15px] font-semibold text-white no-underline opacity-0",
            isMenuOpen && "animate-ed-menu-in",
          )}
        >
          Let&apos;s talk
        </a>
      </div>
    </>
  );
}
