"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

// Theme store: read once from localStorage, sync across tabs and same-tab
// toggles via custom event — no effect-setState, no hydration mismatch.
const THEME_EVENT = "portfolio-theme-change";

function subscribeTheme(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot() {
  return localStorage.getItem("portfolio-theme") === "light"
    ? "light"
    : "dark";
}

const getServerThemeSnapshot = () => "dark";

const navLinks = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const reducedMotion = useReducedMotion() === true;

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  // Sync the <html> dark class with the resolved theme (DOM = external system)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // Storage unavailable (private mode) — classList still toggles
    }
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  // Scroll listener: pill density + active-section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];

      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll while the mobile menu is open (+ Escape to close)
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-5">
      {/* Ambient glow behind the pill (decorative) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-20 w-[min(46rem,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/[0.16] via-indigo-500/[0.14] to-violet-600/[0.16] blur-2xl"
      />

      <div
        className={`pointer-events-auto relative mt-3 flex h-14 w-[min(68rem,100%)] items-center justify-between gap-2 rounded-full border px-2.5 pl-3 backdrop-blur-xl transition-all duration-300 sm:px-4 sm:pl-4 ${
          scrolled
            ? "border-slate-200/70 bg-white/75 shadow-[0_16px_44px_-18px_rgba(15,23,42,0.45)] dark:border-white/[0.09] dark:bg-[#0b1120]/80 dark:shadow-[0_18px_48px_-18px_rgba(2,6,23,0.85)]"
            : "border-slate-200/60 bg-white/60 shadow-[0_10px_32px_-18px_rgba(15,23,42,0.3)] dark:border-white/[0.07] dark:bg-[#0b1120]/60 dark:shadow-[0_12px_36px_-18px_rgba(2,6,23,0.6)]"
        }`}
      >
        {/* ===== Brand ===== */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          aria-label="ATIK HASSAN — home"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:gap-3"
        >
          {/* Geometric AH monogram */}
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
            {/* Glow ring — intensifies on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/40 to-violet-500/40 opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-600 text-[13px] font-black tracking-tighter text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_14px_-4px_rgba(99,102,241,0.6)] transition-shadow duration-300 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_22px_-4px_rgba(124,58,237,0.65)]">
              {/* Delicate corner cut for the geometric feel */}
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 h-1.5 w-1.5 rotate-45 border-r border-t border-white/50"
              />
              AH
            </span>
          </span>

          <span className="hidden flex-col justify-center leading-none min-[420px]:flex">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text font-mono text-[13px] font-black tracking-[0.08em] text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400">
              {(personalInfo.name || "Atik Hassan").toUpperCase()}
            </span>
            <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-500">
              Beyond the Code
            </span>
          </span>
        </a>

        {/* ===== Desktop Navigation ===== */}
        <nav
          className="hidden items-center gap-0.5 md:flex lg:gap-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative z-0 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-200 lg:px-3.5 lg:text-[12.5px] ${
                  isActive
                    ? "text-white dark:text-white"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-violet-600/90 shadow-[0_6px_18px_-6px_rgba(99,102,241,0.55)]"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ===== Right Controls ===== */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Resume — icon on tight screens, text from lg */}
          <button
            type="button"
            onClick={onOpenResume}
            aria-label="View resume"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-600 backdrop-blur transition-all duration-200 hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300"
          >
            <FileText className="h-4 w-4" />
          </button>

          {/* Theme toggle — animated icon swap */}
          <button
            type="button"
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-600 backdrop-blur transition-all duration-300 hover:rotate-12 hover:border-amber-300/60 hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 dark:hover:rotate-12"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px] transition-transform duration-300" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-indigo-500 transition-transform duration-300 dark:text-indigo-300" />
            )}
          </button>

          {/* Premium Contact CTA — gradient border, glow on hover (desktop) */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="group relative hidden shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 md:inline-flex"
            style={{
              background:
                "linear-gradient(120deg, rgba(96,165,250,0.9), rgba(129,140,248,0.9) 35%, rgba(167,139,250,0.9))",
            }}
          >
            <span className="flex items-center gap-1.5 rounded-full bg-slate-950/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-100 backdrop-blur transition-colors duration-300 group-hover:bg-slate-900 lg:px-5 lg:text-[11.5px]">
              Contact
              <ArrowRight
                className="h-3.5 w-3.5 text-sky-300 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </span>
          </a>

          {/* Hamburger → X (animated, mobile only) */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-700 backdrop-blur transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 md:hidden dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-slate-200"
          >
            <span className="relative block h-3.5 w-4">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "top-[6px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[6px] h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[12px] h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "top-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ===== Mobile panel ===== */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="pointer-events-auto absolute left-3 right-3 top-[4.75rem] z-40 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-3 shadow-[0_28px_60px_-20px_rgba(2,6,23,0.45)] backdrop-blur-2xl min-[480px]:left-5 min-[480px]:right-5 sm:top-[5.25rem] md:hidden dark:border-white/[0.09] dark:bg-[#0b1120]/92 dark:shadow-[0_28px_70px_-20px_rgba(2,6,23,0.9)]"
        >
          {/* Electric edge accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent"
          />

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "border-indigo-400/30 bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-violet-600/15 text-indigo-700 dark:border-indigo-400/25 dark:text-indigo-200"
                      : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:border-white/[0.06] dark:hover:bg-white/[0.04] dark:hover:text-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-400 shadow-[0_0_8px_2px_rgba(129,140,248,0.8)]"
                          : "bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-700 dark:group-hover:bg-slate-600"
                      }`}
                    />
                    {link.name}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 text-indigo-400 opacity-100"
                        : "-translate-x-1.5 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="mt-2 border-t border-slate-200/70 pt-2 dark:border-white/[0.07]">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenResume?.();
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)] transition-transform duration-200 hover:scale-[1.015]"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
