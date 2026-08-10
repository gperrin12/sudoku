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
  const borderRight = col % 3 === 2 && col !== 8 ? "border-r-2 border-r-sand-600" : "border-r border-r-sand-200";
  const borderBottom = row % 3 === 2 && row !== 8 ? "border-b-2 border-b-sand-600" : "border-b border-b-sand-200";

  let bg = "bg-white";
  if (isSelected) {
    bg = "bg-ocean-200";
  } else if (isConflict) {
    bg = "bg-coral-100";
  } else if (isSameValue) {
    bg = "bg-ocean-100";
  } else if (isPeer) {
    bg = "bg-sand-100";
  }

  let textColor = "text-ocean-900";
  if (isConflict) {
    textColor = "text-coral-600";
  } else if (!isGiven && value !== 0) {
    textColor = "text-ocean-500";
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(row, col)}
      aria-label={`Row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ""}`}
      className={`relative flex aspect-square items-center justify-center ${borderRight} ${borderBottom} ${bg} transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-inset`}
    >
      {value !== 0 ? (
        <span
          className={`text-lg sm:text-2xl ${isGiven ? "font-extrabold" : "font-semibold"} ${textColor}`}
        >
          {value}
        </span>
      ) : notes.length > 0 ? (
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.5">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className="flex items-center justify-center text-[8px] leading-none text-ocean-600/70 sm:text-[10px]"
            >
              {notes.includes(n) ? n : ""}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  );
}
