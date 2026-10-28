"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ArrowRight,
  Mail,
  Heart,
  Code2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const githubUrl = personalInfo.socials?.github;
  const linkedinUrl = personalInfo.socials?.linkedin;
  const email = personalInfo.email;

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialButtonClass =
    "group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400";

  const linkClass =
    "group flex w-fit items-center gap-2 text-sm text-slate-600 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-blue-400";

  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200/80 bg-slate-50/80 text-slate-600 transition-colors duration-300 dark:border-slate-800/80 dark:bg-[#030712] dark:text-slate-400">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-36 left-[12%] h-72 w-72 rounded-full bg-blue-500/[0.07] blur-[100px]" />
        <div className="absolute -top-32 right-[8%] h-72 w-72 rounded-full bg-purple-500/[0.07] blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:py-16 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.35fr_0.7fr_1fr] lg:gap-16 lg:py-20">
          {/* Brand section */}
          <div className="space-y-6">
            <Link
              href="/"
              aria-label={`${personalInfo.name || "Developer"} home`}
              className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
                <Code2 className="h-6 w-6" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0"
                />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {personalInfo.name || "Developer"}
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              {personalInfo.shortBio ||
                "Building modern, responsive, and user-friendly web experiences with modern technologies."}
            </p>

            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50 motion-reduce:animate-none"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="break-words">
                {personalInfo.status || "Available for opportunities"}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Navigation
              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Quick Links
              </h3>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-4"
            >
              {quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={linkClass}
                >
                  <span>{item.label}</span>

                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact and social links */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Get in touch
              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Let&apos;s Connect
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Have an idea or an opportunity? Let&apos;s connect and build
              something meaningful together.
            </p>

            {email && (
              <a
                href={`mailto:${email}`}
                className="group inline-flex max-w-full items-start gap-3 rounded-lg text-sm transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:group-hover:bg-blue-500/10">
                  <Mail className="h-4 w-4" />
                </span>

                <span className="break-all pt-2">{email}</span>
              </a>
            )}

            <div className="flex items-center gap-3 pt-1">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  title="GitHub"
                  className={socialButtonClass}
                >
                  <Code2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  title="LinkedIn"
                  className={socialButtonClass}
                >
                  <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright and bottom bar */}
        <div className="border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col items-center justify-between gap-5 py-6 sm:flex-row sm:gap-4">
            <p className="text-center text-xs leading-6 text-slate-500 dark:text-slate-500 sm:text-left">
              © {currentYear}{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {personalInfo.name || "Developer"}
              </span>
              . All rights reserved.
            </p>

            <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
              Crafted with
              <Heart
                aria-label="love"
                className="h-3.5 w-3.5 fill-rose-500 text-rose-500"
              />
              and
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Next.js
              </span>
              <Sparkles className="ml-1 h-3.5 w-3.5 text-blue-500" />
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:text-blue-400"
            >
              Back to Top

              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}