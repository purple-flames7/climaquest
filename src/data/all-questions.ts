import type { Question } from "../types";
import { climateScienceQuestions } from "./questions/climate-science";
import { climateJusticeQuestions } from "./questions/climate-justice";
import { queerClimateQuestions } from "./questions/queer-climate";
import { communityKnowledgeQuestions } from "./questions/community-knowledge";
import { climateSolutionsQuestions } from "./questions/climate-solutions";
import {
  questionsArraySchema,
  type ValidQuestion,
} from "../shcemas/question-schema";

const categories = [
  ...climateScienceQuestions,
  ...climateJusticeQuestions,
  ...queerClimateQuestions,
  ...communityKnowledgeQuestions,
  ...climateSolutionsQuestions,
];

const result = questionsArraySchema.safeParse(categories);

if (!result.success) {
  console.error(" Question schema validation failed:", result.error.format());
  throw new Error("Invalid question data detected. See console for details.");
}

export const validateQuestions: ValidQuestion[] = result.data;

export const allQuestionsById: Record<string, Question> = Object.fromEntries(
  validateQuestions.map((q) => [String(q.id), { ...q, id: String(q.id) }])
);
