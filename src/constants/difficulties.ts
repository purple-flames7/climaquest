/**
 * Difficulty labels for levels and questions.
 * These are the human-readable strings shown in the UI (e.g., level headers, badges).
 */
export const DIFFICULTIES = {
  EASY: "Easy", // Beginner-level questions
  MEDIUM: "Medium", // Intermediate-level questions
  HARD: "Hard", // Advanced-level questions
};

/**
 * XP multipliers based on difficulty.
 * Used when calculating XP rewards: base XP * multiplier.
 * Example: A "medium" question worth 10 XP → 10 * 1.5 = 15 XP.
 */
export const DIFFICULTY_MULTIPLIERS = {
  EASY: 1, // No change to base XP
  MEDIUM: 1.5, // 50% more XP
  HARD: 2, // Double XP
};
