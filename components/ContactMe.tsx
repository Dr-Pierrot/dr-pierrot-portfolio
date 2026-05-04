"use client";
import React, { useEffect, useRef, useState } from "react";

const CONTACT_INFO = {
  email: "jaycee.capulong@dct.edu.ph",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  location: "Philippines",
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldError = Partial<Record<keyof FormState, string>>;
type SendStatus = "idle" | "sending" | "success" | "error";

/* ── Intersection observer ── */
const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

/* ── Field validation ── */
const validate = (form: FormState): FieldError => {
  const errors: FieldError = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email";
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters";
  return errors;
};

/* ── Styled Input ── */
const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  multiline,
  rows,
}: {
  label: string;
  id: keyof FormState;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: focused ? "rgba(18,0,0,0.9)" : "rgba(10,0,0,0.7)",
    border: `1px solid ${hasError ? "rgba(200,50,0,0.7)" : focused ? "rgba(180,0,0,0.65)" : "rgba(100,0,0,0.3)"}`,
    borderRadius: "2px",
    color: "#c05050",
    fontSize: "13px",
    fontFamily: "'Crimson Text', serif",
    outline: "none",
    transition: "all 0.25s",
    resize: "none",
    boxSizing: "border-box" as const,
    boxShadow: focused
      ? `0 0 0 2px rgba(140,0,0,0.12), inset 0 0 20px rgba(60,0,0,0.15)`
      : "none",
    lineHeight: 1.7,
    clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "8px",
          color: hasError ? "#cc4422" : focused ? "#8b2020" : "#3a1010",
          letterSpacing: "2.5px",
          textTransform: "uppercase" as const,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "color 0.2s",
        }}
      >
        <span style={{ color: hasError ? "#cc2200" : "rgba(139,0,0,0.45)" }}>
          ⛧
        </span>
        {label}
      </label>

      <div style={{ position: "relative" }}>
        {/* Focus glow */}
        {focused && (
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "2px",
              background:
                "linear-gradient(90deg,transparent,rgba(139,0,0,0.2),transparent)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
        {multiline ? (
          <textarea
            id={id}
            value={value}
            rows={rows || 5}
            placeholder={placeholder}
            style={{ ...sharedStyle, display: "block" }}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            style={{ ...sharedStyle, display: "block" }}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
          />
        )}
      </div>

      {/* Error message */}
      <div
        style={{
          height: hasError ? "18px" : "0px",
          overflow: "hidden",
          transition: "height 0.2s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Crimson Text',serif",
            fontSize: "12px",
            color: "#cc3322",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span style={{ fontSize: "10px" }}>▸</span> {error}
        </span>
      </div>
    </div>
  );
};

/* ── Contact info pill ── */
const InfoPill = ({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "center",
        padding: "14px 18px",
        background: hovered ? "rgba(18,0,0,0.95)" : "rgba(10,0,0,0.75)",
        border: `1px solid ${hovered ? "rgba(180,0,0,0.55)" : "rgba(100,0,0,0.28)"}`,
        borderRadius: "3px",
        transition: "all 0.25s",
        cursor: href ? "pointer" : "default",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg,transparent,#cc2200,transparent)"
            : "linear-gradient(90deg,transparent,rgba(100,0,0,0.35),transparent)",
          transition: "all 0.25s",
        }}
      />
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          flexShrink: 0,
          background:
            "radial-gradient(circle,rgba(30,0,0,0.9),rgba(8,0,0,0.9))",
          border: `1px solid ${hovered ? "rgba(160,0,0,0.6)" : "rgba(100,0,0,0.3)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          boxShadow: hovered ? "0 0 14px rgba(120,0,0,0.3)" : "none",
          transition: "all 0.25s",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "7px",
            color: "#3a1010",
            letterSpacing: "2px",
            textTransform: "uppercase" as const,
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Crimson Text',serif",
            fontSize: "13px",
            color: hovered ? "#cc2200" : "#6a3030",
            wordBreak: "break-all" as const,
            transition: "color 0.25s",
          }}
        >
          {value}
        </div>
      </div>
      {href && (
        <div
          style={{
            marginLeft: "auto",
            fontSize: "12px",
            color: hovered ? "#cc2200" : "#3a1010",
            transition: "color 0.25s",
            flexShrink: 0,
          }}
        >
          →
        </div>
      )}
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
    >
      {inner}
    </a>
  ) : (
    inner
  );
};

/* ── Ember ── */
const Ember = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={{
      position: "absolute",
      width: "2px",
      height: "2px",
      borderRadius: "50%",
      background: "radial-gradient(circle,#ff6600 0%,#ff2200 100%)",
      pointerEvents: "none",
      ...style,
    }}
  />
);

/* ── Main component ── */
const ContactMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [embers, setEmbers] = useState<
    { id: number; style: React.CSSProperties }[]
  >([]);

  const errors = validate(form);
  const visibleErrors: FieldError = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k as keyof FormState]),
  );
  const isValid = Object.keys(errors).length === 0;

  const setField = (key: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));
  const touchField = (key: keyof FormState) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;
    setSendStatus("sending");
    // Simulate send — replace with your real API call / EmailJS / Formspree
    await new Promise((r) => setTimeout(r, 1800));
    setSendStatus("success");
    setTimeout(() => {
      setSendStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    }, 4000);
  };

  useEffect(() => {
    const spawn = () => {
      const id = Date.now() + Math.random();
      const drift = (Math.random() - 0.5) * 100;
      setEmbers((prev) => [
        ...prev.slice(-20),
        {
          id,
          style: {
            left: `${10 + Math.random() * 80}%`,
            bottom: "0",
            animation: `rise-ember ${2 + Math.random() * 2}s ease-out forwards`,
            "--drift": `${drift}px`,
          } as React.CSSProperties,
        },
      ]);
    };
    const iv = setInterval(spawn, 450);
    return () => clearInterval(iv);
  }, []);

  const subjects = [
    "Project Inquiry",
    "Collaboration",
    "Job Opportunity",
    "Freelance Work",
    "General Question",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes rise-ember {
          0%   { transform:translate(0,0);opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:0.4; }
          100% { transform:translate(var(--drift,0px),-140px);opacity:0; }
        }
        @keyframes fade-in-up {
          from { opacity:0;transform:translateY(28px); }
          to   { opacity:1;transform:translateY(0); }
        }
        @keyframes reveal {
          from { opacity:0;transform:translateY(32px); }
          to   { opacity:1;transform:translateY(0); }
        }
        @keyframes pulse-sigil {
          0%,100% { opacity:0.055;transform:rotate(0deg); }
          50%      { opacity:0.10;transform:rotate(180deg); }
        }
        @keyframes pulse-blood {
          0%,100% { box-shadow:0 0 0 0 rgba(180,0,0,0.6);opacity:1; }
          50%       { box-shadow:0 0 0 5px rgba(180,0,0,0);opacity:0.7; }
        }
        @keyframes spin-rune {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes sending-pulse {
          0%,100% { opacity:0.6;transform:scale(1); }
          50%       { opacity:1;transform:scale(1.15); }
        }
        @keyframes success-glow {
          0%,100% { box-shadow:0 0 20px rgba(0,120,40,0.3); }
          50%       { box-shadow:0 0 50px rgba(0,160,60,0.5); }
        }
        @keyframes success-reveal {
          from { opacity:0;transform:translateY(10px) scale(0.95); }
          to   { opacity:1;transform:translateY(0) scale(1); }
        }
        @keyframes char-blink {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }

        .contact-revealed    { animation:reveal 0.85s ease-out both; }
        .contact-revealed-d1 { animation:reveal 0.85s ease-out 0.12s both; }
        .contact-revealed-d2 { animation:reveal 0.85s ease-out 0.24s both; }

        .contact-submit-btn {
          width:100%;
          padding:14px 32px;
          background:linear-gradient(135deg,#6b0000,#3d0000);
          border:1px solid #8b0000;
          border-radius:2px;
          color:#ffccaa;
          font-family:'Cinzel',serif;
          font-size:12px;
          letter-spacing:2.5px;
          cursor:pointer;
          text-transform:uppercase;
          transition:all 0.3s;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          position:relative;
          overflow:hidden;
        }
        .contact-submit-btn:hover:not(:disabled) {
          background:linear-gradient(135deg,#8b0000,#5a0000);
          box-shadow:0 0 30px rgba(139,0,0,0.55),0 0 60px rgba(80,0,0,0.25);
          transform:translateY(-2px);
          color:#fff;
        }
        .contact-submit-btn:active:not(:disabled) { transform:scale(0.98); }
        .contact-submit-btn:disabled { opacity:0.5;cursor:not-allowed; }

        .contact-subject-chip {
          padding:5px 14px;
          background:rgba(30,0,0,0.6);
          border:1px solid rgba(90,0,0,0.35);
          border-radius:2px;
          color:#4a1818;
          font-family:'Cinzel',serif;
          font-size:9px;
          letter-spacing:1px;
          cursor:pointer;
          transition:all 0.2s;
          clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
          white-space:nowrap;
        }
        .contact-subject-chip:hover,
        .contact-subject-chip.active {
          background:rgba(100,0,0,0.35);
          border-color:rgba(160,0,0,0.55);
          color:#cc2200;
          box-shadow:0 0 10px rgba(120,0,0,0.2);
        }

        ::placeholder { color:rgba(100,40,40,0.45);font-style:italic; }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(120% 90% at 50% 0%, #120000 0%, #070000 50%, #030000 100%)",
          padding: "5rem 1.5rem",
          fontFamily: "'Crimson Text', serif",
        }}
      >
        {/* Top blood drip */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "22px",
            pointerEvents: "none",
          }}
          viewBox="0 0 1440 22"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z"
            fill="rgba(80,0,0,0.7)"
          />
        </svg>

        {/* Hellfire ground glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "50%",
            background:
              "radial-gradient(ellipse,rgba(100,5,0,0.3) 0%,rgba(60,0,0,0.08) 50%,transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* Giant sigil watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "500px",
            color: "rgba(50,0,0,0.05)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            animation: "pulse-sigil 16s ease-in-out infinite",
          }}
        >
          ⛧
        </div>

        {/* Crack texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(168deg,transparent,transparent 80px,rgba(50,0,0,0.025) 80px,rgba(50,0,0,0.025) 81px),repeating-linear-gradient(85deg,transparent,transparent 65px,rgba(40,0,0,0.02) 65px,rgba(40,0,0,0.02) 66px)",
            pointerEvents: "none",
          }}
        />

        {/* Embers */}
        {embers.map((e) => (
          <Ember key={e.id} style={e.style} />
        ))}

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section header ── */}
          <div
            className={inView ? "contact-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                marginBottom: "1.2rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  maxWidth: "180px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,rgba(139,0,0,0.55))",
                }}
              />
              <span style={{ color: "rgba(139,0,0,0.55)", fontSize: "14px" }}>
                ⛧
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "9px",
                  color: "#3a1010",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                }}
              >
                Open a Channel
              </span>
              <span style={{ color: "rgba(139,0,0,0.55)", fontSize: "14px" }}>
                ⛧
              </span>
              <div
                style={{
                  flex: 1,
                  maxWidth: "180px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg,rgba(139,0,0,0.55),transparent)",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative',serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,5vw,3.4rem)",
                background:
                  "linear-gradient(180deg,#ffffff 0%,#cc2200 55%,#6b0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "0 0 0.8rem",
              }}
            >
              Contact Me
            </h2>
            <p
              style={{
                color: "#4a2020",
                fontSize: "15px",
                fontFamily: "'Crimson Text',serif",
                fontStyle: "italic",
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              Speak your intent and I shall answer — whether it be
              collaboration, opportunity, or inquiry
            </p>
          </div>

          {/* ── Main grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* LEFT — Info + socials */}
            <div
              className={inView ? "contact-revealed-d1" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {/* Availability card */}
              <div
                style={{
                  background:
                    "linear-gradient(145deg,rgba(14,0,0,0.92),rgba(8,0,0,0.92))",
                  border: "1px solid rgba(130,0,0,0.45)",
                  borderRadius: "4px",
                  padding: "24px",
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
                    height: "2px",
                    background:
                      "linear-gradient(90deg,transparent,#cc2200,transparent)",
                    boxShadow: "0 0 8px rgba(200,0,0,0.5)",
                  }}
                />

                {/* Spinning rune ring + status */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background:
                          "conic-gradient(from 0deg,transparent 0%,#6b0000 15%,transparent 30%,#cc2200 45%,transparent 60%,#6b0000 75%,transparent 90%)",
                        animation: "spin-rune 8s linear infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: "3px",
                        borderRadius: "50%",
                        background: "#060000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      ⛧
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel Decorative',serif",
                        fontSize: "13px",
                        color: "#cc2200",
                        marginBottom: "2px",
                      }}
                    >
                      DR-PIERROT
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#009944",
                          boxShadow: "0 0 10px #009944",
                          animation: "pulse-blood 2s infinite",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: "8px",
                          color: "#1a3a1a",
                          letterSpacing: "2px",
                          textTransform: "uppercase" as const,
                        }}
                      >
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: "#4a2020",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    fontFamily: "'Crimson Text',serif",
                    fontStyle: "italic",
                    margin: "0 0 18px",
                    borderLeft: "2px solid rgba(139,0,0,0.3)",
                    paddingLeft: "12px",
                  }}
                >
                  Open to fullstack projects, freelance work, and collaboration
                  opportunities. Response time is typically within 24–48 hours.
                </p>

                {/* Response time indicator */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "rgba(20,0,0,0.5)",
                    border: "1px solid rgba(80,0,0,0.25)",
                    borderRadius: "2px",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>⏳</span>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "7px",
                        color: "#3a1010",
                        letterSpacing: "2px",
                        textTransform: "uppercase" as const,
                        display: "block",
                      }}
                    >
                      Avg Response
                    </span>
                    <span
                      style={{
                        fontFamily: "'Crimson Text',serif",
                        fontSize: "13px",
                        color: "#6a3030",
                      }}
                    >
                      Within 24–48 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact info pills */}
              <InfoPill icon="📍" label="Realm" value={CONTACT_INFO.location} />
              <InfoPill
                icon="✉️"
                label="Email"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <InfoPill
                icon="⛧"
                label="GitHub"
                value="github.com/Dr-Pierrot"
                href={CONTACT_INFO.github}
              />
              <InfoPill
                icon="🔗"
                label="LinkedIn"
                value="Jaycee Capulong"
                href={CONTACT_INFO.linkedin}
              />

              {/* Quote */}
              <div
                style={{
                  padding: "18px 20px",
                  background: "rgba(8,0,0,0.6)",
                  border: "1px solid rgba(80,0,0,0.2)",
                  borderRadius: "3px",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg,transparent,rgba(100,0,0,0.3),transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "26px",
                    color: "rgba(139,0,0,0.2)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    color: "#3a1818",
                    fontSize: "14px",
                    lineHeight: 1.85,
                    fontFamily: "'Crimson Text',serif",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  Every great system starts with a conversation. Let us begin
                  the ritual.
                </p>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      flex: 1,
                      background:
                        "linear-gradient(90deg,rgba(100,0,0,0.25),transparent)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "8px",
                      color: "#2a1010",
                      letterSpacing: "2px",
                    }}
                  >
                    DR-PIERROT
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Contact form */}
            <div className={inView ? "contact-revealed-d2" : ""}>
              <div
                style={{
                  background:
                    "linear-gradient(155deg,rgba(12,0,0,0.95),rgba(7,0,0,0.95))",
                  border: "1px solid rgba(120,0,0,0.45)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow:
                    "0 0 60px rgba(80,0,0,0.15),inset 0 0 60px rgba(40,0,0,0.1)",
                }}
              >
                {/* Top fire line */}
                <div
                  style={{
                    height: "2px",
                    background:
                      "linear-gradient(90deg,transparent,#6b0000,#cc2200,#ff4400,#cc2200,#6b0000,transparent)",
                    boxShadow: "0 0 10px #cc2200",
                  }}
                />

                {/* Chrome bar */}
                <div
                  style={{
                    padding: "10px 18px",
                    background: "rgba(0,0,0,0.7)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(100,0,0,0.35)",
                  }}
                >
                  <div style={{ display: "flex", gap: "7px" }}>
                    {["#7a0000", "#3d0000", "#1a0000"].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: c,
                          boxShadow: `0 0 4px ${c}`,
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "9px",
                      color: "#3a0000",
                      letterSpacing: "4px",
                    }}
                  >
                    ⛧ summon.form ⛧
                  </span>
                </div>

                <div style={{ padding: "28px" }}>
                  {/* Success state */}
                  {sendStatus === "success" ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "3rem 1rem",
                        animation: "success-reveal 0.5s ease both",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "48px",
                          marginBottom: "16px",
                          animation: "sending-pulse 1.5s ease-in-out infinite",
                        }}
                      >
                        ⛧
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Cinzel Decorative',serif",
                          fontSize: "1.4rem",
                          color: "#009944",
                          marginBottom: "12px",
                          animation: "success-glow 2s infinite",
                        }}
                      >
                        Ritual Complete
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Crimson Text',serif",
                          fontSize: "15px",
                          color: "#2a4a2a",
                          fontStyle: "italic",
                          lineHeight: 1.8,
                          maxWidth: "320px",
                          margin: "0 auto",
                        }}
                      >
                        Your message has been bound and delivered. I shall
                        respond within 24–48 hours.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                      }}
                    >
                      {/* Subject quick-pick */}
                      <div>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: "8px",
                            color: "#3a1010",
                            letterSpacing: "2.5px",
                            textTransform: "uppercase" as const,
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span style={{ color: "rgba(139,0,0,0.45)" }}>⛧</span>{" "}
                          Quick Subject
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap" as const,
                            gap: "7px",
                          }}
                        >
                          {subjects.map((s) => (
                            <button
                              key={s}
                              className={`contact-subject-chip${form.subject === s ? " active" : ""}`}
                              onClick={() => {
                                setField("subject")(s);
                                setTouched((t) => ({ ...t, subject: true }));
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          height: "1px",
                          background:
                            "linear-gradient(90deg,transparent,rgba(80,0,0,0.3),transparent)",
                        }}
                      />

                      {/* Form fields */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "14px",
                        }}
                      >
                        <FormField
                          label="Your Name"
                          id="name"
                          value={form.name}
                          onChange={setField("name")}
                          onBlur={touchField("name")}
                          error={visibleErrors.name}
                          placeholder="Jaycee Capulong"
                        />
                        <FormField
                          label="Your Email"
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={setField("email")}
                          onBlur={touchField("email")}
                          error={visibleErrors.email}
                          placeholder="you@email.com"
                        />
                      </div>

                      <FormField
                        label="Subject"
                        id="subject"
                        value={form.subject}
                        onChange={setField("subject")}
                        onBlur={touchField("subject")}
                        error={visibleErrors.subject}
                        placeholder="What brings you here?"
                      />

                      <FormField
                        label="Message"
                        id="message"
                        value={form.message}
                        onChange={setField("message")}
                        onBlur={touchField("message")}
                        error={visibleErrors.message}
                        placeholder="Describe your project, idea, or inquiry..."
                        multiline
                        rows={5}
                      />

                      {/* Char counter */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "-12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Courier New',monospace",
                            fontSize: "10px",
                            color:
                              form.message.length < 20 && touched.message
                                ? "#cc3322"
                                : "#2a1010",
                            letterSpacing: "1px",
                          }}
                        >
                          {form.message.length} / 20 min chars
                        </span>
                      </div>

                      {/* Submit */}
                      <button
                        className="contact-submit-btn"
                        onClick={handleSubmit}
                        disabled={sendStatus === "sending"}
                      >
                        {sendStatus === "sending" ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            <span
                              style={{
                                animation: "spin-rune 1.5s linear infinite",
                                display: "inline-block",
                              }}
                            >
                              ⛧
                            </span>
                            <span>Binding the Ritual...</span>
                          </span>
                        ) : (
                          <span>⛧ &nbsp; Dispatch the Message</span>
                        )}
                      </button>

                      {/* Disclaimer */}
                      <p
                        style={{
                          fontFamily: "'Crimson Text',serif",
                          fontSize: "11px",
                          color: "#2a1010",
                          fontStyle: "italic",
                          textAlign: "center" as const,
                          margin: "-4px 0 0",
                          lineHeight: 1.6,
                        }}
                      >
                        Your message is sent directly to my inbox — no
                        third-party sorcery required.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rune divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "3.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(90deg,transparent,rgba(100,0,0,0.3))",
              }}
            />
            <span style={{ color: "rgba(100,0,0,0.3)", fontSize: "14px" }}>
              ⛧
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(90deg,rgba(100,0,0,0.3),transparent)",
              }}
            />
          </div>
        </div>

        {/* Bottom blood drip */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "22px",
            pointerEvents: "none",
            transform: "scaleY(-1)",
          }}
          viewBox="0 0 1440 22"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,22 L0,4 Q60,4 70,10 Q75,16 80,22 Q85,16 90,10 Q100,4 140,4 Q180,4 190,8 Q195,14 200,20 Q205,14 210,8 Q220,4 260,4 Q300,4 310,9 Q315,15 320,22 Q325,15 330,9 Q340,4 380,4 Q420,4 430,8 Q435,13 440,18 Q445,13 450,8 Q460,4 500,4 Q540,4 550,9 Q555,16 560,22 Q565,16 570,9 Q580,4 620,4 Q660,4 670,8 Q675,14 680,20 Q685,14 690,8 Q700,4 740,4 Q780,4 790,9 Q795,15 800,22 Q805,15 810,9 Q820,4 860,4 Q900,4 910,8 Q915,13 920,17 Q925,13 930,8 Q940,4 980,4 Q1020,4 1030,9 Q1035,16 1040,22 Q1045,16 1050,9 Q1060,4 1100,4 Q1140,4 1150,8 Q1155,14 1160,20 Q1165,14 1170,8 Q1180,4 1220,4 Q1260,4 1270,9 Q1275,15 1280,22 Q1285,15 1290,9 Q1300,4 1340,4 Q1380,4 1390,8 Q1395,13 1400,18 Q1405,13 1410,8 Q1420,4 1440,4 L1440,22 Z"
            fill="rgba(80,0,0,0.7)"
          />
        </svg>
      </section>
    </>
  );
};

export default ContactMe;
