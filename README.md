# Sudoku

A fast, clean Sudoku game built with Next.js (App Router) and Tailwind CSS, ready to deploy on Vercel.

## Features

- **Four difficulty levels** — Easy, Medium, Hard, and Expert, each targeting a specific clue count (42 / 34 / 28 / 24 givens).
- **Guaranteed unique solutions** — puzzles are generated client-side by solving a randomized full board, then digging holes while a bitmask backtracking solver confirms the solution stays unique.
- **Pencil notes** — toggle notes mode to jot down candidate digits in a 3×3 mini-grid per cell.
- **Mistake tracking & conflict highlighting** — duplicate values in a row/column/box are flagged in real time.
- **Undo, erase, and hints**.
- **Keyboard controls** — arrow keys to move, `1`–`9` to enter digits, `Backspace`/`Delete` to clear, `N` to toggle notes, `Cmd/Ctrl+Z` to undo.
- **Timer with pause**, mistake counter, and best-time tracking per difficulty.
- **Autosave** — in-progress games persist to `localStorage`, so refreshing the page (or closing the tab) doesn't lose progress.
- **Dark mode** support and a responsive layout for mobile and desktop.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Project structure

```
src/
  app/                  Next.js App Router entry (layout, page, global styles)
  components/           UI components (board, cells, number pad, controls, screens)
  hooks/useSudokuGame.ts  Core game-state hook (selection, input, timer, persistence, keyboard)
  lib/sudoku/
    solver.ts            Bitmask backtracking solver, solution counter, full-board generator
    generator.ts         Difficulty-aware puzzle generation ("hole digging" with uniqueness checks)
    types.ts             Shared Sudoku types and difficulty metadata
  lib/storage.ts         localStorage helpers for saved games and best times
  lib/format.ts          Small formatting helpers (e.g. mm:ss timer display)
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint

## Deploying to Vercel

This is a standard Next.js app, so it deploys to [Vercel](https://vercel.com) with zero configuration:

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Vercel, click **New Project** and import the repository.
3. Keep the default framework preset (Next.js) and click **Deploy**.

Alternatively, from the CLI:

```bash
npm i -g vercel
vercel
```
