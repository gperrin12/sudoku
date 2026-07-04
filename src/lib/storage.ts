import type { Board, Difficulty } from "@/lib/sudoku";

export interface SavedGameState {
  puzzle: Board;
  solution: Board;
  board: Board;
  notes: number[][][];
  given: boolean[][];
  difficulty: Difficulty;
  mistakes: number;
  elapsedSeconds: number;
  savedAt: number;
}

const GAME_STATE_KEY = "sudoku:game-state:v1";
const BEST_TIMES_KEY = "sudoku:best-times:v1";

export function loadGameState(): SavedGameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GAME_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedGameState;
  } catch {
    return null;
  }
}

export function saveGameState(state: SavedGameState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota / serialization errors; progress just won't persist.
  }
}

export function clearGameState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GAME_STATE_KEY);
}

export type BestTimes = Record<Difficulty, number | null>;

const DEFAULT_BEST_TIMES: BestTimes = {
  easy: null,
  medium: null,
  hard: null,
  expert: null,
};

export function loadBestTimes(): BestTimes {
  if (typeof window === "undefined") return { ...DEFAULT_BEST_TIMES };
  try {
    const raw = window.localStorage.getItem(BEST_TIMES_KEY);
    if (!raw) return { ...DEFAULT_BEST_TIMES };
    return { ...DEFAULT_BEST_TIMES, ...(JSON.parse(raw) as Partial<BestTimes>) };
  } catch {
    return { ...DEFAULT_BEST_TIMES };
  }
}

export function saveBestTime(difficulty: Difficulty, seconds: number): BestTimes {
  const current = loadBestTimes();
  const isNewBest = current[difficulty] === null || seconds < (current[difficulty] as number);
  if (isNewBest) {
    current[difficulty] = seconds;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(current));
      } catch {
        // ignore
      }
    }
  }
  return current;
}
