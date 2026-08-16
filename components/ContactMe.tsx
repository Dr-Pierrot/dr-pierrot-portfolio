"use client";
import React, { useState } from "react";
import clsx from "clsx";

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

const Icon = ({ path }: { path: string }) => (
  <svg
    width="15"
    height="15"
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
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  github:
    "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21",
  linkedin:
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
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

  const inputClass = clsx(
    "w-full resize-none bg-transparent py-3 font-ed-body text-[0.98rem] text-ed-text outline-none transition-colors duration-200 border-b",
    "placeholder:text-ed-text-muted",
    error
      ? "border-ed-danger"
      : focused
        ? "border-ed-accent"
        : "border-ed-border",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={clsx(
          "font-ed-mono text-[11px] tracking-[0.08em] uppercase",
          error ? "text-ed-danger" : "text-ed-text-muted",
        )}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows || 4}
          placeholder={placeholder}
          className={inputClass}
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
          className={inputClass}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
        />
      )}
      {error && (
        <span className="font-ed-body text-[0.8rem] text-ed-danger">
          {error}
        </span>
      )}
    </div>
  );
};

export default function ContactMe() {
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

  const infoRows = [
    {
      label: "Email",
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      icon: ICONS.mail,
    },
    { label: "Location", value: CONTACT_INFO.location, icon: ICONS.pin },
    {
      label: "GitHub",
      value: "github.com/Dr-Pierrot",
      href: CONTACT_INFO.github,
      icon: ICONS.github,
    },
    {
      label: "LinkedIn",
      value: "Jaycee Capulong",
      href: CONTACT_INFO.linkedin,
      icon: ICONS.linkedin,
    },
  ];

  return (
    <section
      id="contact"
      className="w-full bg-ed-surface px-6 py-[clamp(4rem,8vw,6.5rem)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* ---------------- LEFT ---------------- */}
          <div>
            <p className="mb-2.5 font-ed-mono text-sm tracking-[0.02em] text-ed-text-muted">
              {"// get in touch"}
            </p>
            <h2 className="m-0 font-ed-heading text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ed-text">
              Let&apos;s build something{" "}
              <span className="text-ed-accent-text">real</span>.
            </h2>
            <p className="mt-4 max-w-[420px] text-[1.02rem] leading-[1.75] text-ed-text-secondary">
              Open to fullstack roles, freelance projects, and collaboration. I
              typically reply within 24–48 hours.
            </p>

            <div className="mt-10 flex flex-col divide-y divide-ed-border border-t border-ed-border">
              {infoRows.map((row) => (
                <div key={row.label} className="flex items-center gap-4 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-ed-border bg-ed-paper-alt text-ed-text-secondary">
                    <Icon path={row.icon} />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-ed-mono text-[10px] tracking-[0.08em] text-ed-text-muted uppercase">
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={
                          row.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        className="truncate text-[0.94rem] text-ed-text no-underline transition-colors hover:text-ed-accent-text"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="truncate text-[0.94rem] text-ed-text">
                        {row.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- RIGHT — form ---------------- */}
          <div className="rounded-2xl border border-ed-border bg-ed-surface p-6 shadow-[0_24px_60px_-28px_rgba(11,19,16,0.28),0_2px_6px_rgba(11,19,16,0.05)] md:p-8">
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="font-ed-heading text-2xl font-bold text-ed-accent-text">
                  Message sent.
                </div>
                <p className="mt-3 text-[0.98rem] text-ed-text-secondary">
                  Thanks for reaching out — I&apos;ll get back to you within
                  24–48 hours.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <div className="mb-2.5 font-ed-mono text-[11px] tracking-[0.08em] text-ed-text-muted uppercase">
                    Quick subject
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => {
                      const active = form.subject === s;
                      return (
                        <button
                          key={s}
                          onClick={() => {
                            setField("subject")(s);
                            setTouched((t) => ({ ...t, subject: true }));
                          }}
                          className={clsx(
                            "cursor-pointer rounded-full border px-3.5 py-1.5 font-ed-mono text-[12px] transition-all duration-200",
                            active
                              ? "border-ed-accent-border bg-ed-accent-soft text-ed-accent-text"
                              : "border-ed-border text-ed-text-muted hover:border-ed-border-strong hover:text-ed-text",
                          )}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

                <div className="-mt-2 flex justify-end">
                  <span
                    className={clsx(
                      "font-ed-mono text-[12px]",
                      form.message.length < 20 && touched.message
                        ? "text-ed-danger"
                        : "text-ed-text-muted",
                    )}
                  >
                    {form.message.length} / 20 min
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="w-full cursor-pointer rounded-[10px] bg-ed-gradient-button px-6 py-[15px] font-ed-heading text-[0.94rem] font-semibold tracking-[0.02em] text-white transition-all duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(14,124,116,0.32)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>

                {status === "error" && (
                  <p className="m-0 text-[0.85rem] text-ed-danger">
                    {errorMsg || "Something went wrong."} Try emailing directly
                    at{" "}
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-ed-danger underline"
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
  );
}
