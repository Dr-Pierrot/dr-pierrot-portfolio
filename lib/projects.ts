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
  },
  {
    id: 2,
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
    year: 2026,
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
    id: 3,
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
    id: 4,
    slug: "dct-hub",
    name: "DCT Hub",
    dek: "A custom web-based system for Dominican College of Tarlac, Inc.",
    desc: "A custom web-based system for Dominican College of Tarlac, Inc. to manage employees, students, and other school-related data.",
    longDesc:
      "A custom web-based system for Dominican College of Tarlac, Inc. to manage employees, students, and other school-related data. Built with Laravel, React, MySQL, and TailwindCSS. Includes features such as employee management, student records, and attendance tracking.",
    challenge:
      "The dct hub is an integrated systems that handles many different tasks and data sets. It's a complex project that requires a well-structured codebase and a clear design.",
    approach: [
      "Integrate HRMS, MIS, and other systems into a single, unified platform.",
      "Design a user-friendly interface that allows users to easily manage employees, students, and other school-related data.",
      "Implement features such as employee management, student records, and attendance tracking.",
      "Optimize performance and scalability by using Laravel's built-in caching and caching middleware.",
      "Implement role-based access control to ensure that only authorized users can access sensitive data.",
      "Optimize performance by using Laravel's built-in caching and caching middleware.",
      "Implement role-based access control to ensure that only authorized users can access sensitive data.",
      "Design a user-friendly interface that allows users to easily manage employees, students, and other school-related data.",
    ],
    outcome:
      "A complete, documented, authenticated API covering all 43,768 PSGC records — ready for any developer building Philippine-facing forms, logistics, or civic tools to consume directly instead of re-parsing government spreadsheets.",
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Swagger", "OpenAPI"],
    link: "https://github.com/Dr-Pierrot/psgc-api",
    status: "Complete",
    type: "Fullstack App",
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
    id: 5,
    slug: "id-management-system",
    name: "ID Management System",
    dek: "A custom web-based system for Dominican College of Tarlac, Inc.",
    desc: "A custom web-based system for Dominican College of Tarlac, Inc. to manage id cards of employees, students, and other school-related data.",
    longDesc:
      "A custom web-based system for Dominican College of Tarlac, Inc. to manage employees, students, and other school-related data. Built with Laravel, React, MySQL, and TailwindCSS. Includes features such as employee management, student records, and attendance tracking.",
    challenge:
      "The dct hub is an integrated systems that handles many different tasks and data sets. It's a complex project that requires a well-structured codebase and a clear design.",
    approach: [
      "Integrate HRMS, MIS, and other systems into a single, unified platform.",
      "Design a user-friendly interface that allows users to easily manage employees, students, and other school-related data.",
      "Implement features such as employee management, student records, and attendance tracking.",
      "Optimize performance and scalability by using Laravel's built-in caching and caching middleware.",
      "Implement role-based access control to ensure that only authorized users can access sensitive data.",
      "Optimize performance by using Laravel's built-in caching and caching middleware.",
      "Implement role-based access control to ensure that only authorized users can access sensitive data.",
      "Design a user-friendly interface that allows users to easily manage employees, students, and other school-related data.",
    ],
    outcome:
      "A complete, documented, authenticated API covering all 43,768 PSGC records — ready for any developer building Philippine-facing forms, logistics, or civic tools to consume directly instead of re-parsing government spreadsheets.",
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Swagger", "OpenAPI"],
    link: "https://github.com/Dr-Pierrot/psgc-api",
    status: "Complete",
    type: "Fullstack App",
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
    id: 6,
    slug: "ido-android-app-wedding-planner",
    name: "I DO: An Android App for Wedding Planning",
    dek: "An android app prototype with a fully finished user interface built with Java.",
    desc: "An Android app prototype with a fully finished user interface built with Java. Features a clear model, view, and controller separation, solid encapsulation, and inheritance.",
    longDesc:
      "An Android app prototype with a fully finished user interface built with Java. Features a clear model, view, and controller separation, solid encapsulation, and inheritance. The goal was to demonstrate a working prototype that held up under a real, finished UI, not just in theory. The app was built to pair solid OOP fundamentals with an actual finished Swing interface, not just console output.",
    challenge:
      "Most classroom Java projects skip a real UI. This one set out to pair solid OOP fundamentals with an actual finished Swing interface, not just console output.",
    approach: [
      "Structured the app around clear MVC boundaries — model, view, and controller as separate concerns rather than one God-class.",
      "Applied encapsulation and inheritance deliberately across the object model rather than as an afterthought.",
      "Built out the full Swing GUI to prototype completion, not just enough to demo.",
    ],
    outcome:
      "A fully working desktop prototype that demonstrates OOP fundamentals hold up under a real, finished interface — not just in theory.",
    stack: ["Java"],
    link: "https://github.com/Dr-Pierrot/IDOPrototype",
    status: "Complete",
    type: "Android App",
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
