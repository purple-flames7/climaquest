// src/utils/calculate-xp.ts
import type { Difficulty } from "../types";

/**
 * Calculates the XP awarded for a question.
 *
 * XP is only awarded if the answer is correct.
 * Difficulty multipliers adjust the reward:
 *  - easy: 1×
 *  - medium: 1.5×
 *  - hard: 2×
 *
 * @param baseXP - Base XP for the question or level
 * @param difficulty - Question difficulty
 * @param correct - Whether the answer was correct
 * @returns XP awarded (0 if incorrect)
 */
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

  // Multiply base XP by difficulty multiplier and round to nearest integer
  return Math.round(baseXP * difficultyMultiplier[difficulty]);
};
