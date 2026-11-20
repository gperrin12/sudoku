"use client";

import { useEffect } from "react";
import { useSudokuGame } from "@/hooks/useSudokuGame";
import { useTheme } from "@/hooks/useTheme";
import { THEME_CONTENT } from "@/lib/themeContent";
import { BeachBackdrop } from "./BeachBackdrop";
import { IstanbulBackdrop } from "./IstanbulBackdrop";
import { ThemeToggle } from "./ThemeToggle";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import { WinOverlay } from "./WinOverlay";

export function SudokuApp() {
  const game = useSudokuGame();
  const { theme, setTheme } = useTheme();
  const content = THEME_CONTENT[theme];

  useEffect(() => {
    document.title = content.title;
  }, [content.title]);

  return (
    <div
      data-theme={theme}
      className="relative flex min-h-screen w-full flex-col items-center justify-center"
    >
      {theme === "beach" ? <BeachBackdrop /> : <IstanbulBackdrop />}
      <ThemeToggle theme={theme} onChange={setTheme} />

      {game.status === "menu" ? (
        <StartScreen
          theme={theme}
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
          theme={theme}
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
