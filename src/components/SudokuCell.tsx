"use client";

interface SudokuCellProps {
  row: number;
  col: number;
  value: number;
  notes: number[];
  isGiven: boolean;
  isSelected: boolean;
  isPeer: boolean;
  isSameValue: boolean;
  isConflict: boolean;
  onSelect: (row: number, col: number) => void;
}

export function SudokuCell({
  row,
  col,
  value,
  notes,
  isGiven,
  isSelected,
  isPeer,
  isSameValue,
  isConflict,
  onSelect,
}: SudokuCellProps) {
  const borderRight = col % 3 === 2 && col !== 8 ? "border-r-2 border-r-slate-400 dark:border-r-slate-500" : "border-r border-r-slate-200 dark:border-r-slate-700";
  const borderBottom = row % 3 === 2 && row !== 8 ? "border-b-2 border-b-slate-400 dark:border-b-slate-500" : "border-b border-b-slate-200 dark:border-b-slate-700";

  let bg = "bg-white dark:bg-slate-900";
  if (isSelected) {
    bg = "bg-sky-200 dark:bg-sky-800";
  } else if (isSameValue) {
    bg = "bg-sky-100 dark:bg-sky-900/50";
  } else if (isPeer) {
    bg = "bg-slate-100 dark:bg-slate-800";
  }

  let textColor = "text-slate-900 dark:text-slate-100";
  if (isConflict) {
    textColor = "text-red-600 dark:text-red-400";
  } else if (!isGiven && value !== 0) {
    textColor = "text-sky-700 dark:text-sky-300";
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(row, col)}
      aria-label={`Row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ""}`}
      className={`relative flex aspect-square items-center justify-center ${borderRight} ${borderBottom} ${bg} transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset`}
    >
      {value !== 0 ? (
        <span
          className={`text-lg sm:text-2xl ${isGiven ? "font-semibold" : "font-medium"} ${textColor}`}
        >
          {value}
        </span>
      ) : notes.length > 0 ? (
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.5">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className="flex items-center justify-center text-[8px] leading-none text-slate-500 sm:text-[10px] dark:text-slate-400"
            >
              {notes.includes(n) ? n : ""}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  );
}
