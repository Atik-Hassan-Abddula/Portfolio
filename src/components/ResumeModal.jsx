
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
import jsPDF from "jspdf";
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
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    const bottomMargin = 20;
    let y = 20;

    const addPageIfNeeded = (requiredHeight = 10) => {
      if (y + requiredHeight > pageHeight - bottomMargin) {
        doc.addPage();
        y = 20;
      }
    };

    const addSectionTitle = (title) => {
      addPageIfNeeded(18);
      y += 4;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.text(title, margin, y);

      y += 2;
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, y + 2, pageWidth - margin, y + 2);
      y += 9;
    };

    const addText = (text, options = {}) => {
      const {
        fontSize = 10,
        bold = false,
        color = [55, 65, 81],
        indent = 0,
      } = options;

      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);

      const lines = doc.splitTextToSize(
        String(text || ""),
        contentWidth - indent
      );

      const lineHeight = fontSize * 0.45 + 1.5;

      addPageIfNeeded(lines.length * lineHeight + 2);

      doc.text(lines, margin + indent, y);
      y += lines.length * lineHeight + 3;
    };

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 48, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);

    doc.text(
      doc.splitTextToSize(displayName, contentWidth),
      margin,
      20
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(191, 219, 254);
    doc.text(String(personalInfo.role || "Developer"), margin, 30);

    doc.setFontSize(9);
    doc.setTextColor(226, 232, 240);
    doc.text(
      doc.splitTextToSize(
        String(personalInfo.email || ""),
        contentWidth
      ),
      margin,
      38
    );

    y = 57;

    // Contact information
    addSectionTitle("CONTACT INFORMATION");
    addText(`Location: ${personalInfo.location || ""}`);
    addText(`GitHub: ${personalInfo.socials?.github || ""}`);
    addText(`LinkedIn: ${personalInfo.socials?.linkedin || ""}`);

    // Professional overview
    addSectionTitle("PROFESSIONAL OVERVIEW");
    addText(personalInfo.shortBio || "");

    // Technical expertise
    addSectionTitle("TECHNICAL EXPERTISE");

    [
      "Core: HTML5, CSS3, Modern JavaScript (ES6+)",
      "Frameworks: React, Next.js (App Router, Server Components)",
      "Styling: Tailwind CSS, Responsive Design, Utility-First Systems",
      "Version Control: Git, GitHub, PR Workflows, CI/CD",
    ].forEach((skill) => {
      addText(`- ${skill}`, { indent: 2 });
    });

    // Core competencies
    addSectionTitle("CORE COMPETENCIES & STACK");

    [
      "Next.js (App Router, RSC, SSR)",
      "React 19 & Custom Hooks",
      "Tailwind CSS & Design Systems",
      "Modern JavaScript (ES6+)",
      "Git, GitHub & Branching Strategy",
      "Semantic HTML5, CSS3 & WCAG AA",
    ].forEach((skill) => {
      addText(`- ${skill}`, { indent: 2 });
    });

    // Projects
    addSectionTitle("PROJECTS");

    addText(
      "1. Portfolio Website (Next.js App Router, React, Tailwind CSS)",
      { bold: true, color: [31, 41, 55] }
    );

    addText(
      "Modern, responsive developer portfolio with dark theme, interactive skills filter, dynamic mockups, and client-side validated contact form.",
      { indent: 3 }
    );

    addText(
      "2. Nexus Design & Component System (React, Tailwind CSS)",
      { bold: true, color: [31, 41, 55] }
    );

    addText(
      "Composable UI primitives engineered for accessibility and modular styling.",
      { indent: 3 }
    );

    addText(
      "3. Nova Workspace & Task Matrix (Next.js, React)",
      { bold: true, color: [31, 41, 55] }
    );

    addText(
      "Distraction-free Kanban task pipeline with local storage state management.",
      { indent: 3 }
    );

    // Education
    addSectionTitle("EDUCATION");

    addText("Diploma in Computer Science & Engineering (CSE)", {
      bold: true,
      color: [31, 41, 55],
    });

    addText("Status: Currently Studying");

    addText("Secondary School Certificate (SSC)", {
      bold: true,
      color: [31, 41, 55],
    });

    addText("Result: Passed");

    // Professional training
    addSectionTitle("PROFESSIONAL TRAINING & CERTIFICATIONS");

    addText("Computer Operation — Level 3", {
      bold: true,
      color: [31, 41, 55],
    });

    addText("Digital Marketing — Level 3", {
      bold: true,
      color: [31, 41, 55],
    });

    // Footer on every page
    const pageCount = doc.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);

      doc.setDrawColor(226, 232, 240);
      doc.line(
        margin,
        pageHeight - 14,
        pageWidth - margin,
        pageHeight - 14
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);

      doc.text(`${displayName} | Resume`, margin, pageHeight - 8);

      doc.text(
        `Page ${page} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 8,
        { align: "right" }
      );
    }

    const fileName = `${displayName.replace(/\s+/g, "_")}_Resume.pdf`;
    doc.save(fileName);
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
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close Resume Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7">
          {/* Professional Overview */}
          <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.08] via-slate-900/70 to-purple-500/[0.04] p-5 sm:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-indigo-500/[0.06] blur-3xl" />

            <div className="relative">
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
            </div>
          </section>

          {/* Core Competencies */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-400">
                <Award className="h-4 w-4" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  Core Competencies & Stack
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Technologies & Development Skills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Next.js (App Router, RSC, SSR)",
                "React 19 & Custom Hooks",
                "Tailwind CSS & Design Systems",
                "Modern JavaScript (ES6+)",
                "Git, GitHub & Branching Strategy",
                "Semantic HTML5, CSS3 & WCAG AA",
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
                  Education & Qualifications
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Academic Background
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-blue-400/15 bg-blue-400/[0.04] p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold leading-6 text-white">
                    Diploma in Computer Science & Engineering (CSE)
                  </span>

                  <span className="w-fit shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                    Currently Studying
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold leading-6 text-white">
                    Secondary School Certificate (SSC)
                  </span>

                  <span className="w-fit shrink-0 rounded-full border border-blue-400/15 bg-blue-400/[0.08] px-3 py-1 text-[10px] font-medium text-blue-300">
                    Passed
                  </span>
                </div>
              </div>
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
                  Professional Training & Certifications
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Skills & Training
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-purple-400/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      Computer Operation
                    </h5>
                    <p className="mt-1 text-xs text-slate-400">
                      Level 3
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-purple-400/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      Digital Marketing
                    </h5>
                    <p className="mt-1 text-xs text-slate-400">
                      Level 3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer Actions */}
        <div className="shrink-0 border-t border-white/[0.08] bg-slate-950/50 px-5 py-5 sm:px-8">
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
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] sm:flex-initial sm:px-5 sm:text-sm"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Download Resume (.pdf)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:text-sm"
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
