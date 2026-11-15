"use client";

import { techIcons } from "@/components/three/techIconData";

// Lightweight 2D fallback used when WebGL is unavailable or the user
// prefers reduced motion. Same thirty-one technologies, grouped by category.

const CATEGORY_ORDER = ["Frontend", "Backend", "Tools", "UI Libraries"];

const CATEGORY_ACCENTS = {
  Frontend: "text-blue-600 dark:text-blue-400",
  Backend: "text-emerald-600 dark:text-emerald-400",
  Tools: "text-orange-600 dark:text-orange-400",
  "UI Libraries": "text-pink-600 dark:text-pink-400",
};

function TechGlyph({ icon }) {
  // Hand-drawn badge for technologies with no official brand mark
  if (icon.custom === "rest") {
    return (
      <span
        className="inline-flex h-5 w-8 shrink-0 items-center justify-center font-mono text-[10px] font-bold leading-none"
        style={{ color: icon.color }}
        aria-label={icon.label}
      >
        {"</>"}
      </span>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${icon.viewBox || 24} ${icon.viewBox || 24}`}
      className="h-5 w-5 shrink-0"
      role="img"
      aria-label={icon.label}
    >
      <path d={icon.path} fill={icon.color} />
    </svg>
  );
}

export default function TechGridFallback() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {CATEGORY_ORDER.map((category) => {
        const icons = techIcons.filter((icon) => icon.category === category);
        if (icons.length === 0) return null;

        return (
          <div key={category} className="space-y-2.5">
            <h3
              className={`text-xs font-bold uppercase tracking-widest ${CATEGORY_ACCENTS[category]}`}
            >
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {icons.map((icon) => (
                <div
                  key={icon.label}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80 px-3.5 py-3 shadow-sm transition-colors hover:border-purple-400/60 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-purple-500/40"
                >
                  <TechGlyph icon={icon} />
                  <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
