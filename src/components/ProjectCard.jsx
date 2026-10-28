
"use client";

import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckSquare,
  Layout,
  ArrowUpRight,
} from "lucide-react";

import { GithubIcon } from "@/components/Icons";

export default function ProjectCard({ project }) {
  const renderPreviewMockup = () => {
    switch (project.previewType) {
      case "portfolio":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/80">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Layout className="h-3.5 w-3.5 shrink-0" />
                <span>Next.js App Router</span>
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-600 dark:text-emerald-400">
                Responsive UI
              </span>
            </div>

            <div className="space-y-2.5 py-3">
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="truncate font-bold text-blue-600 dark:text-blue-400">
                  {"<Portfolio />"}
                </span>
                <span className="shrink-0 rounded-md bg-purple-500/10 px-2 py-1 text-[9px] text-purple-600 dark:text-purple-400">
                  Responsive
                </span>
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 text-slate-700 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 dark:text-slate-300">
                <span className="block text-xs font-bold text-indigo-600 sm:text-sm dark:text-indigo-300">
                  Full Stack Developer
                </span>
                <span className="mt-1 block text-[9px] text-slate-500 sm:text-[10px] dark:text-slate-400">
                  Tailwind CSS · React · Lucide
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Project Preview</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ● Responsive
              </span>
            </div>
          </div>
        );

      case "components":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/80">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                <Layers className="h-3.5 w-3.5" />
                UI Primitives
              </span>
              <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[9px] text-purple-600 dark:text-purple-400">
                WCAG AA
              </span>
            </div>

            <div className="space-y-3 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-blue-600 px-3 py-2 font-sans text-xs font-medium text-white">
                  Button.Primary
                </span>
                <span className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-sans text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Outline
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-600 dark:text-emerald-300">
                  Active
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[9px] text-blue-600 dark:text-blue-300">
                  Focused
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-1 text-[9px] text-purple-600 dark:text-purple-300">
                  Dark Themed
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Design Tokens</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                v2.4.0
              </span>
            </div>
          </div>
        );

      case "kanban":
      default:
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-50 p-3 font-mono text-[10px] transition-colors duration-300 sm:p-4 sm:text-[11px] dark:bg-slate-950/80">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <CheckSquare className="h-3.5 w-3.5" />
                Sprint Board
              </span>
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[9px] text-blue-600 dark:text-blue-400">
                Sprint #14
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 py-3 min-[400px]:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900/90">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  In Progress
                </span>
                <div className="break-words rounded-lg border border-slate-200 bg-slate-50 p-2 text-[10px] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  Refactor State Hook
                </div>
              </div>

              <div className="min-w-0 space-y-2 rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900/90">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Completed
                </span>
                <div className="break-words rounded-lg border border-emerald-500/30 bg-emerald-50 p-2 text-[10px] text-emerald-700 dark:bg-slate-800 dark:text-emerald-300">
                  ✓ Core Vitals Pass
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Sync Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Ready
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/[0.08] sm:rounded-3xl dark:border-slate-800 dark:bg-gradient-to-b dark:from-slate-900 dark:to-[#0b1120] dark:hover:border-blue-500/40 dark:hover:shadow-blue-950/30">
      {/* Top Gradient */}
      <div
        className={`h-1 w-full shrink-0 bg-gradient-to-r ${
          project.gradient || "from-blue-600 to-indigo-600"
        }`}
      />

      {/* Browser Preview */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 group-hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:group-hover:border-slate-700">
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-200 bg-slate-100 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
            </div>

            <div className="min-w-0 max-w-[170px] truncate rounded-md border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              {project.id || "project"}.demo
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1 w-1 rounded-full bg-slate-400" />
            </div>
          </div>

          <div className="relative h-44 overflow-hidden sm:h-48">
            {renderPreviewMockup()}
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-3 py-1.5 font-mono text-[10px] font-semibold text-blue-600 sm:text-[11px] dark:border-blue-400/20 dark:bg-blue-400/[0.08] dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="break-words">
              {project.badge || "Featured Project"}
            </span>
          </span>

          <span className="text-[10px] font-medium text-slate-400 sm:text-xs dark:text-slate-500">
            Selected Work
          </span>
        </div>

        <h3 className="mb-2 break-words text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 sm:text-xl dark:text-white dark:group-hover:text-blue-300">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="mb-3 break-words font-mono text-xs leading-relaxed text-indigo-600 sm:text-sm dark:text-indigo-400">
            {project.subtitle}
          </p>
        )}

        <p className="mb-5 break-words text-sm leading-7 text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="mb-5 mt-auto flex flex-wrap gap-2">
          {(project.technologies || []).map((tech) => (
            <span
              key={tech}
              className="max-w-full break-words rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[10px] text-slate-600 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:text-[11px] dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Actions */}
      <div className="mt-auto grid grid-cols-1 gap-2.5 border-t border-slate-200/80 bg-slate-50/70 p-4 min-[360px]:grid-cols-2 sm:p-5 dark:border-slate-800/80 dark:bg-slate-950/30">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3 text-xs font-semibold text-white shadow-sm shadow-blue-900/15 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:text-sm dark:focus-visible:ring-offset-slate-900"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <span className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            Local Build
          </span>
        )}

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.title}`}
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
          >
            <GithubIcon className="h-4 w-4 shrink-0" />
            <span>Source Code</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </a>
        ) : (
          <span className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
            <GithubIcon className="h-4 w-4 shrink-0" />
            Not Provided
          </span>
        )}
      </div>
    </article>
  );
}
