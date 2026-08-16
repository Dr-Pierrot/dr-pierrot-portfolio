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
    slug: "alaga-pinas",
    name: "Alaga Pinas",
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
    year: 2026,
    features: [
      "Employee records & lifecycle management",
      "Payroll computation engine",
      "Attendance & leave tracking",
      "Role-based access control",
      "Inertia.js SPA architecture",
      "MySQL relational database design",
    ],
    cover: "/bg.jpg",
    gallery: [
      "/bg.jpg",
      "/favicon-512x512.png",
      "/file.svg",
      "/globe.svg",
      "/next.svg",
      "/pierrot.svg",
      "/vercel.svg",
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
    year: 2026,
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
    slug: "dct-hub",
    name: "DCT Hub",
    dek: "A custom web-based system for Dominican College of Tarlac, Inc.",
    desc: "A custom web-based system for Dominican College of Tarlac, Inc. to manage employees, students, and other school-related data.",
    longDesc:
      "A custom web-based system for Dominican College of Tarlac, Inc. to manage employees, students, and other school-related data. Built with Laravel, React, MySQL, and TailwindCSS. Includes features such as employee management, student records, and attendance tracking.",
    challenge:
      "DCT Hub needed to fold several previously separate systems — HR, student records, attendance — into one platform, for non-technical school staff to run without needing to understand the underlying data model.",
    approach: [
      "Integrated HR, student records, and other school systems into a single unified platform instead of separate disconnected tools.",
      "Designed a user-friendly interface so non-technical staff can manage employees, students, and school data without training.",
      "Implemented role-based access control so only authorized staff can reach sensitive records.",
      "Used Laravel's caching layer to keep the combined system responsive as data volume grew.",
    ],
    // TODO(jaycee): drafted from the description above — confirm this matches
    // what actually shipped before publishing.
    outcome:
      "A single web system Dominican College of Tarlac uses to manage employee and student records in one place, replacing what had been handled across separate disconnected tools.",
    // TODO(jaycee): stack corrected to match your own description (Laravel,
    // React, MySQL, TailwindCSS) — the previous version had PSGC API's stack
    // pasted in by mistake. Confirm this is the real stack.
    stack: ["Laravel", "React", "MySQL", "TailwindCSS"],
    // TODO(jaycee): placeholder — previous link pointed at the psgc-api repo
    // by mistake. Replace with the real DCT Hub repo (or drop `link` if it's
    // private/not on GitHub).
    link: "https://github.com/Dr-Pierrot/dct-hub",
    status: "Complete",
    type: "Fullstack App",
    role: "Solo backend developer",
    highlight: false,
    year: 2026,
    features: [
      "Unified employee & student management",
      "Attendance tracking",
      "Role-based access control",
      "Built on Laravel, React & MySQL",
    ],
  },
  {
    id: 4,
    slug: "id-management-system",
    name: "ID Management System",
    dek: "A companion system for issuing and tracking school ID cards.",
    desc: "A custom web-based system for Dominican College of Tarlac, Inc. to manage ID cards of employees, students, and other school-related data.",
    longDesc:
      "A web-based ID management system for Dominican College of Tarlac, Inc., built to generate and track ID cards for employees and students alongside their core records.",
    // TODO(jaycee): this whole entry previously described DCT Hub's own
    // challenge/approach almost verbatim (it even said "the dct hub is..."
    // inside this project's own copy). Rewritten below to be ID-card
    // specific based only on your one-line description — please confirm
    // this is accurate, or tell me the real specifics and I'll fix it.
    challenge:
      "Employee and student ID cards were being produced through a manual, ad hoc process with no central record of who had a valid ID or when it was issued.",
    approach: [
      "Built ID card generation tied directly to existing employee and student records, instead of a separate manual process.",
      "Designed printable ID templates matching the school's format.",
      "Added tracking for issue dates and ID status per person.",
      "Layered role-based access so only authorized staff can issue or reprint IDs.",
    ],
    outcome:
      "A working system for Dominican College of Tarlac to generate and track ID cards centrally, tied to the same employee and student records used elsewhere.",
    // TODO(jaycee): assumed same stack as DCT Hub since this reads like a
    // companion module — confirm.
    stack: ["Laravel", "React", "MySQL", "TailwindCSS"],
    // TODO(jaycee): placeholder — previous link pointed at the psgc-api repo
    // by mistake. Replace with the real repo (or drop `link` if private).
    link: "https://github.com/Dr-Pierrot/id-management-system",
    status: "Complete",
    type: "Fullstack App",
    role: "Solo backend developer",
    highlight: false,
    year: 2026,
    features: [
      "ID card generation from existing records",
      "Printable ID templates",
      "Issue-date & status tracking",
      "Role-based access control",
    ],
  },
  {
    id: 5,
    slug: "ido-android-app-wedding-planner",
    name: "I DO: An Android App for Wedding Planning",
    // TODO(jaycee): dek/desc call this an Android app, but the original
    // challenge/approach described a Java Swing *desktop* GUI — that's the
    // same project as your other "IDOPrototype" Java desktop entry, not an
    // Android build. Please confirm which is true:
    //   (a) this is genuinely an Android app (different codebase/stack —
    //       tell me what it actually used, e.g. Android SDK + Java/Kotlin), or
    //   (b) this is the same Java Swing desktop prototype, just renamed with
    //       a wedding-planning theme — in which case "Android" should come
    //       out of the copy below and the stack.
    // Left as "Android" for now since that's what the name/desc say, but the
    // approach below has been softened to not claim Swing specifically.
    dek: "An Android app prototype with a fully finished user interface built with Java.",
    desc: "An Android app prototype with a fully finished user interface built with Java. Features a clear model, view, and controller separation, solid encapsulation, and inheritance.",
    longDesc:
      "An Android app prototype built to demonstrate a working, finished UI rather than just a functional core — with a clear model/view/controller separation and deliberate use of encapsulation and inheritance throughout the object model.",
    challenge:
      "Most classroom Java projects skip a real UI. This one set out to pair solid OOP fundamentals with an actual finished interface, not just console output.",
    approach: [
      "Structured the app around clear MVC boundaries — model, view, and controller as separate concerns rather than one God-class.",
      "Applied encapsulation and inheritance deliberately across the object model rather than as an afterthought.",
      "Built the UI out to prototype completion, not just enough to demo.",
    ],
    outcome:
      "A fully working prototype that demonstrates OOP fundamentals hold up under a real, finished interface — not just in theory.",
    stack: ["Java"],
    link: "https://github.com/Dr-Pierrot/IDOPrototype",
    status: "Complete",
    type: "Android App",
    role: "Solo developer",
    highlight: false,
    year: 2024,
    features: [
      "OOP architecture (MVC)",
      "Encapsulation & inheritance",
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
