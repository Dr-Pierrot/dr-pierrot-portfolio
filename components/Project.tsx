"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { T } from "@/lib/theme";

/* ---------------- TYPES & DATA ---------------- */

type Project = {
  id: number;
  name: string;
  desc: string;
  longDesc: string;
  stack: string[];
  link: string;
  status: "In Progress" | "Complete";
  type: string;
  icon: string;
  highlight: boolean;
  year: number;
  features: string[];
  impact?: string; // optional business impact line
};

const projects: Project[] = [
  {
    id: 1,
    name: "Human Resource Management System",
    desc: "Fullstack HRMS (Laravel 13 + React/TS via Inertia) for end‑to‑end employee lifecycle, payroll, and attendance.",
    longDesc:
      "A comprehensive Human Resource Management System designed to streamline HR operations for real organizations. Built with Laravel 13 as the backend and React/TypeScript via Inertia.js for a seamless SPA experience. Handles the full employee lifecycle — from onboarding to offboarding — alongside payroll computation, attendance tracking, and leave management.",
    stack: [
      "Laravel",
      "TypeScript",
      "React",
      "Inertia.js",
      "MySQL",
      "TailwindCSS",
      "Vite",
    ],
    link: "https://github.com/Dr-Pierrot/human-resource-management-system",
    status: "In Progress",
    type: "Fullstack App",
    icon: "🧩",
    highlight: true,
    year: 2025,
    features: [
      "Employee records & lifecycle management",
      "Payroll computation engine",
      "Attendance & leave tracking",
      "Role-based access control",
      "Inertia.js SPA architecture",
      "MySQL relational database design",
    ],
    impact:
      "Reduces manual HR work and standardizes payroll/attendance workflows.",
  },
  {
    id: 2,
    name: "PSGC API",
    desc: "Production REST API exposing 43,768 Philippine geographic records with Sanctum auth & Swagger docs.",
    longDesc:
      "A production-grade REST API built on Laravel that exposes the entire Philippine Standard Geographic Code (PSGC) dataset — Q1 2026 edition — covering 43,768 records across all administrative levels. Designed for developers who need reliable, structured Philippine location data. Ships with full token-based authentication via Laravel Sanctum and auto-generated OpenAPI/Swagger documentation.",
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Swagger", "OpenAPI"],
    link: "https://github.com/Dr-Pierrot/psgc-api",
    status: "Complete",
    type: "REST API",
    icon: "🗺️",
    highlight: false,
    year: 2025,
    features: [
      "43,768 geographic records (Q1 2026)",
      "Regions, provinces, cities, barangays",
      "Laravel Sanctum token authentication",
      "OpenAPI / Swagger documentation",
      "Optimized query performance",
      "RESTful endpoint design",
    ],
    impact:
      "Enables other apps to integrate official Philippine location data without maintaining their own dataset.",
  },
  {
    id: 3,
    name: "Weather App",
    desc: "Real-time weather UI with live API integration, async patterns, and a clean responsive layout.",
    longDesc:
      "A JavaScript weather application that integrates with a live weather API to display real-time meteorological data. Features a clean, responsive interface with dynamic DOM manipulation — no frameworks, pure vanilla JS — demonstrating solid fundamentals in API consumption, async/await patterns, and UX design.",
    stack: ["JavaScript", "HTML", "CSS", "Weather API"],
    link: "https://github.com/Dr-Pierrot/weather-app",
    status: "Complete",
    type: "Web App",
    icon: "⛅",
    highlight: false,
    year: 2024,
    features: [
      "Live weather API integration",
      "Real-time data updates",
      "Responsive UI design",
      "Async/await API patterns",
      "Dynamic DOM manipulation",
      "Location-based forecasts",
    ],
  },
  {
    id: 4,
    name: "Todo List v2",
    desc: "Feature-rich task manager with full CRUD and local persistence in vanilla JavaScript.",
    longDesc:
      "A refined second iteration of a task management application built entirely in vanilla JavaScript. Supports full CRUD operations — create, read, update, and delete — with local data persistence. Demonstrates clean separation of concerns and attention to micro-interactions without relying on any external libraries.",
    stack: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/Dr-Pierrot/todo_list2",
    status: "Complete",
    type: "Web App",
    icon: "✅",
    highlight: false,
    year: 2024,
    features: [
      "Full CRUD task operations",
      "Local data persistence",
      "Keyboard accessibility",
      "Micro-interaction animations",
      "Clean vanilla JS architecture",
      "Responsive layout",
    ],
  },
  {
    id: 5,
    name: "IDO Prototype",
    desc: "Java desktop app with a complete Swing GUI, showcasing OOP architecture and MVC design.",
    longDesc:
      "A Java desktop application prototype featuring a fully realized user interface built with Java Swing. Demonstrates solid object-oriented programming principles — encapsulation, inheritance, and polymorphism — applied to a real GUI application with clearly separated model, view, and controller layers.",
    stack: ["Java", "Java Swing"],
    link: "https://github.com/Dr-Pierrot/IDOPrototype",
    status: "Complete",
    type: "Desktop App",
    icon: "☕",
    highlight: false,
    year: 2024,
    features: [
      "Java Swing GUI",
      "OOP architecture (MVC)",
      "Encapsulation & inheritance",
      "Desktop application design",
      "Fully realized UI prototype",
      "Structured component layout",
    ],
  },
];

const ALL_TYPES = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

const STATUS_STYLE: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  "In Progress": {
    bg: T.color.accent2Soft,
    border: T.color.accent2Border,
    text: T.color.accent2Text,
    dot: "#D97706",
  },
  Complete: {
    bg: T.color.accentSoft,
    border: T.color.accentBorder,
    text: T.color.accentText,
    dot: T.color.accent,
  },
};

const TYPE_ICON_STYLE: Record<string, { bg: string; border: string }> = {
  "Fullstack App": { bg: T.color.accent3Soft, border: T.color.accent3Border },
  "REST API": { bg: T.color.accentSoft, border: T.color.accentBorder },
  "Web App": { bg: T.color.accent2Soft, border: T.color.accent2Border },
  "Desktop App": { bg: T.color.accent3Soft, border: T.color.accent3Border },
};

/* ---------------- HOOKS ---------------- */

const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.08 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

/* ---------------- ICON ---------------- */

const Icon = ({ path }: { path: string }) => (
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
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  github:
    "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  arrowUpRight: "M7 17L17 7M17 7H7M17 7v10",
};

/* ---------------- MODAL ---------------- */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const sc = STATUS_STYLE[project.status];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fn);
    };
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: "rgba(17,24,39,0.5)",
          backdropFilter: "blur(2px)",
          animation: "modal-bg 0.2s ease both",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 501,
          width: "min(680px,94vw)",
          maxHeight: "88vh",
          overflowY: "auto",
          background: T.color.bg,
          border: `1px solid ${T.color.border}`,
          borderRadius: "14px",
          animation: "modal-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
          boxShadow: "0 20px 60px rgba(17,24,39,0.2)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "sticky",
            top: 0,
            float: "right",
            margin: "16px 16px 0 0",
            width: "32px",
            height: "32px",
            background: T.color.bgAlt,
            border: `1px solid ${T.color.border}`,
            borderRadius: "8px",
            color: T.color.textSecondary,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          ✕
        </button>

        <div style={{ padding: "16px 32px 32px", clear: "both" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            <span style={{ fontSize: "32px", lineHeight: 1, flexShrink: 0 }}>
              {project.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  flexWrap: "wrap" as const,
                }}
              >
                <span style={{ fontSize: "12px", color: T.color.textMuted }}>
                  {project.type}
                </span>
                <span style={{ color: T.color.border }}>·</span>
                <span style={{ fontSize: "12px", color: T.color.textMuted }}>
                  {project.year}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: T.font.heading,
                  fontSize: "clamp(1.1rem,3vw,1.4rem)",
                  fontWeight: 700,
                  color: T.color.text,
                  margin: "0 0 10px",
                }}
              >
                {project.name}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  borderRadius: "999px",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: sc.dot,
                  }}
                />
                <span
                  style={{ fontSize: "11px", fontWeight: 600, color: sc.text }}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          <p
            style={{
              color: T.color.textSecondary,
              fontSize: "14px",
              lineHeight: 1.85,
              marginBottom: "24px",
            }}
          >
            {project.longDesc}
          </p>

          {project.impact && (
            <div
              style={{
                marginBottom: "24px",
                padding: "14px 16px",
                background: T.color.accent2Soft,
                border: `1px solid ${T.color.accent2Border}`,
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: T.color.accent2Text,
                  marginBottom: "4px",
                  fontFamily: T.font.mono,
                  letterSpacing: ".04em",
                }}
              >
                IMPACT
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: T.color.text,
                  lineHeight: 1.6,
                }}
              >
                {project.impact}
              </div>
            </div>
          )}

          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: T.color.textMuted,
                marginBottom: "12px",
                fontFamily: T.font.mono,
              }}
            >
              // Key features
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {project.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: T.color.accent,
                      fontSize: "13px",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      color: T.color.text,
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: T.color.textMuted,
                marginBottom: "10px",
                fontFamily: T.font.mono,
              }}
            >
              // Tech stack
            </div>
            <div
              style={{ display: "flex", flexWrap: "wrap" as const, gap: "7px" }}
            >
              {project.stack.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "4px 12px",
                    background: T.color.bgAlt,
                    border: `1px solid ${T.color.border}`,
                    borderRadius: "6px",
                    color: T.color.text,
                    fontSize: "12px",
                    fontFamily: T.font.mono,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              background: T.color.text,
              border: `1px solid ${T.color.text}`,
              borderRadius: "8px",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Icon path={ICONS.github} /> View on GitHub
          </a>
        </div>
      </div>
    </>
  );
};

/* ---------------- FILTER TABS ---------------- */

const FilterTabs = ({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (t: string) => void;
  counts: Record<string, number>;
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "8px",
      justifyContent: "center",
      marginBottom: "2.5rem",
    }}
  >
    {ALL_TYPES.map((t) => {
      const isActive = t === active;
      return (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            padding: "7px 16px",
            background: isActive ? T.color.text : T.color.bg,
            border: `1px solid ${isActive ? T.color.text : T.color.border}`,
            borderRadius: "999px",
            cursor: "pointer",
            color: isActive ? "#fff" : T.color.textSecondary,
            fontSize: "13px",
            fontWeight: 500,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <span>{t}</span>
          <span
            style={{
              background: isActive ? "rgba(255,255,255,0.2)" : T.color.bgAlt,
              borderRadius: "999px",
              padding: "1px 7px",
              fontSize: "11px",
              color: isActive ? "#fff" : T.color.textMuted,
            }}
          >
            {counts[t] ?? 0}
          </span>
        </button>
      );
    })}
  </div>
);

/* ---------------- FEATURED CARD ---------------- */

const FeaturedCard = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const sc = STATUS_STYLE[project.status];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.color.bg,
        border: `1px solid ${hovered ? T.color.borderStrong : T.color.border}`,
        borderRadius: "14px",
        padding: "36px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(17,24,39,0.08)"
          : "0 1px 3px rgba(17,24,39,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: T.color.gradientText,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
          flexWrap: "wrap" as const,
        }}
      >
        <span style={{ fontSize: "12px", color: T.color.textMuted }}>
          {project.type}
        </span>
        <span style={{ color: T.color.border }}>·</span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: T.color.accent3Text,
            background: T.color.accent3Soft,
            border: `1px solid ${T.color.accent3Border}`,
            padding: "2px 9px",
            borderRadius: "999px",
          }}
        >
          ★ Featured
        </span>
        <span style={{ color: T.color.border }}>·</span>
        <span style={{ fontSize: "12px", color: T.color.textMuted }}>
          {project.year}
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            background: sc.bg,
            border: `1px solid ${sc.border}`,
            borderRadius: "999px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: sc.dot,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: sc.text,
              whiteSpace: "nowrap" as const,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <h3
        style={{
          fontFamily: T.font.heading,
          fontWeight: 700,
          fontSize: "clamp(1.2rem,3vw,1.6rem)",
          color: T.color.text,
          margin: "0 0 14px",
        }}
      >
        {project.icon} {project.name}
      </h3>

      <p
        style={{
          color: T.color.textSecondary,
          fontSize: "14px",
          lineHeight: 1.8,
          margin: "0 0 20px",
          maxWidth: "680px",
        }}
      >
        {project.longDesc}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: "6px",
          marginBottom: "22px",
        }}
      >
        {project.features.map((f) => (
          <div
            key={f}
            style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}
          >
            <span
              style={{
                color: T.color.accent,
                fontSize: "12px",
                marginTop: "2px",
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span
              style={{
                color: T.color.textSecondary,
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "7px",
          marginBottom: "22px",
        }}
      >
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              padding: "4px 12px",
              background: T.color.bgAlt,
              border: `1px solid ${T.color.border}`,
              borderRadius: "6px",
              color: T.color.text,
              fontSize: "12px",
              fontFamily: T.font.mono,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
        <button
          onClick={onOpen}
          style={{
            padding: "10px 22px",
            background: T.color.gradientButton,
            border: "1px solid transparent",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(17,24,39,0.15)",
          }}
        >
          Full details
        </button>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 22px",
            background: "transparent",
            border: `1px solid ${T.color.border}`,
            borderRadius: "8px",
            color: T.color.text,
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Icon path={ICONS.github} /> GitHub
        </a>
      </div>
    </div>
  );
};

/* ---------------- PROJECT CARD ---------------- */

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const sc = STATUS_STYLE[project.status];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column" as const,
        background: T.color.bg,
        border: `1px solid ${hovered ? T.color.borderStrong : T.color.border}`,
        borderRadius: "12px",
        padding: "22px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 26px rgba(17,24,39,0.08)" : "none",
        animation: `fade-in-up 0.55s ease-out ${0.06 * index}s both`,
        height: "100%",
        boxSizing: "border-box" as const,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: (
              TYPE_ICON_STYLE[project.type] ?? TYPE_ICON_STYLE["Web App"]
            ).bg,
            border: `1px solid ${(TYPE_ICON_STYLE[project.type] ?? TYPE_ICON_STYLE["Web App"]).border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {project.icon}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-end",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 10px",
              background: sc.bg,
              border: `1px solid ${sc.border}`,
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: sc.dot,
              }}
            />
            <span style={{ fontSize: "10px", fontWeight: 600, color: sc.text }}>
              {project.status}
            </span>
          </div>
          <span style={{ fontSize: "11px", color: T.color.textMuted }}>
            {project.year}
          </span>
        </div>
      </div>

      <span
        style={{
          fontSize: "11px",
          color: T.color.textMuted,
          display: "block",
          marginBottom: "5px",
          fontFamily: T.font.mono,
        }}
      >
        {project.type}
      </span>
      <h3
        style={{
          fontFamily: T.font.heading,
          fontWeight: 600,
          fontSize: "15px",
          color: T.color.text,
          margin: "0 0 10px",
          lineHeight: 1.4,
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          color: T.color.textSecondary,
          fontSize: "13px",
          lineHeight: 1.7,
          margin: "0 0 14px",
          flex: 1,
        }}
      >
        {project.desc}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "5px",
          marginBottom: "14px",
        }}
      >
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            style={{
              padding: "2px 9px",
              background: T.color.bgAlt,
              border: `1px solid ${T.color.border}`,
              borderRadius: "6px",
              color: T.color.textSecondary,
              fontSize: "10px",
              fontFamily: T.font.mono,
            }}
          >
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span
            style={{
              padding: "2px 9px",
              background: T.color.bgAlt,
              border: `1px solid ${T.color.border}`,
              borderRadius: "6px",
              color: T.color.textMuted,
              fontSize: "10px",
              fontFamily: T.font.mono,
            }}
          >
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
        <button
          onClick={onOpen}
          style={{
            flex: 1,
            padding: "8px 12px",
            background: T.color.bgAlt,
            border: `1px solid ${T.color.border}`,
            borderRadius: "8px",
            color: T.color.text,
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Details
        </button>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 12px",
            background: "transparent",
            border: `1px solid ${T.color.border}`,
            borderRadius: "8px",
            color: T.color.textSecondary,
            fontSize: "12px",
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Icon path={ICONS.github} /> GitHub
        </a>
      </div>
    </div>
  );
};

/* ---------------- PROJECTS SECTION ---------------- */

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.type === activeFilter);
  const featured = filtered.filter((p) => p.highlight);
  const rest = filtered.filter((p) => !p.highlight);

  const counts: Record<string, number> = { All: projects.length };
  ALL_TYPES.slice(1).forEach((t) => {
    counts[t] = projects.filter((p) => p.type === t).length;
  });

  const handleFilter = (t: string) => {
    setActiveFilter(t);
    setAnimKey((k) => k + 1);
  };
  const openModal = useCallback((p: Project) => setModalProject(p), []);
  const closeModal = useCallback(() => setModalProject(null), []);

  return (
    <>
      <style>{`
        ${T.fontImport}
        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes reveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes modal-bg { from { opacity:0; } to { opacity:1; } }
        @keyframes modal-in {
          from { opacity:0; transform:translate(-50%,calc(-50% + 16px)); }
          to   { opacity:1; transform:translate(-50%,-50%); }
        }
        .proj-revealed     { animation: reveal 0.7s ease-out both; }
        .proj-revealed-d1  { animation: reveal 0.7s ease-out 0.1s both; }
        .proj-revealed-d2  { animation: reveal 0.7s ease-out 0.2s both; }
        .proj-revealed-d3  { animation: reveal 0.7s ease-out 0.3s both; }
      `}</style>

      {modalProject && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}

      <section
        id="projects"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.bg,
          padding: "5rem 1.5rem",
          fontFamily: T.font.body,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            className={inView ? "proj-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <p
              style={{
                fontFamily: T.font.mono,
                fontSize: "13px",
                color: T.color.accentText,
                margin: "0 0 10px",
              }}
            >
              ~/projects
            </p>
            <h2
              style={{
                fontFamily: T.font.heading,
                fontWeight: 700,
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                color: T.color.text,
                margin: "0 0 0.8rem",
              }}
            >
              Selected work
            </h2>
            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "15px",
                maxWidth: "520px",
                margin: "0 auto 1.2rem",
                lineHeight: 1.7,
              }}
            >
              Projects that demonstrate end‑to‑end delivery: APIs, fullstack
              apps, and utilities built to solve concrete problems.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 16px",
                background: T.color.bgAlt,
                border: `1px solid ${T.color.border}`,
                borderRadius: "999px",
              }}
            >
              <span
                style={{
                  fontFamily: T.font.heading,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: T.color.text,
                }}
              >
                {projects.length}
              </span>
              <span style={{ fontSize: "12px", color: T.color.textMuted }}>
                projects
              </span>
            </div>
          </div>

          <div className={inView ? "proj-revealed-d1" : ""}>
            <FilterTabs
              active={activeFilter}
              onChange={handleFilter}
              counts={counts}
            />
          </div>

          {featured.length > 0 && (
            <div
              className={inView ? "proj-revealed-d2" : ""}
              style={{ marginBottom: "16px" }}
            >
              {featured.map((p) => (
                <FeaturedCard
                  key={p.id}
                  project={p}
                  onOpen={() => openModal(p)}
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div
              key={animKey}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: "14px",
              }}
              className={inView ? "proj-revealed-d3" : ""}
            >
              {rest.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  onOpen={() => openModal(p)}
                />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: T.color.textMuted,
                fontSize: "15px",
              }}
            >
              No projects found in this category.
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "3.5rem",
              paddingTop: "2.5rem",
              borderTop: `1px solid ${T.color.border}`,
            }}
          >
            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "14px",
                marginBottom: "1.2rem",
              }}
            >
              More projects and experiments are available on GitHub
            </p>
            <a
              href="https://github.com/Dr-Pierrot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                background: T.color.text,
                border: `1px solid ${T.color.text}`,
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Icon path={ICONS.github} /> View GitHub profile
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
