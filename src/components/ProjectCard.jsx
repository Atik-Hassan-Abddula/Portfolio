"use client";

import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckSquare,
  Layout,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function ProjectCard({ project }) {
  const renderPreviewMockup = () => {
    switch (project.previewType) {
      case "portfolio":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-100 p-4 font-mono text-[11px] transition-colors duration-300 dark:bg-slate-950/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Layout className="h-3.5 w-3.5" />
                <span>Next.js App Router</span>
              </span>
              <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                Responsive UI
              </span>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-2.5 py-1 text-[10px] dark:border-slate-800 dark:bg-slate-900">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {"<Portfolio />"}
                </span>
                <span className="rounded border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 text-[9px] text-purple-600 dark:text-purple-400">
                  Responsive
                </span>
              </div>

              <div className="rounded border border-blue-500/20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-2 text-[10px] text-slate-700 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 dark:text-slate-300">
                <span className="block font-semibold text-indigo-600 dark:text-indigo-300">
                  Full Stack Developer
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  Tailwind v4 • React 19 • Lucide
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span>Project Preview</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Responsive
              </span>
            </div>
          </div>
        );

      case "components":
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-100 p-4 font-mono text-[11px] transition-colors duration-300 dark:bg-slate-950/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                <Layers className="h-3.5 w-3.5" />
                <span>UI Primitives</span>
              </span>
              <span className="rounded border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 text-[10px] text-purple-600 dark:text-purple-400">
                WCAG AA
              </span>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2">
                <div className="rounded bg-blue-600 px-2.5 py-1 font-sans text-xs text-white">
                  Button.Primary
                </div>
                <div className="rounded border border-slate-300 bg-white px-2.5 py-1 font-sans text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Outline
                </div>
                <div className="ml-auto flex h-4 w-7 items-center justify-end rounded-full bg-indigo-600 px-0.5">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-600 dark:text-emerald-300">
                  Active
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[9px] text-blue-600 dark:text-blue-300">
                  Focused
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[9px] text-purple-600 dark:text-purple-300">
                  Dark Themed
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span>Atomic Design Tokens</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                v2.4.0
              </span>
            </div>
          </div>
        );

      case "kanban":
      default:
        return (
          <div className="flex h-full w-full flex-col justify-between bg-slate-100 p-4 font-mono text-[11px] transition-colors duration-300 dark:bg-slate-950/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <CheckSquare className="h-3.5 w-3.5" />
                <span>Sprint Board</span>
              </span>
              <span className="rounded border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 text-[10px] text-blue-600 dark:text-blue-400">
                Sprint #14
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 py-2">
              <div className="space-y-1.5 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900/90">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  In Progress
                </span>
                <div className="rounded border border-slate-200 bg-slate-100 p-1.5 text-[10px] text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-200">
                  Refactor State Hook
                </div>
              </div>

              <div className="space-y-1.5 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900/90">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Completed
                </span>
                <div className="rounded border border-emerald-500/40 bg-emerald-50 p-1.5 text-[10px] text-emerald-700 dark:bg-slate-800/80 dark:text-emerald-300">
                  ✓ Core Vitals Pass
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
              <span>Offline Synced</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Ready
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800/90 dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0b1120] dark:hover:border-slate-700/90">
      {/* Top Gradient Strip */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${project.gradient || "from-blue-600 to-indigo-600"}`}
      />

      <div>
        {/* Browser Mockup */}
        <div className="p-4 pb-0 sm:p-5 sm:pb-0">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner dark:border-slate-800 dark:bg-slate-950">
            {/* Browser Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>

              <div className="max-w-[170px] truncate rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                {project.id || "project"}.demo
              </div>

              <div className="h-2.5 w-2.5" />
            </div>

            {/* Mockup Preview */}
            <div className="relative h-44 sm:h-48">
              {renderPreviewMockup()}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="h-3 w-3" />
              {project.badge || "Featured Project"}
            </span>

            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Featured Project
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300">
            {project.title}
          </h3>

          <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
            {project.subtitle}
          </p>

          <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {(project.technologies || []).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Action Links */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 p-6 pt-4 dark:border-slate-800/70">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:from-blue-500 hover:to-indigo-500 sm:text-sm"
            aria-label={`View live demo of ${project.title}`}
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="inline-flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 font-mono text-xs font-medium text-slate-500 dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
            <span>Local Build</span>
          </span>
        )}

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200 sm:text-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/80 dark:hover:text-white"
            aria-label={`View source code of ${project.title}`}
          >
            <GithubIcon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            <span>Code</span>
          </a>
        ) : (
          <span className="inline-flex cursor-default items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 font-mono text-xs font-medium text-slate-500 dark:border-slate-800/60 dark:bg-slate-950/50 dark:text-slate-500">
            <GithubIcon className="h-3.5 w-3.5 text-slate-500" />
            <span>Not Provided</span>
          </span>
        )}
      </div>
    </div>
  );
}