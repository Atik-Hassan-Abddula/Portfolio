"use client";

import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

// ==========================================
// CENTRALIZED SOCIAL CONFIG
// All URLs live in `portfolioData.js` → `personalInfo.socials`
// (GitHub + LinkedIn are real; Facebook + WhatsApp are clearly
// marked placeholders — swap in your real links there, nowhere else).
// ==========================================
const socials = personalInfo.socials ?? {};

/**
 * SocialSidebar — fixed vertical rail on the LEFT edge of the viewport,
 * centered slightly below the vertical midpoint.
 *
 * - `fixed` positioning: never moves while scrolling or during Lenis
 *   smooth-scroll transitions; it is out of the page flow.
 * - Hidden below `md` (mobile). From 768px up it is compact and sits in
 *   the section gutter (24px at tablet, 32px at laptop), so it never
 *   overlaps content. At 1440px+ it returns to its full original size.
 * - Brand icons with electric-blue / soft-violet hover glow; tooltips
 *   reveal on hover AND keyboard focus; links open in a new tab.
 */
export default function SocialSidebar() {
  // Display order: GitHub → LinkedIn → Facebook → WhatsApp
  // Alternating electric-blue / soft-violet accent hovers
  // (light-mode stops are deeper for contrast on white)
  const accent = {
    github:
      "hover:border-sky-500/50 hover:text-sky-600 hover:shadow-[0_0_24px_-4px_rgba(56,189,248,0.35)] focus-visible:ring-sky-500 dark:hover:border-sky-400/50 dark:hover:text-sky-300 dark:hover:shadow-[0_0_26px_-4px_rgba(56,189,248,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]",
    linkedin:
      "hover:border-violet-500/50 hover:text-violet-600 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.35)] focus-visible:ring-violet-500 dark:hover:border-violet-400/50 dark:hover:text-violet-300 dark:hover:shadow-[0_0_26px_-4px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]",
    facebook:
      "hover:border-sky-500/50 hover:text-sky-600 hover:shadow-[0_0_24px_-4px_rgba(56,189,248,0.35)] focus-visible:ring-sky-500 dark:hover:border-sky-400/50 dark:hover:text-sky-300 dark:hover:shadow-[0_0_26px_-4px_rgba(56,189,248,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]",
    whatsapp:
      "hover:border-violet-500/50 hover:text-violet-600 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.35)] focus-visible:ring-violet-500 dark:hover:border-violet-400/50 dark:hover:text-violet-300 dark:hover:shadow-[0_0_26px_-4px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]",
  };

  const items = [
    socials.github && {
      id: "github",
      name: "GitHub",
      href: socials.github,
      icon: <GithubIcon className="h-3 w-3 lg:h-4 lg:w-4 wide:h-[19px] wide:w-[19px]" />,
      accentClass: accent.github,
    },
    socials.linkedin && {
      id: "linkedin",
      name: "LinkedIn",
      href: socials.linkedin,
      icon: <LinkedinIcon className="h-3 w-3 lg:h-4 lg:w-4 wide:h-[19px] wide:w-[19px]" />,
      accentClass: accent.linkedin,
    },
    socials.facebook && {
      id: "facebook",
      name: "Facebook",
      href: socials.facebook,
      icon: <FacebookIcon className="h-3 w-3 lg:h-4 lg:w-4 wide:h-[19px] wide:w-[19px]" />,
      accentClass: accent.facebook,
    },
    socials.whatsapp && {
      id: "whatsapp",
      name: "WhatsApp",
      href: socials.whatsapp,
      icon: <WhatsAppIcon className="h-3 w-3 lg:h-4 lg:w-4 wide:h-[19px] wide:w-[19px]" />,
      accentClass: accent.whatsapp,
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <aside
      aria-label="Social media links"
      className="fixed left-0 top-[56%] z-40 hidden -translate-y-1/2 flex-col items-center md:flex wide:left-6"
    >
      {/* Vertical stack of glass orb buttons */}
      <div className="flex flex-col items-center gap-2 lg:gap-2.5 wide:gap-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name} (opens in new tab)`}
            className={`group relative flex h-6 w-6 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 lg:h-7 lg:w-7 wide:h-10 wide:w-10 dark:border-white/[0.08] dark:bg-slate-900/70 dark:text-slate-300 ${item.accentClass}`}
          >
            {/* Hairline gradient rim, revealed on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/25 via-transparent to-violet-500/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span aria-hidden="true" className="relative">
              {item.icon}
            </span>

            {/* Floating tooltip — reveals on hover and keyboard focus */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-full top-1/2 ml-2.5 -translate-y-1/2 translate-x-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-[#0a1128]/95 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-sky-200/90 opacity-0 shadow-[0_8px_24px_-8px_rgba(2,6,23,0.9),0_0_16px_-6px_rgba(99,102,241,0.45)] backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 wide:text-[10px]"
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>

      {/* Thin vertical decorative line + glowing terminus dot */}
      <span
        aria-hidden="true"
        className="mt-3 h-10 w-px bg-gradient-to-b from-sky-400/60 via-violet-400/40 to-transparent lg:mt-4 lg:h-12 wide:mt-5 wide:h-20"
      />
      <span
        aria-hidden="true"
        className="mt-2 h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.55)] motion-safe:animate-pulse"
      />
    </aside>
  );
}
