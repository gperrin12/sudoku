import type { Board, Difficulty, Puzzle } from "./types";
import { cloneBoard, countSolutions, generateSolvedBoard, SIZE } from "./solver";

/** Target number of remaining clues per difficulty (higher = easier). */
export const DIFFICULTY_CLUES: Record<Difficulty, number> = {
  easy: 42,
  medium: 34,
  hard: 28,
  expert: 24,
};

function shuffledPositions(): [number, number][] {
  const positions: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      positions.push([r, c]);
    }
  }
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return positions;
}

/**
 * Digs holes into a fully-solved board while preserving a unique solution,
 * stopping once the target clue count for the difficulty is reached (or no
 * more cells can be removed without breaking uniqueness).
 */
export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const solution = generateSolvedBoard();
  const puzzle: Board = cloneBoard(solution);
  const targetClues = DIFFICULTY_CLUES[difficulty];
  const cellsToRemove = SIZE * SIZE - targetClues;

  let removed = 0;
  for (const [r, c] of shuffledPositions()) {
    if (removed >= cellsToRemove) break;
    if (puzzle[r][c] === 0) continue;

    const backup = puzzle[r][c];
    puzzle[r][c] = 0;

    if (countSolutions(puzzle, 2) === 1) {
      removed++;
    } else {
      puzzle[r][c] = backup;
    }
  }

  return { puzzle, solution, difficulty };
}
