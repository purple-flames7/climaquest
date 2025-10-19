import { useContext } from "react";
import {
  LegacyGameContext,
  GameStateContext,
  GameDispatchContext,
} from "./game-context-core";
import type { GameContextProps, GameState } from "./game-context-type";
import type { GameAction } from "./game-actions";

export const useGame = (): GameContextProps => {
  const legacy = useContext(LegacyGameContext);
  if (!legacy) throw new Error("useGame must be used within a GameProvider");
  return legacy;
};

export const useGameState = (): GameState => {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within a GameProvider");
  return ctx;
};

export const useGameDispatch = (): React.Dispatch<GameAction> => {
  const ctx = useContext(GameDispatchContext);
  if (!ctx)
    throw new Error("useGameDispatch must be used within a GameProvider");
  return ctx as React.Dispatch<GameAction>;
};
