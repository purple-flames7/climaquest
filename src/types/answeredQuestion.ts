// src/types/answeredQuestion.ts
import type { Question } from "./question";

export interface AnsweredQuestion {
  id: string;
  correct: boolean;
  userAnswer: string | boolean | null;
  questionText: string;
  correctAnswer: string | boolean | null;
  type?: Question["type"];
  options?: string[];
}
