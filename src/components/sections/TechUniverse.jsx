"use client";

import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Sparkles, MousePointerClick } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import TechGridFallback from "@/components/three/TechGridFallback";

// Lazy-loaded client-only 3D scene (never rendered on the server)
const TechScene = dynamic(() => import("@/components/three/TechScene"), {
  ssr: false,
  loading: () => null,
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

function computeQuality() {
  if (typeof window === "undefined") return "high";
  if (window.innerWidth < 640) return "low";
  if (window.innerWidth < 1024) return "medium";
  return "high";
}

export default function TechUniverse() {
  const sceneHostRef = useRef(null);
  // Client snapshot detects WebGL once (cached); server snapshot = unsupported
  const supportsWebGL = useSyncExternalStore(subscribeNoop, detectWebGLSupport, () => false);
  const [inView, setInView] = useState(false);
  const [quality, setQuality] = useState(computeQuality);
  const reducedMotion = useReducedMotion() === true;

  // Adjust the scene quality when crossing device breakpoints
  useEffect(() => {
    const onResize = () => setQuality(computeQuality());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Only mount the 3D scene while the section is near the viewport
  useEffect(() => {
    const host = sceneHostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const useFallback = reducedMotion || supportsWebGL === false;
  const showScene = !useFallback && supportsWebGL === true && inView;

  return (
    <section
      id="tech-universe"
      className="relative overflow-hidden bg-white py-12 transition-colors duration-300 dark:bg-[#0b1120] sm:py-16 lg:py-20"
    >
      {/* Ambient Purple / Blue / Pink Glows */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-600/15" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-600/15" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px] dark:bg-pink-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal y={16} className="mx-auto mb-8 max-w-3xl space-y-3 text-center sm:mb-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-purple-600 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>My Digital Universe</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Explore My{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Technology Galaxy
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            A universe of tools and technologies powering my creative
            development journey.
          </p>
        </Reveal>

        {/* 3D Scene / Fallback */}
        <Reveal y={24}>
          {/* Persistent observer host — the scene mounts when this is in view */}
          <div ref={sceneHostRef} className="w-full">
            {/* Circular stage: strict 1:1 frame, perfectly round clip + neon rim.
                Equal width & height keeps the sphere circular on every device. */}
            {showScene ? (
              <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[540px]">
                {/* Soft neon aura outside the circular boundary */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-600/25 via-blue-600/20 to-pink-600/25 blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute -inset-px rounded-full border border-purple-500/20 dark:border-purple-400/15"
                />

                <div className="relative aspect-square w-full overflow-hidden rounded-full border border-slate-200/60 bg-gradient-to-b from-[#0b1120] via-[#101a33] to-[#0b1120] shadow-[0_30px_80px_-30px_rgba(76,29,149,0.5)] dark:border-white/10">
                  <Suspense fallback={null}>
                    <TechScene quality={quality} />
                  </Suspense>
                </div>
              </div>
            ) : useFallback ? (
              <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-[#0b1120] via-[#101a33] to-[#0b1120] p-6 shadow-[0_30px_80px_-30px_rgba(76,29,149,0.45)] sm:p-8 lg:p-10 dark:border-white/10">
                <TechGridFallback />
              </div>
            ) : null}
          </div>

          {/* Interaction hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500 sm:text-sm dark:text-slate-500">
            <MousePointerClick className="h-4 w-4 shrink-0 text-purple-500/70 dark:text-purple-400/70" />
            <span>
              The sphere spins on its own — move your cursor over it to boost
              the rotation, hover any glass orb to meet the technology
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
