"use client";

import { DIFFICULTY_LABELS, type Difficulty } from "@/lib/sudoku";
import { formatTime } from "@/lib/format";

interface WinOverlayProps {
  difficulty: Difficulty;
  elapsedSeconds: number;
  mistakes: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onMenu: () => void;
}

export function WinOverlay({
  difficulty,
  elapsedSeconds,
  mistakes,
  isNewBest,
  onPlayAgain,
  onMenu,
}: WinOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Puzzle Solved!</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {DIFFICULTY_LABELS[difficulty]} difficulty
        </p>

        {isNewBest && (
          <p className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            New best time!
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
            <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
              Time
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">
              {formatTime(elapsedSeconds)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
            <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
              Mistakes
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{mistakes}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-sky-700"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={onMenu}
            className="w-full rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
