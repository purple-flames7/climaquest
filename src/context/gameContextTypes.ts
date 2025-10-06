// src/ context/ gameContextTypes.ts

import type { Level } from "../types/level";
import type { Question } from "../types/question";

export interface GameContextProps {
  levels: Level[];
  currentLevelIndex: number;
  currentQuestionIndex: number;
  currentQuestion?: Question;
  xp: number;
  completedQuestions: string[];
  selectLevel: (index: number) => void;
  answerQuestion: (questionId: string, correct: boolean) => void;
  resetGame: () => void;
}
