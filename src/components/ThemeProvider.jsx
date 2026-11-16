"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

// ============================================================
// Single global theme store.
//
// The resolved theme is an external system (localStorage + the
// `dark` class on <html>, applied pre-paint by the inline script
// in layout.js). useSyncExternalStore subscribes to it instead of
// duplicating it in component state, so hydration can never render
// a different theme than the SSR markup, and every consumer (the
// navbar toggle on desktop and mobile) shares one source of truth.
// ============================================================

const STORAGE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme-change";
const DARK_CLASS = "dark";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  mounted: false,
});

const emptySubscribe = () => () => {};

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

// First-time visitors (and the server) are dark by default.
const getServerSnapshot = () => "dark";

function applyTheme(theme) {
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // The inline script in layout.js has already applied the stored theme
  // before first paint. Skip the first effect so this store can never
  // re-add/remove the class while hydration settles (no flash).
  const firstSync = useRef(true);
  useEffect(() => {
    if (firstSync.current) {
      firstSync.current = false;
      return;
    }
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Storage unavailable (private mode) — the class still switches.
    }
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
