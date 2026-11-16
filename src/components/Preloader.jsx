"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { personalInfo } from "@/data/portfolioData";

// ============================================================
// COSMIC IDENTITY PRELOADER
// Full-screen futuristic opening sequence shown on initial
// entry and full page refresh (it mounts exactly once — never
// on internal navigation). Progress reflects real signals:
//   hydration -> finished resources (Performance API) -> fonts
//   ready -> window load. No fabricated timer percentage.
// A short minimum duration (900ms) prevents flash on fast loads;
// a 5s failsafe guarantees the page is never blocked.
// ============================================================

const MIN_VISIBLE_MS = 900;
const MIN_VISIBLE_REDUCED_MS = 250;
const FAILSAFE_MS = 5000;
const EXIT_MS = 750;

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

  const targetRef = useRef(0.18); // hydration complete is a real milestone
  const currentRef = useRef(0.04);
  const minMsRef = useRef(MIN_VISIBLE_MS);
  const startedAtRef = useRef(0);
  const exitingRef = useRef(false);

  useEffect(() => {
    minMsRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? MIN_VISIBLE_REDUCED_MS
      : MIN_VISIBLE_MS;
    startedAtRef.current = performance.now();

    // --- Lock background scroll while the loader is visible ---
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();

    // --- Real loading milestones ---
    // 1) Finished resources (polled cheaply; monotonic, count-based)
    const poll = window.setInterval(() => {
      try {
        const finished = performance.getEntriesByType("resource").length;
        targetRef.current = Math.min(0.82, Math.max(targetRef.current, 0.2 + finished * 0.06));
      } catch {
        /* Performance API unavailable — fonts/load milestones still apply */
      }
    }, 160);

    // 2) Web fonts settled
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        targetRef.current = Math.max(targetRef.current, 0.6);
      }).catch(() => {});
    }

    // 3) Window load — every critical resource (CSS/JS/images) is in
    const onLoad = () => {
      targetRef.current = 1;
    };
    if (document.readyState === "complete") {
      targetRef.current = 1;
    } else {
      window.addEventListener("load", onLoad);
    }

    // 4) Failsafe — never block the page behind the loader
    const failsafe = window.setTimeout(() => {
      targetRef.current = 1;
    }, FAILSAFE_MS);

    const beginExit = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      setExiting(true);
      // Release the page as the curtain lifts
      html.style.overflow = previousOverflow;
      if (window.__lenis) window.__lenis.start();
      window.setTimeout(() => setGone(true), EXIT_MS);
    };

    // --- Smooth display loop, lerped toward the measured target ---
    let raf = 0;
    const tick = () => {
      const target = targetRef.current;
      const prev = currentRef.current;
      const next = prev + (target - prev) * 0.085;
      const settled = target >= 1 && next > 0.985;
      currentRef.current = settled ? 1 : next;
      setCurrent(currentRef.current);

      const minElapsed = performance.now() - startedAtRef.current >= minMsRef.current;
      if (target >= 1 && settled && minElapsed) {
        beginExit();
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    // Background-tab safety: rAF may be throttled; the interval still runs
    const completionPoll = window.setInterval(() => {
      const elapsed = performance.now() - startedAtRef.current;
      if (targetRef.current >= 1 && elapsed >= minMsRef.current) {
        beginExit();
      }
    }, 250);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.clearInterval(completionPoll);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
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
        <div aria-hidden="true" className="preloader-name-in mt-4 flex items-center gap-2" style={{ animationDelay: "0.48s" }}>
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
