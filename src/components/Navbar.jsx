
"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  FileText,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState("dark");
  const [themeReady, setThemeReady] = useState(false);

  // Initialize theme and restore the saved preference.
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    const initialTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : "dark";

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );

    setThemeReady(true);
  }, []);

  // Toggle Light Mode and Night Mode.
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  // Track scroll position and active navigation section.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "contact",
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= top &&
            scrollPosition < top + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    const target = document.querySelector(href);

    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -70 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }

      window.history.pushState(null, "", href);
    }
  };

  // Shared theme toggle button.
  const ThemeToggle = ({ mobile = false }) => (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!themeReady}
      aria-label={
        theme === "dark"
          ? "Switch to Light Mode"
          : "Switch to Night Mode"
      }
      title={theme === "dark" ? "Light Mode" : "Night Mode"}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 ${
        mobile
          ? "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white"
          : "border-slate-700/70 bg-slate-800/60 text-slate-200 hover:border-blue-500/50 hover:bg-slate-700 hover:text-white"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200/80 bg-white/90 py-3.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#030712]/85 dark:shadow-black/20"
          : "border-transparent bg-white/70 py-5 backdrop-blur-sm dark:bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="group flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-90 sm:text-xl"
            aria-label="Home page"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="truncate font-mono text-slate-800 dark:text-slate-200">
              <span className="text-blue-500 dark:text-blue-400">
                &lt;
              </span>
              {personalInfo.name || "Dev.Portfolio"}
              <span className="text-purple-500 dark:text-purple-400">
                {" "} /&gt;
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex lg:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-white dark:shadow-inner dark:shadow-blue-500/10"
                      : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/40 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25 active:translate-y-0"
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenResume}
              aria-label="View Resume"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-blue-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              <FileText className="h-5 w-5" />
            </button>

            <ThemeToggle mobile />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="animate-in slide-in-from-top-4 border-b border-slate-200 bg-white/95 px-4 pt-3 pb-6 duration-200 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-[#030712]/95"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? "border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:bg-gradient-to-r dark:from-blue-600/20 dark:to-purple-600/20 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-colors hover:from-blue-500 hover:to-purple-500"
              >
                <FileText className="h-4 w-4" />
                <span>View / Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
