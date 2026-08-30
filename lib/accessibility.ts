import { A11Y_CONFIG } from "./constants";

export const MAIN_CONTENT_ID = A11Y_CONFIG.skipToContentId;

export const FOCUS_VISIBLE_CLASSES =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent";

export const SCREEN_READER_ONLY_CLASSES =
  "sr-only focus:not-sr-only focus:absolute focus:z-[9999]";

export const MOTION_SAFE_CLASSES = "motion-safe:animate-pulse motion-reduce:animate-none";

export const REDUCED_MOTION_CLASSES = "motion-reduce:transition-none motion-reduce:animate-none";

export function getAriaCurrent(
  isCurrent: boolean,
): "page" | undefined {
  return isCurrent ? "page" : undefined;
}

export function getSectionAriaCurrent(
  isCurrent: boolean,
): "location" | undefined {
  return isCurrent ? "location" : undefined;
}

export function getDescribedById(
  id: string,
  suffix = "description",
): string {
  return `${id}-${suffix}`;
}

export function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(A11Y_CONFIG.reducedMotionQuery).matches;
}

export function getMotionPreferences(): {
  prefersReducedMotion: boolean;
  safeToAnimate: boolean;
} {
  const reducedMotion = prefersReducedMotion();
  return {
    prefersReducedMotion: reducedMotion,
    safeToAnimate: !reducedMotion,
  };
}

export function getTransitionClasses(baseClasses: string): string {
  return `${baseClasses} ${REDUCED_MOTION_CLASSES}`;
}

export function getAnimationClasses(animationClasses: string): string {
  return `${animationClasses} motion-reduce:animate-none`;
}
