"use client";

interface NumberPadProps {
  digitCounts: number[];
  onInput: (digit: number) => void;
  disabled: boolean;
}

export function NumberPad({ digitCounts, onInput, disabled }: NumberPadProps) {
  return (
    <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((digit) => {
        const isComplete = digitCounts[digit] >= 9;
        return (
          <button
            key={digit}
            type="button"
            disabled={disabled || isComplete}
            onClick={() => onInput(digit)}
            className="flex aspect-square items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-semibold text-slate-800 shadow-sm transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-30 sm:text-xl dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {digit}
          </button>
        );
      })}
    </div>
  );
}
