"use client";
import React, { useEffect, useState } from "react";

const profile = {
  alias: "DR-PIERROT",
  name: "Jaycee Capulong",
  role: "Fullstack Developer",
  location: "Philippines",
  email: "jaycee.capulong@dct.edu.ph",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  portfolio: "https://dr-pierrot-portfolio.vercel.app/",
};

const navLinks = [
  { label: "Home",     href: "#" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

/* ── Scroll-to-top button ── */
const ScrollTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      style={{
        position: "fixed", bottom: "2rem", right: "2rem",
        width: "44px", height: "44px",
        background: "rgba(80,0,0,0.5)",
        border: "1px solid rgba(180,0,0,0.5)",
        borderRadius: "2px",
        color: "#cc2200",
        fontSize: "18px",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.3s ease",
        zIndex: 200,
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
        backdropFilter: "blur(8px)",
        boxShadow: visible ? "0 0 20px rgba(139,0,0,0.4)" : "none",
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(120,0,0,0.7)";
        el.style.color = "#ff4422";
        el.style.boxShadow = "0 0 30px rgba(180,0,0,0.5)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(80,0,0,0.5)";
        el.style.color = "#cc2200";
        el.style.boxShadow = "0 0 20px rgba(139,0,0,0.4)";
      }}
    >
      ⛧
    </button>
  );
};

/* ── Ember particle ── */
const Ember = ({ style }: { style: React.CSSProperties }) => (
  <div style={{
    position: "absolute", width: "2px", height: "2px", borderRadius: "50%",
    background: "radial-gradient(circle,#ff6600 0%,#ff2200 100%)",
    pointerEvents: "none", ...style,
  }} />
);

/* ── Main Footer ── */
const Footer = () => {
  const year = new Date().getFullYear();
  const [embers, setEmbers] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const spawn = () => {
      const id = Date.now() + Math.random();
      const drift = (Math.random() - 0.5) * 80;
      setEmbers(prev => [...prev.slice(-20), {
        id,
        style: {
          left: `${10 + Math.random() * 80}%`,
          bottom: "0",
          animation: `rise-ember ${2 + Math.random() * 2}s ease-out forwards`,
          "--drift": `${drift}px`,
        } as React.CSSProperties,
      }]);
    };
    const iv = setInterval(spawn, 500);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes rise-ember {
          0%   { transform:translate(0,0);opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:0.4; }
          100% { transform:translate(var(--drift,0px),-120px);opacity:0; }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.06;transform:rotate(0deg) scale(1); }
          50%      { opacity:0.12;transform:rotate(180deg) scale(1.03); }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6);opacity:1; }
          50%       { box-shadow:0 0 0 5px rgba(180,0,0,0);opacity:0.7; }
        }
        @keyframes flicker {
          0%,100% { opacity:1; }
          93% { opacity:0.9; } 94% { opacity:1; }
          97% { opacity:0.95; } 98% { opacity:1; }
        }
        @keyframes spin-slow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        .footer-nav-link {
          font-family:'Cinzel',serif;
          font-size:10px;
          letter-spacing:2px;
          color:#4a1010;
          text-decoration:none;
          text-transform:uppercase;
          transition:color 0.25s;
          position:relative;
          padding-bottom:3px;
        }
        .footer-nav-link::after {
          content:'';
          position:absolute;
          bottom:0;left:0;
          width:0;height:1px;
          background:linear-gradient(90deg,#8b0000,#cc2200);
          transition:width 0.3s ease;
          box-shadow:0 0 6px rgba(200,50,0,0.5);
        }
        .footer-nav-link:hover { color:#cc2200; }
        .footer-nav-link:hover::after { width:100%; }

        .footer-social-btn {
          width:38px;height:38px;
          display:flex;align-items:center;justify-content:center;
          background:rgba(50,0,0,0.4);
          border:1px solid rgba(100,0,0,0.35);
          border-radius:2px;
          color:#5a1a1a;
          text-decoration:none;
          transition:all 0.25s;
          clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
        }
        .footer-social-btn:hover {
          background:rgba(100,0,0,0.4);
          border-color:rgba(180,0,0,0.6);
          color:#cc2200;
          box-shadow:0 0 16px rgba(139,0,0,0.35);
          transform:translateY(-2px);
        }
      `}</style>

      {/* Scroll-to-top */}
      <ScrollTop />

      <footer style={{
        width: "100%", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg,#030000 0%,#060000 40%,#020000 100%)",
        borderTop: "1px solid rgba(100,0,0,0.4)",
        fontFamily: "'Crimson Text',serif",
        animation: "flicker 10s infinite",
      }}>

        {/* Top blood drip */}
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"22px",pointerEvents:"none" }} viewBox="0 0 1440 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z"
            fill="rgba(70,0,0,0.7)" />
        </svg>

        {/* Ground hellfire glow */}
        <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"70%",height:"60%",background:"radial-gradient(ellipse,rgba(100,5,0,0.35) 0%,rgba(60,0,0,0.1) 50%,transparent 70%)",filter:"blur(30px)",pointerEvents:"none" }} />

        {/* Giant background sigil */}
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"380px",color:"rgba(50,0,0,0.06)",pointerEvents:"none",userSelect:"none",lineHeight:1,animation:"pulse-sigil 14s ease-in-out infinite" }}>⛧</div>

        {/* Crack texture */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(170deg,transparent,transparent 80px,rgba(50,0,0,0.03) 80px,rgba(50,0,0,0.03) 81px)",pointerEvents:"none" }} />

        {/* Embers */}
        {embers.map(e => <Ember key={e.id} style={e.style} />)}

        {/* ── Main content ── */}
        <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"3.5rem 1.5rem 2rem",position:"relative",zIndex:1 }}>

          {/* Top section: logo + nav + socials */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
            gap:"2.5rem",
            marginBottom:"3rem",
            paddingBottom:"2.5rem",
            borderBottom:"1px solid rgba(80,0,0,0.25)",
          }}>

            {/* Brand */}
            <div style={{ display:"flex",flexDirection:"column" as const,gap:"14px" }}>
              {/* Rotating sigil logo */}
              <div style={{ display:"flex",alignItems:"center",gap:"12px" }}>
                <div style={{ position:"relative",width:"42px",height:"42px",flexShrink:0 }}>
                  {/* Rotating rune ring */}
                  <div style={{
                    position:"absolute",inset:0,borderRadius:"50%",
                    background:"conic-gradient(from 0deg,transparent 0%,#6b0000 15%,transparent 30%,#cc2200 45%,transparent 60%,#6b0000 75%,transparent 90%)",
                    animation:"spin-slow 8s linear infinite",
                  }} />
                  {/* Inner circle */}
                  <div style={{
                    position:"absolute",inset:"3px",borderRadius:"50%",
                    background:"#060000",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"16px",
                  }}>⛧</div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Cinzel Decorative',serif",fontSize:"14px",color:"#cc2200",letterSpacing:"1px",lineHeight:1 }}>{profile.alias}</div>
                  <div style={{ fontFamily:"'Crimson Text',serif",fontStyle:"italic",fontSize:"12px",color:"#3a1010",marginTop:"3px" }}>{profile.name}</div>
                </div>
              </div>

              <p style={{ color:"#3a1515",fontSize:"13px",lineHeight:1.8,fontFamily:"'Crimson Text',serif",fontStyle:"italic",maxWidth:"240px" }}>
                Fullstack Developer forging scalable systems from the depths of the Philippines.
              </p>

              {/* Status dot */}
              <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#009944",boxShadow:"0 0 8px #009944",animation:"pulse-blood 2s infinite" }} />
                <span style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#2a3a2a",letterSpacing:"2px",textTransform:"uppercase" }}>Available for work</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px" }}>
                <span style={{ color:"rgba(139,0,0,0.4)" }}>⛧</span>
                <span>Navigation</span>
              </div>
              <nav style={{ display:"flex",flexDirection:"column" as const,gap:"12px" }}>
                {navLinks.map(l => (
                  <a key={l.label} href={l.href} className="footer-nav-link">{l.label}</a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#3a1010",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px" }}>
                <span style={{ color:"rgba(139,0,0,0.4)" }}>⛧</span>
                <span>Summon Me</span>
              </div>
              <div style={{ display:"flex",flexDirection:"column" as const,gap:"12px" }}>
                {[
                  { icon:"📍", value: profile.location },
                  { icon:"✉️", value: profile.email },
                ].map(item => (
                  <div key={item.value} style={{ display:"flex",gap:"10px",alignItems:"flex-start" }}>
                    <span style={{ fontSize:"12px",marginTop:"2px",flexShrink:0 }}>{item.icon}</span>
                    <span style={{ color:"#4a2020",fontSize:"13px",fontFamily:"'Crimson Text',serif",wordBreak:"break-word" as const }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div style={{ display:"flex",gap:"8px",marginTop:"18px" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="footer-social-btn" aria-label={s.label} title={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            flexWrap:"wrap" as const,
            gap:"12px",
          }}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
              <span style={{ color:"rgba(100,0,0,0.4)",fontSize:"12px" }}>⛧</span>
              <p style={{ fontFamily:"'Crimson Text',serif",fontSize:"12px",color:"#2a1010",margin:0 }}>
                © {year} {profile.alias} — {profile.name}. All rights reserved.
              </p>
            </div>

            <p style={{ fontFamily:"'Cinzel',serif",fontSize:"8px",color:"#2a1010",letterSpacing:"2px",textTransform:"uppercase",margin:0 }}>
              Forged in darkness · Philippines
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
