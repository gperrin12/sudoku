"use client";

import { DIFFICULTY_LABELS, type Difficulty } from "@/lib/sudoku";
import { formatTime } from "@/lib/format";
import { THEME_CONTENT } from "@/lib/themeContent";
import { ThemeText } from "./ThemeText";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border-2 border-sand-300 bg-sand-50 p-6 text-center shadow-2xl">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-sun-300 to-sun-500 shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-ocean-900">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-ocean-900">
          <ThemeText beach={THEME_CONTENT.beach.winHeading} istanbul={THEME_CONTENT.istanbul.winHeading} />
        </h2>
        <p className="mt-1 font-medium text-sand-800">
          {DIFFICULTY_LABELS[difficulty]} ·{" "}
          <ThemeText beach={THEME_CONTENT.beach.winSubtext} istanbul={THEME_CONTENT.istanbul.winSubtext} />
        </p>

        {isNewBest && (
          <p className="mt-3 inline-block rounded-full bg-coral-100 px-3 py-1 text-sm font-bold text-coral-800">
            New best time!
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-sand-200 bg-white p-3">
            <p className="text-xs font-bold tracking-wide text-sand-800 uppercase">Time</p>
            <p className="text-xl font-extrabold text-ocean-900">{formatTime(elapsedSeconds)}</p>
          </div>
          <div className="rounded-xl border-2 border-sand-200 bg-white p-3">
            <p className="text-xs font-bold tracking-wide text-sand-800 uppercase">Mistakes</p>
            <p className="text-xl font-extrabold text-ocean-900">{mistakes}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-full bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 py-3 font-bold text-white shadow-[0_6px_0_0_var(--shadow-ocean)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_3px_0_0_var(--shadow-ocean)]"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={onMenu}
            className="w-full rounded-full border-2 border-sand-300 bg-white px-6 py-3 font-bold text-ocean-800 transition-colors hover:bg-sand-100"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
