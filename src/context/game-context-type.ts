import type { Level, Question, User, Badge } from "../types";
import type { AnsweredQuestion } from "../types";

export interface GameState {
  initialLevels: Level[];
  levels: Level[];
  currentLevelIndex: number;
  currentQuestionIndex: number;
  xp: number;
  completedQuestions: string[];
  answeredQuestions: AnsweredQuestion[];
  recentXP?: number;
  recentBadge?: Badge | null;

  user: User;
  tutorialCompleted: boolean;

  // status for fallback/errors
  status: "loading" | "ready" | "error";
  errorMessage: string | null;
}

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

  nextQuestion: () => void;
}
