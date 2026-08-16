"use client";
import React, { useState } from "react";

export default function CaseStudyCover({
  src,
  alt,
  index,
}: {
  src?: string;
  alt: string;
  index: number;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ed-border bg-ed-paper-alt">
      {!failed && src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-ed-heading text-[7rem] text-ed-border">
            {String(index).padStart(2, "0")}
          </span>
          <span className="absolute right-5 bottom-[18px] font-ed-mono text-[0.7rem] tracking-[0.06em] text-ed-text-muted">
            Screenshot coming soon
          </span>
        </div>
      )}
    </div>
  );
}
