"use client";

import { useCallback, useEffect, useState } from "react";

export type AppTheme = "beach" | "istanbul";

const STORAGE_KEY = "sudoku:theme:v1";

function isAppTheme(value: string | null): value is AppTheme {
  return value === "beach" || value === "istanbul";
}

export function useTheme() {
  const [theme, setThemeState] = useState<AppTheme>("beach");

  useEffect(() => {
    // Reading localStorage must happen client-side only; doing this via a lazy
    // useState initializer would cause a server/client hydration mismatch.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isAppTheme(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    }
  }, []);

  const setTheme = useCallback((next: AppTheme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "beach" ? "istanbul" : "beach");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
