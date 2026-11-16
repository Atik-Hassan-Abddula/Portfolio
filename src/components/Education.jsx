"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Monitor,
  Megaphone,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { educationData, certificationsData } from "@/data/portfolioData";

// ============================================================
// EDUCATION — "KNOWLEDGE CONSTELLATION"
// A deep-navy 3D constellation: one hub (MY LEARNING JOURNEY)
// connected to the four real milestones of my education —
// SSC, Diploma in CSE, Computer Operation L3, Digital Marketing L3.
// Desktop/laptop: tilted perspective stage with orbiting glow nodes.
// Tablet: simplified stage. Mobile: vertical connected constellation.
// ============================================================

// ---- real data, straight from portfolioData.js (never invented) ----
const ssc = educationData.find((e) => e.id === "ssc");
const diploma = educationData.find((e) => e.id === "diploma-cse");
const computerOperation = certificationsData.find((c) => c.id === "computer-operation");
const digitalMarketing = certificationsData.find((c) => c.id === "digital-marketing");

const NODES = [
  {
    id: "ssc",
    tag: "Academic",
    short: "SSC",
    title: ssc.degree,
    status: "Completed",
    tone: "sky",
    icon: BookOpen,
    x: 11,
    y: 23,
    side: "right",
    desc: ssc.description,
    meta: ssc.period,
    floatDelay: "0s",
  },
  {
    id: "diploma",
    tag: "Academic · Now",
    short: "Diploma in CSE",
    title: diploma.degree,
    status: diploma.status,
    tone: "emerald",
    icon: GraduationCap,
    x: 89,
    y: 23,
    side: "left",
    desc: diploma.description,
    meta: diploma.period,
    current: true,
    floatDelay: "-1.8s",
  },
  {
    id: "computer-operation",
    tag: "Certification",
    short: "Computer Operation",
    title: computerOperation.title,
    status: "Level 3",
    tone: "violet",
    icon: Monitor,
    x: 87,
    y: 74,
    side: "left",
    desc: computerOperation.description,
    meta: computerOperation.level,
    floatDelay: "-3.1s",
  },
  {
    id: "digital-marketing",
    tag: "Certification",
    short: "Digital Marketing",
    title: digitalMarketing.title,
    status: "Level 3",
    tone: "indigo",
    icon: Megaphone,
    x: 13,
    y: 74,
    side: "right",
    desc: digitalMarketing.description,
    meta: digitalMarketing.level,
    floatDelay: "-2.4s",
  },
];

// Constellation edges — hub tethers + outer rim
const EDGES = [
  { from: [50, 46], to: [11, 23], node: "ssc", photon: true, dur: "5.2s" },
  { from: [50, 46], to: [89, 23], node: "diploma", photon: true, dur: "6.1s" },
  { from: [50, 46], to: [87, 74], node: "computer-operation", photon: true, dur: "5.7s" },
  { from: [50, 46], to: [13, 74], node: "digital-marketing", photon: true, dur: "6.4s" },
  { from: [11, 23], to: [89, 23], node: null, rim: true },
  { from: [89, 23], to: [87, 74], node: null, rim: true },
  { from: [87, 74], to: [13, 74], node: null, rim: true },
  { from: [13, 74], to: [11, 23], node: null, rim: true },
];

const TONE = {
  sky: {
    ring: "from-sky-400/70 to-blue-500/70",
    icon: "text-sky-300",
    halo: "shadow-[0_0_36px_-6px_rgba(56,189,248,0.55)]",
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    dot: "bg-sky-400",
  },
  emerald: {
    ring: "from-emerald-400/80 to-teal-500/80",
    icon: "text-emerald-300",
    halo: "shadow-[0_0_44px_-6px_rgba(52,211,153,0.6)]",
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  violet: {
    ring: "from-violet-400/70 to-purple-500/70",
    icon: "text-violet-300",
    halo: "shadow-[0_0_36px_-6px_rgba(167,139,250,0.55)]",
    chip: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    dot: "bg-violet-400",
  },
  indigo: {
    ring: "from-indigo-400/70 to-blue-500/70",
    icon: "text-indigo-300",
    halo: "shadow-[0_0_36px_-6px_rgba(129,140,248,0.55)]",
    chip: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
    dot: "bg-indigo-400",
  },
};

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded star dust — deterministic, no hydration mismatch
function useStarDust(count) {
  return useMemo(() => {
    const rand = mulberry32(0xed0ca7);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() < 0.75 ? 2 : 3,
      delay: `${(rand() * 5).toFixed(2)}s`,
      duration: `${(2.6 + rand() * 3.4).toFixed(2)}s`,
      peak: 0.4 + rand() * 0.55,
    }));
  }, [count]);
}

function StarDust({ count = 26 }) {
  const stars = useStarDust(count);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="hero-twinkle absolute rounded-full bg-indigo-100"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--twinkle-delay"]: s.delay,
            ["--twinkle-duration"]: s.duration,
            ["--twinkle-peak"]: s.peak,
          }}
        />
      ))}
    </div>
  );
}

function StatusChip({ node }) {
  const tone = TONE[node.tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.18em] sm:text-[8px] ${tone.chip}`}
    >
      {node.current ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
      )}
      {node.status}
    </span>
  );
}

function ConstellationStage() {
  const reducedMotion = useReducedMotion() === true;
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState(null);

  // Pointer-parallax tilt — lerped in a rAF loop, writes transform directly
  useEffect(() => {
    if (reducedMotion) return undefined;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return undefined;

    let raf = 0;
    const tick = () => {
      const cur = current.current;
      const tgt = target.current;
      cur.x += (tgt.x - cur.x) * 0.055;
      cur.y += (tgt.y - cur.y) * 0.055;
      if (tiltRef.current && (Math.abs(cur.x) > 0.005 || Math.abs(cur.y) > 0.005 || Math.abs(tgt.x) > 0 || Math.abs(tgt.y) > 0)) {
        tiltRef.current.style.transform = `perspective(1150px) rotateX(${cur.y.toFixed(3)}deg) rotateY(${cur.x.toFixed(3)}deg)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.current = { x: px * 9, y: -py * 7 };
  };

  const handlePointerLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  const toggleNode = (id) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative hidden h-[31rem] select-none md:block lg:h-[34rem] xl:h-[36rem]"
    >
      {/* ===== Deep-navy environment ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050a1c] shadow-[0_36px_80px_-32px_rgba(2,6,23,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        {/* Nebula washes — electric blue / soft violet */}
        <div className="absolute -left-32 top-[-20%] h-[26rem] w-[26rem] rounded-full bg-sky-600/[0.16] blur-[130px]" />
        <div className="absolute -right-32 bottom-[-22%] h-[26rem] w-[26rem] rounded-full bg-violet-600/[0.18] blur-[130px]" />
        <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-indigo-700/[0.16] blur-[120px]" />
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-grain absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.6)_100%)]" />
        <StarDust count={30} />
        {/* Floating academic glyphs, faint */}
        <GraduationCap aria-hidden="true" className="node-float absolute left-[38%] top-[6%] h-6 w-6 text-indigo-400/25" style={{ ["--float-delay"]: "-2.2s", ["--float-duration"]: "7s" }} />
        <BookOpen aria-hidden="true" className="node-float absolute right-[26%] top-[58%] h-5 w-5 text-sky-400/20" style={{ ["--float-delay"]: "-4s", ["--float-duration"]: "8.5s" }} />
        <Monitor aria-hidden="true" className="node-float absolute left-[27%] top-[58%] h-5 w-5 text-violet-400/20" style={{ ["--float-delay"]: "-1.2s", ["--float-duration"]: "7.6s" }} />
      </div>

      {/* ===== Tilted constellation plane ===== */}
      <div
        ref={tiltRef}
        className="absolute inset-6 will-change-transform lg:inset-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Connection lines */}
        <svg
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]"
        >
          <defs>
            <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* Rim edges — faint violet scaffold */}
          {EDGES.filter((e) => e.rim).map((e, i) => (
            <line
              key={`rim-${i}`}
              x1={e.from[0] * 10}
              y1={e.from[1] * 6.2}
              x2={e.to[0] * 10}
              y2={e.to[1] * 6.2}
              stroke="#8b5cf6"
              strokeOpacity="0.22"
              strokeWidth="1.1"
              strokeDasharray="2 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Hub tethers — flowing dashed energy */}
          {EDGES.filter((e) => !e.rim).map((e) => {
            const lit = activeId === e.node;
            const x1 = e.from[0] * 10;
            const y1 = e.from[1] * 6.2;
            const x2 = e.to[0] * 10;
            const y2 = e.to[1] * 6.2;
            return (
              <g key={e.node}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="url(#edge-grad)"
                  strokeOpacity={lit ? 0.4 : 0.2}
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="url(#edge-grad)"
                  strokeOpacity={lit ? 1 : 0.62}
                  strokeWidth="1.6"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                >
                  {!reducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-140"
                      dur="7s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
                {!reducedMotion && e.photon && (
                  <circle r="3.2" fill="#e0f2fe" opacity="0.95">
                    <animateMotion
                      path={`M ${x1} ${y1} L ${x2} ${y2}`}
                      dur={e.dur}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* ===== Central hub — MY LEARNING JOURNEY ===== */}
        <div className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="relative mx-auto flex h-28 w-28 items-center justify-center lg:h-32 lg:w-32 xl:h-36 xl:w-36">
            {/* Rotating dashed orbit rings */}
            <span
              aria-hidden="true"
              className="orbit-ring absolute inset-0 rounded-full border border-dashed border-sky-400/30"
              style={{ ["--orbit-duration"]: "38s" }}
            />
            <span
              aria-hidden="true"
              className="orbit-ring-reverse absolute inset-3 rounded-full border border-violet-400/25"
              style={{ ["--orbit-duration"]: "52s" }}
            />
            {/* Glowing core */}
            <div className="absolute inset-6 flex items-center justify-center rounded-full border border-indigo-300/40 bg-[radial-gradient(circle_at_38%_32%,#c7d2fe_0%,#6366f1_38%,#312e81_72%,#070b21_100%)] shadow-[inset_-6px_-8px_16px_rgba(2,6,23,0.75),inset_3px_4px_10px_rgba(224,231,255,0.35),0_0_55px_-8px_rgba(129,140,248,0.65)] lg:inset-7">
              <GraduationCap className="h-7 w-7 text-indigo-50 drop-shadow-[0_0_6px_rgba(224,231,255,0.8)] lg:h-8 lg:w-8" />
            </div>
          </div>
          <p className="mt-3 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.32em] text-indigo-200 lg:text-[10px]">
            My Learning<br />Journey
          </p>
        </div>

        {/* ===== Education nodes ===== */}
        {NODES.map((node) => {
          const tone = TONE[node.tone];
          const active = activeId === node.id;
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Floating wrapper */}
              <div
                className="node-float"
                style={{ ["--float-delay"]: node.floatDelay, ["--float-duration"]: "6s" }}
              >
                <button
                  type="button"
                  onClick={() => toggleNode(node.id)}
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId(null)}
                  onKeyDown={(event) => event.key === "Escape" && setActiveId(null)}
                  aria-expanded={active}
                  aria-label={`${node.title} — ${node.status}. ${active ? "Hide" : "Show"} details`}
                  className="group/node relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {/* Orbit ring + orb */}
                  <span className="relative flex h-16 w-16 items-center justify-center sm:h-[4.25rem] sm:w-[4.25rem] lg:h-[4.75rem] lg:w-[4.75rem]">
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${tone.ring} p-[1.5px] transition-transform duration-500 group-hover/node:scale-110`}
                    >
                      <span className="block h-full w-full rounded-full bg-[#070d24]" />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-[3px] rounded-full ${tone.halo} transition-shadow duration-500 group-hover/node:shadow-[0_0_52px_-6px_rgba(129,140,248,0.7)]`}
                      style={{ background: `radial-gradient(circle at 35% 30%, rgba(224,231,255,0.3), transparent 55%), radial-gradient(circle at center, ${tone.dot === "bg-sky-400" ? "rgba(56,189,248,0.28)" : tone.dot === "bg-emerald-400" ? "rgba(52,211,153,0.28)" : tone.dot === "bg-violet-400" ? "rgba(167,139,250,0.28)" : "rgba(129,140,248,0.28)"} 0%, transparent 72%)` }}
                    />
                    {node.current && (
                      <span aria-hidden="true" className="absolute -top-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 font-mono text-[6px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                        Now
                      </span>
                    )}
                    <Icon className={`relative h-6 w-6 transition-transform duration-500 group-hover/node:scale-110 lg:h-7 lg:w-7 ${tone.icon}`} />
                  </span>

                  {/* Label */}
                  <span className="flex max-w-[8.5rem] flex-col items-center gap-1 lg:max-w-[10rem]">
                    <span className="text-center text-[10px] font-bold leading-tight tracking-tight text-slate-100 sm:text-[11px]">
                      {node.short}
                    </span>
                    <StatusChip node={node} />
                  </span>
                </button>

                {/* Detail popover — hover / focus / tap */}
                <div
                  role="tooltip"
                  className={`pointer-events-none absolute top-1/2 z-30 w-60 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0a1128]/95 p-4 opacity-0 shadow-[0_24px_50px_-20px_rgba(2,6,23,0.9),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition-all duration-300 xl:w-64 ${
                    node.side === "right" ? "left-[calc(100%+0.6rem)]" : "right-[calc(100%+0.6rem)]"
                  } ${active ? "translate-x-0 opacity-100" : node.side === "right" ? "-translate-x-2 opacity-0" : "translate-x-2 opacity-0"}`}
                >
                  <p className="flex items-center justify-between gap-2 font-mono text-[7px] font-bold uppercase tracking-[0.28em] text-indigo-300/90">
                    {node.tag}
                    <span className="text-slate-600">{node.meta}</span>
                  </p>
                  <p className="mt-1.5 text-[13px] font-bold leading-snug text-white">
                    {node.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] font-semibold text-slate-300">
                      {node.status}
                      {node.id.includes("computer") || node.id.includes("digital")
                        ? " · National Skill Standard Level 3"
                        : ""}
                    </span>
                  </div>
                  <p className="mt-2 border-t border-white/[0.07] pt-2 text-[10px] leading-relaxed text-slate-400">
                    {node.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corner HUD marks */}
      <span aria-hidden="true" className="pointer-events-none absolute left-5 top-4 z-10 font-mono text-[8px] uppercase tracking-[0.4em] text-slate-600 lg:left-7 lg:top-5">
        EDU.MAP
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute right-5 top-4 z-10 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.4em] text-slate-600 lg:right-7 lg:top-5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
        4 Nodes
      </span>
    </div>
  );
}

function MobileConstellation() {
  const [openId, setOpenId] = useState("diploma");

  return (
    <div className="relative md:hidden">
      {/* Hub */}
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            aria-hidden="true"
            className="orbit-ring absolute inset-0 rounded-full border border-dashed border-sky-400/30"
            style={{ ["--orbit-duration"]: "30s" }}
          />
          <div className="absolute inset-2 flex items-center justify-center rounded-full border border-indigo-300/40 bg-[radial-gradient(circle_at_38%_32%,#c7d2fe_0%,#6366f1_40%,#312e81_75%,#070b21_100%)] shadow-[inset_-5px_-7px_14px_rgba(2,6,23,0.7),0_0_40px_-6px_rgba(129,140,248,0.6)]">
            <GraduationCap className="h-8 w-8 text-indigo-50" />
          </div>
        </div>
        <p className="mt-3 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.32em] text-indigo-200">
          My Learning<br />Journey
        </p>
      </div>

      {/* Spine + nodes */}
      <ol className="relative mt-8">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-7 top-2 w-px bg-gradient-to-b from-sky-400/60 via-indigo-400/60 to-violet-400/60"
        />

        {NODES.map((node) => {
          const Icon = node.icon;
          const tone = TONE[node.tone];
          const open = openId === node.id;
          return (
            <li key={node.id} className="relative flex items-start gap-4 py-2.5">
              {/* Node orb on the spine */}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
                <span aria-hidden="true" className={`absolute inset-0 rounded-full bg-gradient-to-br ${tone.ring} p-[1.5px]`}>
                  <span className="block h-full w-full rounded-full bg-[#070d24]" />
                </span>
                <Icon className={`relative h-5 w-5 ${tone.icon}`} />
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : node.id)}
                  aria-expanded={open}
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[7px] font-bold uppercase tracking-[0.28em] text-indigo-300/80">
                      {node.tag}
                    </span>
                    <span className="mt-1 block text-[13px] font-bold leading-snug text-slate-100">
                      {node.short}
                    </span>
                    <span className="mt-1.5 block">
                      <StatusChip node={node} />
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {open && (
                  <div className="mt-2 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3">
                    <p className="text-[12px] font-semibold leading-snug text-white">
                      {node.title}
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      {node.status}
                      {node.id.includes("computer") || node.id.includes("digital")
                        ? " · National Skill Standard Level 3"
                        : ""}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      {node.desc}
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24"
    >
      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px] dark:bg-blue-600/10" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <Reveal y={16} className="mx-auto mb-10 max-w-3xl space-y-4 text-center sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Education</span>
          </div>

          <h2
            id="education-heading"
            className="text-4xl font-black leading-[1.02] tracking-tight text-slate-900 dark:text-white sm:text-6xl"
          >
            The Knowledge{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-300 dark:to-violet-400">
              Constellation
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            SSC, a diploma in Computer Science &amp; Engineering, and Level 3
            professional certifications — every star on this map is real. Hover
            or tap a node to explore.
          </p>
        </Reveal>

        {/* ===== Desktop / laptop / tablet constellation ===== */}
        <Reveal y={26} delay={0.1}>
          <ConstellationStage />
        </Reveal>

        {/* ===== Mobile constellation (vertical) ===== */}
        <Reveal y={22} delay={0.1} className="md:hidden">
          <div className="rounded-3xl border border-white/[0.08] bg-[#050a1c] p-5 shadow-[0_28px_60px_-28px_rgba(2,6,23,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
            <StarDust count={16} />
            <MobileConstellation />
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-[8px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-600 sm:text-[9px]">
          <span className="text-indigo-500 dark:text-indigo-400">{"//"}</span>{" "}
          every node is real — the map of my education so far
        </p>

        {/* Screen-reader summary */}
        <p className="sr-only">
          Education: SSC — Secondary School Certificate, Status: Completed.
          Currently studying Diploma in Computer Science &amp; Engineering.
          Professional certification: Computer Operation, Level 3. Professional
          certification: Digital Marketing, Level 3.
        </p>
      </div>
    </section>
  );
}
