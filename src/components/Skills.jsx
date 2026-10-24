"use client";

import { useMemo, useState } from "react";
import {
  Code,
  FileCode,
  Terminal,
  FileCode2,
  Atom,
  Compass,
  Server,
  Cpu,
  Sparkles,
  Palette,
  Layers,
  Layout,
  GitFork,
  Package,
  Wrench,
  ArrowUpRight,
  Database,
  Search,
  X,
} from "lucide-react";

// import GithubIcon from "@/components/Icons";
import { skillsData } from "@/data/portfolioData";
import { GithubIcon } from "@/components/Icons";

const iconMap = {
  HTML: FileCode,
  HTML5: FileCode,
  CSS: Palette,
  CSS3: Palette,
  JavaScript: FileCode2,
  "JavaScript (ES6+)": FileCode2,
  TypeScript: Code,
  React: Atom,
  "React.js": Atom,
  "Next.js": Compass,
  Nextjs: Compass,
  "Node.js": Server,
  Node: Server,
  Express: Server,
  MongoDB: Database,
  Tailwind: Palette,
  "Tailwind CSS": Palette,
  DaisyUI: Layers,
  "DaisyUI": Layers,
  Bootstrap: Layout,
  Git: GitFork,
  GitHub: GithubIcon,
  npm: Package,
  Vite: Terminal,
  VSCode: Code,
  "VS Code": Code,
  Firebase: Database,
  Redux: Layers,
  REST: Server,
  "REST API": Server,
  Figma: Palette,
  Tools: Wrench,
  Other: Sparkles,
};

const filters = [
  "All",
  "Frontend",
  "Core Frameworks & Libraries",
  "Styling & UI",
  "Tools & Version Control",
  "Database & Backend",
];

const colorStyles = [
  "from-violet-500 to-indigo-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-fuchsia-500 to-purple-500",
];

const skillDetails = {
  HTML: {
    description: "Building semantic and accessible web pages.",
    level: "Learning",
    percentage: 85,
  },
  HTML5: {
    description: "Building semantic and accessible web pages.",
    level: "Learning & Building",
    percentage: 85,
  },
  CSS: {
    description: "Creating responsive layouts and modern designs.",
    level: "Learning & Building",
    percentage: 80,
  },
  CSS3: {
    description: "Creating responsive layouts and modern designs.",
    level: "Learning & Building",
    percentage: 80,
  },
  JavaScript: {
    description: "Building interactive and dynamic web experiences.",
    level: "Learning & Building",
    percentage: 75,
  },
  "JavaScript (ES6+)": {
    description: "Building interactive and dynamic web experiences.",
    level: "Learning & Building",
    percentage: 75,
  },
  TypeScript: {
    description: "Writing safer and maintainable JavaScript code.",
    level: "Learning",
    percentage: 60,
  },
  React: {
    description: "Building reusable component-based interfaces.",
    level: "Learning & Building",
    percentage: 75,
  },
  "React.js": {
    description: "Building reusable component-based interfaces.",
    level: "Learning & Building",
    percentage: 75,
  },
  "Next.js": {
    description: "Developing modern full-stack web applications.",
    level: "Learning & Building",
    percentage: 65,
  },
  Nextjs: {
    description: "Developing modern full-stack web applications.",
    level: "Learning & Building",
    percentage: 65,
  },
  "Tailwind CSS": {
    description: "Styling responsive interfaces with utility classes.",
    level: "Learning & Building",
    percentage: 80,
  },
  Tailwind: {
    description: "Styling responsive interfaces with utility classes.",
    level: "Learning & Building",
    percentage: 80,
  },
  MongoDB: {
    description: "Working with document-based database systems.",
    level: "Learning",
    percentage: 60,
  },
  Git: {
    description: "Tracking changes and managing project versions.",
    level: "Learning & Building",
    percentage: 70,
  },
  GitHub: {
    description: "Hosting repositories and sharing projects.",
    level: "Learning & Building",
    percentage: 70,
  },
  "Node.js": {
    description: "Building server-side applications with JavaScript.",
    level: "Learning",
    percentage: 55,
  },
  Express: {
    description: "Creating APIs and backend routes.",
    level: "Learning",
    percentage: 50,
  },
  Firebase: {
    description: "Exploring authentication and cloud services.",
    level: "Learning",
    percentage: 50,
  },
  Redux: {
    description: "Managing shared state in React applications.",
    level: "Learning",
    percentage: 50,
  },
  Figma: {
    description: "Exploring layouts, wireframes, and UI designs.",
    level: "Learning",
    percentage: 50,
  },
};

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const visibleSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesFilter =
        activeFilter === "All" || skill.category === activeFilter;

      const matchesSearch = `${skill.name} ${skill.category}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-slate-50 px-4 py-20 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-violet-400/10 blur-[100px]" />
        <div className="absolute right-[-100px] top-1/2 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-400/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm dark:border-violet-400/20 dark:bg-white/5 dark:text-violet-300">
            <Sparkles size={16} />
            My Technical Arsenal
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Skills &{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            The technologies I use and explore to build modern, responsive, and
            user-friendly web experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-3xl font-black text-violet-600 dark:text-violet-400">
              {skillsData.length}+
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Technologies
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400">
              {new Set(skillsData.map((skill) => skill.category)).size}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Skill Categories
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-3xl font-black text-fuchsia-600 dark:text-fuchsia-400">
              Growing
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Always Learning
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-xl">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-slate-900">
            <Search
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search technologies..."
              aria-label="Search technologies"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition duration-300 sm:text-sm ${
                  isActive
                    ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "border-slate-200 bg-white/80 text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Skill cards */}
        {visibleSkills.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleSkills.map((skill, index) => {
              const Icon = iconMap[skill.name] || Code;
              const accent = colorStyles[index % colorStyles.length];

              const details = skillDetails[skill.name] || {
                description: `Using ${skill.name} in web development projects.`,
                level: "Learning",
                percentage: 50,
              };

              return (
                <article
                  key={`${skill.name}-${skill.category}`}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-violet-400/40 sm:p-6"
                >
                  {/* Hover accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent} opacity-70 transition-opacity group-hover:opacity-100`}
                  />

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg transition duration-300 group-hover:rotate-3 group-hover:scale-110`}
                    >
                      <Icon size={23} />
                    </div>

                    <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="break-words text-base font-bold text-slate-900 dark:text-white">
                        {skill.name}
                      </h3>

                      <ArrowUpRight
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-500"
                      />
                    </div>

                    <p className="mt-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                      {skill.category}
                    </p>

                    <p className="mt-3 min-h-[60px] text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {details.description}
                    </p>
                  </div>

                  {/* Skill level */}
                  <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        {details.level}
                      </span>

                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                        {details.percentage}%
                      </span>
                    </div>

                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                      role="progressbar"
                      aria-label={`${skill.name} self-assessed skill level`}
                      aria-valuenow={details.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${accent} transition-all duration-700`}
                        style={{ width: `${details.percentage}%` }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 px-5 py-16 text-center dark:border-white/15">
            <Search
              size={32}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No skills found
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          <Cpu size={16} className="shrink-0 text-violet-500" />
          <p>Always learning, building, and improving.</p>
        </div>
      </div>
    </section>
  );
}
