import type { Level, Question, User, Badge } from "../types";
import type { AnsweredQuestion } from "./game-provider";
export interface GameContextProps {
  levels: Level[];
  currentLevelIndex: number;
  currentQuestionIndex: number;
  currentQuestion?: Question;
  xp: number;
  completedQuestions: string[];
  answeredQuestions: AnsweredQuestion[];
  recentXP?: number;
  recentBadge?: Badge | null;

  user: User;
  updateUser: (updateUser: User) => void;

  selectLevel: (index: number) => void;

  answerQuestion: (
    questionId: string,
    correct: boolean,
    userAnswer: string | boolean,
    questionData?: Question
  ) => void;

  resetGame: () => void;
  retryLevel: (index: number) => void;

  tutorialCompleted: boolean;
  completeTutorial: () => void;
}
