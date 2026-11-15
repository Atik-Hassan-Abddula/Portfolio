/**
 * TechIcons — small recognizable inline SVG glyphs for technology pills.
 * Brand-ish marks are hand-drawn inline (no external icon package needed).
 * Unknown technologies fall back to a generic code glyph.
 */
import { Globe, KeyRound, Code2, GitBranch } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

/* ── Brand / tech glyphs (currentColor) ─────────────────────────── */

function NextJsIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.5 15.5V9l7 8M15.5 9v6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.1" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.1"
        transform="rotate(60 12 12)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.1"
        transform="rotate(120 12 12)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function TailwindIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.5 10.5c1-3 2.8-4.5 5.5-4.5 3 0 3.9 1.6 4.9 3.4.7 1.3 1.6 2.1 3.1 2.1 1.4 0 2.6-.6 3.5-1.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M2 15.5c1-3 2.8-4.5 5.5-4.5 3 0 3.9 1.6 4.9 3.4.7 1.3 1.6 2.1 3.1 2.1 1.4 0 2.6-.6 3.5-1.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JavaScriptIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
      >
        JS
      </text>
    </svg>
  );
}

function MongoDbIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 2.5c2.6 3.4 4.4 6.4 4.4 9.7a4.4 4.4 0 0 1-4.4 4.3 4.4 4.4 0 0 1-4.4-4.3c0-3.3 1.8-6.3 4.4-9.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 16.5V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LiveDemoIcon({ className = "h-3.5 w-3.5" }) {
  return <Globe className={className} aria-hidden="true" />;
}

const ICON_MAP = {
  "next.js": NextJsIcon,
  react: ReactIcon,
  "tailwind css": TailwindIcon,
  javascript: JavaScriptIcon,
  mongodb: MongoDbIcon,
  github: GithubIcon,
  git: GitBranch,
  "rest api": LiveDemoIcon,
  "better auth": KeyRound,
  "lucide icons": Code2,
};

/**
 * Returns a recognizable icon component for a technology name,
 * or a generic code glyph when unknown.
 */
export function TechIcon({ tech, className = "h-3.5 w-3.5" }) {
  const key = String(tech || "").trim().toLowerCase();
  const Icon = ICON_MAP[key] || Code2;
  return <Icon className={className} aria-hidden="true" />;
}
