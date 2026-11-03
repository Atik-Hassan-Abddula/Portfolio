"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  mounted: false,
});

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme =
        localStorage.getItem("portfolio-theme") || localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
