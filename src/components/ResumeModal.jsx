"use client";

import { useEffect } from "react";
import { X, Download, FileText, CheckCircle2, GraduationCap, Briefcase, Award } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

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

  const displayName = personalInfo.name || "Developer";

  const handleDownload = () => {
    // Generate clean text-based CV download file
    const resumeContent = `
======================================================
${displayName.toUpperCase()} - RESUME PREVIEW
${personalInfo.role}
Email: ${personalInfo.email}
Location: ${personalInfo.location}
GitHub: ${personalInfo.socials.github}
LinkedIn: ${personalInfo.socials.linkedin}
======================================================

EXECUTIVE SUMMARY:
${personalInfo.shortBio}

TECHNICAL EXPERTISE:
- Core: HTML5, CSS3, Modern JavaScript (ES6+)
- Frameworks: React, Next.js (App Router, Server Components)
- Styling: Tailwind CSS, Responsive Design, Utility-First Systems
- Version Control: Git, GitHub, PR Workflows, CI/CD

VERIFIED PROJECTS:
1. Portfolio Website (Next.js App Router, React, Tailwind CSS)
   - Modern, responsive developer portfolio with dark theme, interactive skills filter, dynamic mockups, and client-side validated contact form.
2. Nexus Design & Component System (React, Tailwind CSS)
   - Composable UI primitives engineered for accessibility and modular styling.
3. Nova Workspace & Task Matrix (Next.js, React)
   - Distraction-free Kanban task pipeline with local storage state management.

EDUCATION & PROFESSIONAL GROWTH:
- Computer Science / Web Development Studies
- Modern Web Architecture & Full Stack Engineering
======================================================
Generated from ${displayName}'s Portfolio
    `.trim();

    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${displayName.replace(/\s+/g, "_")}_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div data-lenis-prevent className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b1120] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-title" className="text-xl font-bold text-white">
                {displayName} — Curriculum Vitae
              </h3>
              <p className="text-xs font-mono text-blue-400">
                {personalInfo.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Resume Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Resume Sections */}
        <div className="space-y-6 text-sm text-slate-300">
          
          {/* Summary */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              Professional Overview
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {personalInfo.shortBio}
            </p>
          </div>

          {/* Core Competencies */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              Core Competencies & Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Next.js (App Router, RSC, SSR)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>React 19 & Custom Hooks</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tailwind CSS & Design Systems</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modern JavaScript (ES6+)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Git, GitHub & Branching Strategy</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Semantic HTML5, CSS3 & WCAG AA</span>
              </div>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Education & Continuous Professional Growth
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Computer Science & Software Development</span>
                <span className="text-xs font-mono text-slate-400">Technical Studies</span>
              </div>
              <p className="text-xs text-slate-400">
                Foundational study in Web Architectures, Algorithms, Component Engineering, and Frontend/Full Stack Design.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-mono">
            Contact: {personalInfo.email}
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-md shadow-blue-900/30 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (.txt)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
