"use client";
import React from "react";
import { T } from "@/lib/theme";

export const Kicker = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className="inline-flex items-center gap-2"
    style={{
      fontFamily: T.font.mono,
      fontSize: "0.72rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? T.color.darkTextSecondary : T.color.textMuted,
    }}
  >
    <span
      style={{
        width: 14,
        height: 1,
        background: T.color.accent,
        display: "inline-block",
      }}
    />
    {children}
  </div>
);

export const SectionHead = ({
  kicker,
  title,
  lede,
  dark,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
  dark?: boolean;
  align?: "left" | "center";
}) => (
  <div
    style={{
      maxWidth: align === "center" ? 640 : 760,
      margin: align === "center" ? "0 auto" : undefined,
      textAlign: align,
    }}
  >
    <Kicker dark={dark}>{kicker}</Kicker>
    <h2
      style={{
        fontFamily: T.font.display,
        fontWeight: 500,
        fontSize: T.type.h2,
        lineHeight: 1.08,
        letterSpacing: "-0.01em",
        color: dark ? T.color.darkText : T.color.text,
        margin: "0.6rem 0 0",
      }}
    >
      {title}
    </h2>
    {lede && (
      <p
        style={{
          fontFamily: T.font.body,
          fontSize: "1.05rem",
          lineHeight: 1.7,
          color: dark ? T.color.darkTextSecondary : T.color.textSecondary,
          margin: "1rem 0 0",
        }}
      >
        {lede}
      </p>
    )}
  </div>
);

export const HRule = ({ dark }: { dark?: boolean }) => (
  <div
    style={{
      height: 1,
      width: "100%",
      background: dark ? T.color.darkBorder : T.color.border,
    }}
  />
);

export const ArrowLink = ({
  href,
  children,
  external,
  dark,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  dark?: boolean;
}) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="editorial-arrow-link"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: T.font.heading,
      fontSize: "0.92rem",
      fontWeight: 500,
      color: dark ? T.color.darkText : T.color.text,
      textDecoration: "none",
      borderBottom: `1px solid ${dark ? T.color.darkBorder : T.color.borderStrong}`,
      paddingBottom: 2,
      transition: "border-color 0.2s ease, color 0.2s ease, gap 0.2s ease",
    }}
  >
    {children}
    <span aria-hidden style={{ transition: "transform 0.2s ease" }}>
      →
    </span>
  </a>
);

export const Tag = ({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "accent2" | "accent3";
}) => {
  const styles: Record<string, React.CSSProperties> = {
    neutral: {
      background: T.color.paperAlt,
      border: `1px solid ${T.color.border}`,
      color: T.color.textSecondary,
    },
    accent: {
      background: T.color.accentSoft,
      border: `1px solid ${T.color.accentBorder}`,
      color: T.color.accentText,
    },
    accent2: {
      background: T.color.accent2Soft,
      border: `1px solid ${T.color.accent2Border}`,
      color: T.color.accent2Text,
    },
    accent3: {
      background: T.color.accent3Soft,
      border: `1px solid ${T.color.accent3Border}`,
      color: T.color.accent3Text,
    },
  };
  return (
    <span
      style={{
        ...styles[variant],
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 3,
        fontFamily: T.font.mono,
        fontSize: "0.72rem",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
};

export const GlobalEditorialStyles = () => (
  <style>{`
    ${T.fontImport}
    .editorial-arrow-link:hover {
      border-color: ${T.color.accent};
      color: ${T.color.accent};
    }
    .editorial-arrow-link:hover span { transform: translateX(3px); }
    ::selection { background: ${T.color.accentBright}; color: ${T.color.ink}; }
  `}</style>
);
