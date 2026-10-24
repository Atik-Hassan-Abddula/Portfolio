
"use client";

import { FolderGit2, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData, personalInfo } from "@/data/portfolioData";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-600/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Featured Portfolio Work</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Selected{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Projects
            </span>
          </h2>

          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            A showcase of web applications emphasizing real-world performance,
            design aesthetics, and modern React architectures.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub Repository Callout */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Looking for more experiments, component tests, and code samples?
          </p>

          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:scale-105 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <span>Explore all repositories on GitHub</span>
            <ArrowUpRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
