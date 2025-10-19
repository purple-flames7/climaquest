import { z } from "zod";
import type { GameState } from "../context";

export const answeredQuestionSchema = z.object({
  id: z.string(),
  correct: z.boolean(),
  userAnswer: z.union([z.string(), z.boolean()]).nullable(),
  questionText: z.string(),
  correctAnswer: z.union([z.string(), z.boolean()]).nullable(),
  type: z.enum(["mcq", "truefalse", "shortanswer"]),
  options: z.array(z.string()).optional(),
});

export const gameStateSchema: z.ZodType<GameState> = z.object({
  initialLevels: z.array(z.any()),
  levels: z.array(z.any()),
  currentLevelIndex: z.number().min(0),
  currentQuestionIndex: z.number().min(0),
  xp: z.number().min(0),
  completedQuestions: z.array(z.string()),
  answeredQuestions: z.array(answeredQuestionSchema),
  recentXP: z.number().optional(),
  recentBadge: z.any().nullable().optional(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
    currentLevelId: z.number(),
    totalXp: z.number(),
    progress: z.array(z.any()),
    achievements: z.array(z.any()),
    badges: z.array(z.any()),
    streak: z.number(),
  }),
  tutorialCompleted: z.boolean(),
  status: z.enum(["loading", "ready", "error"]),
  errorMessage: z.string().nullable(),
  lastUpdated: z.number().optional(),
  version: z.number().optional(),
});

export const validateGameState = (data: unknown): GameState | null => {
  const parsed = gameStateSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
};
