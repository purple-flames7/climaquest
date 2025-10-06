// src/data.allQuestions.ts

import type { Question } from "../types/question";
import { climateScienceQuestions } from "./questions/climateScience";
import { climateJusticeQuestions } from "./questions/climateJustice";
import { queerClimateQuestions } from "./questions/queerClimate";
import { communityKnowledgeQuestions } from "./questions/communityKnowledge";
import { climateSolutionsQuestions } from "./questions/climateSolutions";

const categories = [
  ...climateScienceQuestions,
  ...climateJusticeQuestions,
  ...queerClimateQuestions,
  ...communityKnowledgeQuestions,
  ...climateSolutionsQuestions,
];

export const allQuestionsById: Record<string, Question> = Object.fromEntries(
  categories.map((q) => [q.id, q])
);
