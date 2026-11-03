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
import { personalInfo, educationData, certificationsData, projectsData } from "@/data/portfolioData";

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

    // Header Banner
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
    doc.text(String(personalInfo.role || "Full Stack Developer"), margin, 30);

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
      "Frontend: HTML5, CSS3, JavaScript ES6+, TypeScript",
      "Frameworks & Runtime: React, Next.js (App Router, RSC), Node.js, Express.js",
      "Styling & UI: Tailwind CSS, DaisyUI, Hero UI, shadcn/ui",
      "Tools & Version Control: Git, GitHub, Visual Studio Code, npm",
    ].forEach((skill) => {
      addText(`- ${skill}`, { indent: 2 });
    });

    // Projects
    addSectionTitle("FEATURED PROJECTS");

    projectsData.forEach((project, idx) => {
      addText(
        `${idx + 1}. ${project.title} (${project.technologies.join(", ")})`,
        { bold: true, color: [31, 41, 55] }
      );
      addText(project.description, { indent: 3 });
      if (project.liveUrl) {
        addText(`Live Demo: ${project.liveUrl}`, { indent: 3, fontSize: 9, color: [37, 99, 235] });
      }
    });

    // Education
    addSectionTitle("EDUCATION");

    educationData.forEach((edu) => {
      addText(`${edu.degree} — ${edu.institution}`, {
        bold: true,
        color: [31, 41, 55],
      });
      addText(`Status: ${edu.status} | Period: ${edu.period}`, { indent: 3 });
      addText(edu.description, { indent: 3 });
    });

    // Professional Training & Certifications
    addSectionTitle("PROFESSIONAL TRAINING & CERTIFICATIONS");

    certificationsData.forEach((cert) => {
      addText(cert.title, {
        bold: true,
        color: [31, 41, 55],
      });
      addText(`Level: ${cert.level}`, { indent: 3 });
      addText(cert.description, { indent: 3 });
    });

    // Page numbers
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
