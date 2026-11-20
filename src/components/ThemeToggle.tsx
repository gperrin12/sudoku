"use client";

import type { AppTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  theme: AppTheme;
  onChange: (theme: AppTheme) => void;
}

function OptionButton({
  option,
  label,
  pressed,
  onClick,
  icon,
}: {
  option: AppTheme;
  label: string;
  pressed: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-theme-option={option}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="theme-option flex h-8 w-8 items-center justify-center rounded-full transition-colors sm:h-9 sm:w-9"
    >
      {icon}
    </button>
  );
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Theme"
      className="fixed top-3 right-3 z-40 flex items-center gap-1 rounded-full border-2 border-sand-300 bg-sand-50 p-1 shadow-md sm:top-4 sm:right-4"
    >
      <OptionButton
        option="beach"
        pressed={theme === "beach"}
        label="Beach theme"
        onClick={() => onChange("beach")}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
          </svg>
        }
      />
      <OptionButton
        option="istanbul"
        pressed={theme === "istanbul"}
        label="Istanbul theme"
        onClick={() => onChange("istanbul")}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <path d="M14 2a9 9 0 1 0 0 18 7.2 7.2 0 1 1 0-18z" />
          </svg>
        }
      />
    </div>
  );
}
