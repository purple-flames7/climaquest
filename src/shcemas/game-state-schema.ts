// src/schemas/game-state-schema.ts
import { z } from "zod";
import { difficultyEnum, categoryEnum } from "./question-schema";

// ---- Related Schemas ----
export const answeredQuestionSchema = z.object({
  id: z.string(),
  correct: z.boolean(),
  userAnswer: z.union([z.string(), z.boolean()]).nullable(),
  questionText: z.string(),
  correctAnswer: z.union([z.string(), z.boolean()]).nullable(),
  type: z.enum(["mcq", "truefalse", "shortanswer"]),
  options: z.array(z.string()).optional(),
});

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

export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  unlocked: z.boolean(),
  icon: z.string().optional(),
});

export const userProgressSchema = z.object({
  levelId: z.number(),
  completed: z.boolean(),
  questionsAnswered: z.array(z.string()),
  xpEarned: z.number(),
  questionIDs: z.array(z.string()),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  currentLevelId: z.number().optional(),
  totalXp: z.number().optional(),
  progress: z.array(userProgressSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  badges: z.array(badgeSchema).optional(),
  streak: z.number().optional(),
});

// ---- Game State ----
export const gameStateSchema = z.object({
  initialLevels: z.array(levelSchema),
  levels: z.array(levelSchema),
  currentLevelIndex: z.number(),
  currentQuestionIndex: z.number(),
  xp: z.number(),
  completedQuestions: z.array(z.string()),
  answeredQuestions: z.array(answeredQuestionSchema),
  recentXP: z.number(),
  recentBadge: badgeSchema.nullable(),
  user: userSchema.nullable(),
  tutorialCompleted: z.boolean(),
});

// ---- Validation Helper ----
export const validateGameState = (data: unknown) => {
  const parsed = gameStateSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
};

export type GameState = z.infer<typeof gameStateSchema>;
