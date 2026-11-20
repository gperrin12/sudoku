"use client";

import { useCallback, useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import {
  THEME_CONTENT,
  THEME_STORAGE_KEY,
  type AppTheme,
} from "@/lib/themeContent";

export type { AppTheme };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function readTheme(): AppTheme {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "beach" ? "beach" : "istanbul";
  } catch {
    return "istanbul";
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("sudoku-theme", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("sudoku-theme", onStoreChange);
  };
}

function getServerTheme(): AppTheme {
  return "istanbul";
}

function applyTheme(theme: AppTheme) {
  document.documentElement.dataset.theme = theme;
  document.title = THEME_CONTENT[theme].title;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);

  useIsoLayoutEffect(() => {
    // Read storage directly so the server snapshot ("istanbul") cannot clobber
    // a theme the pre-paint script already applied.
    document.documentElement.dataset.theme = readTheme();
  }, [theme]);

  useEffect(() => {
    document.title = THEME_CONTENT[readTheme()].title;
  }, [theme]);

  const setTheme = useCallback((next: AppTheme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore
    }
    applyTheme(next);
    window.dispatchEvent(new Event("sudoku-theme"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "beach" ? "istanbul" : "beach");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
