"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  FileText,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
      return document.documentElement.classList.contains("dark") ? "dark" : "dark";
    }
    return "dark";
  });

  // Ensure DOM class matches theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const active = savedTheme === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", active === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  // Scroll listener for glassmorphism and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 py-3 shadow-lg shadow-black/[0.03] backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#030712]/85 dark:shadow-black/20"
          : "border-b border-transparent bg-transparent py-4 sm:py-5 backdrop-blur-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="group flex min-w-0 flex-1 items-center gap-2 text-base font-bold tracking-tight transition-transform hover:scale-[1.02] sm:flex-initial sm:gap-2.5 sm:text-lg"
            aria-label="Home page"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25">
              <Sparkles className="h-4 w-4" />
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="truncate font-mono text-slate-800 dark:text-slate-100">
              <span className="text-blue-600 dark:text-blue-400">&lt;</span>
              {personalInfo.name || "Atik Hassan"}
              <span className="text-purple-600 dark:text-purple-400"> /&gt;</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex lg:gap-1.5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 lg:text-sm ${
                    isActive
                      ? "bg-blue-500/10 text-blue-600 shadow-sm dark:bg-slate-800/80 dark:text-white dark:shadow-inner dark:shadow-blue-500/10 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/30 active:translate-y-0 sm:text-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Night Mode"
              }
              title={theme === "dark" ? "Light Mode" : "Night Mode"}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-400 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={onOpenResume}
              aria-label="View Resume"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-blue-600 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              <FileText className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Night Mode"
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-b border-slate-200 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-[#030712]/95"
        >
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:bg-gradient-to-r dark:from-blue-600/15 dark:to-purple-600/15 dark:text-blue-300 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <ArrowRight className="h-4 w-4 text-blue-500" />}
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
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-purple-500"
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
