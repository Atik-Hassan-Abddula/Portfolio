
"use client";

import {
  BookOpen,
  Target,
  Sparkles,
  Layout,
  Palette,
  Zap,
  GitBranch,
  CheckCircle2,
} from "lucide-react";

import {
  personalInfo,
  aboutHighlights,
  stats,
} from "@/data/portfolioData";

export default function About() {
  const highlightIcons = {
    Layout,
    Palette,
    Zap,
    GitBranch,
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-white py-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white"
    >
      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 -z-0 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover My Background</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Me
            </span>
          </h2>

          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            Engineering modern web interfaces through the harmony of clean
            code, thoughtful architecture, and user-centric design.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Story & Journey */}
          <div className="space-y-8 lg:col-span-6">
            {/* Introduction Card */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 backdrop-blur-sm sm:p-7 dark:border-slate-800/80 dark:bg-slate-900/60">
              <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Introduction & Philosophy
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {personalInfo.fullBio[0]}
              </p>
            </div>

            {/* Learning Journey Card */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 backdrop-blur-sm sm:p-7 dark:border-slate-800/80 dark:bg-slate-900/60">
              <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Learning Journey & Evolution
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {personalInfo.fullBio[1]}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2 font-mono text-xs text-slate-600 sm:grid-cols-2 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Semantic & Accessible Web</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Modern React Ecosystem</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Tailwind Responsive Systems</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Git Collaboration Flow</span>
                </div>
              </div>
            </div>

            {/* Career Goals Card */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 backdrop-blur-sm sm:p-7 dark:border-slate-800/80 dark:bg-slate-900/60">
              <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Career Goals & Vision
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {personalInfo.fullBio[2]}
              </p>
            </div>
          </div>

          {/* Column 2: Highlights & Stats */}
          <div className="space-y-6 lg:col-span-6">
            {/* Feature Highlight Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutHighlights.map((item, index) => {
                const IconComponent =
                  highlightIcons[item.icon] || Sparkles;

                return (
                  <div
                    key={index}
                    className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800/90 dark:from-slate-900/80 dark:to-[#0b1120] dark:hover:border-blue-500/40"
                  >
                    <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 transition-all group-hover:scale-110 group-hover:text-purple-600 dark:text-blue-400 dark:group-hover:text-purple-300">
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <h4 className="mb-1.5 text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300">
                      {item.title}
                    </h4>

                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Performance & Quality Stats */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 via-slate-50 to-purple-50 p-6 backdrop-blur-sm dark:border-slate-800 dark:from-blue-950/30 dark:via-slate-900/60 dark:to-purple-950/30">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                At A Glance Metrics
              </h4>

              <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200/80 bg-white/80 p-3 dark:border-slate-800/80 dark:bg-slate-950/60"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl dark:from-blue-400 dark:to-purple-400">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-[11px] font-medium text-slate-600 sm:text-xs dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values Quote */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="select-none text-2xl text-blue-600 dark:text-blue-400">
                “
              </div>

              <p className="text-xs italic leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                Great frontend engineering is not only about how code runs in
                the browser, but how effortlessly and delightfully it serves
                the people using it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
