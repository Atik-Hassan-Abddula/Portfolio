"use client";

import {
  BookOpen,
  GraduationCap,
  Monitor,
  Megaphone,
  GraduationCap as LearningIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { educationData, certificationsData } from "@/data/portfolioData";

// ============================================================
// EDUCATION — "ELECTRIC PATHWAY TIMELINE"
// A single gently bending blue → violet path threads through four
// milestone nodes. The desktop/laptop layout alternates compact
// panels around the path; mobile uses a clean vertical timeline.
// All four records come from the existing data source.
// ============================================================

const ssc = educationData.find((e) => e.id === "ssc");
const diploma = educationData.find((e) => e.id === "diploma-cse");
const computerOperation = certificationsData.find((c) => c.id === "computer-operation");
const digitalMarketing = certificationsData.find((c) => c.id === "digital-marketing");

// One continuous S-curve through (640,125), (360,375), (640,625), (360,875)
// in a 1000 × 1000 viewBox — the four node positions below.
const PATH_D =
  "M 500 0 C 690 60 690 190 500 250 C 310 310 310 440 500 500 " +
  "C 690 560 690 690 500 750 C 310 810 310 940 500 1000";

const MILESTONES = [
  {
    num: "01",
    title: "SSC",
    label: "Status",
    value: ssc?.period ?? "Completed",
    Icon: BookOpen,
    x: 64,
    y: 12.5,
    side: "left",
  },
  {
    num: "02",
    title: "Diploma in Computer Science & Engineering",
    label: "Status",
    value: diploma?.status ?? "Currently Studying",
    Icon: GraduationCap,
    x: 36,
    y: 37.5,
    side: "right",
  },
  {
    num: "03",
    title: "Computer Operation",
    label: "Level",
    value: "Level 3",
    Icon: Monitor,
    x: 64,
    y: 62.5,
    side: "left",
  },
  {
    num: "04",
    title: "Digital Marketing",
    label: "Level",
    value: "Level 3",
    Icon: Megaphone,
    x: 36,
    y: 87.5,
    side: "right",
  },
];

function MilestoneNode({ item }) {
  const Icon = item.Icon;
  return (
    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/60 bg-white shadow-[0_0_0_4px_rgba(56,189,248,0.08),0_0_18px_-4px_rgba(56,189,248,0.7)] transition-all duration-300 group-hover:border-violet-400/80 group-hover:shadow-[0_0_0_5px_rgba(139,92,246,0.1),0_0_22px_-3px_rgba(139,92,246,0.8)] motion-reduce:transition-none dark:border-sky-300/50 dark:bg-[#0a1024] dark:shadow-[0_0_0_4px_rgba(56,189,248,0.09),0_0_20px_-4px_rgba(56,189,248,0.75)]">
      <span
        aria-hidden="true"
        className="absolute inset-[3px] rounded-full bg-gradient-to-br from-sky-400/15 to-violet-500/15"
      />
      <Icon
        className="relative h-[18px] w-[18px] text-sky-600 transition-colors duration-300 group-hover:text-violet-600 motion-reduce:transition-none dark:text-sky-200 dark:group-hover:text-violet-200"
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </span>
  );
}

function MilestonePanel({ item }) {
  const isLevel = item.label === "Level";
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3.5 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-all duration-300 group-hover:border-sky-400/50 group-hover:bg-white group-hover:shadow-[0_18px_38px_-22px_rgba(56,189,248,0.45)] motion-reduce:transition-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_18px_40px_-24px_rgba(2,6,23,0.95)] dark:group-hover:border-sky-300/35 dark:group-hover:bg-white/[0.055]">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-2xl font-black leading-none tracking-tight text-sky-500/25 dark:text-sky-300/25">
          {item.num}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${
            isLevel
              ? "border-violet-500/25 bg-violet-500/[0.08] text-violet-700 dark:border-violet-400/25 dark:bg-violet-400/[0.09] dark:text-violet-300"
              : "border-sky-500/25 bg-sky-500/[0.08] text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/[0.09] dark:text-sky-300"
          }`}
        >
          {item.label}: {item.value}
        </span>
      </div>
      <h3 className="mt-3 break-words text-[13px] font-semibold leading-snug text-slate-900 dark:text-slate-100 sm:text-sm">
        {item.title}
      </h3>
    </div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-[#060a17] dark:text-white sm:py-20 lg:py-24"
    >
      {/* Restrained ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-sky-500/[0.07] blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Section header ===== */}
        <Reveal y={14} className="mx-auto mb-10 max-w-2xl space-y-3 text-center sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/[0.08] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-600 dark:border-sky-400/25 dark:bg-sky-400/[0.08] dark:text-sky-300">
            <LearningIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>MY EDUCATION</span>
          </div>

          <h2
            id="education-heading"
            className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Education &amp;{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-200 dark:to-violet-300">
              Learning Journey
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Every step of learning shapes my journey.
          </p>
        </Reveal>

        {/* ===== Desktop / laptop / tablet: curved electric pathway ===== */}
        <Reveal y={24} delay={0.06} duration={0.8} className="mx-auto hidden max-w-5xl md:block">
          <div className="relative h-[680px] w-full lg:h-[740px]">
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="edu-pathway" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="48%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              {/* Soft glow underlay */}
              <path
                d={PATH_D}
                fill="none"
                stroke="url(#edu-pathway)"
                strokeWidth="7"
                strokeOpacity="0.18"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="blur-[5px]"
              />
              {/* Hairline core */}
              <path
                d={PATH_D}
                fill="none"
                stroke="url(#edu-pathway)"
                strokeWidth="1.6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="absolute inset-0">
              {MILESTONES.map((item) => {
                const connectorLeft = item.side === "left" ? "46%" : "36%";
                return (
                  <li
                    key={item.num}
                    className="group absolute inset-x-0"
                    style={{ top: `${item.y}%` }}
                  >
                    {/* Short lead from the panel to the node on the path */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-0 h-px w-[18%] transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none ${
                        item.side === "left"
                          ? "bg-gradient-to-r from-sky-400/50 to-violet-400/20 opacity-70"
                          : "bg-gradient-to-l from-sky-400/50 to-violet-400/20 opacity-70"
                      }`}
                      style={{ left: connectorLeft }}
                    />
                    <span
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${item.x}%` }}
                    >
                      <MilestoneNode item={item} />
                    </span>
                    <div
                      className={`absolute top-0 w-[38%] -translate-y-1/2 ${
                        item.side === "left" ? "left-[8%]" : "right-[8%]"
                      }`}
                    >
                      <MilestonePanel item={item} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* ===== Mobile: clean vertical timeline ===== */}
        <Reveal y={20} delay={0.06} className="md:hidden">
          <ol className="relative space-y-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-10 left-[21px] top-5 w-px bg-gradient-to-b from-sky-500 via-indigo-500 to-violet-500 dark:from-sky-400 dark:via-indigo-400 dark:to-violet-400"
            />
            {MILESTONES.map((item) => (
              <li key={item.num} className="group relative flex items-start gap-4">
                <span className="relative z-10 shrink-0">
                  <MilestoneNode item={item} />
                </span>
                <div className="min-w-0 flex-1">
                  <MilestonePanel item={item} />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="sr-only">
          SSC — Status: Completed. Diploma in Computer Science &amp; Engineering — Status:
          Currently Studying. Computer Operation — Level: Level 3. Digital Marketing — Level:
          Level 3.
        </p>
      </div>
    </section>
  );
}
