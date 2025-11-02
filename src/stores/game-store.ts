import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { calculateXP } from "../utils";
import type {
  Level,
  Question,
  AnsweredQuestion,
  Badge,
  User,
  Difficulty,
} from "../types";
import { allQuestionsById } from "../data";
import { useProgressStore } from "./progress-store";

export interface GameStore {
  initialLevels: Level[];
  levels: Level[];
  currentLevelIndex: number;
  currentQuestionIndex: number;
  xp: number;
  completedQuestions: string[];
  answeredQuestions: AnsweredQuestion[];
  recentXP: number;
  recentBadge: Badge | null;
  user: User | null;
  tutorialCompleted: boolean;

  setLevels: (levels: Level[]) => void;
  selectLevel: (index: number) => void;
  currentQuestion: () => Question | null;
  answerQuestion: (
    questionId: string,
    correct: boolean,
    userAnswer: string | boolean | null,
    questionData?: Question
  ) => void;
  resetGame: () => void;
  retryLevel: (index: number) => void;
  setUser: (user: User) => void;
  completeTutorial: () => void;
  nextQuestion: () => void;
}

const gameStoreCreator: StateCreator<GameStore> = (set, get): GameStore => ({
  initialLevels: [],
  levels: [],
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  xp: 0,
  completedQuestions: [],
  answeredQuestions: [],
  recentXP: 0,
  recentBadge: null,
  user: null,
  tutorialCompleted: false,

  setLevels(levels: Level): void {
    set({ initialLevels: levels, levels });
    useProgressStore.getState().setLevels(levels);
  },

  selectLevel(index: number): void {
    set({ currentLevelIndex: index, currentQuestionIndex: 0 });
  },

  currentQuestion(): Question | null {
    const state = get();
    const level = state.levels[state.currentLevelIndex];
    if (!level) return null;
    const questionId = level.questionIDs[state.currentQuestionIndex];
    return questionId ? allQuestionsById[questionId] : null;
  },

  answerQuestion(
    questionId: string,
    correct: boolean,
    userAnswer: string | boolean | null,
    questionData?: Question
  ): void {
    const state = get();
    const level = state.levels[state.currentLevelIndex];
    if (!level) return;

    const baseXP = level.xpReward ?? 10;
    const difficulty: Difficulty = questionData?.difficulty ?? "easy";
    const gainedXP: number = calculateXP(baseXP, difficulty, correct);

    let questionText = "";
    let correctAnswer: string | boolean | null = null;

    if (questionData) {
      switch (questionData.type) {
        case "truefalse":
          questionText = questionData.statement;
          correctAnswer = questionData.answer;
          break;
        case "mcq":
          questionText = questionData.question;
          correctAnswer =
            questionData.options[questionData.correctOptionIndex] ?? null;
          break;
        case "shortanswer":
          questionText = questionData.question;
          correctAnswer = questionData.acceptableAnswers.join(", ");
          break;
      }
    }

    const answered: AnsweredQuestion = {
      id: questionId,
      correct,
      userAnswer,
      questionText,
      correctAnswer,
      type: questionData?.type ?? "mcq",
      options: questionData?.type === "mcq" ? questionData.options : undefined,
    };

    set(
      (s): Partial<GameStore> => ({
        answeredQuestions: [...s.answeredQuestions, answered],
        completedQuestions: [...new Set([...s.completedQuestions, questionId])],
        xp: s.xp + gainedXP,
        recentXP: gainedXP,
        user: s.user
          ? { ...s.user, totalXp: (s.user.totalXp ?? 0) + gainedXP }
          : null,
      })
    );
  },

  resetGame(): void {
    const initial = get().initialLevels;
    set({
      levels: initial,
      currentLevelIndex: 0,
      currentQuestionIndex: 0,
      xp: 0,
      completedQuestions: [],
      answeredQuestions: [],
      recentXP: 0,
      recentBadge: null,
    });
  },

  retryLevel(index: number): void {
    const s = get();
    const levelQuestions: string[] = s.levels[index]?.questionIDs ?? [];
    set({
      currentLevelIndex: index,
      currentQuestionIndex: 0,
      completedQuestions: s.completedQuestions.filter(
        (id) => !levelQuestions.includes(id)
      ),
      answeredQuestions: s.answeredQuestions.filter(
        (aq) => !levelQuestions.includes(aq.id)
      ),
    });
  },

  setUser(user: User): void {
    set({ user });
  },

  completeTutorial(): void {
    set({ tutorialCompleted: true });
  },

  nextQuestion(): void {
    set((s): Partial<GameStore> => {
      const level = s.levels[s.currentLevelIndex];
      if (!level) return s;

      const total = level.questionIDs.length;
      const nextIndex = s.currentQuestionIndex + 1;

      if (nextIndex >= total) {
        useProgressStore.getState().markLevelCompleted(level.id);
        return s;
      }

      return { currentQuestionIndex: nextIndex };
    });
  },
});

export const useGameStore = create<GameStore>()(
  persist<GameStore>(gameStoreCreator, {
    name: "climaquest-game",
    version: 4,
  })
);
