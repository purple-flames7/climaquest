// src/context/game-provider.tsx
import React, { useEffect, useReducer, useMemo } from "react";
import type { ReactNode } from "react";
import type { Level, User, Question, AnsweredQuestion } from "../types";
import {
  levels as initialLevels,
  pickQuestionsForUser,
  allQuestionsById,
} from "../data";
import {
  GameStateContext,
  GameDispatchContext,
  LegacyGameContext,
} from "./game-context-core";
import { Fallback } from "../components";
import { gameReducer } from "./game-reducer";
import type { GameState } from "./game-context-type";
import { loadGameState, saveGameState, resetGameState } from "../utils/storage";

const initialUser: User = {
  id: "1",
  name: "Player",
  avatar: undefined,
  currentLevelId: 1,
  totalXp: 0,
  progress: [],
  achievements: [],
  badges: [],
  streak: 0,
};

const createInitialState = (initialLevelsParam: Level[]): GameState => ({
  initialLevels: initialLevelsParam,
  levels: initialLevelsParam,
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  xp: 0,
  completedQuestions: [],
  answeredQuestions: [] as AnsweredQuestion[],
  recentXP: 0,
  recentBadge: null,
  tutorialCompleted: false,
  user: initialUser,
  status: "loading",
  errorMessage: null,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialLevels, (levels) => {
    const initial = createInitialState(levels);
    const persisted = loadGameState();

    // If persisted state exists and is valid, use it; otherwise, reset
    return persisted ?? resetGameState(initial);
  });

  // Save state automatically whenever it changes and is ready
  useEffect(() => {
    if (state.status === "ready") saveGameState(state);
  }, [state]);

  // Mark as ready on mount
  useEffect(() => {
    dispatch({ type: "SET_READY" });
  }, []);

  // Online/offline handling
  useEffect(() => {
    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            message: "You're offline. Please check your internet connection.",
          },
        });
      } else if (
        state.status === "error" &&
        state.errorMessage?.includes("offline")
      ) {
        window.location.reload();
      }
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [state.status, state.errorMessage]);

  // Derived values
  const currentLevel = state.levels[state.currentLevelIndex];
  const currentQuestionId =
    currentLevel?.questionIDs?.[state.currentQuestionIndex];
  const currentQuestion: Question | undefined =
    allQuestionsById[currentQuestionId];

  // Memoized action dispatchers
  const selectLevel = React.useCallback(
    (index: number) => {
      const level = state.levels[index];
      let questionIDs = level?.questionIDs;
      if (level && !questionIDs?.length) {
        questionIDs = pickQuestionsForUser(level, {}, false, 5);
      }
      dispatch({ type: "SELECT_LEVEL", payload: { index, questionIDs } });
    },
    [state.levels]
  );

  const answerQuestion = React.useCallback(
    (
      questionId: string,
      correct: boolean,
      userAnswer: string | boolean,
      questionData?: Question
    ) => {
      dispatch({
        type: "ANSWER_QUESTION",
        payload: { questionId, correct, userAnswer, questionData },
      });
    },
    []
  );

  const retryLevel = React.useCallback(
    (index: number) => dispatch({ type: "RETRY_LEVEL", payload: { index } }),
    []
  );

  const resetGame = React.useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const updateUser = React.useCallback(
    (u: User) => dispatch({ type: "SET_USER", payload: { user: u } }),
    []
  );

  const completeTutorial = React.useCallback(() => {
    saveGameState({ ...state, tutorialCompleted: true });
    dispatch({ type: "COMPLETE_TUTORIAL" });
  }, [state]);

  const nextQuestion = React.useCallback(
    () => dispatch({ type: "NEXT_QUESTION" }),
    []
  );

  // Compose legacy context
  const legacyValue = useMemo(
    () => ({
      levels: state.levels,
      currentLevelIndex: state.currentLevelIndex,
      currentQuestionIndex: state.currentQuestionIndex,
      currentQuestion,
      xp: state.xp,
      completedQuestions: state.completedQuestions,
      answeredQuestions: state.answeredQuestions,
      recentXP: state.recentXP,
      recentBadge: state.recentBadge,
      user: state.user,
      updateUser,
      selectLevel,
      answerQuestion,
      resetGame,
      retryLevel,
      tutorialCompleted: state.tutorialCompleted,
      completeTutorial,
      nextQuestion,
    }),
    [
      state.levels,
      state.currentLevelIndex,
      state.currentQuestionIndex,
      currentQuestion,
      state.xp,
      state.completedQuestions,
      state.answeredQuestions,
      state.recentXP,
      state.recentBadge,
      state.user,
      updateUser,
      selectLevel,
      answerQuestion,
      resetGame,
      retryLevel,
      state.tutorialCompleted,
      completeTutorial,
      nextQuestion,
    ]
  );

  if (state.status === "loading") return <Fallback type="loading" />;
  if (state.status === "error")
    return (
      <Fallback
        type="error"
        message={state.errorMessage ?? undefined}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        <LegacyGameContext.Provider value={legacyValue}>
          {children}
        </LegacyGameContext.Provider>
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  );
};
