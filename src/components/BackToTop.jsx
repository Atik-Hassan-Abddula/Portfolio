"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — floating action button that appears after the user scrolls
 * past the hero, and glides the page back to the top.
 *
 * - Reuses the global Lenis instance when available for a smooth glide,
 *   falling back to native smooth scrolling otherwise.
 * - Initial render (hidden) matches the server HTML → hydration safe.
 * - Hidden from interaction and assistive tech while invisible.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setVisible(window.scrollY > 600);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200/80 bg-white/85 text-slate-700 shadow-lg shadow-black/[0.06] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/60 hover:text-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700/70 dark:bg-slate-900/85 dark:text-slate-200 dark:shadow-black/30 dark:hover:border-purple-500/50 dark:hover:text-purple-300 sm:bottom-6 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Gradient hover aura */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/0 via-indigo-600/0 to-purple-600/20 opacity-0 transition-opacity duration-300 hover:opacity-100"
      />
      <ArrowUp className="h-4.5 w-4.5" aria-hidden="true" />
    </button>
  );
}
