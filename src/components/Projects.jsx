"use client";

import { FolderGit2, ArrowUpRight, Sparkles } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData, personalInfo } from "@/data/portfolioData";
import { GithubIcon } from "@/components/Icons";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-24 lg:py-28"
    >
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-600/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Featured Portfolio Work</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Selected{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Projects
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            A showcase of web applications engineered with Next.js App Router, React, Tailwind CSS, and full-stack backend integrations.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub Repository Callout */}
        <div className="mt-16 text-center sm:mt-20">
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm backdrop-blur-sm sm:flex-row sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <GithubIcon className="h-6 w-6" />
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Interested in exploring more source code?
              </h4>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Check out more experimental repositories, component explorations, and daily commits on GitHub.
              </p>
            </div>

            {personalInfo.socials.github && (
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 active:scale-[0.98] sm:ml-auto sm:text-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span>Visit GitHub Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
