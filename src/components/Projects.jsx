"use client";

import { useState, useCallback } from "react";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projectsData, personalInfo } from "@/data/portfolioData";
import { GithubIcon } from "@/components/Icons";
import { Reveal } from "@/components/motion/Reveal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpenCaseStudy = useCallback((project) => {
    const idx = projectsData.findIndex((p) => p.id === project.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden bg-white py-12 text-slate-900 transition-colors duration-300 dark:bg-[#0b1120] dark:text-white sm:py-16 lg:py-20"
    >
      {/* Ambient Purple / Blue / Pink Glows */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-600/15" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-600/15" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px] dark:bg-pink-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal y={16} className="mx-auto mb-8 max-w-3xl space-y-3 text-center sm:mb-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-purple-600 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-400">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Featured Portfolio Work</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Selected{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Projects
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            A showcase of web applications engineered with Next.js App Router, React, Tailwind CSS, and full-stack backend integrations.
          </p>
        </Reveal>

        {/* Horizontal Showcase: alternating large cards */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
          {projectsData.map((project, index) => (
            <Reveal key={project.id} y={36} className="min-w-0">
              <ProjectCard
                project={project}
                index={index}
                onViewCaseStudy={handleOpenCaseStudy}
              />
            </Reveal>
          ))}
        </div>

        {/* GitHub Repository Callout */}
        <Reveal className="mt-10 text-center sm:mt-12">
          <div className="inline-flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300 sm:flex-row sm:p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20">
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
        </Reveal>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        index={selectedIndex}
        onClose={handleCloseModal}
      />
    </section>
  );
}
