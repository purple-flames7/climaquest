// src/ context/ gameContextTypes.ts

import type { Level } from "../types/level";
import type { Question } from "../types/question";
import type { User } from "../types/user";

export interface GameContextProps {
  levels: Level[];
  currentLevelIndex: number;
  currentQuestionIndex: number;
  currentQuestion?: Question;
  xp: number;
  completedQuestions: string[];
  user: User;
  updateUser: (updateUser: User) => void;
  selectLevel: (index: number) => void;
  answerQuestion: (questionId: string, correct: boolean) => void;
  resetGame: () => void;
  retryLevel: (index: number) => void;
  tutorialCompleted: boolean;
  completeTutorial: () => void;
}
