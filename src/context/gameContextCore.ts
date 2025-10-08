// src / context / gameContextCore.ts

import { createContext } from "react";
import type { GameContextProps } from "./gameContextTypes";

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);
