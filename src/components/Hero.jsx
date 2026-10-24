
"use client";

import Image from "next/image";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Terminal,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);

    if (el) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }

      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden scroll-mt-20 bg-slate-50 px-0 pb-16 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white"
    >
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/15" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/15" />
        <div className="absolute -bottom-20 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/10" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6 text-center sm:space-y-8 lg:col-span-7 lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs text-slate-600 shadow-sm backdrop-blur-sm sm:text-sm dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span className="font-medium">
                {personalInfo.status}
              </span>
            </div>

            {/* Greeting & Heading */}
            <div className="space-y-3">
              <p className="font-mono text-base tracking-wide text-blue-600 sm:text-lg dark:text-blue-400">
                Hello World! I&apos;m{" "}
                {personalInfo.name || "a Full Stack Developer"}
              </p>

              <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                I Build{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Modern Web
                </span>{" "}
                Experiences.
              </h1>
            </div>

            {/* Introduction */}
            <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
              {personalInfo.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:shadow-blue-500/30 active:translate-y-0 sm:w-auto"
              >
                <span>View My Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 active:translate-y-0 sm:w-auto dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 text-sm text-slate-500 sm:flex-row sm:gap-6 lg:justify-start dark:text-slate-400">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span className="font-mono text-xs">GitHub</span>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80"
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </a>
              </div>

              <div className="hidden h-5 w-px bg-slate-300 sm:block dark:bg-slate-800" />

              <span className="flex items-center gap-1.5 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Next.js • React • Tailwind CSS
              </span>
            </div>
          </div>

          {/* Right Column: Profile Card */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="group relative w-full max-w-md">
              {/* Outer Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-25 blur-lg transition duration-1000 group-hover:opacity-50 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 dark:opacity-40" />

              {/* Profile Card */}
              <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-7 dark:border-slate-800/90 dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-[#0b1120]">
                {/* Window Header */}
                <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                    <Terminal className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span>developer.config.js</span>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="relative mx-auto mb-6 h-44 w-44 sm:h-52 sm:w-52">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-lg shadow-indigo-500/20">
                    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-950">
                      {personalInfo.profileImage ? (
                        <Image
                          src={personalInfo.profileImage}
                          alt={personalInfo.name || "Profile Photo"}
                          width={208}
                          height={208}
                          priority
                          className="h-full w-full rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                          <div className="relative z-10 mb-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-inner dark:from-blue-500/20 dark:to-purple-500/20">
                            <Code2 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                          </div>

                          <span className="relative z-10 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {personalInfo.name || "Developer"}
                          </span>

                          <span className="relative z-10 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                            {personalInfo.role}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* React Badge */}
                  <div className="absolute -right-2 -top-2 flex items-center gap-1 rounded-full border border-cyan-500/40 bg-white/95 px-2.5 py-1 font-mono text-[11px] text-cyan-700 shadow-lg dark:bg-slate-900/95 dark:text-cyan-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
                    React 19
                  </div>

                  {/* Next.js Badge */}
                  <div className="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-full border border-slate-300 bg-white/95 px-2.5 py-1 font-mono text-[11px] text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                    Next.js 16
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Location:
                    </span>
                    <span className="text-right font-medium text-slate-800 dark:text-slate-200">
                      {personalInfo.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Role:
                    </span>
                    <span className="text-right font-medium text-blue-600 dark:text-blue-400">
                      {personalInfo.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Engineering:
                    </span>
                    <span className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                      Accessible &amp; Scalable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
