// src/data.allQuestions.ts

import type { Question } from "../types/question";
import { climateScienceQuestions } from "./questions/climate-science";
import { climateJusticeQuestions } from "./questions/climate-justice";
import { queerClimateQuestions } from "./questions/queer-climate";
import { communityKnowledgeQuestions } from "./questions/community-knowledge";
import { climateSolutionsQuestions } from "./questions/climate-solutions";

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
