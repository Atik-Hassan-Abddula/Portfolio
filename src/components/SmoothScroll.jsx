"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Respect prefers-reduced-motion for accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    // Initialize Lenis with optimized settings for wheel, trackpad, and touch
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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

    // Handle initial hash on page load if present
    if (window.location.hash) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        setTimeout(() => {
          lenis.scrollTo(targetEl, { offset: -70, immediate: false });
        }, 100);
      }
    }

    // Listen to reduced-motion preference changes dynamically
    const handleMotionChange = (e) => {
      if (e.matches) {
        lenis.destroy();
        window.__lenis = null;
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    // Cleanup animation loop and destroy instance on unmount
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}

