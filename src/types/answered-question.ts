import type { Question } from "./question";

export interface AnsweredQuestion {
  id: string;
  correct: boolean;
  // userAnswer can be string (mcq/shortanswer), boolean (truefalse), or null
  userAnswer: string | boolean | null;
  questionText: string;
  // correctAnswer can be string (mcq / shortanswer list joined), boolean (truefalse), or null
  correctAnswer: string | boolean | null;
  type: Question["type"];
  options?: string[]; // present for mcq
}
