// Src/context/useGame.ts

import { useContext } from "react";
import { GameContext } from "./gameContextCore";
import type { GameContextProps } from "./gameContextTypes";

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
