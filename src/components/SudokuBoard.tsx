"use client";

import type { Board } from "@/lib/sudoku";
import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
  board: Board;
  given: boolean[][];
  notes: number[][][];
  conflicts: boolean[][];
  selected: { r: number; c: number } | null;
  onSelect: (row: number, col: number) => void;
}

export function SudokuBoard({
  board,
  given,
  notes,
  conflicts,
  selected,
  onSelect,
}: SudokuBoardProps) {
  const selectedValue = selected ? board[selected.r][selected.c] : 0;

  return (
    <div className="grid aspect-square w-full grid-cols-9 grid-rows-9 overflow-hidden rounded-lg border-2 border-slate-400 bg-white shadow-lg dark:border-slate-500 dark:bg-slate-900">
      {board.map((rowValues, r) =>
        rowValues.map((value, c) => {
          const isSelected = selected?.r === r && selected?.c === c;
          const isPeer =
            !isSelected &&
            !!selected &&
            (selected.r === r ||
              selected.c === c ||
              (Math.floor(selected.r / 3) === Math.floor(r / 3) &&
                Math.floor(selected.c / 3) === Math.floor(c / 3)));
          const isSameValue = !isSelected && value !== 0 && value === selectedValue;

          return (
            <SudokuCell
              key={`${r}-${c}`}
              row={r}
              col={c}
              value={value}
              notes={notes[r][c]}
              isGiven={given[r][c]}
              isSelected={isSelected}
              isPeer={isPeer}
              isSameValue={isSameValue}
              isConflict={conflicts[r][c]}
              onSelect={onSelect}
            />
          );
        })
      )}
    </div>
  );
}
