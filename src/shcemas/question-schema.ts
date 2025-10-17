import { z } from "zod";

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("mcq"),
    question: z.string(),
    options: z.array(z.string()).min(2),
    correctOptionIndex: z.number().min(0),
    explanation: z.string(),
    category: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
  }),
  z.object({
    id: z.string(),
    type: z.literal("truefalse"),
    statement: z.string(),
    answer: z.boolean(),
    explanation: z.string(),
    category: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
  }),
  z.object({
    id: z.string(),
    type: z.literal("shortanswer"),
    question: z.string(),
    acceptableAnswers: z.array(z.string()).min(1),
    explanation: z.string(),
    category: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
  }),
]);

export const questionsArraySchema = z.array(questionSchema);

export type ValidQuestion = z.infer<typeof questionSchema>;
