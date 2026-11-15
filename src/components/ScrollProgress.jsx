"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * ScrollProgress — a thin gradient bar pinned to the very top of the
 * viewport that fills as the user scrolls through the page.
 *
 * - Uses motion's useScroll (scroll-event based, so it stays accurate
 *   alongside Lenis smooth scrolling).
 * - Spring-smoothed for a premium feel; users who prefer reduced motion
 *   get the raw (non-spring) progress instead of an eased animation.
 * - Purely decorative progress: aria-hidden and not focusable.
 */
export default function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smoothly chase the real scroll position (no jumpy steps)
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
    >
      {/* Soft glow underneath the bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40 blur-[2px]"
        style={{ scaleX: reducedMotion ? scrollYProgress : springScaleX }}
      />

      {/* Crisp progress bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
        style={{ scaleX: reducedMotion ? scrollYProgress : springScaleX }}
      />
    </div>
  );
}
