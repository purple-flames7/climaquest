import type { Question } from "../types";
import { climateScienceQuestions } from "./questions/climate-science";
import { climateJusticeQuestions } from "./questions/climate-justice";
import { queerClimateQuestions } from "./questions/queer-climate";
import { communityKnowledgeQuestions } from "./questions/community-knowledge";
import { climateSolutionsQuestions } from "./questions/climate-solutions";
import { questionsArraySchema, type ValidQuestion } from "../schemas";

/**
 * Combine all questions from different categories
 */
const allQuestions: Question[] = [
  ...climateScienceQuestions,
  ...climateJusticeQuestions,
  ...queerClimateQuestions,
  ...communityKnowledgeQuestions,
  ...climateSolutionsQuestions,
];

/**
 * Validate all questions against the schema
 */
const result = questionsArraySchema.safeParse(allQuestions);
if (!result.success) {
  console.error("Question schema validation failed:", result.error.format());
  throw new Error("Invalid question data detected. See console for details.");
}

/**
 * Questions that are validated and safe to use
 */
export const validateQuestions: ValidQuestion[] = result.data;

/**
 * Quick lookup by question ID for use in game store
 */
export const allQuestionsById: Record<string, Question> = Object.fromEntries(
  validateQuestions.map((q) => [String(q.id), { ...q, id: String(q.id) }])
);
