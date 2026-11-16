"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Monitor,
  Megaphone,
  ChevronDown,
  CheckCircle2,
  X,
  BrainCircuit,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { educationData, certificationsData } from "@/data/portfolioData";

// ============================================================
// EDUCATION — "NEURAL LEARNING DIMENSION"
// An immersive sci-fi learning universe: one central 3D neural
// core representing the learning journey, orbited by four
// floating holographic memory shards — SSC, Diploma in CSE,
// Computer Operation L3, Digital Marketing L3 — each tethered
// to the core by animated energy pathways.
// Desktop/laptop: tilted preserve-3d dimension with CSS-3D core.
// Tablet: compact chamber. Mobile: vertical interactive sequence.
// ============================================================

// ---- real data, straight from portfolioData.js (never invented) ----
const ssc = educationData.find((e) => e.id === "ssc");
const diploma = educationData.find((e) => e.id === "diploma-cse");
const computerOperation = certificationsData.find((c) => c.id === "computer-operation");
const digitalMarketing = certificationsData.find((c) => c.id === "digital-marketing");

// Memory shards 01–04 — exactly the four records, nothing added.
// Each shard carries a unique crystal silhouette (clip-path).
const SHARDS = [
  {
    id: "ssc",
    num: "01",
    tag: "Academic",
    short: "SSC",
    record: ssc.degree,
    status: "Completed",
    statusLine: "Completed",
    tone: "sky",
    icon: BookOpen,
    x: 12.5,
    y: 23,
    desc: ssc.description,
    meta: ssc.period,
    floatDelay: "0s",
    floatDuration: "6.1s",
    crystal: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    facets: ["50,1 50,99", "1,50 99,50", "50,1 99,50", "50,1 1,50", "50,99 99,50", "50,99 1,50"],
  },
  {
    id: "diploma",
    num: "02",
    tag: "Academic",
    short: "Diploma in Computer Science & Engineering",
    record: diploma.degree,
    status: diploma.status,
    statusLine: diploma.status,
    tone: "emerald",
    icon: GraduationCap,
    x: 87.5,
    y: 23,
    desc: diploma.description,
    meta: diploma.period,
    current: true,
    floatDelay: "-1.9s",
    floatDuration: "6.7s",
    crystal: "polygon(25% 1.5%, 75% 1.5%, 100% 50%, 75% 98.5%, 25% 98.5%, 0% 50%)",
    facets: ["25,2 50,50", "75,2 50,50", "99,50 50,50", "75,98 50,50", "25,98 50,50", "1,50 50,50"],
  },
  {
    id: "computer-operation",
    num: "03",
    tag: "Certification",
    short: "Computer Operation",
    record: computerOperation.title,
    status: "Level 3",
    statusLine: "Level 3 — National Skill Standard",
    tone: "violet",
    icon: Monitor,
    x: 87.5,
    y: 76,
    desc: computerOperation.description,
    meta: computerOperation.level,
    floatDelay: "-3.2s",
    floatDuration: "5.8s",
    crystal: "polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)",
    facets: ["50,1 50,99", "50,1 100,40", "50,1 0,40", "20,99 50,1", "80,99 50,1"],
  },
  {
    id: "digital-marketing",
    num: "04",
    tag: "Certification",
    short: "Digital Marketing",
    record: digitalMarketing.title,
    status: "Level 3",
    statusLine: "Level 3 — National Skill Standard",
    tone: "indigo",
    icon: Megaphone,
    x: 12.5,
    y: 76,
    desc: digitalMarketing.description,
    meta: digitalMarketing.level,
    floatDelay: "-2.5s",
    floatDuration: "6.4s",
    crystal: "polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%)",
    facets: ["50,1 50,99", "50,1 100,38", "50,1 0,38", "50,1 19,100", "50,1 81,100"],
  },
];

// Energy pathways — core to each shard (cubic synapse arcs)
const PATHWAYS = [
  { id: "ssc", d: "M 500 285 C 380 255 235 205 125 141", mid: [309, 226], dur: "5.2s" },
  { id: "diploma", d: "M 500 285 C 620 255 765 205 875 141", mid: [691, 226], dur: "6.1s" },
  { id: "computer-operation", d: "M 500 285 C 620 315 765 395 875 462", mid: [691, 360], dur: "5.7s" },
  { id: "digital-marketing", d: "M 500 285 C 380 315 235 395 125 462", mid: [309, 360], dur: "6.4s" },
];

// Tones carry both themes: deeper inks on the light holographic chamber,
// luminous accents in the dark one.
const TONE = {
  sky: {
    ring: "from-sky-400/80 to-blue-500/80",
    icon: "text-sky-600 dark:text-sky-300",
    chip: "border-sky-500/35 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300",
    dot: "bg-sky-500 dark:bg-sky-400",
    aura: "rgba(56,189,248,0.4)",
    disc: "border-sky-500/40 bg-sky-500/10 dark:border-sky-400/35 dark:bg-sky-400/10",
    discText: "text-sky-600 dark:text-sky-300",
    discGlow:
      "shadow-[0_0_18px_-4px_rgba(56,189,248,0.55)] group-hover/shard:shadow-[0_0_26px_-2px_rgba(56,189,248,0.75)] group-focus-visible/shard:shadow-[0_0_26px_-2px_rgba(56,189,248,0.75)]",
    glass:
      "from-sky-400/[0.22] via-white/55 to-white/20 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35),0_0_30px_-12px_rgba(56,189,248,0.35),inset_0_1px_0_rgba(255,255,255,0.75)] dark:from-sky-400/[0.16] dark:via-white/[0.05] dark:to-white/[0.015] dark:shadow-[0_20px_44px_-20px_rgba(2,6,23,0.95),0_0_34px_-10px_rgba(56,189,248,0.35),inset_0_1px_0_rgba(255,255,255,0.16)]",
    glassEdge: "from-sky-500/70 via-sky-400/30 to-indigo-400/20 dark:from-sky-300/70 dark:via-sky-400/25 dark:to-indigo-400/10",
    num: "text-sky-600 dark:text-sky-400/90",
    crystalAccent: "#0284c7",
  },
  emerald: {
    ring: "from-emerald-400/80 to-teal-500/80",
    icon: "text-emerald-600 dark:text-emerald-300",
    chip: "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    aura: "rgba(52,211,153,0.4)",
    disc: "border-emerald-500/40 bg-emerald-500/10 dark:border-emerald-400/35 dark:bg-emerald-400/10",
    discText: "text-emerald-600 dark:text-emerald-300",
    discGlow:
      "shadow-[0_0_18px_-4px_rgba(52,211,153,0.55)] group-hover/shard:shadow-[0_0_26px_-2px_rgba(52,211,153,0.75)] group-focus-visible/shard:shadow-[0_0_26px_-2px_rgba(52,211,153,0.75)]",
    glass:
      "from-emerald-400/[0.22] via-white/55 to-white/20 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35),0_0_30px_-12px_rgba(52,211,153,0.35),inset_0_1px_0_rgba(255,255,255,0.75)] dark:from-emerald-400/[0.16] dark:via-white/[0.05] dark:to-white/[0.015] dark:shadow-[0_20px_44px_-20px_rgba(2,6,23,0.95),0_0_34px_-10px_rgba(52,211,153,0.35),inset_0_1px_0_rgba(255,255,255,0.16)]",
    glassEdge: "from-emerald-500/70 via-emerald-400/30 to-teal-400/20 dark:from-emerald-300/70 dark:via-emerald-400/25 dark:to-teal-400/10",
    num: "text-emerald-600 dark:text-emerald-400/90",
    crystalAccent: "#059669",
  },
  violet: {
    ring: "from-violet-400/70 to-purple-500/70",
    icon: "text-violet-600 dark:text-violet-300",
    chip: "border-violet-500/35 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300",
    dot: "bg-violet-500 dark:bg-violet-400",
    aura: "rgba(167,139,250,0.4)",
    disc: "border-violet-500/40 bg-violet-500/10 dark:border-violet-400/35 dark:bg-violet-400/10",
    discText: "text-violet-600 dark:text-violet-300",
    discGlow:
      "shadow-[0_0_18px_-4px_rgba(167,139,250,0.55)] group-hover/shard:shadow-[0_0_26px_-2px_rgba(167,139,250,0.75)] group-focus-visible/shard:shadow-[0_0_26px_-2px_rgba(167,139,250,0.75)]",
    glass:
      "from-violet-400/[0.22] via-white/55 to-white/20 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35),0_0_30px_-12px_rgba(167,139,250,0.35),inset_0_1px_0_rgba(255,255,255,0.75)] dark:from-violet-400/[0.16] dark:via-white/[0.05] dark:to-white/[0.015] dark:shadow-[0_20px_44px_-20px_rgba(2,6,23,0.95),0_0_34px_-10px_rgba(167,139,250,0.35),inset_0_1px_0_rgba(255,255,255,0.16)]",
    glassEdge: "from-violet-500/70 via-violet-400/30 to-purple-400/20 dark:from-violet-300/70 dark:via-violet-400/25 dark:to-purple-400/10",
    num: "text-violet-600 dark:text-violet-400/90",
    crystalAccent: "#7c3aed",
  },
  indigo: {
    ring: "from-indigo-400/70 to-blue-500/70",
    icon: "text-indigo-600 dark:text-indigo-300",
    chip: "border-indigo-500/35 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    aura: "rgba(129,140,248,0.4)",
    disc: "border-indigo-500/40 bg-indigo-500/10 dark:border-indigo-400/35 dark:bg-indigo-400/10",
    discText: "text-indigo-600 dark:text-indigo-300",
    discGlow:
      "shadow-[0_0_18px_-4px_rgba(129,140,248,0.55)] group-hover/shard:shadow-[0_0_26px_-2px_rgba(129,140,248,0.75)] group-focus-visible/shard:shadow-[0_0_26px_-2px_rgba(129,140,248,0.75)]",
    glass:
      "from-indigo-400/[0.22] via-white/55 to-white/20 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35),0_0_30px_-12px_rgba(129,140,248,0.35),inset_0_1px_0_rgba(255,255,255,0.75)] dark:from-indigo-400/[0.16] dark:via-white/[0.05] dark:to-white/[0.015] dark:shadow-[0_20px_44px_-20px_rgba(2,6,23,0.95),0_0_34px_-10px_rgba(129,140,248,0.35),inset_0_1px_0_rgba(255,255,255,0.16)]",
    glassEdge: "from-indigo-500/70 via-indigo-400/30 to-blue-400/20 dark:from-indigo-300/70 dark:via-indigo-400/25 dark:to-blue-400/10",
    num: "text-indigo-600 dark:text-indigo-400/90",
    crystalAccent: "#4f46e5",
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

// Seeded cosmic dust — deterministic, no hydration mismatch.
// Mostly tiny, dim, slow drifters; a rare brighter spark keeps it alive.
function useStarDust(count) {
  return useMemo(() => {
    const rand = mulberry32(0xed0ca7);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() < 0.62 ? 1.5 : rand() < 0.88 ? 2 : 2.75,
      delay: `${(rand() * 6.5).toFixed(2)}s`,
      duration: `${(3.6 + rand() * 3.6).toFixed(2)}s`,
      peak: 0.28 + rand() * 0.42,
      driftX: `${((rand() - 0.5) * 11).toFixed(1)}px`,
      driftY: `${((rand() - 0.5) * 11).toFixed(1)}px`,
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
          className="constellation-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--star-delay"]: s.delay,
            ["--star-duration"]: s.duration,
            ["--star-peak"]: s.peak,
            ["--star-drift-x"]: s.driftX,
            ["--star-drift-y"]: s.driftY,
          }}
        />
      ))}
    </div>
  );
}

function StatusChip({ shard }) {
  const tone = TONE[shard.tone];
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.18em] ${tone.chip}`}
    >
      {shard.current ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
      )}
      {shard.status}
    </span>
  );
}

// Neural core network — concentric synapse web (rotating ring of neuron nodes)
function NeuralNetwork({ className }) {
  const nodes = useMemo(() => {
    const ring = [];
    const count = 8;
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      ring.push({ x: 50 + Math.cos(angle) * 40, y: 50 + Math.sin(angle) * 40, angle });
    }
    return ring;
  }, []);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Synapse web — outer ring chords */}
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 44) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#818cf8"
              strokeOpacity="0.32"
              strokeWidth="0.55"
            />
          );
        }),
      )}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="0.7" strokeDasharray="3 5" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="0.55" />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 2 === 0 ? 2.15 : 1.55}
          fill={i % 2 === 0 ? "#7dd3fc" : "#c4b5fd"}
          className="synapse-node"
          style={{ ["--synapse-delay"]: `${(i * 0.35).toFixed(2)}s` }}
        />
      ))}
      <circle cx="50" cy="50" r="1.6" fill="#e0e7ff" />
    </svg>
  );
}

function NeuralStage() {
  const reducedMotion = useReducedMotion() === true;
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const panelRef = useRef(null);
  const openerRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [hoverId, setHoverId] = useState(null);
  const [panelId, setPanelId] = useState(null);

  // Pointer-parallax tilt — lerped in a rAF loop, writes transform directly.
  // The loop sleeps once the stage settles on its target; pointermove wakes it.
  const wakeTiltRef = useRef(() => {});
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
      const settled = Math.abs(tgt.x - cur.x) < 0.002 && Math.abs(tgt.y - cur.y) < 0.002;
      if (settled) {
        cur.x = tgt.x;
        cur.y = tgt.y;
      }
      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1150px) rotateX(${cur.y.toFixed(3)}deg) rotateY(${cur.x.toFixed(3)}deg)`;
      }
      raf = settled ? 0 : window.requestAnimationFrame(tick);
    };
    const wake = () => {
      if (raf === 0) raf = window.requestAnimationFrame(tick);
    };
    wakeTiltRef.current = wake;
    wake();
    return () => {
      wakeTiltRef.current = () => {};
      if (raf !== 0) window.cancelAnimationFrame(raf);
      raf = 0;
    };
  }, [reducedMotion]);

  // Floating info panel — focus inside on open, Escape closes, restore focus on close
  useEffect(() => {
    if (!panelId) return undefined;
    panelRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setPanelId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus?.();
    };
  }, [panelId]);

  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.current = { x: px * 9, y: -py * 7 };
    wakeTiltRef.current();
  };

  const handlePointerLeave = () => {
    target.current = { x: 0, y: 0 };
    wakeTiltRef.current();
    setHoverId(null);
  };

  const openPanel = (id, event) => {
    openerRef.current = event.currentTarget;
    setPanelId(id);
  };

  const panelShard = SHARDS.find((c) => c.id === panelId) ?? null;
  const panelTone = panelShard ? TONE[panelShard.tone] : null;
  const PanelIcon = panelShard?.icon;

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="neural-vault relative hidden h-[32rem] select-none md:block lg:h-[37rem] xl:h-[39rem]"
    >
      {/* ===== Cosmic environment ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-200 bg-[#f4f7ff] shadow-[0_30px_70px_-34px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-500 dark:border-white/[0.08] dark:bg-[#04081a] dark:shadow-[0_36px_80px_-32px_rgba(2,6,23,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        {/* Nebula washes — electric blue / soft violet */}
        <div className="absolute -left-32 top-[-20%] h-[26rem] w-[26rem] rounded-full bg-sky-400/25 blur-[130px] dark:bg-sky-600/[0.16]" />
        <div className="absolute -right-32 bottom-[-22%] h-[26rem] w-[26rem] rounded-full bg-violet-400/25 blur-[130px] dark:bg-violet-600/[0.18]" />
        <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-700/[0.16]" />
        {/* Volumetric light beams from above */}
        <div className="absolute -top-16 left-[27%] h-[125%] w-40 -skew-x-12 bg-gradient-to-b from-sky-400/25 via-indigo-400/10 to-transparent blur-md dark:from-sky-400/[0.13] dark:via-indigo-400/[0.05]" />
        <div className="absolute -top-16 right-[27%] h-[125%] w-40 skew-x-12 bg-gradient-to-b from-violet-400/25 via-indigo-400/10 to-transparent blur-md dark:from-violet-400/[0.13] dark:via-indigo-400/[0.05]" />
        <div className="absolute -top-16 left-1/2 h-[125%] w-28 -translate-x-1/2 bg-gradient-to-b from-indigo-300/30 via-indigo-400/[0.08] to-transparent blur-md dark:from-indigo-200/[0.12] dark:via-indigo-400/[0.04]" />
        {/* Spotlight behind the core */}
        <div className="absolute left-1/2 top-[46%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-[100px] dark:bg-indigo-500/[0.16]" />
        {/* Perspective synapse grid receding into the dimension */}
        <div className="neural-floor absolute bottom-0 left-0 right-0 h-44 opacity-70" />
        {/* Scanline texture + one sweeping holographic band */}
        <div className="neural-scanlines absolute inset-0" />
        {!reducedMotion && (
          <div className="neural-scan absolute left-0 h-24 w-full bg-gradient-to-b from-transparent via-sky-300/[0.13] to-transparent blur-[6px]" />
        )}
        <div className="neural-vignette absolute inset-0" />
        <StarDust count={34} />
        {/* Corner brackets — dimension framing */}
        <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-indigo-500/40 dark:border-indigo-300/30" />
        <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-indigo-500/40 dark:border-indigo-300/30" />
        <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-indigo-500/40 dark:border-indigo-300/30" />
        <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-indigo-500/40 dark:border-indigo-300/30" />
      </div>

      {/* ===== Tilted dimension plane ===== */}
      <div
        ref={tiltRef}
        className="absolute inset-6 will-change-transform [transform-style:preserve-3d] lg:inset-8"
      >
        {/* Energy pathways with traveling pulses */}
        <svg
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="constellation-enter absolute inset-0 h-full w-full drop-shadow-[0_0_10px_rgba(99,102,241,0.45)]"
          style={{ animationDelay: "0.1s" }}
        >
          <defs>
            <linearGradient id="neural-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <radialGradient id="neural-photon-halo">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#a5b4fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </radialGradient>
            <filter id="neural-photon-glow" x="-250%" y="-250%" width="600%" height="600%">
              <feGaussianBlur stdDeviation="3.1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {PATHWAYS.map((p, pathwayIndex) => {
            const lit = hoverId === p.id;
            return (
              <g key={p.id}>
                {/* Wide soft under-glow */}
                <path
                  d={p.d}
                  fill="none"
                  stroke="url(#neural-edge)"
                  strokeOpacity={lit ? 0.5 : 0.18}
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke-opacity 0.45s ease" }}
                />
                {/* Hairline gradient core, slowly flowing */}
                <path
                  d={p.d}
                  fill="none"
                  stroke="url(#neural-edge)"
                  strokeOpacity={lit ? 1 : 0.6}
                  strokeWidth="1.6"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke-opacity 0.45s ease" }}
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
                </path>
                {/* Traveling energy flare */}
                {!reducedMotion && (
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#f0f9ff"
                    strokeOpacity={lit ? 0.95 : 0.65}
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeDasharray="9 91"
                    pathLength="100"
                    filter="url(#neural-photon-glow)"
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: "stroke-opacity 0.45s ease" }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur={p.dur}
                      repeatCount="indefinite"
                    />
                  </path>
                )}
                {/* Mid-synapse node — blinks on the pathway */}
                <circle
                  cx={p.mid[0]}
                  cy={p.mid[1]}
                  r={lit ? 3.4 : 2.3}
                  fill="#c7d2fe"
                  stroke="#818cf8"
                  strokeOpacity="0.8"
                  strokeWidth="1"
                  className="synapse-node"
                  style={{ transition: "r 0.4s ease", ["--synapse-delay"]: `${(pathwayIndex * 0.7).toFixed(2)}s` }}
                />
                {/* Photon comet — layered halo + trailing sparks */}
                {!reducedMotion && (
                  <g style={{ transition: "opacity 0.45s ease" }} opacity={lit ? 1 : 0.85}>
                    <circle r="9" fill="url(#neural-photon-halo)" opacity="0.8">
                      <animateMotion path={p.d} dur={p.dur} repeatCount="indefinite" />
                    </circle>
                    <circle r="1.5" fill="#c7d2fe" opacity="0.35">
                      <animateMotion path={p.d} dur={p.dur} begin="-0.42s" repeatCount="indefinite" />
                    </circle>
                    <circle r="2.1" fill="#e0e7ff" opacity="0.55">
                      <animateMotion path={p.d} dur={p.dur} begin="-0.21s" repeatCount="indefinite" />
                    </circle>
                    <circle r="2.9" fill="#f0f9ff" filter="url(#neural-photon-glow)">
                      <animateMotion path={p.d} dur={p.dur} repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* ===== Central Neural Core ===== */}
        <div
          className="constellation-enter absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 text-center [transform-style:preserve-3d]"
          style={{ animationDelay: "0.22s" }}
        >
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center lg:h-40 lg:w-40 xl:h-44 xl:w-44">
            {/* Ambient nebula glow */}
            <span
              aria-hidden="true"
              className="hub-glow absolute -inset-10 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(56,189,248,0.16) 45%, transparent 72%)", filter: "blur(18px)" }}
            />
            {/* Conic energy shimmer rotating behind the sphere */}
            {!reducedMotion && (
              <span
                aria-hidden="true"
                className="core-shimmer absolute -inset-4 rounded-full opacity-70"
                style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(125,211,252,0.32) 38deg, transparent 78deg, transparent 180deg, rgba(196,181,253,0.32) 220deg, transparent 262deg)", filter: "blur(6px)" }}
              />
            )}
            {/* Sonar pulse rings */}
            <span aria-hidden="true" className="hub-pulse absolute inset-2 rounded-full border border-indigo-300/45" />
            <span aria-hidden="true" className="hub-pulse absolute inset-2 rounded-full border border-sky-300/35" style={{ animationDelay: "1.9s" }} />
            {/* Rotating synapse network */}
            <span aria-hidden="true" className="orbit-ring absolute -inset-6 lg:-inset-8" style={{ ["--orbit-duration"]: "38s" }}>
              <NeuralNetwork className="h-full w-full" />
            </span>
            <span aria-hidden="true" className="orbit-ring-reverse absolute -inset-1 lg:-inset-2" style={{ ["--orbit-duration"]: "55s" }}>
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 5" strokeLinejoin="round" />
                <circle cx="50" cy="2" r="1.6" fill="#7dd3fc" />
                <circle cx="93" cy="74" r="1.4" fill="#7dd3fc" opacity="0.7" />
                <circle cx="7" cy="74" r="1.4" fill="#c4b5fd" opacity="0.7" />
              </svg>
            </span>

            {/* Floating neural energy sphere */}
            <div className="node-float relative flex items-center justify-center" style={{ ["--float-delay"]: "-0.8s", ["--float-duration"]: "6.5s" }}>
              <div className="hub-core relative flex h-16 w-16 items-center justify-center rounded-full border border-indigo-200/55 bg-[radial-gradient(circle_at_36%_30%,#e0f2fe_0%,#7dd3fc_22%,#6366f1_52%,#3730a3_78%,#070b21_100%)] shadow-[inset_-6px_-8px_14px_rgba(2,6,23,0.75),inset_3px_3px_8px_rgba(224,242,254,0.45),0_0_38px_-2px_rgba(99,102,241,0.85)] lg:h-20 lg:w-20 xl:h-24 xl:w-24">
                {/* Inner molten core */}
                <span aria-hidden="true" className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle_at_42%_36%,#f0f9ff_0%,#a5f3fc_30%,#818cf8_62%,transparent_82%)] opacity-95" style={{ filter: "blur(1px)" }} />
                <GraduationCap className="relative h-6 w-6 text-indigo-50 drop-shadow-[0_0_8px_rgba(224,242,254,0.95)] lg:h-7 lg:w-7 xl:h-8 xl:w-8" strokeWidth={1.75} />
              </div>
            </div>
          </div>
          {/* Core readout */}
          <p className="neural-core-label mt-3 font-mono text-[8px] font-bold uppercase leading-relaxed tracking-[0.34em] text-indigo-700 dark:text-indigo-200 lg:text-[9px]">
            Neural Core<br />My Learning Journey
          </p>
        </div>

        {/* ===== Memory Shards ===== */}
        {SHARDS.map((shard, shardIndex) => {
          const tone = TONE[shard.tone];
          const hovered = hoverId === shard.id;
          const dimmed = hoverId !== null && !hovered;
          const Icon = shard.icon;
          return (
            <div
              key={shard.id}
              className="constellation-enter absolute z-20 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
              style={{ left: `${shard.x}%`, top: `${shard.y}%`, animationDelay: `${0.36 + shardIndex * 0.12}s` }}
            >
              <div className="node-float [transform-style:preserve-3d]" style={{ ["--float-delay"]: shard.floatDelay, ["--float-duration"]: shard.floatDuration }}>
                <button
                  type="button"
                  onClick={(event) => openPanel(shard.id, event)}
                  onMouseEnter={() => setHoverId(shard.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(shard.id)}
                  onBlur={() => setHoverId(null)}
                  aria-haspopup="dialog"
                  aria-label={`${shard.record} — ${shard.statusLine}. Open details`}
                  className={`group/shard relative flex h-36 w-36 cursor-pointer items-center justify-center outline-none transition-[transform,opacity,filter] duration-500 ease-out hover:z-30 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-sky-400 sm:h-40 sm:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 ${dimmed ? "scale-[0.94] opacity-35 saturate-[0.55]" : "opacity-100"} hover:[translate:0_-8px_52px] hover:scale-[1.08] focus-visible:[translate:0_-8px_52px] focus-visible:scale-[1.08]`}
                >
                  {/* Breathing aura */}
                  <span
                    aria-hidden="true"
                    className="node-aura absolute -inset-4 rounded-full"
                    style={{ ["--aura-delay"]: shard.floatDelay, ["--aura-duration"]: "4.6s", background: `radial-gradient(circle, ${tone.aura} 0%, transparent 68%)`, filter: "blur(12px)" }}
                  />
                  {/* Crystal body — unique silhouette */}
                  <div className="absolute inset-0 transition-all duration-500 ease-out group-hover/shard:brightness-[1.35] group-hover/shard:saturate-[1.15] group-focus-visible/shard:brightness-[1.35]">
                    {/* Glowing rim */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tone.glassEdge}`} style={{ clipPath: shard.crystal }} />
                    {/* Glass facets */}
                    <div className={`absolute inset-[1.5px] bg-gradient-to-br ${tone.glass}`} style={{ clipPath: shard.crystal }} />
                    <div
                      className="absolute inset-[1.5px]"
                      style={{ clipPath: shard.crystal, background: "var(--vault-shard-face)" }}
                    />
                    {/* Facet cut lines */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-[1.5px] h-[calc(100%-3px)] w-[calc(100%-3px)]" aria-hidden="true">
                      {shard.facets.map((pair, i) => {
                        const [x1, y1, x2, y2] = pair.split(/[ ,]/).map(Number);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="shard-facet-line" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />;
                      })}
                    </svg>
                    {/* Holographic scan band — only while hovered/focused */}
                    {!reducedMotion && (
                      <div
                        aria-hidden="true"
                        className="shard-scan pointer-events-none absolute left-0 h-16 w-full bg-gradient-to-b from-transparent via-sky-200/[0.32] to-transparent opacity-0 blur-[3px] transition-opacity duration-300 group-hover/shard:opacity-100 group-focus-visible/shard:opacity-100"
                        style={{ clipPath: shard.crystal }}
                      />
                    )}
                  </div>
                  {/* Shard face content */}
                  <span className="relative flex max-w-[74%] flex-col items-center gap-1 text-center transition-opacity duration-300 group-hover/shard:opacity-0 group-focus-visible/shard:opacity-0">
                    <Icon className={`h-4 w-4 ${tone.discText} drop-shadow-[0_0_6px_rgba(148,197,255,0.6)] lg:h-5 lg:w-5`} strokeWidth={1.75} />
                    <span className={`font-mono text-[6px] font-bold uppercase leading-none tracking-[0.3em] lg:text-[6.5px] ${tone.num}`}>
                      {shard.num} · {shard.tag}
                    </span>
                    <span className="text-[8px] font-bold leading-[1.25] tracking-tight text-slate-900 dark:text-slate-100 lg:text-[9.5px]">
                      {shard.short}
                    </span>
                    <StatusChip shard={shard} />
                  </span>
                  {/* Hover readout — holographic data overlay */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex w-[11.5rem] -translate-x-1/2 -translate-y-1/2 scale-90 flex-col items-center gap-1.5 rounded-2xl border border-sky-400/40 bg-white/90 px-3 py-2.5 opacity-0 blur-[3px] backdrop-blur-md transition-all duration-500 ease-out group-hover/shard:scale-100 group-hover/shard:opacity-100 group-hover/shard:blur-none group-focus-visible/shard:scale-100 group-focus-visible/shard:opacity-100 group-focus-visible/shard:blur-none dark:border-sky-300/25 dark:bg-[#060c22]/85 lg:w-48"
                  >
                    <span className={`font-mono text-[6px] font-bold uppercase tracking-[0.35em] ${tone.num}`}>
                      Memory Shard {shard.num}
                    </span>
                    <span className="text-[9px] font-bold leading-snug text-slate-900 dark:text-white lg:text-[10px]">
                      {shard.record}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[7px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      {shard.statusLine}
                    </span>
                    <span className="mt-0.5 border-t border-slate-200 pt-1.5 font-mono text-[5.5px] uppercase tracking-[0.3em] text-slate-500 dark:border-white/10 dark:text-slate-500">
                      Click — open shard file
                    </span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Floating information panel (dialog) ===== */}
      {panelShard && PanelIcon && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          {/* Backdrop — click to dismiss */}
          <button
            type="button"
            aria-label="Close details panel"
            onClick={() => setPanelId(null)}
            className="neural-fade-in absolute inset-0 cursor-pointer rounded-3xl bg-[#020617]/75 backdrop-blur-[3px]"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="neural-panel-title"
            tabIndex={-1}
            className="neural-panel relative max-h-full w-[min(25rem,calc(100%-2.5rem))] overflow-y-auto rounded-2xl border border-indigo-400/30 bg-white/95 p-5 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.4),0_0_50px_-20px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] outline-none backdrop-blur-xl dark:border-indigo-300/25 dark:bg-[#070d22]/95 dark:shadow-[0_36px_80px_-24px_rgba(2,6,23,1),0_0_60px_-18px_rgba(129,140,248,0.45),inset_0_1px_0_rgba(255,255,255,0.09)] lg:p-6"
          >
            {/* Top energy filament */}
            <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
            {/* Scanline texture + corner brackets */}
            <span aria-hidden="true" className="neural-scanlines pointer-events-none absolute inset-0 rounded-2xl" />
            <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-indigo-500/50 dark:border-indigo-300/45" />
            <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-indigo-500/50 dark:border-indigo-300/45" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-indigo-500/50 dark:border-indigo-300/45" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-indigo-500/50 dark:border-indigo-300/45" />

            {/* Close */}
            <button
              type="button"
              onClick={() => setPanelId(null)}
              aria-label="Close details panel"
              className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 outline-none transition-all duration-200 hover:border-sky-500/50 hover:text-sky-600 focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:text-sky-300 dark:focus-visible:ring-sky-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Kicker */}
            <p className={`flex items-center justify-between gap-3 pr-9 font-mono text-[7px] font-bold uppercase tracking-[0.3em] ${panelTone.num}`}>
              Shard {panelShard.num} · {panelShard.tag}
              <span className="text-slate-500 dark:text-slate-600">{panelShard.meta}</span>
            </p>

            {/* Icon + record title */}
            <div className="mt-3 flex items-start gap-3.5">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${panelTone.disc} ${panelTone.discGlow}`}>
                <PanelIcon className={`h-6 w-6 ${panelTone.discText}`} strokeWidth={1.75} />
              </span>
              <h3 id="neural-panel-title" className="text-[15px] font-extrabold leading-snug text-slate-900 dark:text-white lg:text-base">
                {panelShard.record}
              </h3>
            </div>

            {/* Status line */}
            <div className="mt-3.5 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{panelShard.statusLine}</span>
            </div>

            {/* Record description — verbatim from portfolioData.js */}
            <p className="mt-3 border-t border-slate-200 pt-3 text-[10.5px] leading-relaxed text-slate-600 dark:border-white/[0.07] dark:text-slate-400">
              {panelShard.desc}
            </p>

            {/* Footer */}
            <p className="mt-3 border-t border-slate-200 pt-2.5 font-mono text-[6.5px] uppercase tracking-[0.35em] text-slate-500 dark:border-white/[0.07] dark:text-slate-600">
              Neural Learning Dimension · Shard {panelShard.num}/04
            </p>
          </div>
        </div>
      )}

      {/* Corner HUD marks */}
      <span aria-hidden="true" className="constellation-enter pointer-events-none absolute left-5 top-4 z-10 font-mono text-[8px] uppercase tracking-[0.4em] text-slate-500 lg:left-7 lg:top-5" style={{ animationDelay: "0.72s" }}>
        Neural.Dim
      </span>
      <span aria-hidden="true" className="constellation-enter pointer-events-none absolute right-5 top-4 z-10 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.4em] text-slate-500 lg:right-7 lg:top-5" style={{ animationDelay: "0.72s" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,0.7)] motion-safe:animate-pulse" />
        4 Shards Synced
      </span>
    </div>
  );
}

function MobileNeural() {
  const [openId, setOpenId] = useState("diploma");
  const reducedMotionMobile = useReducedMotion() === true;

  return (
    <div className="relative md:hidden">
      {/* Mini neural core */}
      <div className="constellation-enter flex flex-col items-center text-center" style={{ animationDelay: "0.18s" }}>
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            aria-hidden="true"
            className="hub-glow absolute -inset-4 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(129,140,248,0.45) 0%, transparent 70%)", filter: "blur(12px)" }}
          />
          <span aria-hidden="true" className="orbit-ring absolute inset-0" style={{ ["--orbit-duration"]: "26s" }}>
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" fill="none" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="5 4" strokeLinejoin="round" />
              <circle cx="50" cy="2" r="2" fill="#7dd3fc" />
            </svg>
          </span>
          {/* Mini neural energy sphere */}
          <div className="hub-core relative flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200/55 bg-[radial-gradient(circle_at_36%_30%,#e0f2fe_0%,#7dd3fc_24%,#6366f1_55%,#070b21_100%)] shadow-[inset_-3px_-4px_8px_rgba(2,6,23,0.7),inset_2px_2px_5px_rgba(224,242,254,0.4),0_0_24px_-2px_rgba(99,102,241,0.8)]">
            <GraduationCap className="h-5 w-5 text-indigo-50 drop-shadow-[0_0_5px_rgba(224,242,254,0.9)]" strokeWidth={1.75} />
          </div>
        </div>
        <p className="neural-core-label mt-2.5 font-mono text-[8px] font-bold uppercase leading-relaxed tracking-[0.32em] text-indigo-700 dark:text-indigo-200">
          Neural Core<br />My Learning Journey
        </p>
      </div>

      {/* Vertical shard sequence */}
      <ol className="relative mt-6 space-y-2.5">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-7 top-2 w-px bg-gradient-to-b from-sky-400/70 via-indigo-400/70 to-violet-400/70 shadow-[0_0_8px_0_rgba(129,140,248,0.45)]"
        />
        {!reducedMotionMobile && (
          <span aria-hidden="true" className="spine-dot absolute left-7 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-indigo-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)] dark:bg-indigo-200 dark:shadow-[0_0_8px_2px_rgba(199,210,254,0.8)]" />
        )}

        {SHARDS.map((shard, shardIndex) => {
          const Icon = shard.icon;
          const tone = TONE[shard.tone];
          const open = openId === shard.id;
          return (
            <li
              key={shard.id}
              className="constellation-enter relative flex items-stretch gap-4"
              style={{ animationDelay: `${0.28 + shardIndex * 0.1}s` }}
            >
              {/* Shard node on the spine — same crystal silhouettes */}
              <span className="relative z-10 flex w-14 shrink-0 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="node-aura absolute -inset-2"
                  style={{ ["--aura-delay"]: shard.floatDelay, ["--aura-duration"]: "4.8s", background: `radial-gradient(circle, ${tone.aura} 0%, transparent 68%)`, filter: "blur(8px)", clipPath: shard.crystal }}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-sky-400/70 via-indigo-400/60 to-violet-500/70" style={{ clipPath: shard.crystal }} />
                <span aria-hidden="true" className="absolute inset-[1.5px] bg-white dark:bg-[#080e26]" style={{ clipPath: shard.crystal }} />
                <Icon className={`relative h-5 w-5 ${tone.icon}`} strokeWidth={1.75} />
              </span>

              {/* Shard body */}
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : shard.id)}
                  aria-expanded={open}
                  aria-controls={`shard-${shard.id}`}
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left outline-none transition-all duration-300 hover:border-indigo-400/40 hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-indigo-300/25 dark:hover:bg-white/[0.055] dark:focus-visible:ring-sky-400"
                >
                  <span className="min-w-0">
                    <span className={`block font-mono text-[6px] font-bold uppercase tracking-[0.3em] ${tone.num}`}>
                      {shard.num} · {shard.tag}
                    </span>
                    <span className="mt-1 block text-[12px] font-bold leading-snug text-slate-900 dark:text-slate-100">
                      {shard.short}
                    </span>
                    <span className="mt-1.5 block">
                      <StatusChip shard={shard} />
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180 text-indigo-600 dark:text-indigo-300" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {open && (
                  <div id={`shard-${shard.id}`} className="mobile-detail mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.04]">
                    <p className="text-[12px] font-semibold leading-snug text-slate-900 dark:text-white">
                      {shard.record}
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {shard.statusLine}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                      {shard.desc}
                    </p>
                    <p className="mt-2 font-mono text-[6px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-600">
                      {shard.meta}
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
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24"
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
            <BrainCircuit className="h-3.5 w-3.5" />
            <span>Neural Learning Dimension</span>
          </div>

          <h2
            id="education-heading"
            className="text-4xl font-black leading-[1.02] tracking-tight text-slate-900 dark:text-white sm:text-6xl"
          >
            The{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-300 dark:to-violet-400">
              Neural Learning Dimension
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Four memory shards — SSC, a Diploma in Computer Science &amp; Engineering, and
            Level 3 certifications — gravitate around one neural core. Hover a shard to
            surface its data; click to open the full memory file.
          </p>
        </Reveal>

        {/* ===== Desktop / laptop / tablet dimension ===== */}
        <Reveal y={30} delay={0.08} duration={0.9}>
          <NeuralStage />
        </Reveal>

        {/* ===== Mobile dimension (vertical shard sequence) ===== */}
        <Reveal y={24} delay={0.08} duration={0.85} className="md:hidden">
            <div className="neural-vault relative overflow-hidden rounded-3xl border border-slate-200 bg-[#f4f7ff] p-5 shadow-[0_28px_60px_-28px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/[0.08] dark:bg-[#04081a] dark:shadow-[0_28px_60px_-28px_rgba(2,6,23,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
            <StarDust count={16} />
            <MobileNeural />
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-[8px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-600 sm:text-[9px]">
          <span className="text-indigo-500 dark:text-indigo-400">{"//"}</span>{" "}
          four shards, one neural core — the living circuit of my education
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
