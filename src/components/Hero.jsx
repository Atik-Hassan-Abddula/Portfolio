"use client";

import Image from "next/image";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Terminal,
  FileText,
  MapPin,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Hero({ onOpenResume }) {
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
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden scroll-mt-20 bg-slate-50 px-0 pb-12 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:pb-14 sm:pt-28 lg:min-h-screen lg:pb-20 lg:pt-32"
    >
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-600/20" />
        <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-purple-500/15 blur-[120px] dark:bg-purple-600/20" />
        <div className="absolute -bottom-24 left-1/2 h-72 w-[650px] max-w-full -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px] dark:bg-indigo-600/15" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Introduction & CTAs */}
          <div className="space-y-6 text-center sm:space-y-7 lg:col-span-7 lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 text-xs text-slate-700 shadow-sm backdrop-blur-md sm:text-sm dark:border-slate-800/90 dark:bg-slate-900/90 dark:text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span className="font-medium tracking-tight">
                {personalInfo.status}
              </span>
            </div>

            {/* Greeting & Headline */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 font-mono text-sm font-semibold tracking-wide text-blue-600 sm:text-base lg:justify-start dark:text-blue-400">
                <Terminal className="h-4 w-4" />
                <span>Hello, I&apos;m {personalInfo.name}</span>
              </div>

              <h1 className="text-[1.75rem] font-black leading-[1.15] tracking-tight text-slate-900 min-[400px]:text-4xl sm:text-5xl lg:text-6xl dark:text-white">
                Engineering{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Modern Web
                </span>{" "}
                Experiences.
              </h1>
            </div>

            {/* Bio */}
            <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
              {personalInfo.shortBio}
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap lg:justify-start">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:shadow-blue-500/35 active:translate-y-0 sm:w-auto"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 active:translate-y-0 sm:w-auto dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Get In Touch</span>
              </button>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/90 px-5 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200 active:translate-y-0 sm:w-auto dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/80"
                >
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Resume</span>
                </button>
              )}
            </div>

            {/* Socials & Tech Pill */}
            <div className="flex flex-col items-center justify-center gap-4 pt-3 text-xs text-slate-500 sm:flex-row sm:gap-5 lg:justify-start dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                {personalInfo.socials.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2 font-mono text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-100 hover:text-black dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/90 dark:hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {personalInfo.socials.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2 font-mono text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-400 hover:bg-slate-100 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/90 dark:hover:text-white"
                  >
                    <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              <div className="hidden h-5 w-px bg-slate-300 sm:block dark:bg-slate-800" />

              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span className="text-center">Next.js • React • Node.js • Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Profile Card */}
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="group relative w-full max-w-sm sm:max-w-md">
              {/* Outer Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-20 blur-xl transition duration-700 group-hover:opacity-40 dark:opacity-30" />

              {/* Window Card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:p-7 dark:border-slate-800/90 dark:bg-[#0b1120]/95">
                {/* Window Top Bar */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/80 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
                    <Terminal className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span>developer.config.ts</span>
                  </div>
                </div>

                {/* Profile Image & Floating Badges */}
                <div className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1.5 shadow-xl shadow-indigo-500/20">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-950">
                      {personalInfo.profileImage ? (
                        <Image
                          src={personalInfo.profileImage}
                          alt={personalInfo.name || "Profile Photo"}
                          width={240}
                          height={240}
                          priority
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                          <span className="font-mono text-sm font-bold text-slate-800 dark:text-white">
                            {personalInfo.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* React 19 Floating Badge */}
                  <div className="absolute -right-1 -top-1 flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-700 shadow-lg backdrop-blur-md sm:-right-3 dark:border-cyan-400/30 dark:bg-slate-900/95 dark:text-cyan-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
                    React 19
                  </div>

                  {/* Next.js 16 Floating Badge */}
                  <div className="absolute -bottom-1 -left-1 flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-purple-700 shadow-lg backdrop-blur-md sm:-left-3 dark:border-purple-400/30 dark:bg-slate-900/95 dark:text-purple-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                    Next.js 16
                  </div>
                </div>

                {/* Developer Metadata List */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 font-mono text-xs dark:border-slate-800/60 dark:bg-slate-950/40">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                      Location
                    </span>
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {personalInfo.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 font-mono text-xs dark:border-slate-800/60 dark:bg-slate-950/40">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Briefcase className="h-3.5 w-3.5 text-purple-500" />
                      Role
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {personalInfo.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 font-mono text-xs dark:border-slate-800/60 dark:bg-slate-950/40">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Focus
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      Responsive Full-Stack
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
