"use client";

import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Route,
  Smile,
  Hammer,
  Zap,
  Puzzle,
  Users,
  GraduationCap,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { personalInfo } from "@/data/portfolioData";

// ============================================================
// ABOUT ME — "ABOUT ATIK — DEVELOPER BEHIND THE CODE"
// Premium asymmetric bento. Real profile photo, real journey,
// real traits. Glass over deep navy, light/dark preserved.
// ============================================================

const CARD =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/85 text-slate-900 shadow-[0_18px_44px_-22px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-100 dark:shadow-[0_28px_60px_-28px_rgba(2,6,23,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:border-indigo-400/30";

const JOURNEY = [
  { label: "Learning Web Development", note: "Where it started" },
  { label: "Building Frontend Projects", note: "First real builds" },
  { label: "Exploring Backend Development", note: "Servers, APIs & data" },
  { label: "Learning Full-Stack Technologies", note: "Client to server" },
];

const TRAITS = [
  { label: "Hard Worker", icon: Hammer, accent: "sky" },
  { label: "Quick Learner", icon: Zap, accent: "amber" },
  { label: "Problem Solver", icon: Puzzle, accent: "violet" },
  { label: "Team Player", icon: Users, accent: "emerald" },
];

const TRAIT_STYLES = {
  sky: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/20",
  amber: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  violet: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/20",
  emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20",
};

function CardHeader({ icon: Icon, title, caption, tone }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${tone}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <h3 className="text-lg font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.32em] text-slate-500 dark:text-slate-500">
          {caption}
        </p>
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f6fc] py-16 text-slate-900 transition-colors duration-500 dark:bg-[#060b1a] dark:text-slate-100 sm:py-20 lg:py-24"
    >
      {/* ===== Ambient backdrop — faint nebula + blueprint grid ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-96 w-96 rounded-full bg-sky-400/15 blur-[150px] dark:bg-sky-600/[0.12]" />
        <div className="absolute -right-40 bottom-16 h-96 w-96 rounded-full bg-violet-400/15 blur-[150px] dark:bg-violet-600/[0.14]" />
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="hero-grain absolute inset-0" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,8,20,0.55)_100%)] dark:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <Reveal className="mx-auto max-w-3xl text-center" y={18}>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/[0.08] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:border-indigo-400/25 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            About Atik
          </div>

          <h2
            id="about-heading"
            className="mt-5 font-black leading-[1.0] tracking-tight"
          >
            <span className="block text-4xl text-slate-900 dark:text-slate-50 sm:text-6xl xl:text-7xl">
              The Developer
            </span>
            <span className="block bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-4xl text-transparent dark:from-sky-400 dark:via-indigo-300 dark:to-violet-400 sm:text-6xl xl:text-7xl">
              Behind the Code.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-slate-500 dark:text-slate-500 sm:text-[11px]">
            The person · the path · the principles
          </p>
        </Reveal>

        {/* ===== Bento grid ===== */}
        <StaggerGroup
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-6"
          stagger={0.1}
          delayChildren={0.05}
        >
          {/* ============ CARD 1 — Developer Profile (dominant) ============ */}
          <StaggerItem className="md:col-span-2 lg:col-span-1 lg:row-span-2" y={26}>
            <div className="h-full rounded-3xl bg-gradient-to-br from-sky-400/60 via-indigo-500/45 to-violet-500/60 p-[1.5px] transition-all duration-500 hover:-translate-y-1.5 hover:from-sky-400/80 hover:via-indigo-500/60 hover:to-violet-500/80 hover:shadow-[0_36px_80px_-34px_rgba(99,102,241,0.5)]">
              <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#060b1a] md:flex-row lg:flex-col">
                {/* Portrait */}
                <div className="relative min-h-[17rem] flex-1 sm:min-h-[18rem] md:h-72 md:min-h-0 md:w-[47%] md:flex-none lg:h-auto lg:min-h-[16rem] lg:w-auto lg:flex-1">
                  <Image
                    src={personalInfo.profileImage}
                    alt="Portrait of Atik Hassan"
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 768px) 92vw, 100vw"
                    className="object-cover object-[50%_14%]"
                  />
                  {/* Readability gradients — top (badge) and bottom (name) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#060b1a]/70 via-transparent to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#060b1a] via-[#060b1a]/55 to-transparent"
                  />

                  {/* Status pill */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-emerald-300 backdrop-blur-md sm:text-[9px]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {personalInfo.status}
                  </span>

                  {/* Name block over portrait */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.38em] text-sky-300 sm:text-[9px]">
                      Full Stack Web Developer
                    </p>
                    <h3 className="mt-1.5 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                      ATIK
                      <br />
                      HASSAN
                    </h3>
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-300 sm:text-xs">
                      <MapPin className="h-3.5 w-3.5 text-sky-400" />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Intro strip */}
                <div className="border-t border-white/[0.07] bg-[#070c1e] px-5 py-4 sm:px-6 sm:py-5 md:flex md:w-[53%] md:flex-col md:justify-center md:border-l md:border-t-0 lg:w-auto lg:border-l-0 lg:border-t">
                  <p className="text-[12.5px] leading-relaxed text-slate-300 sm:text-[13px] md:text-sm">
                    I am a passionate web developer who enjoys building{" "}
                    <span className="font-semibold text-sky-300">
                      modern, responsive
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-violet-300">
                      user-friendly
                    </span>{" "}
                    web applications.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* ============ CARD 2 — My Journey (wide timeline) ============ */}
          <StaggerItem className="md:col-span-2 lg:col-span-2" y={26}>
            <article className={`${CARD} p-5 sm:p-6`}>
              <CardHeader
                icon={Route}
                title="My Journey"
                caption="How I got here"
                tone="border-sky-500/20 bg-sky-500/[0.08] text-sky-600 dark:border-sky-400/20 dark:bg-sky-400/[0.08] dark:text-sky-300"
              />

              <ol className="relative mt-5 sm:mt-6">
                {/* Gradient spine */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-[9px] top-3 w-px bg-gradient-to-b from-sky-400 via-indigo-400 to-violet-400 opacity-50"
                />

                {JOURNEY.map((step, i) => (
                  <li
                    key={step.label}
                    className="relative flex items-center gap-3 py-2 transition-transform duration-300 hover:translate-x-1 sm:gap-4 sm:py-[0.65rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="relative z-10 h-[19px] w-[19px] shrink-0 rounded-full border border-sky-400/50 bg-[#060b1a] ring-4 ring-sky-400/10"
                    >
                      <span className="absolute inset-[5px] rounded-full bg-gradient-to-br from-sky-400 to-indigo-400" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-semibold leading-snug text-slate-800 dark:text-slate-100 sm:text-sm">
                        {step.label}
                      </span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
                        {step.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto font-mono text-[9px] font-semibold tabular-nums text-slate-400 dark:text-slate-600"
                    >
                      0{i + 1}
                    </span>
                  </li>
                ))}

                {/* Currently — highlighted */}
                <li className="relative flex items-center gap-3 py-2 transition-transform duration-300 hover:translate-x-1 sm:gap-4 sm:py-[0.65rem]">
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 ring-4 ring-indigo-400/15"
                  >
                    <GraduationCap className="h-3 w-3 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold text-slate-900 dark:text-white sm:text-sm">
                      Studying Diploma in CSE
                    </span>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                      Current chapter
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:border-indigo-400/30 dark:text-indigo-300">
                    Now
                  </span>
                </li>
              </ol>

              <div className="mt-auto border-t border-slate-200/80 pt-3 dark:border-white/[0.06] sm:pt-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-600 sm:text-[9px]">
                  Learning <span className="text-sky-500 dark:text-sky-400">→</span>{" "}
                  Building <span className="text-indigo-500 dark:text-indigo-400">→</span>{" "}
                  Shipping <span className="text-violet-500 dark:text-violet-400">→</span>{" "}
                  Repeating
                </p>
              </div>
            </article>
          </StaggerItem>

          {/* ============ CARD 3 — My Personality ============ */}
          <StaggerItem y={26}>
            <article className={`${CARD} p-5 sm:p-6`}>
              <CardHeader
                icon={Smile}
                title="My Personality"
                caption="How I work"
                tone="border-violet-500/20 bg-violet-500/[0.08] text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300"
              />

              <div className="mt-4 grid flex-1 grid-cols-2 content-center gap-2.5 sm:mt-5 sm:gap-3">
                {TRAITS.map(({ label, icon: Icon, accent }) => (
                  <div
                    key={label}
                    className="group/trait flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-indigo-400/30 dark:hover:bg-white/[0.05] sm:p-3.5"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-transform duration-300 group-hover/trait:scale-110 ${TRAIT_STYLES[accent]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11.5px] font-bold leading-tight tracking-tight text-slate-800 dark:text-slate-100 sm:text-[12.5px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </StaggerItem>

          {/* ============ CARD 4 — My Philosophy ============ */}
          <StaggerItem y={26}>
            <figure
              className={`${CARD} items-center justify-center overflow-hidden p-6 text-center sm:p-7`}
            >
              {/* Oversized serif quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1 -top-5 select-none font-serif text-[7rem] leading-none text-indigo-500/15 dark:text-indigo-400/15 sm:text-[8.5rem]"
              >
                &ldquo;
              </span>
              <InfinityIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-slate-300 transition-transform duration-500 group-hover:rotate-180 dark:text-slate-700"
              />

              <blockquote className="relative">
                <span className="block text-3xl font-black leading-[1.08] tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl xl:text-[2.5rem]">
                  Learn.
                </span>
                <span className="block bg-gradient-to-r from-sky-600 to-indigo-500 bg-clip-text text-3xl font-black leading-[1.08] tracking-tight text-transparent dark:from-sky-400 dark:to-indigo-300 sm:text-4xl xl:text-[2.5rem]">
                  Build.
                </span>
                <span className="block bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-3xl font-black leading-[1.08] tracking-tight text-transparent dark:from-indigo-300 dark:to-violet-400 sm:text-4xl xl:text-[2.5rem]">
                  Improve.
                </span>
                <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-black leading-[1.08] tracking-tight text-transparent dark:from-violet-400 dark:to-fuchsia-400 sm:text-4xl xl:text-[2.5rem]">
                  Repeat.
                </span>
              </blockquote>

              <figcaption className="mt-5 font-mono text-[8px] font-semibold uppercase tracking-[0.45em] text-indigo-600 dark:text-indigo-400 sm:text-[9px]">
                — My Philosophy
              </figcaption>
            </figure>
          </StaggerItem>
        </StaggerGroup>

        {/* Screen-reader summary of the section */}
        <p className="sr-only">
          Atik Hassan — Full Stack Web Developer, Dhaka, Bangladesh. I am a
          passionate web developer who enjoys building modern, responsive and
          user-friendly web applications. My journey: learning web
          development, building frontend projects, exploring backend
          development, learning full-stack technologies, and currently studying
          Diploma in CSE. Personality: hard worker, quick learner, problem
          solver, team player. Philosophy: Learn. Build. Improve. Repeat.
        </p>
      </div>
    </section>
  );
}
