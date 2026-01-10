import { z } from "zod";

// Supported question categories.
export const categoryEnum = z.enum([
  "Climate Justice & Inequality",
  "Climate Science",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
]);

/**
 * Difficulty levels used for progression and scoring.
 */
export const difficultyEnum = z.enum(["easy", "medium", "hard"]);

/**
 * Schema for all supported question types.
 * Uses a discriminated union on the `type` field to ensure
 * type-safe branching and validation at runtime.
 */
export const questionSchema = z.discriminatedUnion("type", [
  /**
   * Multiple-choice question.
   */
  z.object({
    id: z.string(),

    type: z.literal("mcq"),

    question: z.string(),

    /**
     * List of answer options.
     * Must contain at least two options.
     */
    options: z.array(z.string()).min(2),

    /**
     * Index of the correct option in the `options` array.
     */
    correctOptionIndex: z.number().int().min(0),

    explanation: z.string().optional(),

    category: categoryEnum,
    difficulty: difficultyEnum,
  }),

  /**
   * True / False question.
   */
  z.object({
    id: z.string(),

    type: z.literal("truefalse"),

    statement: z.string(),

    /**
     * Correct answer to the statement.
     */
    answer: z.boolean(),

    explanation: z.string().optional(),

    category: categoryEnum,
    difficulty: difficultyEnum,
  }),

  /**
   * Short answer question.
   */
  z.object({
    id: z.string(),

    type: z.literal("shortanswer"),

    question: z.string(),

    /**
     * Acceptable answers for validation.
     * Comparison logic (case, whitespace, synonyms)
     * should be handled outside the schema
     */
    acceptableAnswers: z.array(z.string()).min(1),

    explanation: z.string().optional(),

    category: categoryEnum,
    difficulty: difficultyEnum,
  }),
]);

/**
 * Schema for validating a list of questions.
 */
export const questionsArraySchema = z.array(questionSchema);

/**
 * TypeScript representation of a validated question.
 * Safe to use throughout the app once parsed by Zod.
 */
export type ValidQuestion = z.infer<typeof questionSchema>;
