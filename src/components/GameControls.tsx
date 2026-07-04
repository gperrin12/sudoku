"use client";

interface GameControlsProps {
  isNotesMode: boolean;
  canUndo: boolean;
  disabled: boolean;
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
}

function ControlButton({
  label,
  onClick,
  disabled,
  active,
  icon,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:text-sm ${
        active
          ? "border-sky-500 bg-sky-100 text-sky-700 dark:border-sky-400 dark:bg-sky-900/60 dark:text-sky-200"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      {label}
    </button>
  );
}

export function GameControls({
  isNotesMode,
  canUndo,
  disabled,
  onUndo,
  onErase,
  onToggleNotes,
  onHint,
}: GameControlsProps) {
  return (
    <div className="flex gap-2">
      <ControlButton
        label="Undo"
        disabled={disabled || !canUndo}
        onClick={onUndo}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />
      <ControlButton
        label="Erase"
        disabled={disabled}
        onClick={onErase}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M18 13l-6.5 6.5a2 2 0 0 1-2.8 0l-3.2-3.2a2 2 0 0 1 0-2.8L14 5l6 6-2 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8 21h11" strokeLinecap="round" />
          </svg>
        }
      />
      <ControlButton
        label="Notes"
        active={isNotesMode}
        disabled={disabled}
        onClick={onToggleNotes}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ControlButton
        label="Hint"
        disabled={disabled}
        onClick={onHint}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.6 1 .6 1.6v.1h6v-.1c0-.6.1-1.2.6-1.6A6 6 0 0 0 12 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
}
