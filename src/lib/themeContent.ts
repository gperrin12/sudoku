import type { Difficulty } from "@/lib/sudoku";
import type { AppTheme } from "@/hooks/useTheme";

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
