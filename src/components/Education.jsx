"use client";

import { GraduationCap, Award, Calendar, CheckCircle2, BookOpen } from "lucide-react";
import { educationData, certificationsData } from "@/data/portfolioData";

export default function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-24 lg:py-28"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px] dark:bg-blue-600/10" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Academic & Professional Track</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Education &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Qualifications
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Formal technical foundation in Computer Science and Engineering combined with certified professional skill training.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Column 1: Academic Education */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Academic Education
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Degree & Institutional Studies
                </p>
              </div>
            </div>

            <div className="relative space-y-6 pl-7 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-slate-300 sm:pl-8 sm:before:left-[15px] dark:before:to-slate-800">
              {educationData.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[28px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm ring-4 ring-blue-500/10 transition-transform duration-300 group-hover:scale-125 dark:border-slate-950 dark:bg-blue-500">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Card Content */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/5 sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-blue-500/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${item.badgeColor}`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {item.status}
                      </span>

                      <span className="flex items-center gap-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.period}
                      </span>
                    </div>

                    <h4 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {item.degree}
                    </h4>

                    <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.institution}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Professional Training & Certifications */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Training & Certifications
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  National Skill Standards & Certificates
                </p>
              </div>
            </div>

            <div className="relative space-y-6 pl-7 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:via-indigo-500 before:to-slate-300 sm:pl-8 sm:before:left-[15px] dark:before:to-slate-800">
              {certificationsData.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[28px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-600 text-white shadow-sm ring-4 ring-purple-500/10 transition-transform duration-300 group-hover:scale-125 dark:border-slate-950 dark:bg-purple-500">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Card Content */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/5 sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-purple-500/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${item.badgeColor}`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {item.level}
                      </span>

                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
