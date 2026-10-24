"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle({ className = "", isMobile = false }) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Show a neutral fallback until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className={`p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 transition-colors ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  if (isMobile) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 transition-colors ${className}`}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
          <span>{isDark ? "Light Mode" : "Night Mode"}</span>
        </span>
        <span className="text-[11px] font-mono text-slate-400 uppercase">
          {isDark ? "Active: Dark" : "Active: Light"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 hover:border-blue-400 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}

