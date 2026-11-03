"use client";

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
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const currentYear = 2026;

  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -70 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      window.history.pushState(null, "", href);
    }
  };

  const githubUrl = personalInfo.socials?.github;
  const linkedinUrl = personalInfo.socials?.linkedin;
  const email = personalInfo.email;

  const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const socialButtonClass =
    "group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white";

  const linkClass =
    "group flex w-fit items-center gap-2 text-sm text-slate-600 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-blue-400";

  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200/80 bg-slate-50/80 text-slate-600 transition-colors duration-300 dark:border-slate-800/80 dark:bg-[#030712] dark:text-slate-400">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-36 left-[15%] h-72 w-72 rounded-full bg-blue-500/[0.08] blur-[110px]" />
        <div className="absolute -top-32 right-[10%] h-72 w-72 rounded-full bg-purple-500/[0.08] blur-[110px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:py-16 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.35fr_0.75fr_1fr] lg:gap-16 lg:py-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              href="/"
              aria-label={`${personalInfo.name || "Developer"} home`}
              className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-600/25 transition-transform duration-300 group-hover:scale-105">
                <Code2 className="h-5 w-5" />
              </span>

              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {personalInfo.name || "Atik Hassan"}
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {personalInfo.shortBio}
            </p>

            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="break-words">
                {personalInfo.status || "Available for opportunities"}
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Navigation
              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Quick Links
              </h3>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-3"
            >
              {quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
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

          {/* Connect Column */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Get in Touch
              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Let&apos;s Connect
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Ready to create high-performing, modern web applications. Reach out anytime.
            </p>

            {email && (
              <a
                href={`mailto:${email}`}
                className="group inline-flex max-w-full items-center gap-3 rounded-xl text-sm transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-colors group-hover:border-blue-400 group-hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-slate-700 dark:group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>

                <span className="break-all font-mono text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                  {email}
                </span>
              </a>
            )}

            <div className="flex items-center gap-2.5 pt-1">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  title="GitHub"
                  className={socialButtonClass}
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  title="LinkedIn"
                  className={socialButtonClass}
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="border-t border-slate-200/80 py-6 dark:border-slate-800/80">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center font-mono text-xs text-slate-500 dark:text-slate-400 sm:text-left">
              © {currentYear}{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {personalInfo.name || "Atik Hassan"}
              </span>
              . All rights reserved.
            </p>

            <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              Built with Next.js App Router, React 19 &amp; Tailwind CSS
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
