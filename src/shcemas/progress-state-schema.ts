// src/schemas/progress-state-schema.ts
import { z } from "zod";
import { categoryEnum, difficultyEnum } from "./question-schema";

// Mirror of Level type, but lightweight for persistence validation
export const levelSchema = z.object({
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

// Zustand store structure
export const progressStateSchema = z.object({
  unlockedLevels: z.array(z.number()),
  completedLevels: z.array(z.number()),
  totalLevels: z.number(),
  levels: z.array(levelSchema),
});

export type ProgressState = z.infer<typeof progressStateSchema>;

export const validateProgressState = (data: unknown): ProgressState | null => {
  const parsed = progressStateSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
};
