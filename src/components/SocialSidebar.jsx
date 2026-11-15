"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

// ==========================================
// AUTHENTIC BRAND ICONS (Simple Icons paths)
// ==========================================
export function FacebookIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function GmailIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

/**
 * SocialSidebar — fixed vertical social rail on the LEFT edge of the
 * viewport, perfectly vertically centered (top: 50% + translateY(-50%)).
 *
 * - `fixed` positioning: it never moves while scrolling, with Lenis
 *   smooth scrolling, or during section transitions; it does not take
 *   part in the page flow, so the layout is unaffected.
 * - Only REAL links from portfolioData.js are rendered — nothing invented.
 *   Facebook appears automatically once `socials.facebook` is added.
 * - Hidden on mobile (no content covering / touch interference); compact
 *   on tablet (md) and full size on desktop (lg+).
 * - Brand-colored hover glow + floating tooltip on hover AND keyboard
 *   focus; external links open in a new tab with rel="noopener noreferrer".
 */
export default function SocialSidebar() {
  const githubUrl = personalInfo.socials?.github;
  const linkedinUrl = personalInfo.socials?.linkedin;
  const facebookUrl = personalInfo.socials?.facebook;
  const email = personalInfo.email;

  // Brand-colored hover accents per platform
  const accent = {
    facebook:
      "hover:-translate-y-0.5 hover:scale-110 hover:border-[#1877F2]/60 hover:text-[#1877F2] hover:shadow-[0_0_22px_rgba(24,119,242,0.4)] dark:hover:border-[#1877F2]/70 dark:hover:text-[#4d9fff] dark:hover:shadow-[0_0_24px_rgba(24,119,242,0.45)]",
    github:
      "hover:-translate-y-0.5 hover:scale-110 hover:border-slate-400/70 hover:text-slate-900 hover:shadow-[0_0_22px_rgba(100,116,139,0.35)] dark:hover:border-slate-500/70 dark:hover:text-white dark:hover:shadow-[0_0_24px_rgba(148,163,184,0.35)]",
    gmail:
      "hover:-translate-y-0.5 hover:scale-110 hover:border-[#EA4335]/60 hover:text-[#EA4335] hover:shadow-[0_0_22px_rgba(234,67,53,0.35)] dark:hover:border-[#EA4335]/70 dark:hover:text-[#ff6f61] dark:hover:shadow-[0_0_24px_rgba(234,67,53,0.4)]",
    linkedin:
      "hover:-translate-y-0.5 hover:scale-110 hover:border-[#0A66C2]/60 hover:text-[#0A66C2] hover:shadow-[0_0_22px_rgba(10,102,194,0.4)] dark:hover:border-[#0A66C2]/70 dark:hover:text-[#4da3ff] dark:hover:shadow-[0_0_24px_rgba(10,102,194,0.5)]",
  };

  // Only entries with a real URL from the data file are shown
  const items = [
    facebookUrl && {
      id: "facebook",
      name: "Facebook",
      href: facebookUrl,
      external: true,
      icon: <FacebookIcon className="h-4 w-4" />,
      accentClass: accent.facebook,
    },
    githubUrl && {
      id: "github",
      name: "GitHub",
      href: githubUrl,
      external: true,
      icon: <GithubIcon className="h-4 w-4" />,
      accentClass: accent.github,
    },
    email && {
      id: "gmail",
      name: "Gmail",
      href: `mailto:${email}`,
      external: false,
      icon: <GmailIcon className="h-4 w-4" />,
      accentClass: accent.gmail,
    },
    linkedinUrl && {
      id: "linkedin",
      name: "LinkedIn",
      href: linkedinUrl,
      external: true,
      icon: <LinkedinIcon className="h-4 w-4" />,
      accentClass: accent.linkedin,
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <aside
      aria-label="Social media links"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center md:flex lg:left-6"
    >
      {/* Vertical stack of circular glass icon buttons */}
      <div className="flex flex-col items-center gap-2 lg:gap-3.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            aria-label={`${item.name}${item.external ? " (opens in new tab)" : ""}`}
            className={`group relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-slate-500 shadow-sm backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:h-10 lg:w-10 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-300 dark:backdrop-blur-md ${item.accentClass}`}
          >
            <span aria-hidden="true" className="[&>svg]:h-3.5 [&>svg]:w-3.5 lg:[&>svg]:h-4 lg:[&>svg]:w-4">
              {item.icon}
            </span>

            {/* Floating tooltip — reveals on hover and keyboard focus */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-full ml-3 flex translate-x-1 items-center whitespace-nowrap rounded-lg border border-slate-200/90 bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700 opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200"
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>

      {/* Decorative connector line under the icons */}
      <span
        aria-hidden="true"
        className="mt-4 h-16 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/40 to-transparent lg:h-20"
      />
    </aside>
  );
}
