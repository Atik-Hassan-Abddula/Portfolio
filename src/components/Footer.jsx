"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Mail,
  Heart,
  Code2,
  ExternalLink,
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

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-600 transition-colors duration-300 dark:border-slate-800 dark:bg-[#030712] dark:text-slate-400">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                <Code2 className="h-5 w-5" />
              </span>

              <span>
                {personalInfo.name || "Developer"}
                <span className="text-blue-600 dark:text-blue-400">
                  .
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              {personalInfo.shortBio ||
                "Building modern, responsive, and user-friendly web experiences with modern technologies."}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {personalInfo.status || "Available for opportunities"}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col gap-3"
            >
              {quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact and social links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Let&apos;s Connect
            </h3>

            <p className="text-sm leading-6">
              Have an idea or an opportunity? Feel free to get in touch.
            </p>

            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex max-w-full items-center gap-2 break-all text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {email}
              </a>
            )}

            <div className="flex items-center gap-3 pt-1">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-all hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-blue-400"
                >
                  <Code2 className="h-5 w-5" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-all hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-blue-400"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 dark:border-slate-800 sm:flex-row">
          <p className="text-center text-xs leading-6 sm:text-left">
            © {currentYear}{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {personalInfo.name || "Developer"}
            </span>
            . All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs">
            Built with
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            and
            <span className="font-semibold">Next.js</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Back to Top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}