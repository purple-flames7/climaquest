// Src/context/useGame.ts

import { useContext } from "react";
import { GameContext } from "./game-context-core";
import type { GameContextProps } from "./game-context-type";

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
