import { createContext } from "react";
import type { GameContextProps } from "./game-context-type";

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);
