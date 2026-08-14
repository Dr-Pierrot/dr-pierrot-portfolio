"use client";
import React, { useEffect, useRef, useState } from "react";
import { T } from "@/lib/theme";
import { Kicker } from "@/components/editorial";

const CONTACT_INFO = {
  email: "capulongako16@gmail.com",
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

const Field = ({
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
  id: string;
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
  const shared: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${error ? T.color.danger : focused ? T.color.ink : T.color.border}`,
    color: T.color.text,
    fontFamily: T.font.body,
    fontSize: "0.98rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    resize: "none",
    boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: T.font.mono,
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: error ? T.color.danger : T.color.textMuted,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows || 4}
          placeholder={placeholder}
          style={shared}
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
          style={shared}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
        />
      )}
      {error && (
        <span
          style={{
            fontFamily: T.font.body,
            fontSize: "0.8rem",
            color: T.color.danger,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default function ContactMe() {
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
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
      }, 4500);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
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
        @keyframes contact-in { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .contact-in { animation: contact-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .subject-chip { font-family: ${T.font.mono}; font-size: 0.74rem; padding: 6px 13px; border: 1px solid ${T.color.border}; background: transparent; color: ${T.color.textMuted}; cursor: pointer; transition: all 0.2s ease; }
        .subject-chip.active, .subject-chip:hover { border-color: ${T.color.ink}; color: ${T.color.ink}; }
        .submit-btn { width: 100%; padding: 15px; background: ${T.color.ink}; color: ${T.color.paper}; border: none; font-family: ${T.font.heading}; font-weight: 600; font-size: 0.94rem; letter-spacing: 0.02em; cursor: pointer; transition: opacity 0.2s ease; }
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        ::placeholder { color: ${T.color.textMuted}; }
        .contact-grid { display: grid; grid-template-columns: minmax(0,0.9fr) minmax(0,1.1fr); gap: clamp(2.5rem,6vw,5rem); }
        .contact-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-fields-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        style={{
          width: "100%",
          background: T.color.paper,
          padding: "clamp(4rem,8vw,6.5rem) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,2.75rem)",
          }}
        >
          <div className={`contact-grid${inView ? " contact-in" : ""}`}>
            {/* LEFT */}
            <div>
              <Kicker>05 — Get in touch</Kicker>
              <h2
                style={{
                  fontFamily: T.font.display,
                  fontWeight: 500,
                  fontSize: T.type.h2,
                  lineHeight: 1.05,
                  color: T.color.ink,
                  margin: "0.6rem 0 0",
                }}
              >
                Let&apos;s build something{" "}
                <span style={{ color: T.color.accent }}>real</span>.
              </h2>
              <p
                style={{
                  fontFamily: T.font.body,
                  fontSize: "1.02rem",
                  lineHeight: 1.75,
                  color: T.color.textSecondary,
                  margin: "1.4rem 0 0",
                  maxWidth: 420,
                }}
              >
                Open to fullstack roles, freelance projects, and collaboration.
                I typically reply within 24–48 hours.
              </p>

              <div
                style={{
                  marginTop: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    label: "Email",
                    value: CONTACT_INFO.email,
                    href: `mailto:${CONTACT_INFO.email}`,
                  },
                  { label: "Location", value: CONTACT_INFO.location },
                  {
                    label: "GitHub",
                    value: "github.com/Dr-Pierrot",
                    href: CONTACT_INFO.github,
                  },
                  {
                    label: "LinkedIn",
                    value: "Jaycee Capulong",
                    href: CONTACT_INFO.linkedin,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      borderTop: `1px solid ${T.color.border}`,
                      paddingTop: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: T.font.mono,
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: T.color.textMuted,
                        width: 90,
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={
                          row.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: T.font.body,
                          fontSize: "0.94rem",
                          color: T.color.text,
                          textDecoration: "none",
                        }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: T.font.body,
                          fontSize: "0.94rem",
                          color: T.color.text,
                        }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <div>
              {status === "success" ? (
                <div style={{ padding: "3rem 0", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: T.font.display,
                      fontSize: "1.8rem",
                      color: T.color.accent,
                      fontStyle: "italic",
                    }}
                  >
                    Message sent.
                  </div>
                  <p
                    style={{
                      fontFamily: T.font.body,
                      fontSize: "0.98rem",
                      color: T.color.textSecondary,
                      marginTop: "0.75rem",
                    }}
                  >
                    Thanks for reaching out — I&apos;ll get back to you within
                    24–48 hours.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: T.font.mono,
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: T.color.textMuted,
                        marginBottom: "0.6rem",
                      }}
                    >
                      Quick subject
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {subjects.map((s) => (
                        <button
                          key={s}
                          className={`subject-chip${form.subject === s ? " active" : ""}`}
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

                  <div className="contact-fields-grid">
                    <Field
                      label="Name"
                      id="name"
                      value={form.name}
                      onChange={setField("name")}
                      onBlur={touchField("name")}
                      error={visibleErrors.name}
                      placeholder="Your name"
                    />
                    <Field
                      label="Email"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      onBlur={touchField("email")}
                      error={visibleErrors.email}
                      placeholder="you@email.com"
                    />
                  </div>

                  <Field
                    label="Subject"
                    id="subject"
                    value={form.subject}
                    onChange={setField("subject")}
                    onBlur={touchField("subject")}
                    error={visibleErrors.subject}
                    placeholder="What brings you here?"
                  />
                  <Field
                    label="Message"
                    id="message"
                    value={form.message}
                    onChange={setField("message")}
                    onBlur={touchField("message")}
                    error={visibleErrors.message}
                    placeholder="Tell me about your project or role..."
                    multiline
                    rows={5}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: -8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: T.font.mono,
                        fontSize: "0.72rem",
                        color:
                          form.message.length < 20 && touched.message
                            ? T.color.danger
                            : T.color.textMuted,
                      }}
                    >
                      {form.message.length} / 20 min
                    </span>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  {status === "error" && (
                    <p
                      style={{
                        fontFamily: T.font.body,
                        fontSize: "0.85rem",
                        color: T.color.danger,
                        margin: 0,
                      }}
                    >
                      {errorMsg || "Something went wrong."} Try emailing
                      directly at{" "}
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        style={{ color: T.color.danger }}
                      >
                        {CONTACT_INFO.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
