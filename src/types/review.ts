import type { AnswerValue } from "./index";

export interface ReviewEntry {
  questionId: string;
  userAnswer: Exclude<AnswerValue, null>;
  correct: boolean;
  levelId: string;
}
