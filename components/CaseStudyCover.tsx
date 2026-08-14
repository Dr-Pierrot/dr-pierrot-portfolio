"use client";
import React, { useState } from "react";
import { T } from "@/lib/theme";

export default function CaseStudyCover({ src, alt, index }: { src?: string; alt: string; index: number }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div style={{ width: "100%", aspectRatio: "16/9", background: T.color.ink, position: "relative", overflow: "hidden" }}>
      {!failed && src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {failed && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: T.font.display, fontSize: "7rem", color: "rgba(245,246,242,0.12)" }}>
            {String(index).padStart(2, "0")}
          </span>
          <span
            style={{
              position: "absolute",
              bottom: 18,
              right: 20,
              fontFamily: T.font.mono,
              fontSize: "0.7rem",
              color: "rgba(245,246,242,0.45)",
              letterSpacing: "0.06em",
            }}
          >
            Screenshot coming soon
          </span>
        </div>
      )}
    </div>
  );
}
