"use client";

import { useSudokuGame } from "@/hooks/useSudokuGame";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import { WinOverlay } from "./WinOverlay";

export function SudokuApp() {
  const game = useSudokuGame();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      {game.status === "menu" ? (
        <StartScreen
          hasSavedGame={game.hasSavedGame}
          bestTimes={game.bestTimes}
          isGenerating={game.isGenerating}
          onStart={game.startNewGame}
          onResume={game.resumeSavedGame}
        />
      ) : (
        <GameScreen game={game} />
      )}

      {game.isSolved && (
        <WinOverlay
          difficulty={game.difficulty}
          elapsedSeconds={game.elapsedSeconds}
          mistakes={game.mistakes}
          isNewBest={game.isNewBest}
          onPlayAgain={() => game.startNewGame(game.difficulty)}
          onMenu={game.goToMenu}
        />
      )}
    </div>
  );
}
