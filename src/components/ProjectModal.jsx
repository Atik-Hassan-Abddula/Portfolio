"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Lock,
  Globe,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 28, stiffness: 280 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * ProjectModal — elegant case study overlay.
 *
 * Props:
 *   project   — the selected project object (null when closed)
 *   onClose   — callback to close the modal
 *   index     — the project index for numbering
 */
export default function ProjectModal({ project, onClose, index = 0 }) {
  const isOpen = Boolean(project);

  /* Escape key handler */
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  /* Lock body scroll & attach escape listener */
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // Also pause Lenis if available
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen, handleKey]);

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-2xl dark:border-slate-700/40 dark:bg-[#0d1730]"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 backdrop-blur-sm transition-colors hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto overscroll-contain">
              {/* Hero screenshot with browser mockup */}
              <div className="relative border-b border-slate-200/70 dark:border-slate-700/50">
                {/* Browser frame */}
                <div className="flex items-center gap-2 bg-slate-50/90 px-4 py-2.5 dark:bg-[#1a2332]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 dark:bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 dark:bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80 dark:bg-green-500/60" />
                  </div>
                  <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-slate-100/80 px-2.5 py-1 dark:bg-slate-800/60">
                    <Lock className="h-3 w-3 shrink-0 text-green-500/70 dark:text-green-400/60" />
                    <span className="truncate font-mono text-[10px] text-slate-400 dark:text-slate-500">
                      {project.liveUrl
                        ? project.liveUrl
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")
                        : "localhost:3000"}
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} full preview`}
                    fill
                    sizes="(min-width: 768px) 80vw, 95vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Details body */}
              <div className="space-y-6 p-5 sm:p-7 lg:p-9">
                {/* Header row */}
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Case Study / {projectNumber}
                  </span>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-1 font-mono text-sm font-medium text-purple-600 dark:text-purple-400">
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                    <Globe className="h-4 w-4 text-purple-500" />
                    Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      Key Features
                    </h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-500 dark:text-purple-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-purple-500/20 bg-purple-500/8 px-3 py-1.5 font-mono text-[11px] font-medium text-purple-600 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 border-t border-slate-200/70 pt-5 dark:border-slate-700/50">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 active:translate-y-0 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-slate-500"
                    >
                      <GithubIcon className="h-4 w-4" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
