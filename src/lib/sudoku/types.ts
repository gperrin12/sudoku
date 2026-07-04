export type Board = number[][];

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export interface Puzzle {
  puzzle: Board;
  solution: Board;
  difficulty: Difficulty;
}

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  expert: "Expert",
};
