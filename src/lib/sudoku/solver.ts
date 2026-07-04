import type { Board } from "./types";

export const SIZE = 9;
export const BOX = 3;
const FULL_MASK = 0b111111111;

export function boxIndex(r: number, c: number): number {
  return Math.floor(r / BOX) * BOX + Math.floor(c / BOX);
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => new Array(SIZE).fill(0));
}

function popcount(mask: number): number {
  let count = 0;
  let m = mask;
  while (m) {
    m &= m - 1;
    count++;
  }
  return count;
}

function buildMasks(board: Board) {
  const rows = new Array(SIZE).fill(0);
  const cols = new Array(SIZE).fill(0);
  const boxes = new Array(SIZE).fill(0);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = board[r][c];
      if (v) {
        const bit = 1 << (v - 1);
        rows[r] |= bit;
        cols[c] |= bit;
        boxes[boxIndex(r, c)] |= bit;
      }
    }
  }
  return { rows, cols, boxes };
}

type BestCell = { r: number; c: number; candidates: number } | "solved";

/**
 * Counts the number of solutions for a board, stopping early once `cap` is
 * reached. Uses a minimum-remaining-values heuristic so that nearly-solved
 * boards (the common case while digging holes) resolve almost instantly.
 */
export function countSolutions(board: Board, cap = 2): number {
  const working = cloneBoard(board);
  const { rows, cols, boxes } = buildMasks(working);
  let count = 0;

  function findBestCell(): BestCell {
    let best: { r: number; c: number; candidates: number } | null = null;
    let bestCount = SIZE + 1;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (working[r][c] !== 0) continue;
        const used = rows[r] | cols[c] | boxes[boxIndex(r, c)];
        const candidates = FULL_MASK & ~used;
        const n = popcount(candidates);
        if (n === 0) return { r, c, candidates: 0 };
        if (n < bestCount) {
          bestCount = n;
          best = { r, c, candidates };
          if (n === 1) return best;
        }
      }
    }
    return best ?? "solved";
  }

  function backtrack(): void {
    if (count >= cap) return;
    const cell = findBestCell();
    if (cell === "solved") {
      count++;
      return;
    }
    const { r, c, candidates } = cell;
    if (candidates === 0) return;
    let remaining = candidates;
    const bi = boxIndex(r, c);
    while (remaining) {
      if (count >= cap) return;
      const bit = remaining & -remaining;
      remaining ^= bit;
      const digit = Math.log2(bit) + 1;
      working[r][c] = digit;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[bi] |= bit;

      backtrack();

      working[r][c] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[bi] &= ~bit;
    }
  }

  backtrack();
  return count;
}

export function hasUniqueSolution(board: Board): boolean {
  return countSolutions(board, 2) === 1;
}

export function solveBoard(board: Board): Board | null {
  const working = cloneBoard(board);
  const { rows, cols, boxes } = buildMasks(working);
  let solved = false;

  function findBestCell(): BestCell {
    let best: { r: number; c: number; candidates: number } | null = null;
    let bestCount = SIZE + 1;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (working[r][c] !== 0) continue;
        const used = rows[r] | cols[c] | boxes[boxIndex(r, c)];
        const candidates = FULL_MASK & ~used;
        const n = popcount(candidates);
        if (n === 0) return { r, c, candidates: 0 };
        if (n < bestCount) {
          bestCount = n;
          best = { r, c, candidates };
          if (n === 1) return best;
        }
      }
    }
    return best ?? "solved";
  }

  function backtrack(): boolean {
    const cell = findBestCell();
    if (cell === "solved") return true;
    const { r, c, candidates } = cell;
    if (candidates === 0) return false;
    let remaining = candidates;
    const bi = boxIndex(r, c);
    while (remaining) {
      const bit = remaining & -remaining;
      remaining ^= bit;
      const digit = Math.log2(bit) + 1;
      working[r][c] = digit;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[bi] |= bit;

      if (backtrack()) return true;

      working[r][c] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[bi] &= ~bit;
    }
    return false;
  }

  solved = backtrack();
  return solved ? working : null;
}

function shuffledDigits(): number[] {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Generates a fully-solved, randomized, valid 9x9 Sudoku board. */
export function generateSolvedBoard(): Board {
  const board = createEmptyBoard();
  const rows = new Array(SIZE).fill(0);
  const cols = new Array(SIZE).fill(0);
  const boxes = new Array(SIZE).fill(0);

  function fill(pos: number): boolean {
    if (pos === SIZE * SIZE) return true;
    const r = Math.floor(pos / SIZE);
    const c = pos % SIZE;
    const bi = boxIndex(r, c);
    for (const digit of shuffledDigits()) {
      const bit = 1 << (digit - 1);
      if (rows[r] & bit || cols[c] & bit || boxes[bi] & bit) continue;
      board[r][c] = digit;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[bi] |= bit;
      if (fill(pos + 1)) return true;
      board[r][c] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[bi] &= ~bit;
    }
    return false;
  }

  fill(0);
  return board;
}

/** Returns true if placing `value` at (r, c) does not violate row/col/box rules. */
export function isPlacementValid(
  board: Board,
  r: number,
  c: number,
  value: number
): boolean {
  if (value === 0) return true;
  for (let i = 0; i < SIZE; i++) {
    if (i !== c && board[r][i] === value) return false;
    if (i !== r && board[i][c] === value) return false;
  }
  const boxRow = Math.floor(r / BOX) * BOX;
  const boxCol = Math.floor(c / BOX) * BOX;
  for (let dr = 0; dr < BOX; dr++) {
    for (let dc = 0; dc < BOX; dc++) {
      const rr = boxRow + dr;
      const cc = boxCol + dc;
      if ((rr !== r || cc !== c) && board[rr][cc] === value) return false;
    }
  }
  return true;
}
