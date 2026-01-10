// src/schemas/progress-state-schema.ts
import { z } from "zod";
import { categoryEnum, difficultyEnum } from "./question-schema";

/**
 * Lightweight representation of a level used for
 * progress persistence and restoration.
 *
 * This intentionally mirrors the Level schema while
 * avoiding unnecessary runtime dependencies.
 */
export const progressLevelSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  unlocked: z.boolean(),
  icon: z.string().optional(),
  questionIDs: z.array(z.string()),
  categories: z.array(categoryEnum),
  difficulty: difficultyEnum,
  xpReward: z.number(),
});

/**
 * Schema describing the persisted progress state.
 * This is typically stored in localStorage or similar.
 */
export const progressStateSchema = z.object({
  /**
   * IDs of levels currently unlocked for the user.
   */
  unlockedLevels: z.array(z.number()),

  /**
   * IDs of levels the user has completed.
   */
  completedLevels: z.array(z.number()),

  /**
   * Total number of levels available at the time of persistence.
   * Useful for detecting version mismatches.
   */
  totalLevels: z.number(),

  /**
   * Snapshot of level state at time of persistence.
   */
  levels: z.array(progressLevelSchema),
});

/**
 * TypeScript representation of a validated progress state.
 */
export type ProgressState = z.infer<typeof progressStateSchema>;

/**
 * Safely validates unknown persisted data against the progress state schema.
 * Returns null if validation fails.
 */
export const validateProgressState = (data: unknown): ProgressState | null => {
  const parsed = progressStateSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
};
