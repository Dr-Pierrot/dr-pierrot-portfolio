export type Project = {
  id: number;
  slug: string;
  name: string;
  dek: string; // one-line magazine-style deck
  desc: string;
  longDesc: string;
  challenge: string;
  approach: string[];
  outcome: string;
  stack: string[];
  link: string;
  status: "In Progress" | "Complete";
  type: string;
  role: string;
  year: number;
  highlight: boolean;
  features: string[];
  // Path to a cover screenshot the user will add later, e.g. /projects/hrms/cover.png
  cover?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "hrms",
    name: "Human Resource Management System",
    dek: "A full employee lifecycle, from onboarding to payroll, run on one internal system.",
    desc: "A fullstack HRMS built with Laravel 13 & React/TypeScript via Inertia.js for real-world organizational use.",
    longDesc:
      "A comprehensive fullstack Human Resource Management System designed to streamline HR operations. Built with Laravel 13 as the backend and React/TypeScript via Inertia.js for a seamless SPA experience. Handles the full employee lifecycle — from onboarding to offboarding — alongside payroll computation, attendance tracking, and leave management.",
    challenge:
      "HR teams were juggling spreadsheets and disconnected tools for records, attendance, and payroll — slow, error-prone, and impossible to audit. The brief was a single system of record that non-technical staff could actually run day to day.",
    approach: [
      "Modeled the employee lifecycle end-to-end in Laravel — onboarding, records, attendance, leave, offboarding — as one relational schema instead of bolted-on modules.",
      "Used Inertia.js to ship a React/TypeScript SPA without standing up a separate API layer, keeping the monolith simple to reason about and deploy.",
      "Built a payroll computation engine that handles attendance-derived pay, deductions, and leave balances as first-class data, not spreadsheet formulas.",
      "Layered role-based access control so HR, managers, and employees each see only what their role needs.",
    ],
    outcome:
      "A working internal tool that replaces manual HR tracking with one auditable system — still under active development as features harden for real organizational use.",
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
    role: "Solo full-stack developer",
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
  },
  {
    id: 2,
    slug: "psgc-api",
    name: "PSGC API",
    dek: "43,768 Philippine geographic records, served as a documented, authenticated REST API.",
    desc: "Production-ready REST API exposing 43,768 Philippine geographic records with Sanctum auth & Swagger docs.",
    longDesc:
      "A production-grade REST API built on Laravel that exposes the entire Philippine Standard Geographic Code (PSGC) dataset — Q1 2026 edition — covering 43,768 records across all administrative levels. Designed for developers who need reliable, structured Philippine location data. Ships with full token-based authentication via Laravel Sanctum and auto-generated OpenAPI/Swagger documentation.",
    challenge:
      "The official PSGC dataset is published as flat government spreadsheets — no API, no auth, no docs. Any developer needing Philippine address data has to parse it themselves from scratch every time.",
    approach: [
      "Normalized the raw PSGC Q1 2026 dataset into a relational MySQL schema across regions, provinces, cities/municipalities, and barangays.",
      "Built RESTful endpoints over the full hierarchy with consistent pagination, filtering, and response shapes.",
      "Added Laravel Sanctum token authentication so the API is safe to expose publicly without being open season.",
      "Generated OpenAPI/Swagger docs directly from the codebase so consumers can explore and test endpoints without reading source.",
    ],
    outcome:
      "A complete, documented, authenticated API covering all 43,768 PSGC records — ready for any developer building Philippine-facing forms, logistics, or civic tools to consume directly instead of re-parsing government spreadsheets.",
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Swagger", "OpenAPI"],
    link: "https://github.com/Dr-Pierrot/psgc-api",
    status: "Complete",
    type: "REST API",
    role: "Solo backend developer",
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
  },
  {
    id: 3,
    slug: "weather-app",
    name: "Weather App",
    dek: "Live meteorological data, vanilla JS, no framework to hide behind.",
    desc: "Real-time weather app with live API integration, dynamic DOM updates, and a clean responsive UI.",
    longDesc:
      "A JavaScript weather application that integrates with a live weather API to display real-time meteorological data. Features a clean, responsive interface with dynamic DOM manipulation — no frameworks, pure vanilla JS — demonstrating solid fundamentals in API consumption, async/await patterns, and UX design.",
    challenge:
      "Before reaching for React on everything, the goal was proving the fundamentals held up without one: async data fetching, DOM state, and a responsive layout using nothing but the platform.",
    approach: [
      "Consumed a live weather API with async/await and handled loading, error, and empty states explicitly rather than assuming the happy path.",
      "Wrote dynamic DOM updates by hand to keep the UI in sync with fetched data, without a virtual DOM to lean on.",
      "Designed a responsive layout in plain CSS that holds up from mobile to desktop.",
    ],
    outcome:
      "A small, dependency-free app that fetches and renders real-time forecasts reliably — a fundamentals check that still holds up as a reference for clean async JS.",
    stack: ["JavaScript", "HTML", "CSS", "Weather API"],
    link: "https://github.com/Dr-Pierrot/weather-app",
    status: "Complete",
    type: "Web App",
    role: "Solo developer",
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
    slug: "todo-list-v2",
    name: "Todo List v2",
    dek: "A second pass at task management — cleaner architecture, same zero dependencies.",
    desc: "Feature-rich task manager with full CRUD operations built in pure vanilla JavaScript.",
    longDesc:
      "A refined second iteration of a task management application built entirely in vanilla JavaScript. Supports full CRUD operations — create, read, update, and delete — with local data persistence. Demonstrates clean separation of concerns and attention to micro-interactions without relying on any external libraries.",
    challenge:
      "The first todo app worked but the code was tangled — state, rendering, and persistence all mixed together. V2 was a deliberate rebuild to fix the architecture, not just the features.",
    approach: [
      "Separated state, rendering, and persistence into distinct modules instead of one script doing everything.",
      "Implemented full CRUD with local persistence so tasks survive a page refresh.",
      "Added keyboard accessibility and small interaction details that a v1 rush job skipped.",
    ],
    outcome:
      "A cleaner, more maintainable rebuild that reflects lessons learned from the first version — proof of iterating on your own past work, not just shipping and moving on.",
    stack: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/Dr-Pierrot/todo_list2",
    status: "Complete",
    type: "Web App",
    role: "Solo developer",
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
    slug: "ido-prototype",
    name: "IDO Prototype",
    dek: "A Java Swing desktop app, built to get MVC architecture right.",
    desc: "Java desktop app prototype with a fully finished Swing GUI, showcasing OOP architecture and MVC design.",
    longDesc:
      "A Java desktop application prototype featuring a fully realized user interface built with Java Swing. Demonstrates solid object-oriented programming principles — encapsulation, inheritance, and polymorphism — applied to a real GUI application with clearly separated model, view, and controller layers.",
    challenge:
      "Most classroom Java projects skip a real UI. This one set out to pair solid OOP fundamentals with an actual finished Swing interface, not just console output.",
    approach: [
      "Structured the app around clear MVC boundaries — model, view, and controller as separate concerns rather than one God-class.",
      "Applied encapsulation and inheritance deliberately across the object model rather than as an afterthought.",
      "Built out the full Swing GUI to prototype completion, not just enough to demo.",
    ],
    outcome:
      "A fully working desktop prototype that demonstrates OOP fundamentals hold up under a real, finished interface — not just in theory.",
    stack: ["Java", "Java Swing"],
    link: "https://github.com/Dr-Pierrot/IDOPrototype",
    status: "Complete",
    type: "Desktop App",
    role: "Solo developer",
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

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const ALL_TYPES = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.type))),
];
