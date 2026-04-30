"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
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
};

const projects: Project[] = [
  {
    id: 1,
    name: "Human Resource Management System",
    desc: "A fullstack HRMS built with Laravel 13 & React/TypeScript via Inertia.js for real-world organizational use.",
    longDesc: "A comprehensive fullstack Human Resource Management System designed to streamline HR operations. Built with Laravel 13 as the backend powerhouse and React/TypeScript via Inertia.js for a seamless SPA experience. Handles the full employee lifecycle — from onboarding to offboarding — alongside payroll computation, attendance tracking, and leave management.",
    stack: ["Laravel", "TypeScript", "React", "Inertia.js", "MySQL", "TailwindCSS", "Vite"],
    link: "https://github.com/Dr-Pierrot/human-resource-management-system",
    status: "In Progress",
    type: "Fullstack App",
    icon: "🏛️",
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
    name: "PSGC API",
    desc: "Production-ready REST API exposing 43,768 Philippine geographic records with Sanctum auth & Swagger docs.",
    longDesc: "A production-grade REST API built on Laravel that exposes the entire Philippine Standard Geographic Code (PSGC) dataset — Q1 2026 edition — covering 43,768 records across all administrative levels. Designed for developers who need reliable, structured Philippine location data. Ships with full token-based authentication via Laravel Sanctum and auto-generated OpenAPI/Swagger documentation.",
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
  },
  {
    id: 3,
    name: "Weather App",
    desc: "Real-time weather app with live API integration, dynamic DOM updates, and a clean responsive UI.",
    longDesc: "A JavaScript weather application that integrates with a live weather API to display real-time meteorological data. Features a clean, responsive interface with dynamic DOM manipulation — no frameworks, pure vanilla JS — demonstrating solid fundamentals in API consumption, async/await patterns, and UX design.",
    stack: ["JavaScript", "HTML", "CSS", "Weather API"],
    link: "https://github.com/Dr-Pierrot/weather-app",
    status: "Complete",
    type: "Web App",
    icon: "⚡",
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
    desc: "Feature-rich task manager with full CRUD operations built in pure vanilla JavaScript.",
    longDesc: "A refined second iteration of a task management application built entirely in vanilla JavaScript. Supports full CRUD operations — create, read, update, and delete — with local data persistence. Demonstrates clean separation of concerns and attention to micro-interactions without relying on any external libraries.",
    stack: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/Dr-Pierrot/todo_list2",
    status: "Complete",
    type: "Web App",
    icon: "📜",
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
    desc: "Java desktop app prototype with a fully finished Swing GUI, showcasing OOP architecture and MVC design.",
    longDesc: "A Java desktop application prototype featuring a fully realized user interface built with Java Swing. Demonstrates solid object-oriented programming principles — encapsulation, inheritance, and polymorphism — applied to a real GUI application with clearly separated model, view, and controller layers.",
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

const ALL_TYPES = ["All", ...Array.from(new Set(projects.map(p => p.type)))];

const STATUS_STYLE: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  "In Progress": { bg: "rgba(100,50,0,0.2)", border: "rgba(180,80,0,0.4)", text: "#cc7700", dot: "#cc6600" },
  "Complete":    { bg: "rgba(0,50,20,0.15)", border: "rgba(0,130,60,0.3)",  text: "#007733", dot: "#009944" },
};

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const sc = STATUS_STYLE[project.status];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(6px)",animation:"modal-bg 0.25s ease both" }} />
      <div style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:501,width:"min(680px,94vw)",maxHeight:"88vh",overflowY:"auto",background:"linear-gradient(160deg,#0e0000,#070000)",border:"1px solid rgba(180,0,0,0.5)",borderRadius:"4px",animation:"modal-in 0.3s cubic-bezier(0.16,1,0.3,1) both",scrollbarWidth:"thin",scrollbarColor:"rgba(139,0,0,0.4) transparent" }}>
        <div style={{ height:"2px",background:"linear-gradient(90deg,transparent,#cc2200,#ff4400,#cc2200,transparent)",boxShadow:"0 0 14px rgba(200,50,0,0.6)" }} />

        {/* Close btn */}
        <button onClick={onClose} aria-label="Close"
          style={{ position:"sticky",top:0,float:"right",margin:"12px 14px 0 0",width:"32px",height:"32px",background:"rgba(60,0,0,0.5)",border:"1px solid rgba(120,0,0,0.4)",borderRadius:"2px",color:"#8b2020",fontSize:"15px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",zIndex:1,clipPath:"polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }}
          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.color="#ff4422"; el.style.background="rgba(100,0,0,0.6)"; }}
          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.color="#8b2020"; el.style.background="rgba(60,0,0,0.5)"; }}
        >✕</button>

        <div style={{ padding:"20px 28px 32px",clear:"both" }}>
          {/* Header */}
          <div style={{ display:"flex",alignItems:"flex-start",gap:"14px",marginBottom:"18px" }}>
            <span style={{ fontSize:"34px",lineHeight:1,flexShrink:0 }}>{project.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px",flexWrap:"wrap" as const }}>
                <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#4a1010",letterSpacing:"3px",textTransform:"uppercase" as const }}>{project.type}</span>
                <span style={{ color:"rgba(100,0,0,0.35)" }}>·</span>
                <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"2px" }}>{project.year}</span>
              </div>
              <h2 style={{ fontFamily:"'Cinzel Decorative',serif",fontSize:"clamp(1rem,3vw,1.35rem)",color:"#cc2200",margin:"0 0 10px",lineHeight:1.3 }}>{project.name}</h2>
              <div style={{ display:"flex",alignItems:"center",gap:"6px",padding:"4px 12px",background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:"2px",width:"fit-content" }}>
                <div style={{ width:"5px",height:"5px",borderRadius:"50%",background:sc.dot,boxShadow:`0 0 6px ${sc.dot}`,animation:"pulse-blood 2s infinite" }} />
                <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:sc.text,letterSpacing:"1.5px",textTransform:"uppercase" as const }}>{project.status}</span>
              </div>
            </div>
          </div>

          <div style={{ height:"1px",background:"linear-gradient(90deg,transparent,rgba(100,0,0,0.4),transparent)",marginBottom:"18px" }} />

          <p style={{ color:"#5a2828",fontSize:"14px",lineHeight:1.9,fontFamily:"'Crimson Text',serif",marginBottom:"22px" }}>{project.longDesc}</p>

          {/* Features */}
          <div style={{ marginBottom:"22px" }}>
            <div style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"3px",textTransform:"uppercase" as const,marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px" }}>
              <span style={{ color:"rgba(139,0,0,0.5)" }}>⛧</span> Key Features
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px" }}>
              {project.features.map(f=>(
                <div key={f} style={{ display:"flex",gap:"8px",alignItems:"flex-start" }}>
                  <span style={{ color:"#6b0000",fontSize:"10px",marginTop:"4px",flexShrink:0 }}>▸</span>
                  <span style={{ color:"#4a2020",fontSize:"13px",fontFamily:"'Crimson Text',serif",lineHeight:1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div style={{ marginBottom:"26px" }}>
            <div style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"3px",textTransform:"uppercase" as const,marginBottom:"10px",display:"flex",alignItems:"center",gap:"8px" }}>
              <span style={{ color:"rgba(139,0,0,0.5)" }}>⛧</span> Ritual Stack
            </div>
            <div style={{ display:"flex",flexWrap:"wrap" as const,gap:"7px" }}>
              {project.stack.map(s=>(
                <span key={s} style={{ padding:"4px 14px",background:"rgba(60,0,0,0.35)",border:"1px solid rgba(100,0,0,0.3)",borderRadius:"2px",color:"#c04040",fontSize:"12px",fontFamily:"'Courier New',monospace" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"10px 24px",background:"linear-gradient(135deg,#6b0000,#3d0000)",border:"1px solid #8b0000",borderRadius:"2px",color:"#ffccaa",fontFamily:"'Cinzel',serif",fontSize:"10px",letterSpacing:"2px",textDecoration:"none",textTransform:"uppercase" as const,clipPath:"polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)",transition:"all 0.25s" }}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,#8b0000,#5a0000)"; el.style.color="#fff"; el.style.boxShadow="0 0 24px rgba(139,0,0,0.5)"; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,#6b0000,#3d0000)"; el.style.color="#ffccaa"; el.style.boxShadow="none"; }}
          >⛧ View on GitHub</a>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   FILTER TABS
───────────────────────────────────────────── */
const FilterTabs = ({ active, onChange, counts }: { active: string; onChange: (t:string)=>void; counts: Record<string,number> }) => (
  <div style={{ display:"flex",flexWrap:"wrap" as const,gap:"8px",justifyContent:"center",marginBottom:"2.5rem" }}>
    {ALL_TYPES.map(t => {
      const isActive = t === active;
      return (
        <button key={t} onClick={()=>onChange(t)} style={{
          padding:"7px 18px",
          background: isActive ? "linear-gradient(135deg,rgba(120,0,0,0.5),rgba(70,0,0,0.5))" : "rgba(15,0,0,0.5)",
          border:`1px solid ${isActive ? "rgba(200,0,0,0.6)" : "rgba(80,0,0,0.3)"}`,
          borderRadius:"2px",cursor:"pointer",
          color: isActive ? "#ff4422" : "#4a1010",
          fontFamily:"'Cinzel',serif",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase" as const,
          transition:"all 0.25s",
          clipPath:"polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
          boxShadow: isActive ? "0 0 18px rgba(180,0,0,0.25)" : "none",
          display:"flex",alignItems:"center",gap:"7px",
        }}
          onMouseEnter={e=>{ if(!isActive){ const el=e.currentTarget as HTMLElement; el.style.color="#cc2200"; el.style.borderColor="rgba(140,0,0,0.5)"; } }}
          onMouseLeave={e=>{ if(!isActive){ const el=e.currentTarget as HTMLElement; el.style.color="#4a1010"; el.style.borderColor="rgba(80,0,0,0.3)"; } }}
        >
          <span>{t}</span>
          <span style={{ background: isActive?"rgba(200,0,0,0.25)":"rgba(50,0,0,0.3)",border:`1px solid ${isActive?"rgba(200,0,0,0.4)":"rgba(70,0,0,0.25)"}`,borderRadius:"2px",padding:"1px 6px",fontSize:"8px",color: isActive?"#ff6644":"#3a1010" }}>
            {counts[t]??0}
          </span>
        </button>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────
   FEATURED CARD
───────────────────────────────────────────── */
const FeaturedCard = ({ project, onOpen }: { project: Project; onOpen: ()=>void }) => {
  const [hovered, setHovered] = useState(false);
  const sc = STATUS_STYLE[project.status];
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ background: hovered?"linear-gradient(135deg,rgba(22,2,0,0.98),rgba(14,0,0,0.98))":"linear-gradient(135deg,rgba(14,0,0,0.92),rgba(8,0,0,0.92))",border:`1px solid ${hovered?"rgba(200,0,0,0.65)":"rgba(130,0,0,0.4)"}`,borderRadius:"4px",padding:"36px",position:"relative",overflow:"hidden",transition:"all 0.35s ease",transform:hovered?"translateY(-4px)":"translateY(0)",boxShadow:hovered?"0 16px 70px rgba(120,0,0,0.35),0 0 0 1px rgba(200,0,0,0.08)":"0 0 40px rgba(60,0,0,0.15)",cursor:"default" }}
    >
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:hovered?"linear-gradient(90deg,transparent,#cc2200,#ff4400,#cc2200,transparent)":"linear-gradient(90deg,transparent,rgba(160,0,0,0.6),transparent)",boxShadow:hovered?"0 0 14px rgba(200,50,0,0.7)":"none",transition:"all 0.35s" }} />
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"3px",background:hovered?"linear-gradient(180deg,transparent,#cc2200,#ff4400,#cc2200,transparent)":"linear-gradient(180deg,transparent,rgba(120,0,0,0.5),transparent)",transition:"all 0.35s" }} />
      <div style={{ position:"absolute",top:"-20%",right:"-5%",width:"320px",height:"320px",background:`radial-gradient(circle,rgba(120,0,0,${hovered?"0.2":"0.07"}) 0%,transparent 70%)`,pointerEvents:"none",transition:"all 0.4s" }} />
      <div style={{ position:"absolute",bottom:"14px",right:"20px",fontSize:"64px",color:`rgba(80,0,0,${hovered?"0.12":"0.055"})`,lineHeight:1,pointerEvents:"none",transition:"all 0.35s",userSelect:"none" as const }}>⛧</div>

      {/* Labels row */}
      <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px",flexWrap:"wrap" as const }}>
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#4a1010",letterSpacing:"3px",textTransform:"uppercase" as const }}>{project.type}</span>
        <span style={{ color:"rgba(100,0,0,0.35)",fontSize:"10px" }}>·</span>
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#8b2020",letterSpacing:"2px",textTransform:"uppercase" as const }}>⛧ Featured Work</span>
        <span style={{ color:"rgba(100,0,0,0.35)",fontSize:"10px" }}>·</span>
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"2px" }}>{project.year}</span>
        <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:"6px",padding:"4px 12px",background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:"2px" }}>
          <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:sc.dot,boxShadow:`0 0 7px ${sc.dot}`,animation:"pulse-blood 2s infinite" }} />
          <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:sc.text,letterSpacing:"1.5px",textTransform:"uppercase" as const,whiteSpace:"nowrap" as const }}>{project.status}</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:700,fontSize:"clamp(1.2rem,3vw,1.8rem)",color:hovered?"#ff4422":"#cc2200",margin:"0 0 14px",letterSpacing:"0.5px",lineHeight:1.25,transition:"color 0.3s" }}>
        {project.icon} {project.name}
      </h3>

      {/* Long desc */}
      <p style={{ color:"#5a2828",fontSize:"14px",lineHeight:1.85,fontFamily:"'Crimson Text',serif",margin:"0 0 20px",maxWidth:"680px" }}>{project.longDesc}</p>

      {/* Feature grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"6px",marginBottom:"22px" }}>
        {project.features.map(f=>(
          <div key={f} style={{ display:"flex",gap:"7px",alignItems:"flex-start" }}>
            <span style={{ color:"#6b0000",fontSize:"10px",marginTop:"4px",flexShrink:0 }}>▸</span>
            <span style={{ color:"#4a2525",fontSize:"12px",fontFamily:"'Crimson Text',serif",lineHeight:1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ display:"flex",flexWrap:"wrap" as const,gap:"7px",marginBottom:"22px" }}>
        {project.stack.map(s=>(
          <span key={s} style={{ padding:"4px 12px",background:hovered?"rgba(80,0,0,0.4)":"rgba(60,0,0,0.3)",border:"1px solid rgba(100,0,0,0.28)",borderRadius:"2px",color:hovered?"#c04040":"#7a3030",fontSize:"11px",fontFamily:"'Courier New',monospace",letterSpacing:"0.5px",transition:"all 0.3s" }}>{s}</span>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" as const }}>
        <button onClick={onOpen}
          style={{ padding:"10px 24px",background:"linear-gradient(135deg,#6b0000,#3d0000)",border:"1px solid #8b0000",borderRadius:"2px",color:"#ffccaa",fontFamily:"'Cinzel',serif",fontSize:"10px",letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase" as const,clipPath:"polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)",transition:"all 0.25s" }}
          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,#8b0000,#5a0000)"; el.style.color="#fff"; el.style.boxShadow="0 0 24px rgba(139,0,0,0.5)"; }}
          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,#6b0000,#3d0000)"; el.style.color="#ffccaa"; el.style.boxShadow="none"; }}
        >⛧ Full Details</button>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          style={{ padding:"10px 24px",background:"transparent",border:"1px solid rgba(120,0,0,0.5)",borderRadius:"2px",color:"#8b2020",fontFamily:"'Cinzel',serif",fontSize:"10px",letterSpacing:"2px",textDecoration:"none",textTransform:"uppercase" as const,clipPath:"polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)",transition:"all 0.25s",display:"inline-block" }}
          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="#8b0000"; el.style.color="#cc2200"; el.style.background="rgba(80,0,0,0.12)"; }}
          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(120,0,0,0.5)"; el.style.color="#8b2020"; el.style.background="transparent"; }}
        >GitHub →</a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STANDARD CARD
───────────────────────────────────────────── */
const ProjectCard = ({ project, index, onOpen }: { project: Project; index: number; onOpen: ()=>void }) => {
  const [hovered, setHovered] = useState(false);
  const sc = STATUS_STYLE[project.status];
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ display:"flex",flexDirection:"column" as const,background:hovered?"rgba(18,0,0,0.96)":"rgba(10,0,0,0.82)",border:`1px solid ${hovered?"rgba(180,0,0,0.55)":"rgba(100,0,0,0.28)"}`,borderRadius:"4px",padding:"24px",position:"relative",overflow:"hidden",transition:"all 0.3s ease",transform:hovered?"translateY(-5px)":"translateY(0)",boxShadow:hovered?"0 10px 48px rgba(100,0,0,0.3)":"none",animation:`fade-in-up 0.65s ease-out ${0.07*index}s both`,cursor:"default",height:"100%",boxSizing:"border-box" as const }}
    >
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",background:hovered?"linear-gradient(90deg,transparent,#cc2200,transparent)":"linear-gradient(90deg,transparent,rgba(100,0,0,0.4),transparent)",transition:"all 0.3s",boxShadow:hovered?"0 0 8px rgba(200,50,0,0.4)":"none" }} />
      {hovered && <div style={{ position:"absolute",top:"-30%",right:"-20%",width:"180px",height:"180px",background:"radial-gradient(circle,rgba(100,0,0,0.14) 0%,transparent 70%)",pointerEvents:"none" }} />}
      <div style={{ position:"absolute",bottom:"-8px",right:"-4px",fontSize:"54px",color:`rgba(60,0,0,${hovered?"0.1":"0.05"})`,lineHeight:1,userSelect:"none" as const,pointerEvents:"none",transition:"all 0.3s" }}>⛧</div>

      {/* Top row */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px" }}>
        <span style={{ fontSize:"22px",lineHeight:1 }}>{project.icon}</span>
        <div style={{ display:"flex",flexDirection:"column" as const,alignItems:"flex-end",gap:"5px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"5px",padding:"3px 10px",background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:"2px" }}>
            <div style={{ width:"5px",height:"5px",borderRadius:"50%",background:sc.dot,boxShadow:`0 0 5px ${sc.dot}` }} />
            <span style={{ fontFamily:"'Cinzel',serif",fontSize:"7px",color:sc.text,letterSpacing:"1px",textTransform:"uppercase" as const }}>{project.status}</span>
          </div>
          <span style={{ fontFamily:"'Cinzel',serif",fontSize:"7px",color:"#2a0e0e",letterSpacing:"1.5px" }}>{project.year}</span>
        </div>
      </div>

      <span style={{ fontFamily:"'Cinzel',serif",fontSize:"7px",color:"#3a1010",letterSpacing:"2.5px",textTransform:"uppercase" as const,display:"block",marginBottom:"5px" }}>{project.type}</span>
      <h3 style={{ fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:"13px",color:hovered?"#ff4422":"#8b2020",margin:"0 0 10px",letterSpacing:"0.5px",transition:"color 0.3s",lineHeight:1.4 }}>{project.name}</h3>
      <p style={{ color:"#4a2020",fontSize:"13px",lineHeight:1.8,fontFamily:"'Crimson Text',serif",margin:"0 0 14px",flex:1 }}>{project.desc}</p>

      {/* Stack */}
      <div style={{ display:"flex",flexWrap:"wrap" as const,gap:"5px",marginBottom:"14px" }}>
        {project.stack.slice(0, 4).map(s=>(
          <span key={s} style={{ padding:"2px 9px",background:"rgba(50,0,0,0.35)",border:"1px solid rgba(90,0,0,0.25)",borderRadius:"2px",color:"#7a3030",fontSize:"10px",fontFamily:"'Courier New',monospace" }}>{s}</span>
        ))}
        {project.stack.length > 4 && (
          <span style={{ padding:"2px 9px",background:"rgba(40,0,0,0.25)",border:"1px solid rgba(70,0,0,0.2)",borderRadius:"2px",color:"#4a2020",fontSize:"10px",fontFamily:"'Courier New',monospace" }}>+{project.stack.length-4}</span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display:"flex",gap:"8px",marginTop:"auto" }}>
        <button onClick={onOpen}
          style={{ flex:1,padding:"8px 12px",background:hovered?"rgba(80,0,0,0.4)":"rgba(50,0,0,0.25)",border:`1px solid ${hovered?"rgba(160,0,0,0.6)":"rgba(100,0,0,0.3)"}`,borderRadius:"2px",color:hovered?"#ff4422":"#6b1a1a",fontFamily:"'Cinzel',serif",fontSize:"9px",letterSpacing:"1.5px",textTransform:"uppercase" as const,cursor:"pointer",transition:"all 0.25s",clipPath:"polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }}
        >Details</button>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          style={{ padding:"8px 12px",background:"transparent",border:"1px solid rgba(80,0,0,0.3)",borderRadius:"2px",color:"#4a1010",fontFamily:"'Cinzel',serif",fontSize:"9px",letterSpacing:"1px",textDecoration:"none",textTransform:"uppercase" as const,transition:"all 0.25s",clipPath:"polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",display:"flex",alignItems:"center" }}
          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.color="#cc2200"; el.style.borderColor="rgba(139,0,0,0.5)"; }}
          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.color="#4a1010"; el.style.borderColor="rgba(80,0,0,0.3)"; }}
        >GitHub</a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const filtered = activeFilter === "All" ? projects : projects.filter(p=>p.type===activeFilter);
  const featured = filtered.filter(p=>p.highlight);
  const rest = filtered.filter(p=>!p.highlight);

  const counts: Record<string,number> = { All: projects.length };
  ALL_TYPES.slice(1).forEach(t=>{ counts[t]=projects.filter(p=>p.type===t).length; });

  const handleFilter = (t: string) => { setActiveFilter(t); setAnimKey(k=>k+1); };
  const openModal  = useCallback((p: Project) => setModalProject(p), []);
  const closeModal = useCallback(() => setModalProject(null), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes reveal {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.05; transform:rotate(0deg); }
          50%      { opacity:0.09; transform:rotate(180deg); }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6); opacity:1; }
          50%       { box-shadow:0 0 0 5px rgba(180,0,0,0); opacity:0.7; }
        }
        @keyframes ember-rise {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          18%  { opacity:0.9; }
          80%  { opacity:0.3; }
          100% { transform:translateY(-90px) translateX(var(--drift,20px)); opacity:0; }
        }
        @keyframes modal-bg {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes modal-in {
          from { opacity:0; transform:translate(-50%,calc(-50% + 22px)); }
          to   { opacity:1; transform:translate(-50%,-50%); }
        }

        .proj-revealed    { animation: reveal 0.85s ease-out both; }
        .proj-revealed-d1 { animation: reveal 0.85s ease-out 0.12s both; }
        .proj-revealed-d2 { animation: reveal 0.85s ease-out 0.24s both; }
        .proj-revealed-d3 { animation: reveal 0.85s ease-out 0.36s both; }

        .proj-ember {
          position:absolute; width:2px; height:2px; border-radius:50%;
          background:radial-gradient(circle,#ff6600 0%,#ff2200 100%);
          pointer-events:none;
          animation:ember-rise var(--dur,4s) ease-out var(--delay,0s) infinite;
          opacity:0;
        }
      `}</style>

      {modalProject && <ProjectModal project={modalProject} onClose={closeModal} />}

      <section id="projects" ref={sectionRef} style={{ width:"100%",position:"relative",background:"radial-gradient(110% 70% at 50% 100%,#100000 0%,#060000 55%,#030000 100%)",padding:"5rem 1.5rem",overflow:"hidden",fontFamily:"'Crimson Text',serif" }}>

        {/* Top blood drip */}
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"22px",pointerEvents:"none" }} viewBox="0 0 1440 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z" fill="rgba(80,0,0,0.65)" />
        </svg>

        {/* Sigil watermark */}
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"540px",color:"rgba(50,0,0,0.05)",pointerEvents:"none",userSelect:"none",lineHeight:1,animation:"pulse-sigil 18s ease-in-out infinite" }}>⛧</div>

        {/* Crack texture */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(172deg,transparent,transparent 90px,rgba(50,0,0,0.025) 90px,rgba(50,0,0,0.025) 91px),repeating-linear-gradient(80deg,transparent,transparent 70px,rgba(40,0,0,0.02) 70px,rgba(40,0,0,0.02) 71px)",pointerEvents:"none" }} />

        {/* Embers */}
        {[...Array(12)].map((_,i)=>(
          <div key={i} className="proj-ember" style={{ left:`${5+i*8}%`,bottom:`${8+(i%4)*12}%`,"--drift":`${(i%2===0?1:-1)*(12+i*4)}px`,"--dur":`${2.5+(i%4)}s`,"--delay":`${i*0.5}s` } as React.CSSProperties} />
        ))}

        <div style={{ maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1 }}>

          {/* Header */}
          <div className={inView?"proj-revealed":""} style={{ textAlign:"center",marginBottom:"2.5rem" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"14px",marginBottom:"1.2rem" }}>
              <div style={{ flex:1,maxWidth:"180px",height:"1px",background:"linear-gradient(90deg,transparent,rgba(139,0,0,0.55))" }} />
              <span style={{ color:"rgba(139,0,0,0.55)",fontSize:"14px" }}>⛧</span>
              <span style={{ fontFamily:"'Cinzel',serif",fontSize:"9px",color:"#3a1010",letterSpacing:"4px",textTransform:"uppercase" }}>Bound by Blood & Code</span>
              <span style={{ color:"rgba(139,0,0,0.55)",fontSize:"14px" }}>⛧</span>
              <div style={{ flex:1,maxWidth:"180px",height:"1px",background:"linear-gradient(90deg,rgba(139,0,0,0.55),transparent)" }} />
            </div>
            <h2 style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.4rem)",background:"linear-gradient(180deg,#ffffff 0%,#cc2200 55%,#6b0000 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",margin:"0 0 0.8rem" }}>Dark Works</h2>
            <p style={{ color:"#4a2020",fontSize:"15px",fontFamily:"'Crimson Text',serif",fontStyle:"italic",maxWidth:"440px",margin:"0 auto 1.2rem",lineHeight:1.8 }}>
              Systems summoned from nothing — forged in code, bound to purpose
            </p>
            {/* Count badge */}
            <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 18px",background:"rgba(50,0,0,0.2)",border:"1px solid rgba(100,0,0,0.3)",borderRadius:"2px" }}>
              <span style={{ fontFamily:"'Cinzel Decorative',serif",fontSize:"15px",color:"#cc2200" }}>{projects.length}</span>
              <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"2px",textTransform:"uppercase" }}>Relics Forged</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className={inView?"proj-revealed-d1":""}>
            <FilterTabs active={activeFilter} onChange={handleFilter} counts={counts} />
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className={inView?"proj-revealed-d2":""} style={{ marginBottom:"16px" }}>
              {featured.map(p=><FeaturedCard key={p.id} project={p} onOpen={()=>openModal(p)} />)}
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div key={animKey} style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"14px" }} className={inView?"proj-revealed-d3":""}>
              {rest.map((p,i)=><ProjectCard key={p.id} project={p} index={i} onOpen={()=>openModal(p)} />)}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign:"center",padding:"4rem 0",color:"#3a1010",fontFamily:"'Crimson Text',serif",fontStyle:"italic",fontSize:"16px" }}>
              No relics found in this realm...
            </div>
          )}

          {/* GitHub CTA */}
          <div style={{ textAlign:"center",marginTop:"3.5rem" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"16px",marginBottom:"1.8rem" }}>
              <div style={{ flex:1,height:"1px",background:"linear-gradient(90deg,transparent,rgba(100,0,0,0.35))" }} />
              <span style={{ color:"rgba(100,0,0,0.35)",fontSize:"14px" }}>⛧</span>
              <div style={{ flex:1,height:"1px",background:"linear-gradient(90deg,rgba(100,0,0,0.35),transparent)" }} />
            </div>
            <p style={{ color:"#3a1010",fontSize:"13px",fontFamily:"'Crimson Text',serif",fontStyle:"italic",marginBottom:"1.2rem",letterSpacing:"0.5px" }}>
              More relics lie dormant in the vault
            </p>
            <a href="https://github.com/Dr-Pierrot" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex",alignItems:"center",gap:"10px",padding:"13px 34px",background:"linear-gradient(135deg,rgba(80,0,0,0.3),rgba(40,0,0,0.3))",border:"1px solid rgba(139,0,0,0.5)",borderRadius:"2px",color:"#8b2020",fontFamily:"'Cinzel',serif",fontSize:"11px",letterSpacing:"2px",textDecoration:"none",textTransform:"uppercase",transition:"all 0.25s",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
              onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,rgba(120,0,0,0.45),rgba(70,0,0,0.45))"; el.style.borderColor="rgba(200,0,0,0.7)"; el.style.color="#ff4422"; el.style.boxShadow="0 0 30px rgba(139,0,0,0.35)"; el.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="linear-gradient(135deg,rgba(80,0,0,0.3),rgba(40,0,0,0.3))"; el.style.borderColor="rgba(139,0,0,0.5)"; el.style.color="#8b2020"; el.style.boxShadow="none"; el.style.transform="translateY(0)"; }}
            >
              <span>⛧</span><span>Enter the GitHub Vault</span>
            </a>
          </div>

        </div>

        {/* Bottom blood drip */}
        <svg style={{ position:"absolute",bottom:0,left:0,width:"100%",height:"22px",pointerEvents:"none",transform:"scaleY(-1)" }} viewBox="0 0 1440 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z" fill="rgba(80,0,0,0.65)" />
        </svg>
      </section>
    </>
  );
};

export default Projects;
