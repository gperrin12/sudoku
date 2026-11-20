"use client";

import { useSudokuGame } from "@/hooks/useSudokuGame";
import { useTheme } from "@/hooks/useTheme";
import { BeachBackdrop } from "./BeachBackdrop";
import { IstanbulBackdrop } from "./IstanbulBackdrop";
import { ThemeToggle } from "./ThemeToggle";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import { WinOverlay } from "./WinOverlay";

export function SudokuApp() {
  const game = useSudokuGame();
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="theme-backdrop-beach">
        <BeachBackdrop />
      </div>
      <div className="theme-backdrop-istanbul">
        <IstanbulBackdrop />
      </div>
      <ThemeToggle theme={theme} onChange={setTheme} />

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
