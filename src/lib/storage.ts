import { DIFFICULTIES, type Board, type Difficulty } from "@/lib/sudoku";

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

function isDigitGrid(value: unknown, allowEmpty: boolean): value is Board {
  if (!Array.isArray(value) || value.length !== 9) return false;
  return value.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every((cell) => {
        if (typeof cell !== "number" || !Number.isInteger(cell)) return false;
        return allowEmpty ? cell >= 0 && cell <= 9 : cell >= 1 && cell <= 9;
      })
  );
}

function sanitizeNotes(value: unknown): number[][][] | null {
  if (!Array.isArray(value) || value.length !== 9) return null;
  const notes: number[][][] = [];
  for (const row of value) {
    if (!Array.isArray(row) || row.length !== 9) return null;
    const nextRow: number[][] = [];
    for (const cell of row) {
      if (!Array.isArray(cell)) return null;
      const clean = [
        ...new Set(
          cell.filter(
            (note): note is number =>
              typeof note === "number" && Number.isInteger(note) && note >= 1 && note <= 9
          )
        ),
      ].sort((a, b) => a - b);
      nextRow.push(clean);
    }
    notes.push(nextRow);
  }
  return notes;
}

function parseGameState(value: unknown): SavedGameState | null {
  if (!value || typeof value !== "object") return null;
  const saved = value as Partial<SavedGameState>;
  if (!isDigitGrid(saved.puzzle, true) || !isDigitGrid(saved.solution, false) || !isDigitGrid(saved.board, true)) {
    return null;
  }
  if (
    typeof saved.difficulty !== "string" ||
    !DIFFICULTIES.includes(saved.difficulty as Difficulty)
  ) {
    return null;
  }
  if (typeof saved.mistakes !== "number" || !Number.isFinite(saved.mistakes) || saved.mistakes < 0) {
    return null;
  }
  if (
    typeof saved.elapsedSeconds !== "number" ||
    !Number.isFinite(saved.elapsedSeconds) ||
    saved.elapsedSeconds < 0
  ) {
    return null;
  }
  const notes = sanitizeNotes(saved.notes);
  if (!notes) return null;

  const puzzle = saved.puzzle.map((row) => [...row]);
  const solution = saved.solution.map((row) => [...row]);
  const board = saved.board.map((row) => [...row]);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle[r][c] !== 0 && puzzle[r][c] !== solution[r][c]) return null;
      if (puzzle[r][c] !== 0) {
        board[r][c] = puzzle[r][c];
        notes[r][c] = [];
      }
    }
  }

  return {
    puzzle,
    solution,
    board,
    notes,
    given: puzzle.map((row) => row.map((cell) => cell !== 0)),
    difficulty: saved.difficulty,
    mistakes: Math.floor(saved.mistakes),
    elapsedSeconds: Math.floor(saved.elapsedSeconds),
    savedAt: typeof saved.savedAt === "number" && Number.isFinite(saved.savedAt) ? saved.savedAt : Date.now(),
  };
}

export function loadGameState(): SavedGameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GAME_STATE_KEY);
    if (!raw) return null;
    const parsed = parseGameState(JSON.parse(raw));
    if (!parsed) window.localStorage.removeItem(GAME_STATE_KEY);
    return parsed;
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
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_BEST_TIMES };
    const record = parsed as Record<string, unknown>;
    const times = { ...DEFAULT_BEST_TIMES };
    for (const difficulty of DIFFICULTIES) {
      const value = record[difficulty];
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        times[difficulty] = Math.floor(value);
      }
    }
    return times;
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
