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

/**
 * The central game store interface.
 * Tracks both mutable game state and provides actions
 * for progression, user interactions, and tutorial completion.
 */
export interface GameStore {
  // --- Core state ---
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

  // --- Actions ---
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

/**
 * Core Zustand state creator.
 * Encapsulates all game logic and progression rules.
 */
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

  /**
   * Initializes the store with a set of levels.
   * Also updates the progress store to keep persistence in sync.
   */
  setLevels(levels: Level[]): void {
    set({ initialLevels: levels, levels });
    useProgressStore.getState().setLevels(levels);
  },

  /** Sets the current level and resets question index */
  selectLevel(index: number): void {
    set({ currentLevelIndex: index, currentQuestionIndex: 0 });
  },

  /**
   * Returns the current question object, or null if invalid.
   * Resolves the question from allQuestionsById using the current level and question index.
   */
  currentQuestion(): Question | null {
    const state = get();
    const level = state.levels[state.currentLevelIndex];
    if (!level) return null;
    const questionId = level.questionIDs[state.currentQuestionIndex];
    return questionId ? allQuestionsById[questionId] : null;
  },

  /**
   * Handles the logic when a question is answered.
   * - Calculates XP
   * - Records the answered question
   * - Updates completed questions
   * - Updates user's total XP
   */
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

    // Extract question snapshot for persistence and review
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

  /** Resets the game to the initial state */
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

  /**
   * Retries a level:
   * - Resets current question index
   * - Removes any progress from that level in completed and answered questions
   */
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

  /** Updates the current user */
  setUser(user: User): void {
    set({ user });
  },

  /** Marks the tutorial as completed */
  completeTutorial(): void {
    set({ tutorialCompleted: true });
  },

  /**
   * Advances to the next question.
   * If at the end of the level, marks the level as complete in progress store.
   */
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

/**
 * Persisted game store.
 * Zustand store with local persistence via `zustand/middleware`.
 */
export const useGameStore = create<GameStore>()(
  persist<GameStore>(gameStoreCreator, {
    name: "climaquest-game",
    version: 4,
  })
);
