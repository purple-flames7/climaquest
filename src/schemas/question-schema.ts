// src/schemas/question-schema.ts
import { z } from "zod";

export const categoryEnum = z.enum([
  "Climate Justice & Inequality",
  "Climate Science",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
]);

export const difficultyEnum = z.enum(["easy", "medium", "hard"]);

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("mcq"),
    question: z.string(),
    options: z.array(z.string()).min(2),
    correctOptionIndex: z.number().min(0),
    explanation: z.string().optional(),
    category: categoryEnum,
    difficulty: difficultyEnum,
  }),
  z.object({
    id: z.string(),
    type: z.literal("truefalse"),
    statement: z.string(),
    answer: z.boolean(),
    explanation: z.string().optional(),
    category: categoryEnum,
    difficulty: difficultyEnum,
  }),
  z.object({
    id: z.string(),
    type: z.literal("shortanswer"),
    question: z.string(),
    acceptableAnswers: z.array(z.string()).min(1),
    explanation: z.string().optional(),
    category: categoryEnum,
    difficulty: difficultyEnum,
  }),
]);

export const questionsArraySchema = z.array(questionSchema);

export type ValidQuestion = z.infer<typeof questionSchema>;
