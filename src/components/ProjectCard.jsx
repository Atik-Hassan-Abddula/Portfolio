"use client";

import Image from "next/image";
import {
  ExternalLink,
  Eye,
  Lock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { TechIcon } from "@/components/TechIcons";

/* ─────────────────────────────────────────────
   Accent colour sets rotated per-card
   ───────────────────────────────────────────── */
const cardAccents = [
  {
    glow: "from-purple-600/20 via-blue-600/15 to-indigo-600/10",
    border: "hover:border-purple-500/40 dark:hover:border-purple-400/40",
    dot: "bg-purple-500",
    number: "text-purple-500/20 dark:text-purple-400/15",
    badge:
      "border-purple-500/20 bg-purple-500/10 text-purple-300 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-300",
    floatBg: "bg-purple-500/10 border-purple-500/20 text-purple-300",
  },
  {
    glow: "from-cyan-600/20 via-blue-600/15 to-teal-600/10",
    border: "hover:border-cyan-500/40 dark:hover:border-cyan-400/40",
    dot: "bg-cyan-500",
    number: "text-cyan-500/20 dark:text-cyan-400/15",
    badge:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-300 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300",
    floatBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  },
  {
    glow: "from-blue-600/20 via-indigo-600/15 to-violet-600/10",
    border: "hover:border-blue-500/40 dark:hover:border-blue-400/40",
    dot: "bg-blue-500",
    number: "text-blue-500/20 dark:text-blue-400/15",
    badge:
      "border-blue-500/20 bg-blue-500/10 text-blue-300 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300",
    floatBg: "bg-blue-500/10 border-blue-500/20 text-blue-300",
  },
  {
    glow: "from-emerald-600/20 via-teal-600/15 to-cyan-600/10",
    border: "hover:border-emerald-500/40 dark:hover:border-emerald-400/40",
    dot: "bg-emerald-500",
    number: "text-emerald-500/20 dark:text-emerald-400/15",
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
    floatBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  },
];

/* Badge pill accents for tech pills */
const techPillClasses = [
  "border-purple-500/25 bg-purple-500/8 text-purple-400",
  "border-blue-500/25 bg-blue-500/8 text-blue-400",
  "border-cyan-500/25 bg-cyan-500/8 text-cyan-400",
  "border-pink-500/25 bg-pink-500/8 text-pink-400",
  "border-indigo-500/25 bg-indigo-500/8 text-indigo-400",
  "border-teal-500/25 bg-teal-500/8 text-teal-400",
];

/* Floating badge positions – staggered around the browser mockup */
const floatPositions = [
  "top-3 -left-3 sm:-left-5 lg:-left-6",
  "bottom-8 -right-3 sm:-right-5 lg:-right-6",
  "-bottom-3 left-8 sm:left-12",
];

/* Floating animation delays for variety */
const floatDelays = ["[animation-delay:0s]", "[animation-delay:1.5s]", "[animation-delay:3s]"];

/**
 * ProjectCard — Creative Case Study layout.
 *
 * Desktop: Asymmetric horizontal card with browser mockup on one side
 * and editorial project info on the other, alternating per card.
 * Mobile: Stacks mockup above details.
 *
 * Props:
 *   project  — from portfolioData.js
 *   index    — card position (0-based)
 *   onViewCaseStudy — callback to open the modal
 */
export default function ProjectCard({ project, index = 0, onViewCaseStudy }) {
  const imageRight = index % 2 === 1;
  const accent = cardAccents[index % cardAccents.length];
  const projectNumber = String(index + 1).padStart(2, "0");

  /* Pick 3 floating techs (or fewer if project has <3) */
  const floatingTechs = (project.technologies || []).slice(0, 3);

  return (
    <article
      className={`group relative grid h-full min-h-0 min-w-0 grid-cols-1 overflow-visible rounded-2xl border border-slate-200/60 bg-white/95 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 md:min-h-[400px] dark:border-white/[0.06] dark:bg-[#0d1730]/95 dark:shadow-[0_24px_60px_-24px_rgba(2,6,23,0.8),inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:backdrop-blur-md ${accent.border} md:grid-cols-2 lg:grid-cols-[1.15fr_1fr]`}
    >
      {/* ── Ambient card glow on hover ── */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-60 ${accent.glow}`}
      />

      {/* ═══════════════════════════════════════════
          BROWSER MOCKUP side
          ═══════════════════════════════════════════ */}
      <div
        className={`relative min-w-0 p-4 sm:p-5 lg:p-6 ${
          imageRight ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Browser window frame */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-xl shadow-slate-300/40 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 dark:border-slate-600/40 dark:bg-[#111827] dark:shadow-slate-950/60 dark:group-hover:shadow-purple-500/15">
          {/* Top browser bar */}
          <div className="flex items-center gap-2 border-b border-slate-200/70 bg-slate-50/90 px-3 py-2 dark:border-slate-700/50 dark:bg-[#1a2332]">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 dark:bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 dark:bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80 dark:bg-green-500/60" />
            </div>

            {/* Address bar */}
            <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-slate-100/80 px-2.5 py-1 dark:bg-slate-800/60">
              <Lock className="h-3 w-3 shrink-0 text-green-500/70 dark:text-green-400/60" />
              <span className="truncate font-mono text-[10px] text-slate-400 dark:text-slate-500">
                {project.liveUrl
                  ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : "localhost:3000"}
              </span>
            </div>
          </div>

          {/* Screenshot viewport with hover zoom */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={project.screenshot}
              alt={`${project.title} website screenshot`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />

            {/* Subtle gradient vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>

        {/* ── Floating Technology Badges ── */}
        {floatingTechs.map((tech, i) => (
          <span
            key={tech}
            className={`absolute z-20 hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-medium shadow-lg backdrop-blur-md motion-safe:animate-[float_6s_ease-in-out_infinite] sm:inline-flex ${floatPositions[i]} ${floatDelays[i]} ${accent.floatBg} bg-white/90 dark:bg-slate-900/80`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
            />
            {tech}
          </span>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          PROJECT DETAILS side
          ═══════════════════════════════════════════ */}
      <div
        className={`relative flex min-w-0 flex-col p-4 sm:p-5 lg:p-6 ${
          imageRight ? "md:order-1" : "md:order-2"
        }`}
      >
        {/* Ghost watermark number */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-1 select-none font-mono text-6xl font-black leading-none sm:text-7xl lg:text-8xl ${accent.number}`}
        >
          {projectNumber}
        </span>

        {/* Case study label + badge */}
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Case Study / {projectNumber}
          </span>
          {project.badge && (
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${accent.badge}`}
            >
              {project.badge}
            </span>
          )}
        </div>

        {/* Title + Subtitle */}
        <div className="relative mt-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1 font-mono text-xs font-medium text-purple-600 dark:text-purple-400">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Key Features (if available) */}
        {project.features && project.features.length > 0 && (
          <ul className="relative mt-3 space-y-1">
            {project.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-500 dark:text-purple-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technology pills */}
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {(project.technologies || []).map((tech, i) => (
            <span
              key={tech}
              className={`inline-flex h-6 items-center gap-1.5 rounded-md border px-2 font-mono text-[10px] font-medium leading-none transition-colors ${
                techPillClasses[(index + i) % techPillClasses.length]
              }`}
            >
              <TechIcon tech={tech} className="h-3 w-3 shrink-0" />
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons — pinned to bottom */}
        <div className="relative mt-auto pt-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent dark:via-slate-700/50" />

          <div className="flex flex-wrap items-center gap-2 pt-3">
            {/* Live Demo — primary */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0 sm:w-auto sm:text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            {/* GitHub — secondary */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 active:translate-y-0 sm:w-auto sm:text-sm dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-slate-500"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {/* View Case Study — tertiary */}
            <button
              type="button"
              onClick={() => onViewCaseStudy?.(project)}
              className="group/cs inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-purple-600 transition-all duration-200 hover:bg-purple-500/10 sm:w-auto sm:text-sm sm:ml-auto dark:text-purple-400 dark:hover:bg-purple-400/10"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Case Study</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cs:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
