"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { personalInfo } from "@/data/portfolioData";

// ============================================================
// COSMIC IDENTITY PRELOADER
// Full-screen futuristic opening sequence shown on initial
// entry and full page refresh (it mounts exactly once — never
// on internal navigation).
// The usable page is the statically rendered DOM itself, so the curtain lifts
// the moment that DOM is parsed — no minimum hold, no waiting for images,
// fonts, the `load` event, or decorative animations. Only a short 320ms
// fade-out remains, putting the whole sequence at ~300-500ms. A brief 800ms
// failsafe is a pure safety net if a readiness signal ever goes missing.
// ============================================================

const FAILSAFE_MS = 800;
const EXIT_MS = 320;
const EXIT_REDUCED_MS = 120;

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded cosmic dust — deterministic, no hydration mismatch
function useStarDust(count) {
  return useMemo(() => {
    const rand = mulberry32(0x5eed51);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() < 0.6 ? 1.5 : rand() < 0.87 ? 2.2 : 3,
      delay: `${(rand() * 5.5).toFixed(2)}s`,
      duration: `${(3.2 + rand() * 3.4).toFixed(2)}s`,
      peak: 0.35 + rand() * 0.5,
      driftX: `${((rand() - 0.5) * 12).toFixed(1)}px`,
      driftY: `${((rand() - 0.5) * 12).toFixed(1)}px`,
    }));
  }, [count]);
}

function StarField() {
  const stars = useStarDust(34);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="constellation-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--star-delay"]: s.delay,
            ["--star-duration"]: s.duration,
            ["--star-peak"]: s.peak,
            ["--star-drift-x"]: s.driftX,
            ["--star-drift-y"]: s.driftY,
          }}
        />
      ))}
      {/* A few brighter sparkles cross-flaring in the dark */}
      {[
        { left: "18%", top: "22%", delay: "0s" },
        { left: "82%", top: "18%", delay: "-2.1s" },
        { left: "74%", top: "76%", delay: "-1.3s" },
        { left: "22%", top: "72%", delay: "-3.2s" },
      ].map((s, i) => (
        <span
          key={i}
          className="constellation-star rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: "3.5px",
            height: "3.5px",
            ["--star-delay"]: s.delay,
            ["--star-duration"]: "4.6s",
            ["--star-peak"]: 0.9,
            ["--star-drift-x"]: "2px",
            ["--star-drift-y"]: "-3px",
          }}
        />
      ))}
    </div>
  );
}

export default function Preloader() {
  const [current, setCurrent] = useState(0.04);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  const currentRef = useRef(0.04);
  const exitMsRef = useRef(EXIT_MS);
  const exitingRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitMsRef.current = reduced ? EXIT_REDUCED_MS : EXIT_MS;

    // --- Lock background scroll while the loader is visible ---
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();

    let raf = 0;
    let exitTimer = 0;
    let lastPct = -1;

    const onDomReady = () => beginExit();

    // Safety net only — never reached when the normal readiness path works.
    const failsafe = window.setTimeout(() => beginExit(), FAILSAFE_MS);

    const beginExit = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      document.removeEventListener("DOMContentLoaded", onDomReady);
      currentRef.current = 1;
      setCurrent(1);
      setExiting(true);
      // Release the page as the curtain lifts
      html.style.overflow = previousOverflow;
      if (window.__lenis) window.__lenis.start();
      // Let hash restore / scroll observers re-align once the page is live
      window.dispatchEvent(new Event("portfolio:preloader-done"));
      exitTimer = window.setTimeout(() => setGone(true), exitMsRef.current);
    };

    // This is a single statically rendered route: by the time this effect
    // runs, React has hydrated and the real content is already in the DOM.
    // Reveal it immediately — images, fonts, `load`, and decorative
    // animations are deliberately not awaited.
    if (document.readyState !== "loading") {
      beginExit();
    } else {
      document.addEventListener("DOMContentLoaded", onDomReady);
    }

    // Fast progress sweep while the curtain is up. It never gates the reveal
    // and is cancelled the moment the exit begins.
    const tick = () => {
      if (currentRef.current >= 1) return;
      currentRef.current = Math.min(1, currentRef.current + 0.14);
      const pct = Math.round(currentRef.current * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        setCurrent(currentRef.current);
      }
      raf = window.requestAnimationFrame(tick);
    };
    if (!exitingRef.current) raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.clearTimeout(exitTimer);
      document.removeEventListener("DOMContentLoaded", onDomReady);
      // StrictMode re-runs this effect in development; let the second pass
      // re-arm the exit instead of seeing the guard already tripped.
      exitingRef.current = false;
      html.style.overflow = previousOverflow;
      if (window.__lenis) window.__lenis.start();
    };
  }, []);

  if (gone) return null;

  const pct = Math.round(current * 100);

  return (
    <div
      className={`preloader-overlay preloader-fade-in fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#04081a] ${exiting ? "preloader-overlay--exit" : ""}`}
      role="status"
      aria-label={`Loading ${personalInfo.name} — ${personalInfo.role}`}
    >
      {/* No-JS visitors get the portfolio, not a permanent curtain */}
      <noscript>
        <style>{".preloader-overlay { display: none !important; }"}</style>
      </noscript>

      {/* ===== Cosmic environment ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Deep-space wash + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.72)_100%)]" />
        {/* Nebula washes — electric blue / soft violet */}
        <div className="absolute -left-24 top-[-18%] h-[30rem] w-[30rem] rounded-full bg-sky-600/[0.14] blur-[130px]" />
        <div className="absolute -right-24 bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-violet-600/[0.16] blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-700/[0.14] blur-[120px]" />
        {/* Spotlight column behind the cube */}
        <div className="absolute -top-10 left-1/2 h-[120%] w-44 -translate-x-1/2 bg-gradient-to-b from-indigo-200/[0.09] via-indigo-400/[0.04] to-transparent blur-md" />
        {/* Fine grid, barely-there */}
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.05)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <StarField />
      </div>

      {/* Corner HUD micro-marks */}
      <span aria-hidden="true" className="absolute left-4 top-4 font-mono text-[7px] uppercase tracking-[0.5em] text-slate-600 sm:left-6 sm:top-6 sm:text-[8px]">
        SYS.INIT//
      </span>
      <span aria-hidden="true" className="absolute right-4 top-4 font-mono text-[7px] uppercase tracking-[0.5em] text-slate-600 sm:right-6 sm:top-6 sm:text-[8px]">
        {"//"}LOAD.SEQ_01
      </span>
      <span aria-hidden="true" className="absolute bottom-4 left-4 font-mono text-[7px] uppercase tracking-[0.5em] text-slate-700 sm:bottom-6 sm:left-6 sm:text-[8px]">
        Neural.Portfolio
      </span>
      <span aria-hidden="true" className="absolute bottom-4 right-4 font-mono text-[7px] uppercase tracking-[0.5em] text-slate-700 sm:bottom-6 sm:right-6 sm:text-[8px]">
        Dev//Sequence
      </span>

      {/* ===== Centerpiece ===== */}
      <div className={`preloader-content relative flex flex-col items-center px-6 ${exiting ? "preloader-content--exit" : ""}`}>
        {/* Breathing glow behind the cube */}
        <div
          aria-hidden="true"
          className="preloader-nebula absolute left-1/2 top-[34%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-64 sm:w-64"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(56,189,248,0.18) 45%, transparent 72%)", filter: "blur(22px)" }}
        />

        {/* Glass cube — entrance wrapper */}
        <div className="preloader-cube-in relative [perspective:900px]">
          <div className="preloader-cube-bob">
            <div className="preloader-cube-x">
              <div className="preloader-cube-y">
                <div className="preloader-cube" aria-hidden="true">
                  <div className="preloader-face preloader-face--front">
                    <span className="font-mono text-xl font-black tracking-[0.18em] text-sky-100 [text-shadow:0_0_14px_rgba(125,211,252,0.95),0_0_34px_rgba(129,140,248,0.6)] sm:text-2xl">AH</span>
                  </div>
                  <div className="preloader-face preloader-face--back">
                    <span className="h-2 w-2 rounded-full bg-violet-300/70 [box-shadow:0_0_8px_2px_rgba(196,181,253,0.7)]" />
                  </div>
                  <div className="preloader-face preloader-face--right">
                    <span className="font-mono text-[8px] font-bold tracking-[0.3em] text-sky-200/80">01</span>
                  </div>
                  <div className="preloader-face preloader-face--left">
                    <span className="font-mono text-[8px] font-bold tracking-[0.3em] text-violet-200/80">04</span>
                  </div>
                  <div className="preloader-face preloader-face--top">
                    <span className="h-1.5 w-1.5 rotate-45 bg-sky-300/80 [box-shadow:0_0_8px_2px_rgba(125,211,252,0.7)]" />
                  </div>
                  <div className="preloader-face preloader-face--bottom">
                    <span className="h-1.5 w-1.5 rotate-45 bg-violet-300/80 [box-shadow:0_0_8px_2px_rgba(196,181,253,0.7)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Name — exact, letterspaced, glowing */}
        <p
          aria-hidden="true"
          className="preloader-name-in mt-9 bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text font-black leading-none tracking-[0.34em] text-transparent [filter:drop-shadow(0_0_16px_rgba(129,140,248,0.65))_drop-shadow(0_0_44px_rgba(56,189,248,0.3))] sm:mt-11 sm:text-4xl text-[26px]"
        >
          {personalInfo.name.toUpperCase()}
        </p>

        {/* Divider with orbit node */}
        <div aria-hidden="true" className="preloader-name-in mt-4 flex items-center gap-2" style={{ animationDelay: "0.18s" }}>
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400/70" />
          <span className="h-1.5 w-1.5 rotate-45 border border-indigo-300/70 bg-indigo-400/40" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-400/70" />
        </div>

        {/* Status line */}
        <p className="mt-4 font-mono text-[8px] font-semibold uppercase tracking-[0.42em] text-sky-200/75 sm:text-[9px]">
          INITIALIZING DIGITAL EXPERIENCE...
        </p>

        {/* Progress — real, measured progress */}
        <div className="mt-3.5 flex w-56 items-center gap-3 sm:w-72">
          <div
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.09]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Loading progress"
          >
            <div
              className="preloader-bar-fill h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 shadow-[0_0_12px_rgba(129,140,248,0.75)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span aria-hidden="true" className="w-9 text-right font-mono text-[10px] font-bold tabular-nums text-sky-200/85 sm:text-[11px]">
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
