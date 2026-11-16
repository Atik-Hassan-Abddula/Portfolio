"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import Hero3D from "@/components/Hero3D";
import TechOrbit from "@/components/TechOrbit";
import { personalInfo, projectsData } from "@/data/portfolioData";
import { scrollToSection } from "@/lib/scrollToSection";

const TICKER_WORDS = ["DESIGN", "DEVELOP", "DEPLOY", "REPEAT"];

// Deterministic pseudo-random sparkle layout for the ATIK HASSAN heading.
// Staggered delays/durations so glints never fire in unison.
const TWINKLES = [
  { left: 7, top: 14, size: 5, duration: 3.1, delay: 0.2, peak: 0.9 },
  { left: 21, top: 5, size: 4, duration: 2.6, delay: 1.5, peak: 0.75 },
  { left: 33, top: 26, size: 6, duration: 3.6, delay: 0.8, peak: 1 },
  { left: 45, top: 11, size: 3.5, duration: 2.3, delay: 2.4, peak: 0.85 },
  { left: 58, top: 33, size: 5, duration: 3.3, delay: 1.1, peak: 0.95 },
  { left: 71, top: 8, size: 4.5, duration: 2.8, delay: 0.5, peak: 0.8 },
  { left: 86, top: 22, size: 5.5, duration: 3.4, delay: 1.9, peak: 0.9 },
  { left: 14, top: 52, size: 4, duration: 2.5, delay: 2.8, peak: 0.8 },
  { left: 37, top: 68, size: 5.5, duration: 3.2, delay: 0.9, peak: 0.95 },
  { left: 53, top: 52, size: 3.5, duration: 2.2, delay: 1.7, peak: 0.7 },
  { left: 67, top: 66, size: 5, duration: 3.7, delay: 0.3, peak: 1 },
  { left: 83, top: 82, size: 4.5, duration: 2.9, delay: 2.2, peak: 0.85 },
];

const DIAMONDS = [
  { left: 12, top: 36, size: 7, duration: 4.6, delay: 0.7 },
  { left: 29, top: 46, size: 5.5, duration: 4.1, delay: 2.6 },
  { left: 51, top: 19, size: 5, duration: 5.2, delay: 1.4 },
  { left: 62, top: 76, size: 6.5, duration: 4.3, delay: 3.4 },
  { left: 78, top: 44, size: 5.5, duration: 5.6, delay: 0.1 },
];

const STARS = [
  { left: 18, top: 27, size: 15, duration: 3.6, delay: 0.4 },
  { left: 47, top: 4, size: 13, duration: 4.1, delay: 2.1 },
  { left: 60, top: 88, size: 14, duration: 3.3, delay: 1.2 },
  { left: 89, top: 55, size: 12, duration: 4.5, delay: 3.2 },
];

function TickerHalf() {
  return (
    <span className="flex shrink-0 items-center gap-10">
      {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{word}</span>
          <span aria-hidden="true" className="text-sky-400/80">
            ✦
          </span>
        </span>
      ))}
    </span>
  );
}

// Each letter carries the gradient and its own entrance + sweep delays.
// Delays are deterministic and must not depend on render state.
// sweepStep makes the shine streak travel glyph-by-glyph across the word.
function renderWord(word, dropBase, startIndex, { outline = false } = {}) {
  const sweepStep = 0.09;
  return word.split("").map((char, i) => (
    <span
      key={i}
      className={`hero-letter${outline ? " hero-letter-outline" : ""}`}
      style={{
        "--drop-delay": `${dropBase + i * 0.075}s`,
        "--sweep-delay": `${(startIndex + i) * sweepStep}s`,
      }}
    >
      {char}
    </span>
  ));
}

export default function Hero({ onOpenResume }) {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  // Hero-local cursor spotlight. Pointer: fine + full motion only.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!fine.matches || reduced.matches || !section || !glow) return;

    let raf = null;
    let x = 0;
    let y = 0;

    const onMove = (event) => {
      const rect = section.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        raf = null;
      });
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id) => {
    scrollToSection(id);
  };

  const latestProject = projectsData?.[0];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] scroll-mt-20 flex-col overflow-hidden bg-[#f7f9ff] text-slate-900 transition-colors duration-500 dark:bg-[#04060f] dark:text-slate-100"
    >
      {/* ===== Atmospheric backdrop ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Blueprint grid, faded toward edges */}
        <div className="hero-grid absolute inset-0 opacity-80" />

        {/* Ambient light: cool key left, violet rim right, floor glow */}
        <div className="absolute -left-48 top-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-[150px] dark:bg-sky-500/10" />
        <div className="absolute -right-48 top-16 h-[30rem] w-[30rem] rounded-full bg-violet-400/15 blur-[160px] dark:bg-violet-600/10" />
        <div className="absolute -bottom-44 left-1/2 h-96 w-[70rem] max-w-none -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[170px] dark:bg-indigo-600/10" />

        {/* Giant cropped background word */}
        <div className="hero-ghost-word absolute -bottom-[4vw] left-[-1vw] whitespace-nowrap font-black leading-none tracking-tighter text-[24vw] lg:text-[20rem]">
          DIMENSION
        </div>

        {/* Film grain */}
        <div className="hero-grain absolute inset-0" />
      </div>

      {/* Cursor spotlight (desktop, full motion only) */}
      <div ref={glowRef} aria-hidden="true" className="hero-cursor-glow left-1/2 top-1/2" />

      {/* ===== Vertical micro-label: coordinates — far left ===== */}
      <div
        aria-hidden="true"
        className="vertical-text pointer-events-none absolute left-[4.25rem] top-1/2 hidden -translate-y-1/2 select-none items-center font-mono text-[9px] tracking-[0.5em] text-slate-500 xl:flex dark:text-slate-600"
      >
        GAZIPUR&nbsp;·&nbsp;BD&nbsp;&nbsp;—&nbsp;&nbsp;23.99°&nbsp;N&nbsp;/&nbsp;90.40°&nbsp;E
      </div>

      {/* ===== Vertical scroll indicator — far right ===== */}
      <button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to next section"
        className="group absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer flex-col items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 xl:flex min-[1440px]:right-[4.25rem]"
      >
        <span className="vertical-text font-mono text-[9px] tracking-[0.55em] text-slate-500 transition-colors duration-300 group-hover:text-sky-600 dark:text-slate-500 dark:group-hover:text-sky-300">
          SCROLL
        </span>
        <span className="relative h-24 w-px bg-slate-300 transition-colors duration-300 group-hover:bg-slate-400 dark:bg-slate-700/80 dark:group-hover:bg-slate-600">
          <span className="scroll-line-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-500 shadow-[0_0_8px_2px_rgba(56,189,248,0.6)] dark:bg-sky-400" />
        </span>
      </button>

      {/* ===== Main asymmetric grid ===== */}
      <div className="relative z-10 mx-auto grid w-full max-w-[96rem] flex-1 grid-cols-1 items-center gap-8 px-6 pb-20 pt-24 sm:px-10 sm:pt-28 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:pt-24 xl:px-20">
        {/* ---- LEFT: editorial typography column ---- */}
        <StaggerGroup
          trigger="load"
          stagger={0.11}
          delayChildren={0.1}
          className="relative min-w-0 lg:col-span-7"
        >
          {/* Eyebrow readout */}
          <StaggerItem>
            <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[9px] font-medium uppercase tracking-[0.4em] text-slate-500 sm:mb-8 sm:text-[10px]">
              <span className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <span className="hero-blink h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_6px_1px_rgba(56,189,248,0.7)] dark:bg-sky-400" />
                Available for work
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
              <span>Full Stack Web Developer</span>
              <span aria-hidden="true" className="hidden text-slate-300 sm:inline dark:text-slate-700">/</span>
              <span className="hidden sm:inline">Portfolio — 001</span>
            </div>
          </StaggerItem>

            {/* Oversized stacked name — sized to stay inside its column at
                every breakpoint (HASSAN never reaches the orbit).
                Sparkling star-typography treatment: electric blue → soft violet
                gradient + shine sweep + twinkle / diamond / star particles. */}
            <StaggerItem>
              <h1 className="hero-title-glow relative select-none whitespace-nowrap font-black leading-[0.92] tracking-[0.055em]">
                <span className="block text-[clamp(2.6rem,10vw,8rem)]">
                  {renderWord("ATIK", 0.15, 0)}
                </span>
                <span className="block text-[clamp(2.6rem,10vw,8rem)]">
                  {renderWord("HASSAN", 0.55, 4, { outline: true })}
                </span>

                {/* Sparkle field: twinkles + diamond glitter + star bursts */}
                <span aria-hidden="true" className="hero-sparkle-field">
                  {TWINKLES.map((s, i) => (
                    <span
                      key={`t-${i}`}
                      className="hero-twinkle"
                      style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        "--twinkle-duration": `${s.duration}s`,
                        "--twinkle-delay": `${s.delay}s`,
                        "--twinkle-peak": s.peak,
                      }}
                    />
                  ))}
                  {DIAMONDS.map((s, i) => (
                    <span
                      key={`d-${i}`}
                      className="hero-diamond-sparkle"
                      style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        "--diamond-duration": `${s.duration}s`,
                        "--diamond-delay": `${s.delay}s`,
                      }}
                    />
                  ))}
                  {STARS.map((s, i) => (
                    <svg
                      key={`s-${i}`}
                      viewBox="0 0 24 24"
                      className="hero-star-sparkle"
                      style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        "--star-duration": `${s.duration}s`,
                        "--star-delay": `${s.delay}s`,
                      }}
                    >
                      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
                    </svg>
                  ))}
                </span>
              </h1>
            </StaggerItem>

          {/* Headline */}
          <StaggerItem>
            <p className="mt-6 max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-slate-800 sm:mt-7 sm:text-3xl xl:text-4xl dark:text-slate-200">
              Building{" "}
              <span className="bg-gradient-to-r from-sky-600 via-slate-900 to-violet-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-slate-100 dark:to-violet-300">
                Beyond Boundaries.
              </span>
            </p>
          </StaggerItem>

          {/* Description */}
          <StaggerItem>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg dark:text-slate-400">
              I turn creative ideas into powerful digital experiences through
              modern web technologies and thoughtful engineering.
            </p>
          </StaggerItem>

          {/* CTAs */}
          <StaggerItem>
            <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-none border border-slate-900/10 bg-gradient-to-b from-slate-900 to-slate-800 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_40px_-16px_rgba(15,23,42,0.55)] transition-all duration-300 hover:from-slate-900 hover:to-sky-700 hover:shadow-[0_14px_44px_-14px_rgba(2,132,199,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:translate-y-0 dark:border-slate-100/90 dark:from-white dark:to-slate-300 dark:text-slate-950 dark:shadow-[0_10px_40px_-12px_rgba(226,232,240,0.35)] dark:hover:from-white dark:hover:to-sky-200 dark:hover:shadow-[0_10px_44px_-10px_rgba(125,211,252,0.45)] dark:focus-visible:outline-sky-400"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group inline-flex cursor-pointer items-center gap-2.5 border border-slate-300 bg-white/70 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/15 dark:bg-white/[0.03] dark:text-slate-100 dark:hover:border-sky-400/50 dark:hover:bg-sky-400/[0.06] dark:hover:text-sky-300 dark:focus-visible:outline-sky-400"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  aria-label="Open resume preview"
                  className="inline-flex cursor-pointer items-center gap-2 px-3 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 transition-colors duration-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:hover:text-slate-100 dark:focus-visible:outline-sky-400"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden min-[420px]:inline">Resume</span>
                </button>
              )}
            </div>
          </StaggerItem>

          {/* Bottom meta row: socials + live project */}
          <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-6 sm:mt-10 dark:border-white/[0.07]">
              {personalInfo.socials.github && (
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {personalInfo.socials.linkedin && (
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-300"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {latestProject?.liveUrl && (
                <a
                  href={latestProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-700 transition-colors duration-200 hover:text-violet-900 dark:text-violet-300/90 dark:hover:text-violet-200"
                >
                  <span className="text-slate-400 dark:text-slate-600">Live:</span>
                  <span className="underline decoration-violet-400/40 underline-offset-4 group-hover:decoration-violet-600 dark:group-hover:decoration-violet-300">
                    {latestProject.title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </StaggerItem>
        </StaggerGroup>

        {/* ---- RIGHT: chrome sculpture stage ---- */}
        <div className="relative flex min-w-0 items-center justify-center lg:col-span-5">
          <div className="relative h-[185px] w-full max-w-md sm:h-[245px] sm:max-w-lg lg:h-[370px] lg:max-w-none xl:h-[415px]">
            {/* Soft stage light so the glass cube reads on the light theme */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.16),rgba(56,189,248,0.08)_45%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.22),rgba(56,189,248,0.08)_45%,transparent_70%)]"
            />

            {/* Technical corner ticks */}
            <span aria-hidden="true" className="absolute left-0 top-0 z-10 h-6 w-6 border-l border-t border-slate-400/70 dark:border-slate-600/70" />
            <span aria-hidden="true" className="absolute right-0 top-0 z-10 h-6 w-6 border-r border-t border-slate-400/70 dark:border-slate-600/70" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 z-10 h-6 w-6 border-b border-l border-slate-400/70 dark:border-slate-600/70" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 z-10 h-6 w-6 border-b border-r border-slate-400/70 dark:border-slate-600/70" />

            {/* Micro-labels framing the artwork */}
            <span
              aria-hidden="true"
              className="absolute left-3 top-3 z-10 font-mono text-[8px] uppercase tracking-[0.35em] text-slate-500 sm:text-[9px] dark:text-slate-600"
            >
              Scene.Cube_01
            </span>
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 z-10 font-mono text-[8px] uppercase tracking-[0.35em] text-slate-500 sm:text-[9px] dark:text-slate-600"
            >
              WebGL
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 z-10 flex max-w-[58%] items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.35em] text-slate-500 sm:text-[9px] dark:text-slate-600"
            >
              <MapPin className="h-3 w-3 shrink-0 text-violet-500/80 dark:text-violet-400/70" />
              <span className="min-w-0 truncate">{personalInfo.location}</span>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 z-10 font-mono text-[8px] uppercase tracking-[0.35em] text-slate-500 sm:text-[9px] dark:text-slate-600"
            >
              Render 60fps
            </span>

            {/* Orbiting technology rings (from the retired Technology Galaxy) */}
            <TechOrbit />

            {/* The interactive glass cube (or its static fallback) */}
            <Hero3D />
          </div>
        </div>
      </div>

      {/* ===== Signature ticker ===== */}
      <div className="relative z-10 border-t border-slate-200 bg-white/60 backdrop-blur-md transition-colors duration-500 dark:border-white/[0.06] dark:bg-black/40">
        <div className="overflow-hidden py-3">
          <div className="hero-marquee-track flex items-center whitespace-nowrap font-mono text-[10px] font-semibold tracking-[0.4em] text-slate-500 sm:text-[11px] dark:text-slate-500">
            <TickerHalf />
            <TickerHalf />
          </div>
        </div>
      </div>
    </section>
  );
}
