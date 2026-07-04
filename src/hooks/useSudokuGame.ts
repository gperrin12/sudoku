"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Board, Difficulty, generatePuzzle, isPlacementValid } from "@/lib/sudoku";
import {
  BestTimes,
  clearGameState,
  loadBestTimes,
  loadGameState,
  saveBestTime,
  saveGameState,
} from "@/lib/storage";

export type GameStatus = "menu" | "playing" | "won";

type Notes = number[][][];

interface HistoryEntry {
  board: Board;
  notes: Notes;
}

function emptyNotes(): Notes {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []));
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function cloneNotes(notes: Notes): Notes {
  return notes.map((row) => row.map((cell) => [...cell]));
}

function boardsEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

export function useSudokuGame() {
  const [status, setStatus] = useState<GameStatus>("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzle, setPuzzle] = useState<Board | null>(null);
  const [solution, setSolution] = useState<Board | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [given, setGiven] = useState<boolean[][] | null>(null);
  const [notes, setNotes] = useState<Notes>(emptyNotes());
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [bestTimes, setBestTimes] = useState<BestTimes>({
    easy: null,
    medium: null,
    hard: null,
    expert: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [historyLength, setHistoryLength] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const historyRef = useRef<HistoryEntry[]>([]);

  useEffect(() => {
    // Reading localStorage must happen client-side only; doing this via a lazy
    // useState initializer would cause a server/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasSavedGame(loadGameState() !== null);
    setBestTimes(loadBestTimes());
  }, []);

  useEffect(() => {
    if (status !== "playing" || isPaused) return;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status, isPaused]);

  useEffect(() => {
    if (status !== "playing" || !puzzle || !solution || !board || !given) return;
    saveGameState({
      puzzle,
      solution,
      board,
      notes,
      given,
      difficulty,
      mistakes,
      elapsedSeconds,
      savedAt: Date.now(),
    });
  }, [status, puzzle, solution, board, notes, given, difficulty, mistakes, elapsedSeconds]);

  const resetTransientState = useCallback(() => {
    setSelected(null);
    setIsNotesMode(false);
    setIsPaused(false);
    setIsNewBest(false);
    historyRef.current = [];
    setHistoryLength(0);
  }, []);

  const startNewGame = useCallback(
    (newDifficulty: Difficulty) => {
      setIsGenerating(true);
      window.setTimeout(() => {
        const { puzzle: p, solution: s } = generatePuzzle(newDifficulty);
        setPuzzle(p);
        setSolution(s);
        setBoard(cloneBoard(p));
        setGiven(p.map((row) => row.map((v) => v !== 0)));
        setNotes(emptyNotes());
        setMistakes(0);
        setElapsedSeconds(0);
        setDifficulty(newDifficulty);
        resetTransientState();
        setStatus("playing");
        setHasSavedGame(false);
        setIsGenerating(false);
      }, 10);
    },
    [resetTransientState]
  );

  const resumeSavedGame = useCallback(() => {
    const saved = loadGameState();
    if (!saved) return;
    setPuzzle(saved.puzzle);
    setSolution(saved.solution);
    setBoard(saved.board);
    setGiven(saved.given);
    setNotes(saved.notes);
    setDifficulty(saved.difficulty);
    setMistakes(saved.mistakes);
    setElapsedSeconds(saved.elapsedSeconds);
    resetTransientState();
    setStatus("playing");
  }, [resetTransientState]);

  const goToMenu = useCallback(() => {
    setStatus("menu");
    setHasSavedGame(loadGameState() !== null);
  }, []);

  const pushHistory = useCallback((currentBoard: Board, currentNotes: Notes) => {
    historyRef.current.push({
      board: cloneBoard(currentBoard),
      notes: cloneNotes(currentNotes),
    });
    if (historyRef.current.length > 200) historyRef.current.shift();
    setHistoryLength(historyRef.current.length);
  }, []);

  const selectCell = useCallback((r: number, c: number) => {
    setSelected({ r, c });
  }, []);

  const finishIfWon = useCallback(
    (candidate: Board) => {
      if (!solution) return;
      if (!boardsEqual(candidate, solution)) return;
      setStatus("won");
      clearGameState();
      const previousBest = bestTimes[difficulty];
      setBestTimes(saveBestTime(difficulty, elapsedSeconds));
      setIsNewBest(previousBest === null || elapsedSeconds < previousBest);
    },
    [solution, difficulty, elapsedSeconds, bestTimes]
  );

  const inputDigit = useCallback(
    (digit: number) => {
      if (status !== "playing" || !selected || !board || !given || !solution) return;
      const { r, c } = selected;
      if (given[r][c]) return;

      if (isNotesMode) {
        setNotes((prev) => {
          const next = cloneNotes(prev);
          const cellNotes = next[r][c];
          const idx = cellNotes.indexOf(digit);
          if (idx >= 0) cellNotes.splice(idx, 1);
          else cellNotes.push(digit);
          cellNotes.sort((a, b) => a - b);
          return next;
        });
        return;
      }

      if (board[r][c] === digit) return;

      pushHistory(board, notes);
      const newBoard = cloneBoard(board);
      newBoard[r][c] = digit;
      setBoard(newBoard);
      setNotes((prev) => {
        const next = cloneNotes(prev);
        next[r][c] = [];
        return next;
      });

      if (digit !== solution[r][c]) {
        setMistakes((m) => m + 1);
      }

      finishIfWon(newBoard);
    },
    [status, selected, board, given, solution, isNotesMode, notes, pushHistory, finishIfWon]
  );

  const clearCell = useCallback(() => {
    if (status !== "playing" || !selected || !board || !given) return;
    const { r, c } = selected;
    if (given[r][c]) return;
    if (board[r][c] === 0 && notes[r][c].length === 0) return;

    pushHistory(board, notes);
    const newBoard = cloneBoard(board);
    newBoard[r][c] = 0;
    setBoard(newBoard);
    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[r][c] = [];
      return next;
    });
  }, [status, selected, board, given, notes, pushHistory]);

  const undo = useCallback(() => {
    const last = historyRef.current.pop();
    if (!last) return;
    setBoard(last.board);
    setNotes(last.notes);
    setHistoryLength(historyRef.current.length);
  }, []);

  const toggleNotesMode = useCallback(() => setIsNotesMode((v) => !v), []);

  const togglePause = useCallback(() => setIsPaused((v) => !v), []);

  const useHint = useCallback(() => {
    if (status !== "playing" || !selected || !board || !given || !solution) return;
    const { r, c } = selected;
    if (given[r][c]) return;
    if (board[r][c] === solution[r][c]) return;

    pushHistory(board, notes);
    const newBoard = cloneBoard(board);
    newBoard[r][c] = solution[r][c];
    setBoard(newBoard);
    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[r][c] = [];
      return next;
    });
    finishIfWon(newBoard);
  }, [status, selected, board, given, solution, notes, pushHistory, finishIfWon]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (status !== "playing") return;

      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        inputDigit(Number(e.key));
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        clearCell();
        return;
      }
      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        toggleNotesMode();
        return;
      }
      if (e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        undo();
        return;
      }
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        setSelected((prev) => {
          const base = prev ?? { r: 0, c: 0 };
          let { r, c } = base;
          if (e.key === "ArrowUp") r = (r + 8) % 9;
          else if (e.key === "ArrowDown") r = (r + 1) % 9;
          else if (e.key === "ArrowLeft") c = (c + 8) % 9;
          else if (e.key === "ArrowRight") c = (c + 1) % 9;
          return { r, c };
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, inputDigit, clearCell, toggleNotesMode, undo]);

  const conflicts = useMemo(() => {
    const result = Array.from({ length: 9 }, () => new Array(9).fill(false));
    if (!board) return result;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = board[r][c];
        if (v === 0) continue;
        if (!isPlacementValid(board, r, c, v)) {
          result[r][c] = true;
        }
      }
    }
    return result;
  }, [board]);

  const digitCounts = useMemo(() => {
    const counts = new Array(10).fill(0);
    if (!board) return counts;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = board[r][c];
        if (v) counts[v]++;
      }
    }
    return counts;
  }, [board]);

  const isSolved = status === "won";

  return {
    status,
    difficulty,
    puzzle,
    board,
    given,
    notes,
    selected,
    isNotesMode,
    mistakes,
    elapsedSeconds,
    isPaused,
    hasSavedGame,
    bestTimes,
    isGenerating,
    canUndo: historyLength > 0,
    conflicts,
    digitCounts,
    isSolved,
    isNewBest,
    startNewGame,
    resumeSavedGame,
    goToMenu,
    selectCell,
    inputDigit,
    clearCell,
    undo,
    toggleNotesMode,
    togglePause,
    useHint,
  };
}

export type SudokuGame = ReturnType<typeof useSudokuGame>;
