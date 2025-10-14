// src/types/review.ts

export interface ReviewEntry {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  levelId: number;
}
