"use client";

import { useEffect, useRef } from "react";
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

/**
 * ProjectCard — horizontal split showcase card.
 *
 * Image (≈40%) on the left, details (≈60%) on the right, joined by a
 * consistent 28px gap inside 24px of card padding. Both halves animate
 * in with a subtle slide-fade the first time the card enters the
 * viewport — image from the left, details from the right, firing once
 * via a single IntersectionObserver per card. Consecutive cards carry
 * a consistent 110ms stagger. Under prefers-reduced-motion the halves
 * render statically at full opacity (CSS media query — no JS needed).
 *
 * Props:
 *   project  — from portfolioData.js
 *   index    — card position (0-based)
 *   onViewCaseStudy — callback to open the modal
 */
export default function ProjectCard({ project, index = 0, onViewCaseStudy }) {
  const cardRef = useRef(null);
  const projectNumber = String(index + 1).padStart(2, "0");
  const stagger = `${(index * 0.11).toFixed(2)}s`;

  // Fire exactly once per card when it enters the viewport — the halves get
  // .is-inview on their elements directly (no React state, no re-render).
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    const halves = el.querySelectorAll(".split-col");
    const show = () => {
      halves.forEach((half) => half.classList.add("is-inview"));
    };
    if (typeof IntersectionObserver === "undefined") {
      show();
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="group relative grid h-full min-w-0 grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b1226] p-6 shadow-[0_24px_54px_-22px_rgba(2,6,23,0.9),inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-[border-color,box-shadow] duration-500 hover:border-indigo-400/25 hover:shadow-[0_28px_64px_-22px_rgba(2,6,23,0.95),0_0_54px_-16px_rgba(99,102,241,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:p-6 md:min-h-[21rem] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-7 lg:min-h-[22.5rem]"
    >
      {/* ═══════════════════════════════════════════
          IMAGE — ≈40% · enters from the left
          ═══════════════════════════════════════════ */}
      <div
        className="split-col split-col--image relative min-h-[13.5rem] min-w-0 sm:min-h-[16.5rem] md:min-h-0"
        style={{ "--split-delay": stagger }}
      >
        <div className="relative flex h-full min-h-[inherit] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101a33] shadow-[0_16px_40px_-16px_rgba(2,6,23,0.8)] transition-shadow duration-500 group-hover:shadow-[0_20px_48px_-16px_rgba(2,6,23,0.9),0_0_30px_-10px_rgba(99,102,241,0.3)]">
          {/* Slim browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0d1528] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/75" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/75" />
              <span className="h-2 w-2 rounded-full bg-green-400/75" />
            </div>
            <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 py-1">
              <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400/80" strokeWidth={2.5} />
              <span className="truncate font-mono text-[9px] tracking-wide text-slate-400">
                {project.liveUrl
                  ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : "localhost:3000"}
              </span>
            </div>
          </div>

          {/* Screenshot — fills remaining height, never stretched */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={project.screenshot}
              alt={`${project.title} website screenshot`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
            />
            {/* Ambient hover tint */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-600/25 via-transparent to-sky-400/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DETAILS — ≈60% · enters from the right
          ═══════════════════════════════════════════ */}
      <div
        className="split-col split-col--details relative flex min-w-0 flex-col justify-center py-1 md:py-0"
        style={{ "--split-delay": `calc(${stagger} + 0.04s)` }}
      >
        {/* Ghost watermark number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 top-0 select-none font-mono text-5xl font-black leading-none text-white/[0.05] lg:text-6xl"
        >
          {projectNumber}
        </span>

        {/* Case study label + badge */}
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400/80">
            Project / {projectNumber}
          </span>
          {project.badge && (
            <span className="rounded-full border border-indigo-400/25 bg-indigo-400/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-indigo-300">
              {project.badge}
            </span>
          )}
        </div>

        {/* Title + subtitle */}
        <h3 className="relative mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          {project.title}
          {project.subtitle && (
            <span className="mt-0.5 block font-mono text-[10px] font-medium tracking-wide text-violet-300/80 sm:text-[11px]">
              {project.subtitle}
            </span>
          )}
        </h3>

        {/* Description */}
        <p className="relative mt-2.5 text-[13px] leading-relaxed text-slate-300">
          {project.description}
        </p>

        {/* Key features */}
        {project.features && project.features.length > 0 && (
          <ul className="relative mt-2.5 hidden gap-x-4 gap-y-1 sm:grid sm:grid-cols-2">
            {project.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-1.5 text-[10px] leading-snug text-slate-400"
              >
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-sky-400/80" strokeWidth={2} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technology stack */}
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {(project.technologies || []).map((tech) => (
            <span
              key={tech}
              className="inline-flex h-6 items-center gap-1.5 rounded-md border border-sky-400/20 bg-sky-400/[0.07] px-2 font-mono text-[9px] font-medium leading-none text-sky-300/90"
            >
              <TechIcon tech={tech} className="h-3 w-3 shrink-0" />
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-4 py-2 text-[11px] font-semibold text-white shadow-md shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:translate-y-0 sm:text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              <span>Live Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-2 text-[11px] font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:translate-y-0 sm:text-xs"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onViewCaseStudy?.(project)}
            className="group/cs inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-[11px] font-semibold text-violet-300/90 transition-all duration-200 hover:bg-violet-400/10 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:text-xs"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={2} />
            <span>Case Study</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cs:translate-x-0.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  );
}
