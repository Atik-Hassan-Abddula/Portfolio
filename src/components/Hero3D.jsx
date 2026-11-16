"use client";

import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// Lazy-loaded client-only 3D scene (never rendered on the server)
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <CoreFallback />,
});

let webGLSupportCache = null;

function detectWebGLSupport() {
  // Cached so the snapshot stays stable across renders
  if (webGLSupportCache === null) {
    try {
      const canvas = document.createElement("canvas");
      webGLSupportCache = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      webGLSupportCache = false;
    }
  }
  return webGLSupportCache;
}

const subscribeNoop = () => () => {};
const serverSnapshot = () => false;

function computeQuality() {
  if (typeof window === "undefined") return "high";
  if (window.innerWidth < 640) return "low";
  if (window.innerWidth < 1024) return "medium";
  return "high";
}

// CSS-only stand-in for the 3D glass cube: layered gradients suggesting
// a faceted glowing cube. Used for reduced motion, missing WebGL,
// and while the scene chunk loads.
export function CoreFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center"
    >
      {/* Halo rings */}
      <div className="absolute h-52 w-52 rounded-full border border-sky-400/40 shadow-[0_0_40px_-8px_rgba(56,189,248,0.5)] sm:h-72 sm:w-72" />
      <div className="absolute h-40 w-40 rounded-full border border-violet-400/30 sm:h-56 sm:w-56" />

      {/* Glass cube approximation: gradient faces + glowing edge frame */}
      <div
        className="relative h-28 w-28 rotate-[18deg] rounded-[22%] sm:h-40 sm:w-40"
        style={{
          background:
            "linear-gradient(140deg, rgba(224,242,254,0.95) 0%, rgba(147,197,253,0.85) 22%, rgba(99,102,241,0.72) 48%, rgba(76,29,149,0.85) 74%, rgba(3,7,18,0.95) 100%)",
          border: "1px solid rgba(125,211,252,0.55)",
          boxShadow:
            "inset 8px 10px 22px rgba(226,232,240,0.38), inset -12px -14px 30px rgba(2,6,23,0.85), 0 0 46px -8px rgba(125,211,252,0.5), 0 0 70px -14px rgba(139,92,246,0.55)",
        }}
      >
        {/* Inner violet energy cube */}
        <div
          className="absolute inset-[30%] rotate-[-6deg] rounded-[18%]"
          style={{
            background:
              "linear-gradient(150deg, #c4b5fd 0%, #8b5cf6 45%, #2e1065 100%)",
            boxShadow:
              "inset 2px 3px 6px rgba(237,233,254,0.55), inset -3px -4px 8px rgba(15,7,36,0.8), 0 0 18px -2px rgba(167,139,250,0.65)",
          }}
        />
      </div>
      {/* Electric specular dot */}
      <div className="absolute h-6 w-6 rounded-full bg-sky-300/80 blur-md sm:h-8 sm:w-8" />
    </div>
  );
}

export default function Hero3D() {
  // Client snapshot detects WebGL once (cached); server snapshot = unsupported
  const supportsWebGL = useSyncExternalStore(
    subscribeNoop,
    detectWebGLSupport,
    serverSnapshot
  );
  const [quality, setQuality] = useState(computeQuality);
  const [active, setActive] = useState(true);
  const wrapRef = useRef(null);
  const reducedMotion = useReducedMotion() === true;

  // Adjust scene quality when crossing device breakpoints
  useEffect(() => {
    const onResize = () => setQuality(computeQuality());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pause the WebGL render loop while the hero is off-screen — no
  // frames are drawn (and no GPU/CPU is burned) until it returns.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reducedMotion || supportsWebGL === false) {
    return <CoreFallback />;
  }

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Suspense fallback={<CoreFallback />}>
        <HeroScene quality={quality} active={active} />
      </Suspense>
    </div>
  );
}
