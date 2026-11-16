"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollToSection } from "@/lib/scrollToSection";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Respect prefers-reduced-motion for accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return undefined;
    }

    // One instance, tuned for a fluid, weighty-but-responsive feel.
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      infinite: false,
    });

    // Store global reference for anchor click handlers
    window.__lenis = lenis;

    let rafId = null;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Direct URL hash navigation. Force lets the destination settle while
    // the preloader still has Lenis stopped; the preloader-done listener
    // below then re-aligns the section once the page is revealed.
    const restoreHash = ({ immediate = false } = {}) => {
      if (!window.location.hash) return;
      scrollToSection(window.location.hash, {
        updateHash: false,
        force: true,
        immediate,
      });
    };

    restoreHash({ immediate: true });
    const readyTimer = window.setTimeout(() => restoreHash(), 120);
    document.fonts?.ready
      ?.then(() => window.setTimeout(() => restoreHash(), 60))
      .catch(() => {});

    const onPreloaderDone = () => restoreHash();
    window.addEventListener("portfolio:preloader-done", onPreloaderDone);

    // Browser back/forward — re-align to the hash target smoothly.
    const onPopState = () => {
      const hash = window.location.hash;
      if (hash && scrollToSection(hash, { updateHash: false })) return;
      lenis.scrollTo(0, { duration: 1.05 });
    };
    window.addEventListener("popstate", onPopState);

    // Listen to reduced-motion preference changes dynamically
    const handleMotionChange = (event) => {
      if (event.matches) {
        lenis.destroy();
        if (window.__lenis === lenis) window.__lenis = null;
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(readyTimer);
      window.removeEventListener("portfolio:preloader-done", onPreloaderDone);
      window.removeEventListener("popstate", onPopState);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
