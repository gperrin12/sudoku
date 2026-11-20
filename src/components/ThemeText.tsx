import type { ReactNode } from "react";

/** Renders both theme strings so CSS can show the stored theme before hydration. */
export function ThemeText({ beach, istanbul }: { beach: ReactNode; istanbul: ReactNode }) {
  return (
    <>
      <span className="theme-copy-beach">{beach}</span>
      <span className="theme-copy-istanbul">{istanbul}</span>
    </>
  );
}
