import { z } from "zod";
import { difficultyEnum, categoryEnum } from "./question-schema";

/**
 * Represents a question that has been answered by the user.
 * Used for review, feedback, and progress tracking.
 */
export const answeredQuestionSchema = z.object({
  id: z.string(),

  /**
   * Whether the user's answer was correct.
   */
  correct: z.boolean(),

  /**
   * The user's submitted answer.
   * Nullable to support skipped or incomplete questions.
   */
  userAnswer: z.union([z.string(), z.boolean()]).nullable(),

  /**
   * Snapshot of the question text at the time it was answered.
   * Prevents issues if question content changes later.
   */
  questionText: z.string(),

  /**
   * The correct answer for reference and review.
   */
  correctAnswer: z.union([z.string(), z.boolean()]).nullable(),

  /**
   * Question type discriminator.
   * Mirrors the question schema.
   */
  type: z.enum(["mcq", "truefalse", "shortanswer"]),

  /**
   * Answer options for MCQs.
   * Optional because not all question types use options.
   */
  options: z.array(z.string()).optional(),
});

/**
 * Schema describing a playable level in the game.
 */
export const levelSchema = z.object({
  id: z.number(),

  title: z.string(),

  description: z.string().optional(),

  completed: z.boolean(),
  unlocked: z.boolean(),

  icon: z.string().optional(),

  /**
   * IDs of questions included in this level.
   * The questions themselves live elsewhere.
   */
  questionIDs: z.array(z.string()),

  /**
   * Categories covered by this level.
   */
  categories: z.array(categoryEnum),

  difficulty: difficultyEnum,

  /**
   * XP rewarded upon completing the level.
   */
  xpReward: z.number(),
});

/**
 * Cosmetic reward earned by the user.
 */
export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

/**
 * Achievement that may be unlocked based on milestones.
 */
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  unlocked: z.boolean(),
  icon: z.string().optional(),
});

/**
 * Tracks a user's progress within a single level.
 */
export const userProgressSchema = z.object({
  levelId: z.number(),
  completed: z.boolean(),
  questionsAnswered: z.array(z.string()),
  xpEarned: z.number(),

  /**
   * Snapshot of question IDs for consistency.
   */
  questionIDs: z.array(z.string()),
});

/**
 * Represents the current user profile and progress.
 * Nullable to support guest or pre-onboarding states.
 */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),

  currentLevelId: z.number().optional(),
  totalXp: z.number().optional(),

  progress: z.array(userProgressSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  badges: z.array(badgeSchema).optional(),

  /**
   * Consecutive days or sessions completed.
   */
  streak: z.number().optional(),
});

/**
 * Root game state schema.
 * This represents the full in-memory state of the game.
 */
export const gameStateSchema = z.object({
  /**
   * Immutable reference levels used for resets or comparisons.
   */
  initialLevels: z.array(levelSchema),

  /**
   * Active, mutable levels reflecting player progress.
   */
  levels: z.array(levelSchema),

  currentLevelIndex: z.number(),
  currentQuestionIndex: z.number(),

  xp: z.number(),

  completedQuestions: z.array(z.string()),

  /**
   * Full history of answered questions.
   */
  answeredQuestions: z.array(answeredQuestionSchema),

  /**
   * XP gained in the most recent action.
   * Useful for UI feedback.
   */
  recentXP: z.number(),

  /**
   * Most recently earned badge.
   * Nullable when no badge was awarded.
   */
  recentBadge: badgeSchema.nullable(),

  user: userSchema.nullable(),

  tutorialCompleted: z.boolean(),
});

/**
 * Safely validates an unknown value against the game state schema.
 * Returns null if validation fails.
 */
export const validateGameState = (data: unknown) => {
  const parsed = gameStateSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
};

/**
 * TypeScript representation of a validated game state.
 */
export type GameState = z.infer<typeof gameStateSchema>;
