"use client";

import { useEffect } from "react";
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { personalInfo, educationData, certificationsData } from "@/data/portfolioData";

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayName = personalInfo.name || "Atik Hassan";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Atik-Hasan-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-xl animate-in fade-in duration-200 sm:p-5"
    >
      {/* Click outside backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        data-lenis-prevent
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120] shadow-[0_25px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        {/* Decorative Top Accent */}
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Modal Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-[#0b1120] to-indigo-950/20 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-950/20">
              <FileText className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">
                Professional Profile
              </p>

              <h3
                id="resume-title"
                className="break-words text-lg font-bold tracking-tight text-white sm:text-2xl"
              >
                {displayName}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                {personalInfo.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close Resume Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7">
          {/* Professional Overview */}
          <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.08] via-slate-900/70 to-purple-500/[0.04] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-400">
                <Briefcase className="h-4 w-4" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  Professional Overview
                </h4>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  About Me
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {personalInfo.shortBio}
            </p>
          </section>

          {/* Core Competencies */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-400">
                <Award className="h-4 w-4" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  Core Competencies &amp; Stack
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Organized by Core Categories
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Next.js (App Router, RSC, SSR)",
                "React 19 & Custom Hooks",
                "Node.js & Express.js REST APIs",
                "Tailwind CSS, DaisyUI, Hero UI & shadcn/ui",
                "JavaScript (ES6+) & TypeScript",
                "Git, GitHub & Version Control Flow",
              ].map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-all duration-200 hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:scale-110" />

                  <span className="text-xs font-medium leading-5 text-slate-300 transition-colors group-hover:text-white sm:text-[13px]">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
                <GraduationCap className="h-4 w-4" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  Education &amp; Qualifications
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Academic Background
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-semibold leading-6 text-white">
                      {edu.degree}
                    </span>

                    <span className={`w-fit shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium ${edu.badgeColor}`}>
                      {edu.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Training */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-400">
                <Award className="h-4 w-4" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  Professional Training &amp; Certifications
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  National Skill Standards
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-purple-400/20"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <div>
                      <h5 className="text-sm font-semibold text-white">
                        {cert.title}
                      </h5>
                      <p className="mt-1 text-xs text-slate-400">
                        {cert.level}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer Actions */}
        <div className="shrink-0 border-t border-white/[0.08] bg-slate-950/60 px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Get in touch
              </p>

              <p className="mt-1 break-all text-xs text-slate-300 sm:text-sm">
                {personalInfo.email}
              </p>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 active:translate-y-0 sm:flex-initial sm:px-5 sm:text-sm"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Download Resume (.pdf)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
