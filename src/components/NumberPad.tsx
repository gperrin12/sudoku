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
            className="flex aspect-square items-center justify-center rounded-xl border-2 border-sand-300 bg-white text-lg font-bold text-ocean-800 shadow-[0_3px_0_0_var(--shadow-sand)] transition-all hover:-translate-y-0.5 hover:border-ocean-400 hover:bg-ocean-50 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-sand-300 disabled:hover:bg-white sm:text-xl"
          >
            {digit}
          </button>
        );
      })}
    </div>
  );
}
