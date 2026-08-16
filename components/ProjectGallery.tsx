"use client";
import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-ed-mono text-[0.75rem] text-ed-text-muted">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
};

export default function ProjectGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(i, images.length - 1));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    },
    [images.length],
  );

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(active + 1);
    if (e.key === "ArrowLeft") scrollToIndex(active - 1);
  };

  if (!images.length) return null;

  return (
    <section className="mx-auto max-w-[1180px] border-t border-ed-border px-[clamp(1.25rem,4vw,2.75rem)] py-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-ed-mono text-[0.7rem] tracking-[0.11em] text-ed-accent-text uppercase">
            04 — Gallery
          </div>
          <h2 className="mt-[0.7rem] font-ed-heading text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-ed-text">
            A closer look.
          </h2>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ed-border text-ed-text transition-all duration-200 hover:border-ed-accent hover:bg-ed-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ed-border disabled:hover:bg-transparent disabled:hover:text-ed-text"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === images.length - 1}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ed-border text-ed-text transition-all duration-200 hover:border-ed-accent hover:bg-ed-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ed-border disabled:hover:bg-transparent disabled:hover:text-ed-text"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`${alt} gallery`}
        aria-roledescription="carousel"
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ed-accent [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
            className="aspect-video w-full shrink-0 snap-center overflow-hidden rounded-2xl border border-ed-border bg-ed-paper-alt"
          >
            <GalleryImage src={src} alt={`${alt} — screenshot ${i + 1}`} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === active}
              onClick={() => scrollToIndex(i)}
              className={clsx(
                "h-2 cursor-pointer rounded-full transition-all duration-200",
                i === active
                  ? "w-6 bg-ed-accent"
                  : "w-2 bg-ed-border hover:bg-ed-border-strong",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
