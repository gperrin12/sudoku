import type { Difficulty } from "@/lib/sudoku";

export type AppTheme = "beach" | "istanbul";

export const THEME_STORAGE_KEY = "sudoku:theme:v1";

export interface ThemeContent {
  title: string;
  tagline: string;
  generatingText: string;
  difficultyDescriptions: Record<Difficulty, string>;
  winHeading: string;
  winSubtext: string;
}

export const THEME_CONTENT: Record<AppTheme, ThemeContent> = {
  beach: {
    title: "Sudoku Beach",
    tagline: "Pick a difficulty and catch some rays",
    generatingText: "Rolling in a fresh puzzle…",
    difficultyDescriptions: {
      easy: "Calm waters",
      medium: "Gentle waves",
      hard: "Choppy seas",
      expert: "Riptide warning",
    },
    winHeading: "Smooth Sailing!",
    winSubtext: "puzzle solved",
  },
  istanbul: {
    title: "Sudoku Istanbul",
    tagline: "Pick a difficulty and wander the bazaar",
    generatingText: "Brewing a fresh puzzle…",
    difficultyDescriptions: {
      easy: "Çay time",
      medium: "Bazaar stroll",
      hard: "Bosphorus current",
      expert: "Whirling dervish",
    },
    winHeading: "Maşallah!",
    winSubtext: "puzzle solved",
  },
};

/** Runs before paint. Istanbul is the default unless beach was explicitly saved. */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var t=s==="beach"?"beach":"istanbul";document.documentElement.setAttribute("data-theme",t);document.title=t==="beach"?${JSON.stringify(THEME_CONTENT.beach.title)}:${JSON.stringify(THEME_CONTENT.istanbul.title)};}catch(e){}})();`;
