"use client";

import { DIFFICULTY_LABELS, type Difficulty } from "@/lib/sudoku";
import { formatTime } from "@/lib/format";
import type { AppTheme } from "@/hooks/useTheme";
import { THEME_CONTENT } from "@/lib/themeContent";

interface WinOverlayProps {
  theme: AppTheme;
  difficulty: Difficulty;
  elapsedSeconds: number;
  mistakes: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onMenu: () => void;
}

export function WinOverlay({
  theme,
  difficulty,
  elapsedSeconds,
  mistakes,
  isNewBest,
  onPlayAgain,
  onMenu,
}: WinOverlayProps) {
  const content = THEME_CONTENT[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border-2 border-sand-300 bg-sand-50 p-6 text-center shadow-2xl">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-sun-300 to-sun-500 shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="#123540" strokeWidth={2} className="h-7 w-7">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-ocean-900">
          {content.winHeading}
        </h2>
        <p className="mt-1 font-medium text-sand-800/70">
          {DIFFICULTY_LABELS[difficulty]} · {content.winSubtext}
        </p>

        {isNewBest && (
          <p className="mt-3 inline-block rounded-full bg-coral-100 px-3 py-1 text-sm font-bold text-coral-700">
            New best time!
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-sand-200 bg-white p-3">
            <p className="text-xs font-bold tracking-wide text-sand-700/70 uppercase">Time</p>
            <p className="text-xl font-extrabold text-ocean-900">{formatTime(elapsedSeconds)}</p>
          </div>
          <div className="rounded-xl border-2 border-sand-200 bg-white p-3">
            <p className="text-xs font-bold tracking-wide text-sand-700/70 uppercase">Mistakes</p>
            <p className="text-xl font-extrabold text-ocean-900">{mistakes}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-full bg-gradient-to-b from-ocean-400 to-ocean-600 px-6 py-3 font-bold text-white shadow-[0_6px_0_0_rgba(30,98,114,0.6)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_3px_0_0_rgba(30,98,114,0.6)]"
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
