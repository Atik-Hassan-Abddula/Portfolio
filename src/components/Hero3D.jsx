"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
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

// CSS-only stand-in for the chrome sculpture: layered radial gradients
// suggesting a polished torus knot. Used for reduced motion, missing WebGL,
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

      {/* Chrome knot approximation: layered radial gradients */}
      <div
        className="relative h-32 w-32 rotate-12 rounded-[42%] sm:h-44 sm:w-44"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #f8fafc 0%, #cbd5e1 18%, #64748b 38%, #0f172a 62%, #1e293b 78%, #030712 100%)",
          boxShadow:
            "inset -14px -18px 34px rgba(2,6,23,0.9), inset 8px 10px 22px rgba(226,232,240,0.35), 0 0 70px -12px rgba(96,165,250,0.45)",
        }}
      />
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
  const reducedMotion = useReducedMotion() === true;

  // Adjust scene quality when crossing device breakpoints
  useEffect(() => {
    const onResize = () => setQuality(computeQuality());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (reducedMotion || supportsWebGL === false) {
    return <CoreFallback />;
  }

  return (
    <Suspense fallback={<CoreFallback />}>
      <HeroScene quality={quality} />
    </Suspense>
  );
}
