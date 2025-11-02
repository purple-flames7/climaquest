import type { Question } from "./question";
import type { AnswerValue } from "./index";

export interface AnsweredQuestion {
  id: string;
  correct: boolean;
  userAnswer: AnswerValue;
  questionText: string;
  correctAnswer: AnswerValue;
  type: Question["type"];
  options?: string[];
}
