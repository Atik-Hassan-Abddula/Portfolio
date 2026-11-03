"use client";

import {
  ExternalLink,
  Sparkles,
  Layers,
  Flame,
  TrendingUp,
  Dumbbell,
  Newspaper,
  ArrowUpRight,
  Globe,
  Radio,
} from "lucide-react";

import { GithubIcon } from "@/components/Icons";

export default function ProjectCard({ project }) {
  const renderPreviewMockup = () => {
    switch (project.previewType) {
      case "news":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/90">
            {/* News Bar Header */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 pb-2.5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                <span>ব্রেকিং নিউজ</span>
              </span>
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-sans text-[9px] font-semibold text-red-600 dark:text-red-400">
                Live 24/7
              </span>
            </div>

            {/* News Mockup Grid */}
            <div className="space-y-2 py-2">
              <div className="rounded-lg border border-red-500/20 bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent p-2.5 text-slate-800 dark:text-slate-200">
                <span className="inline-block rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase">
                  শীর্ষ সংবাদ
                </span>
                <p className="mt-1 font-sans text-xs font-bold leading-tight line-clamp-1 text-slate-900 dark:text-white">
                  জাতীয় ও আন্তর্জাতিক সকল তাজা খবরের নির্ভরযোগ্য প্ল্যাটফর্ম
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-sans text-[9px]">
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  বাংলাদেশ
                </div>
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  আন্তর্জাতিক
                </div>
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  খেলাধুলা
                </div>
              </div>
            </div>

            {/* News Bar Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Newspaper className="h-3 w-3 text-red-500" />
                <span>Next.js App Router & MongoDB</span>
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ● Active
              </span>
            </div>
          </div>
        );

      case "fitness":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/90">
            {/* Fitness Header */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 pb-2.5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <Dumbbell className="h-3.5 w-3.5" />
                <span>Workout Tracker</span>
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                Target: 100%
              </span>
            </div>

            {/* Fitness Metrics */}
            <div className="space-y-2 py-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-center dark:bg-emerald-950/30">
                  <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">
                    Exercises Logged
                  </span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    18 Sets / 4 Routines
                  </span>
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-2 text-center dark:bg-cyan-950/30">
                  <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase">
                    Burn Activity
                  </span>
                  <span className="flex items-center justify-center gap-1 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    <Flame className="h-3.5 w-3.5 text-orange-500" />
                    Active Log
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-[10px] font-sans font-medium text-slate-700 dark:text-slate-300">
                  Chest &amp; Triceps Routine
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  Completed
                </span>
              </div>
            </div>

            {/* Fitness Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Dynamic Exercise Explorer</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Synced
              </span>
            </div>
          </div>
        );

      case "bazar":
      default:
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/90">
            {/* Bazar Header */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 pb-2.5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Market Insights</span>
              </span>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-semibold text-blue-600 dark:text-blue-400">
                Realtime Updates
              </span>
            </div>

            {/* Bazar Price Rows */}
            <div className="space-y-1.5 py-2 font-sans">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Daily Grocery &amp; Commodity Index
                </span>
                <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                  Live Feed
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Essential Items
                </div>
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Price Trends
                </div>
                <div className="rounded border border-slate-200 bg-white p-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Analytics
                </div>
              </div>
            </div>

            {/* Bazar Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Full-Stack Web Experience</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                ● Live
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800/90 dark:bg-[#0b1120] dark:hover:border-blue-500/40">
      {/* Top Gradient Banner */}
      <div
        className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${
          project.gradient || "from-blue-600 to-indigo-600"
        }`}
      />

      {/* Browser Window Frame & Preview */}
      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-colors group-hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:group-hover:border-slate-700">
          {/* Window Header */}
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-200 bg-slate-100/90 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
            </div>

            <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <Globe className="h-3 w-3 text-slate-400" />
              <span className="truncate">{project.id}.app</span>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1 w-1 rounded-full bg-slate-400" />
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="relative h-44 overflow-hidden sm:h-48">
            {renderPreviewMockup()}
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
            <Sparkles className="h-3 w-3" />
            <span>{project.badge || "Featured Project"}</span>
          </span>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Production Project
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="mt-1 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {project.subtitle}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Technology Pills */}
        <div className="mb-6 mt-5 flex flex-wrap gap-1.5">
          {(project.technologies || []).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-1 gap-2.5 border-t border-slate-100 pt-4 sm:grid-cols-2 dark:border-slate-800/80">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30 active:scale-[0.98] sm:text-sm"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Demo Coming Soon
            </span>
          )}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub repository of ${project.title}`}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 active:scale-[0.98] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Source Code</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Private Repo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
