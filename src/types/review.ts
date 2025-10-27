export interface ReviewEntry {
  questionId: string;
  // accept boolean for true/false and string for others
  userAnswer: string | boolean;
  correct: boolean;
  levelId: string;
}
