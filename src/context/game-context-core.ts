import { createContext } from "react";
import type { GameState } from "./game-context-type";
import type { GameAction } from "./game-actions";
import type { GameContextProps } from "./game-context-type";

export const GameStateContext = createContext<GameState | undefined>(undefined);
export const GameDispatchContext = createContext<
  React.Dispatch<GameAction> | undefined
>(undefined);

export const LegacyGameContext = createContext<GameContextProps | undefined>(
  undefined
);
