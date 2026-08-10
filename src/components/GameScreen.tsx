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
    <div className="relative flex w-full max-w-md flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToMenu}
          className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-sm font-bold text-ocean-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Menu
        </button>
        <span className="rounded-full bg-gradient-to-r from-sun-400 to-sun-500 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-ocean-900 uppercase shadow-sm">
          {DIFFICULTY_LABELS[difficulty]}
        </span>
      </header>

      <div className="flex items-center justify-between rounded-2xl border-2 border-sand-300 bg-sand-50/90 px-4 py-2.5 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5 text-sm font-bold text-ocean-800">
          <span className="font-medium text-sand-800/70">Mistakes:</span>
          <span className={mistakes > 0 ? "text-coral-600" : ""}>{mistakes}</span>
        </div>
        <button
          type="button"
          onClick={togglePause}
          aria-label={isPaused ? "Resume timer" : "Pause timer"}
          className="flex items-center gap-2 text-sm font-bold tabular-nums text-ocean-800"
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
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-sand-100/90 backdrop-blur-sm">
            <button
              type="button"
              onClick={togglePause}
              className="rounded-full bg-gradient-to-b from-ocean-400 to-ocean-600 px-6 py-3 font-bold text-white shadow-[0_6px_0_0_rgba(30,98,114,0.6)] transition-transform hover:-translate-y-0.5"
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
