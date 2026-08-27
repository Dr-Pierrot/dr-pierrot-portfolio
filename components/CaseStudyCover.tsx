"use client";
import React from "react";
import OptimizedImage from "./OptimizedImage";

export default function CaseStudyCover({
  src,
  alt,
  index,
}: {
  src?: string;
  alt: string;
  index: number;
}) {
  const [failed, setFailed] = React.useState(!src);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ed-border bg-ed-paper-alt">
      {!failed && src && (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1180px"
          className="h-full w-full"
          objectFit="cover"
          onError={() => setFailed(true)}
          priority={false}
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

