"use client";

import { techIcons } from "@/components/three/techIconData";

// Orbital tech system floating around the hero's 3D centerpiece.
// Reuses the existing technology icon data (glyphs + brand colors) —
// the same set powering the former "Technology Galaxy" scene — rebuilt
// as a layered, chrome-and-silver orbital composition.
//
// Three coplanar rings, each with its own radius, glow and direction:
//   inner  — silver/sky, solid hairline, 45s forward
//   middle — electric blue, dashed path, 68s reverse
//   outer  — violet, faint glow path + satellites, 88s forward

const INNER_LABELS = ["JavaScript", "React.js", "Next.js", "TypeScript"];
const MIDDLE_LABELS = ["Tailwind CSS", "Node.js", "MongoDB", "Git"];
const OUTER_LABELS = ["HTML5", "CSS3", "Express.js", "PostgreSQL", "Vercel", "Docker"];
// Ring radii (% of the square stage) scaled ~20% down so the orbit stays
// elegant, not dominant — the stage itself also shrank ~22% in Hero.jsx

function TechGlyph({ icon, className }) {
  // Hand-drawn glyph for REST API (no official brand mark exists)
  if (icon.custom === "rest") {
    return (
      <span
        className={`flex items-center justify-center font-mono font-bold ${className}`}
        style={{ color: icon.color }}
        aria-hidden="true"
      >
        {"</>"}
      </span>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${icon.viewBox || 24} ${icon.viewBox || 24}`}
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} fill={icon.color} />
    </svg>
  );
}

function OrbitChip({ icon, size = "md" }) {
  const box =
    size === "lg"
      ? "h-9 w-9 sm:h-11 sm:w-11"
      : "h-8 w-8 sm:h-10 sm:w-10";
  const glyph = size === "lg" ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4 sm:h-5 sm:w-5";

  return (
    <span
      title={icon.label}
      className={`orbit-chip-glass flex items-center justify-center rounded-2xl border border-slate-300/70 bg-gradient-to-br from-white/90 via-white/50 to-slate-100/40 backdrop-blur-md dark:border-white/15 dark:from-white/[0.22] dark:via-white/[0.07] dark:to-transparent ${box}`}
      style={{ ["--chip-glow"]: `${icon.color}55` }}
    >
      <TechGlyph icon={icon} className={glyph} />
    </span>
  );
}

function Ring({
  labels,
  radiusPct,
  reverse,
  duration,
  pathClassName,
  satelliteCount,
  satelliteColor,
  chipSize,
  ringClassName = "",
}) {
  const icons = labels
    .map((label) => techIcons.find((icon) => icon.label === label))
    .filter(Boolean);

  if (icons.length === 0) return null;

  const ringSpin = reverse ? "orbit-ring-reverse" : "orbit-ring";
  // Chips counter-rotate so glyphs stay upright while the ring revolves
  const chipCounter = reverse ? "orbit-chip-reverse" : "orbit-chip";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${ringClassName}`}
    >
      {/* Orbit path */}
      <div
        className={`absolute rounded-full ${pathClassName} ${ringSpin}`}
        style={{
          inset: `${50 - radiusPct}%`,
          ["--orbit-duration"]: duration,
        }}
      >
        {/* Satellite light dots riding the path */}
        {Array.from({ length: satelliteCount }, (_, i) => {
          const angle = (i / satelliteCount) * Math.PI * 2 + 0.6;
          return (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${50 + 50 * Math.cos(angle)}%`,
                top: `${50 + 50 * Math.sin(angle)}%`,
                backgroundColor: satelliteColor,
                boxShadow: `0 0 8px 2px ${satelliteColor}aa`,
              }}
            />
          );
        })}
      </div>

      {/* Icon chips riding the path */}
      <div
        className={`absolute inset-0 ${ringSpin}`}
        style={{ ["--orbit-duration"]: duration }}
      >
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2;
          const x = 50 + radiusPct * Math.cos(angle);
          const y = 50 + radiusPct * Math.sin(angle);
          return (
            <span
              key={icon.label}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                ["--orbit-duration"]: duration,
              }}
            >
              <span className={`block ${chipCounter}`}>
                <OrbitChip icon={icon} size={chipSize} />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechOrbit() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2"
    >
      {/* Inner — solid silver/sky hairline */}
      <Ring
        labels={INNER_LABELS}
        radiusPct={27}
        duration="45s"
        pathClassName="border border-sky-300/25 shadow-[0_0_18px_-6px_rgba(125,211,252,0.45),inset_0_0_14px_-8px_rgba(125,211,252,0.4)]"
        satelliteCount={2}
        satelliteColor="#7dd3fc"
        chipSize="lg"
      />

      {/* Middle — electric blue dashed path, counter-rotating */}
      <Ring
        labels={MIDDLE_LABELS}
        radiusPct={37}
        duration="68s"
        reverse
        pathClassName="border border-dashed border-blue-400/25 shadow-[0_0_26px_-8px_rgba(96,165,250,0.5),inset_0_0_18px_-10px_rgba(96,165,250,0.4)]"
        satelliteCount={2}
        satelliteColor="#60a5fa"
        chipSize="md"
      />

      {/* Outer — violet glow, mostly absent on small screens */}
      <Ring
        labels={OUTER_LABELS}
        radiusPct={46}
        duration="88s"
        pathClassName="border border-violet-400/20 shadow-[0_0_30px_-10px_rgba(167,139,250,0.5)]"
        satelliteCount={3}
        satelliteColor="#a78bfa"
        chipSize="md"
        ringClassName="hidden min-[480px]:block"
      />
    </div>
  );
}
