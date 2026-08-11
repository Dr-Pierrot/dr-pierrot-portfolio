"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { T } from "@/lib/theme";

/* ---------------- CONFIG ---------------- */

const CONTACT_INFO = {
  email: "capulongako16@gmail.com",
  github: "https://github.com/Dr-Pierrot",
  linkedin: "https://ph.linkedin.com/in/jaycee-capulong-9a37922b9",
  location: "Philippines (GMT+8)",
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type FieldError = Partial<Record<keyof FormState, string>>;
type SendStatus = "idle" | "sending" | "success" | "error";

/* ---------------- HOOKS ---------------- */

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

/* ---------------- VALIDATION ---------------- */

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

/* ---------------- FORM FIELD ---------------- */

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
    padding: "10px 14px",
    background: T.color.bg,
    border: `1px solid ${hasError ? "#FCA5A5" : focused ? T.color.accent : T.color.border}`,
    borderRadius: "8px",
    color: T.color.text,
    fontSize: "14px",
    fontFamily: T.font.body,
    outline: "none",
    transition: "all 0.15s",
    resize: "none",
    boxSizing: "border-box" as const,
    boxShadow: focused ? `0 0 0 3px ${T.color.accentSoft}` : "none",
    lineHeight: 1.6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: hasError ? "#DC2626" : T.color.textSecondary,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows || 5}
          placeholder={placeholder}
          style={sharedStyle}
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
          style={sharedStyle}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
        />
      )}
      {hasError && (
        <span style={{ fontSize: "12px", color: "#DC2626" }}>{error}</span>
      )}
    </div>
  );
};

/* ---------------- INFO CARD ---------------- */

const InfoCard = ({
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
        padding: "14px 16px",
        background: T.color.bg,
        border: `1px solid ${hovered ? T.color.borderStrong : T.color.border}`,
        borderRadius: "10px",
        transition: "all 0.2s",
        cursor: href ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          flexShrink: 0,
          background: T.color.bgAlt,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "11px",
            color: T.color.textMuted,
            marginBottom: "2px",
            fontFamily: T.font.mono,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: T.color.text,
            wordBreak: "break-all" as const,
            lineHeight: 1.4,
          }}
        >
          {value}
        </div>
      </div>
      {href && (
        <div
          style={{
            marginLeft: "auto",
            fontSize: "13px",
            color: T.color.textMuted,
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

/* ---------------- CONTACT SECTION ---------------- */

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
    // TODO: wire up real backend (e.g. Formspree, Resend, custom API)
    await new Promise((r) => setTimeout(r, 1500));
    setSendStatus("success");
    setTimeout(() => {
      setSendStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    }, 4000);
  };

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
        ${T.fontImport}
        @keyframes reveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes success-reveal {
          from { opacity:0; transform:translateY(8px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .contact-revealed     { animation: reveal 0.7s ease-out both; }
        .contact-revealed-d1  { animation: reveal 0.7s ease-out 0.1s both; }
        .contact-revealed-d2  { animation: reveal 0.7s ease-out 0.2s both; }

        .contact-submit-btn {
          width: 100%;
          padding: 12px 28px;
          background: ${T.color.gradientButton};
          border: 1px solid transparent;
          border-radius: 8px;
          color: #fff;
          font-family: ${T.font.body};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 2px rgba(17,24,39,0.15);
        }
        .contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15,118,110,0.28);
        }
        .contact-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .contact-subject-chip {
          padding: 5px 14px;
          background: ${T.color.bg};
          border: 1px solid ${T.color.border};
          border-radius: 999px;
          color: ${T.color.textSecondary};
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .contact-subject-chip:hover {
          border-color: ${T.color.borderStrong};
        }
        .contact-subject-chip.active {
          background: ${T.color.text};
          border-color: ${T.color.text};
          color: #fff;
        }

        ::placeholder {
          color: ${T.color.textMuted};
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.bgAlt,
          padding: "5rem 1.5rem",
          fontFamily: T.font.body,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            className={inView ? "contact-revealed" : ""}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <p
              style={{
                fontFamily: T.font.mono,
                fontSize: "13px",
                color: T.color.accentText,
                margin: "0 0 10px",
              }}
            >
              ~/contact
            </p>
            <h2
              style={{
                fontFamily: T.font.heading,
                fontWeight: 700,
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                color: T.color.text,
                margin: "0 0 0.8rem",
              }}
            >
              Let&apos;s build something useful
            </h2>
            <p
              style={{
                color: T.color.textSecondary,
                fontSize: "15px",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              I&apos;m open to full‑time roles, freelance projects, and
              collaborations where I can own features end‑to‑end and help ship
              reliable web products.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* LEFT — availability + contact */}
            <div
              className={inView ? "contact-revealed-d1" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              <div
                style={{
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: T.color.accent,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: T.color.text,
                    }}
                  >
                    Available for work
                  </span>
                </div>
                <p
                  style={{
                    color: T.color.textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.8,
                    margin: "0 0 16px",
                  }}
                >
                  Focused on fullstack web roles (React/Next.js + Laravel).
                  Comfortable owning features from requirements to deployment
                  and working directly with founders and small teams.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: T.color.bgAlt,
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: T.color.textMuted }}>
                    Typical response
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: T.color.text,
                      marginLeft: "auto",
                      fontWeight: 500,
                    }}
                  >
                    within 24–48 hours
                  </span>
                </div>
              </div>

              <InfoCard
                icon="📍"
                label="Location"
                value={CONTACT_INFO.location}
              />
              <InfoCard
                icon="✉️"
                label="Email"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <InfoCard
                icon="🐙"
                label="GitHub"
                value="github.com/Dr-Pierrot"
                href={CONTACT_INFO.github}
              />
              <InfoCard
                icon="💼"
                label="LinkedIn"
                value="Jaycee Capulong"
                href={CONTACT_INFO.linkedin}
              />
            </div>

            {/* RIGHT — form */}
            <div className={inView ? "contact-revealed-d2" : ""}>
              <div
                style={{
                  background: T.color.bg,
                  border: `1px solid ${T.color.border}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(17,24,39,0.05)",
                }}
              >
                <div style={{ padding: "28px" }}>
                  {sendStatus === "success" ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "3rem 1rem",
                        animation: "success-reveal 0.4s ease both",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: T.color.accentSoft,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          margin: "0 auto 16px",
                          color: T.color.accent,
                        }}
                      >
                        ✓
                      </div>
                      <h3
                        style={{
                          fontFamily: T.font.heading,
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: T.color.text,
                          marginBottom: "10px",
                        }}
                      >
                        Message sent
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: T.color.textSecondary,
                          lineHeight: 1.7,
                          maxWidth: "300px",
                          margin: "0 auto",
                        }}
                      >
                        Thanks for reaching out. I&apos;ll get back to you
                        within 24–48 hours.
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
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: T.color.textSecondary,
                            marginBottom: "10px",
                            fontFamily: T.font.mono,
                          }}
                        >
                          // Quick subject
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
                        style={{ height: "1px", background: T.color.border }}
                      />

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "14px",
                        }}
                      >
                        <FormField
                          label="Your name"
                          id="name"
                          value={form.name}
                          onChange={setField("name")}
                          onBlur={touchField("name")}
                          error={visibleErrors.name}
                          placeholder="Alex Rivera"
                        />
                        <FormField
                          label="Your email"
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
                        placeholder="Tell me about your project, role, or idea..."
                        multiline
                        rows={5}
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "-12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: T.font.mono,
                            fontSize: "11px",
                            color:
                              form.message.length < 20 && touched.message
                                ? "#DC2626"
                                : T.color.textMuted,
                          }}
                        >
                          {form.message.length} / 20 min chars
                        </span>
                      </div>

                      <button
                        className="contact-submit-btn"
                        onClick={handleSubmit}
                        disabled={sendStatus === "sending"}
                      >
                        {sendStatus === "sending"
                          ? "Sending..."
                          : "Send message"}
                      </button>

                      <p
                        style={{
                          fontSize: "12px",
                          color: T.color.textMuted,
                          textAlign: "center" as const,
                          margin: "-4px 0 0",
                          lineHeight: 1.6,
                        }}
                      >
                        Your message goes directly to my inbox.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMe;
