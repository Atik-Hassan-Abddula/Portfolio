"use client";

/**
 * Single source of truth for in-page section navigation.
 *
 * Lenis already subtracts both the target's `scroll-margin-top` and the
 * root's `scroll-padding-top` when it is handed an element. Passing an
 * extra offset on top of those produced a ~230px overshoot (80 + 80 + 70).
 * We therefore compute the destination ourselves, once, and hand Lenis a
 * plain pixel value. Every link, footer shortcut, hash restore and
 * popstate handler goes through this function so the behaviour can never
 * drift between call sites.
 */
export const NAV_SCROLL_OFFSET = 80; // fixed navbar (56px) + breathing room

export function getSectionScrollTop(id) {
  if (typeof window === "undefined") return null;
  const element = document.getElementById(String(id).replace(/^#/, ""));
  if (!element) return null;

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const top = element.getBoundingClientRect().top + window.scrollY;

  return Math.min(maxScroll, Math.max(0, top - NAV_SCROLL_OFFSET));
}

export function scrollToSection(
  hashOrId,
  { updateHash = true, force = false, immediate = false, duration } = {}
) {
  if (typeof window === "undefined") return false;

  const id = String(hashOrId).replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  const top = getSectionScrollTop(id);
  if (!target || top === null) return false;

  const lenis = window.__lenis;
  if (lenis) {
    const options = { force, immediate };
    if (typeof duration === "number") options.duration = duration;
    lenis.scrollTo(top, options);
  } else {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top,
      behavior: immediate || reducedMotion ? "auto" : "smooth",
    });
  }

  if (updateHash && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }

  return true;
}
