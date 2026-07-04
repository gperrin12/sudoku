"use client";

import { DIFFICULTIES, DIFFICULTY_LABELS, type Difficulty } from "@/lib/sudoku";
import type { BestTimes } from "@/lib/storage";
import { formatTime } from "@/lib/format";

interface StartScreenProps {
  hasSavedGame: boolean;
  bestTimes: BestTimes;
  isGenerating: boolean;
  onStart: (difficulty: Difficulty) => void;
  onResume: () => void;
}

const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  easy: "Great for warming up",
  medium: "A balanced challenge",
  hard: "For seasoned solvers",
  expert: "Only for the brave",
};

export function StartScreen({
  hasSavedGame,
  bestTimes,
  isGenerating,
  onStart,
  onResume,
}: StartScreenProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 px-4 py-10 text-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Sudoku
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Pick a difficulty to start a new puzzle
        </p>
      </div>

      {hasSavedGame && (
        <button
          type="button"
          onClick={onResume}
          disabled={isGenerating}
          className="w-full rounded-xl bg-sky-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60"
        >
          Continue Game
        </button>
      )}

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty}
            type="button"
            disabled={isGenerating}
            onClick={() => onStart(difficulty)}
            className="flex flex-col items-start gap-1 rounded-xl border border-slate-300 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500 dark:hover:bg-slate-700"
          >
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              {DIFFICULTY_LABELS[difficulty]}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {DIFFICULTY_DESCRIPTIONS[difficulty]}
            </span>
            {bestTimes[difficulty] !== null && (
              <span className="mt-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                Best: {formatTime(bestTimes[difficulty] as number)}
              </span>
            )}
          </button>
        ))}
      </div>

      {isGenerating && (
        <p className="text-sm text-slate-500 dark:text-slate-400">Generating puzzle…</p>
      )}
    </div>
  );
}
