"use client";

import { DIFFICULTY_LABELS } from "@/lib/sudoku";
import { formatTime } from "@/lib/format";
import { SudokuBoard } from "./SudokuBoard";
import { NumberPad } from "./NumberPad";
import { GameControls } from "./GameControls";
import type { SudokuGame } from "@/hooks/useSudokuGame";

interface GameScreenProps {
  game: SudokuGame;
}

export function GameScreen({ game }: GameScreenProps) {
  const {
    difficulty,
    board,
    given,
    notes,
    selected,
    isNotesMode,
    mistakes,
    elapsedSeconds,
    isPaused,
    conflicts,
    digitCounts,
    canUndo,
    goToMenu,
    selectCell,
    inputDigit,
    clearCell,
    undo,
    toggleNotesMode,
    togglePause,
    useHint,
  } = game;

  if (!board || !given) return null;

  return (
    <div className="flex w-full max-w-md flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToMenu}
          className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Menu
        </button>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:bg-slate-700 dark:text-slate-300">
          {DIFFICULTY_LABELS[difficulty]}
        </span>
      </header>

      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm dark:bg-slate-800">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Mistakes:</span>
          <span className={mistakes > 0 ? "font-semibold text-red-500" : "font-semibold"}>
            {mistakes}
          </span>
        </div>
        <button
          type="button"
          onClick={togglePause}
          aria-label={isPaused ? "Resume timer" : "Pause timer"}
          className="flex items-center gap-2 text-sm font-medium tabular-nums text-slate-600 dark:text-slate-300"
        >
          {formatTime(elapsedSeconds)}
          {isPaused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          )}
        </button>
      </div>

      <div className="relative">
        <SudokuBoard
          board={board}
          given={given}
          notes={notes}
          conflicts={conflicts}
          selected={isPaused ? null : selected}
          onSelect={selectCell}
        />
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-100/90 backdrop-blur-sm dark:bg-slate-900/90">
            <button
              type="button"
              onClick={togglePause}
              className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-sky-700"
            >
              Resume
            </button>
          </div>
        )}
      </div>

      <NumberPad digitCounts={digitCounts} onInput={inputDigit} disabled={isPaused} />

      <GameControls
        isNotesMode={isNotesMode}
        canUndo={canUndo}
        disabled={isPaused}
        onUndo={undo}
        onErase={clearCell}
        onToggleNotes={toggleNotesMode}
        onHint={useHint}
      />
    </div>
  );
}
