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
  easy: "Calm waters",
  medium: "Gentle waves",
  hard: "Choppy seas",
  expert: "Riptide warning",
};

function DifficultyIcon({ difficulty }: { difficulty: Difficulty }) {
  const common = { fill: "none", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (difficulty) {
    case "easy":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-sun-600" {...common} stroke="currentColor">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      );
    case "medium":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-ocean-500" {...common} stroke="currentColor">
          <path d="M2 15c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5-2 5 0" />
          <path d="M2 19c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5-2 5 0" opacity="0.6" />
        </svg>
      );
    case "hard":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-ocean-600" {...common} stroke="currentColor">
          <path d="M2 13c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0 3.5-2.5 5 0" />
          <path d="M2 17.5c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0 3.5-2.5 5 0" opacity="0.7" />
          <path d="M2 8.5c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0 3.5-2.5 5 0" opacity="0.4" />
        </svg>
      );
    case "expert":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-coral-600" {...common} stroke="currentColor">
          <path d="M2 16c3-6 8-9 12-9 3 0 6 1.5 8 4-2 0-4 .5-5.5 2 2 .3 3.7 1.3 5 3-3-1-6-1-8.5.5" />
          <path d="M9 12.5c-1.5.5-3 1.5-4 3" opacity="0.6" />
        </svg>
      );
  }
}

export function StartScreen({
  hasSavedGame,
  bestTimes,
  isGenerating,
  onStart,
  onResume,
}: StartScreenProps) {
  return (
    <div className="relative flex w-full max-w-md flex-col items-center gap-7 px-4 py-10 text-center">
      <div>
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-ocean-900 drop-shadow-sm sm:text-6xl">
          Sudoku Beach
        </h1>
        <p className="mt-2 font-medium text-ocean-800/70">
          Pick a difficulty and catch some rays
        </p>
      </div>

      {hasSavedGame && (
        <button
          type="button"
          onClick={onResume}
          disabled={isGenerating}
          className="w-full rounded-full bg-gradient-to-b from-ocean-400 to-ocean-600 px-6 py-3 text-lg font-bold text-white shadow-[0_6px_0_0_rgba(30,98,114,0.6)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_3px_0_0_rgba(30,98,114,0.6)] disabled:cursor-wait disabled:opacity-60"
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
            className="flex flex-col items-start gap-1.5 rounded-2xl border-2 border-sand-300 bg-sand-50/90 px-5 py-4 text-left shadow-[0_4px_0_0_rgba(180,124,48,0.35)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-ocean-400 hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-display text-lg font-bold text-ocean-900">
                {DIFFICULTY_LABELS[difficulty]}
              </span>
              <DifficultyIcon difficulty={difficulty} />
            </div>
            <span className="text-sm text-sand-800/80">{DIFFICULTY_DESCRIPTIONS[difficulty]}</span>
            {bestTimes[difficulty] !== null && (
              <span className="mt-1 rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">
                Best: {formatTime(bestTimes[difficulty] as number)}
              </span>
            )}
          </button>
        ))}
      </div>

      {isGenerating && (
        <p className="text-sm font-medium text-ocean-800/70">Rolling in a fresh puzzle…</p>
      )}
    </div>
  );
}
