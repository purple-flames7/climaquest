// src/utils/calculateXP.ts

import type { Difficulty } from "../types";

export const calculateXP = (
  baseXP: number,
  difficulty: Difficulty,
  correct: boolean
): number => {
  if (!correct) return 0;

  const difficultyMultiplier: Record<Difficulty, number> = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  };

  return Math.round(baseXP * difficultyMultiplier[difficulty]);
};
