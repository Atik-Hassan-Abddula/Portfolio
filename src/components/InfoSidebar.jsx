"use client";

import { Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

/**
 * InfoSidebar — fixed vertical rail on the RIGHT edge of the viewport,
 * centered slightly below the vertical midpoint and mirroring
 * <SocialSidebar /> (edge offsets, terminus dot).
 *
 * Text is rotated 90° with `writing-mode: vertical-rl` + `rotate-180`,
 * which makes it read bottom-to-top. Layout top → bottom:
 *
 *   ATIK HASSAN            (display type, sky → indigo → violet gradient)
 *   ·                      (separator glow dot)
 *   atik508030@gmail.com   (mailto link, mono, glowing on hover)
 *   │                      (thin vertical gradient line, like the left rail)
 *   ●                      (glowing terminus dot)
 *
 * - Pure CSS, no images. `fixed`; compact in the tablet/laptop gutter
 *   from 768px, full original size from 1440px, hidden on mobile.
 * - Email comes straight from `personalInfo.email` — never retyped or invented.
 */
export default function InfoSidebar() {
  // Sourced from portfolioData.js — never invented or overridden here.
  const name = (personalInfo.name ?? "Atik Hassan").toUpperCase();
  const email = personalInfo.email; // atik508030@gmail.com

  // Shared: vertical text reading bottom-to-top
  const vertical = "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap";

  return (
    <aside
      aria-label="Personal information"
      className="fixed right-0 top-[56%] z-40 hidden w-max -translate-y-1/2 md:flex wide:right-6"
    >
      <div className="group flex flex-col items-center">
        {/* Name — vertical display type, gradient clipped, subtle glow on rail hover */}
        <h2
          aria-label={personalInfo.name ?? "Atik Hassan"}
          className={`${vertical} bg-gradient-to-t from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-[12px] font-black uppercase leading-none tracking-[0.28em] text-transparent drop-shadow-[0_0_14px_rgba(99,102,241,0)] transition-all duration-500 group-hover:from-sky-400 group-hover:via-indigo-400 group-hover:to-violet-400 group-hover:drop-shadow-[0_0_14px_rgba(129,140,248,0.45)] lg:text-[15px] lg:tracking-[0.3em] wide:text-[17px] wide:tracking-[0.34em] dark:from-sky-300 dark:via-indigo-300 dark:to-violet-400`}
        >
          <span aria-hidden="true">{name}</span>
        </h2>

        {/* Separator dot */}
        <span
          aria-hidden="true"
          className="my-2.5 h-1 w-1 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 shadow-[0_0_8px_1px_rgba(139,92,246,0.6)] lg:my-3 wide:my-4"
        />

        {/* Email — vertical mailto link, glows on hover/focus */}
        <a
          href={`mailto:${email}`}
          aria-label={`Send email to ${email}`}
          className="group/mail flex cursor-pointer select-text items-center rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span
            aria-hidden="true"
            className={`${vertical} flex items-center gap-1.5 font-mono text-[8px] font-medium tracking-[0.14em] text-slate-600 transition-all duration-300 group-hover/mail:text-sky-600 group-hover/mail:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-focus-visible/mail:text-sky-600 lg:text-[11px] lg:tracking-[0.16em] wide:gap-2 wide:text-[12px] wide:tracking-[0.18em] dark:text-slate-400 dark:group-hover/mail:text-sky-300 dark:group-hover/mail:text-sky-200`}
          >
            <Mail
              className="h-2.5 w-2.5 shrink-0 rotate-180 text-slate-500 transition-all duration-300 motion-safe:group-hover/mail:-translate-y-0.5 group-hover/mail:text-sky-500 lg:h-3 lg:w-3 dark:text-slate-500 dark:group-hover/mail:text-sky-400"
              strokeWidth={1.75}
            />
            {email}
          </span>
        </a>

        {/* Thin vertical decorative line — same gradient language as the left rail */}
        <span
          aria-hidden="true"
          className="mt-2.5 h-10 w-px bg-gradient-to-b from-violet-400/60 via-sky-400/40 to-transparent lg:mt-3 lg:h-12 wide:mt-4 wide:h-20"
        />
        {/* Glowing terminus dot */}
        <span
          aria-hidden="true"
          className="mt-2 h-1 w-1 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.55)] motion-safe:animate-pulse"
        />
      </div>
    </aside>
  );
}
