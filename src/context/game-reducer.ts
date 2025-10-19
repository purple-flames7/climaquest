import type { GameAction } from "./game-actions";
import type { GameState } from "./game-context-type";
import { calculateXP } from "../utils";
import type { AnsweredQuestion } from "../types";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INIT":
      return { ...state, status: "loading" };
    case "SET_READY":
      return { ...state, status: "ready", errorMessage: null };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload?.message ?? null,
      };

    case "SELECT_LEVEL": {
      const index = action.payload.index;
      const nextLevels = [...state.levels];
      const level = nextLevels[index];
      if (!level) return state;
      if (!level.questionIDs?.length && action.payload.questionIDs) {
        level.questionIDs = action.payload.questionIDs;
      }

      return {
        ...state,
        currentLevelIndex: index,
        currentQuestionIndex: 0,
        completedQuestions: [],
        answeredQuestions: [],
        levels: nextLevels,
      };
    }

    case "ANSWER_QUESTION": {
      const { questionId, correct, userAnswer, questionData } = action.payload;

      // Prevent re-answering same question
      if (state.completedQuestions.includes(questionId)) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }

      const currentLevel =
        state.currentLevelIndex !== null
          ? state.levels[state.currentLevelIndex]
          : undefined;

      const baseXp = currentLevel?.xpReward ?? 10;
      const newXp =
        state.xp +
        calculateXP(baseXp, questionData?.difficulty ?? "easy", correct);

      const questionText =
        questionData?.type === "truefalse"
          ? questionData.statement ?? ""
          : questionData?.question ?? "";

      let correctAnswer: string | boolean | null = null;

      if (questionData) {
        if (questionData.type === "mcq") {
          correctAnswer =
            questionData.options?.[questionData.correctOptionIndex] ?? null;
        } else if (questionData.type === "truefalse") {
          if (typeof questionData.answer === "boolean") {
            correctAnswer = questionData.answer ? "True" : "False";
          } else {
            correctAnswer = questionData.answer ?? null;
          }
        } else if (questionData.type === "shortanswer") {
          correctAnswer = questionData.acceptableAnswers?.[0] ?? null;
        }
      }

      let formattedUserAnswer: string | boolean | null = userAnswer as
        | string
        | boolean
        | null;

      if (questionData?.type === "mcq" && typeof userAnswer === "string") {
        const letterIndex = userAnswer.toUpperCase().charCodeAt(0) - 65;
        if (
          !isNaN(letterIndex) &&
          questionData.options &&
          questionData.options[letterIndex]
        ) {
          formattedUserAnswer = questionData.options[letterIndex];
        }
      } else if (questionData?.type === "truefalse") {
        formattedUserAnswer =
          userAnswer === true || userAnswer === "true" ? "True" : "False";
      }

      const newAnswered: AnsweredQuestion = {
        id: questionId,
        correct,
        userAnswer: formattedUserAnswer,
        questionText,
        correctAnswer,
        type: questionData?.type ?? "mcq",
        options:
          questionData?.type === "mcq" ? questionData.options ?? [] : undefined,
      };

      return {
        ...state,
        xp: newXp,
        completedQuestions: [...state.completedQuestions, questionId],
        answeredQuestions: [...state.answeredQuestions, newAnswered],
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case "RETRY_LEVEL": {
      const index = action.payload.index;
      const nextLevels = [...state.levels];
      const level = nextLevels[index];
      const savedProgress = state.user.progress.find(
        (p) => p.levelId === level.id
      );
      if (savedProgress?.questionIDs?.length)
        level.questionIDs = [...savedProgress.questionIDs];
      nextLevels[index] = { ...level, completed: false };

      return {
        ...state,
        currentLevelIndex: index,
        currentQuestionIndex: 0,
        completedQuestions: [],
        answeredQuestions: [],
        levels: nextLevels,
      };
    }

    case "RESET_GAME":
      return {
        ...state,
        levels: state.initialLevels,
        currentLevelIndex: 0,
        currentQuestionIndex: 0,
        completedQuestions: [],
        answeredQuestions: [],
        xp: 0,
        user: {
          id: "1",
          name: "Player",
          avatar: undefined,
          currentLevelId: 1,
          totalXp: 0,
          progress: [],
          achievements: [],
          badges: [],
          streak: 0,
        },
        tutorialCompleted: false,
      };

    case "SET_USER":
      return { ...state, user: action.payload.user };

    case "COMPLETE_TUTORIAL":
      return { ...state, tutorialCompleted: true };

    default:
      return state;
  }
}
