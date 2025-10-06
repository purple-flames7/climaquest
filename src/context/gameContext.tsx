// src/context/gameContext.ts

import { useState } from "react";
import type { ReactNode } from "react";
import type { Level } from "../types/level";
import { levels as initialLevels } from "../data/levels";
import { allQuestionsById } from "../data/allQuestions";
import { GameContext } from "./gameContextCore";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const currentLevel = levels[currentLevelIndex];
  const currentQuestionId = currentLevel.questionIDs[currentQuestionIndex];
  const currentQuestion = allQuestionsById[currentQuestionId];

  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
  };

  const answerQuestion = (questionId: string, correct: boolean) => {
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions((prev) => [...prev, questionId]);
      if (correct) setXp((prev) => prev + (currentLevel.xpReward ?? 10));
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    const allAnswered = currentLevel.questionIDs.every(
      (qId) => completedQuestions.includes(qId) || qId === questionId
    );

    if (allAnswered) {
      const nextLevelIndex = currentLevelIndex + 1;
      setLevels((prev) =>
        prev.map((lvl, idx) => {
          if (idx === currentLevelIndex) return { ...lvl, completed: true };
          if (idx === nextLevelIndex) return { ...lvl, unlocked: true };
          return lvl;
        })
      );
    }
  };

  const resetGame = () => {
    setLevels(initialLevels);
    setCurrentLevelIndex(0);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setXp(0);
  };

  return (
    <GameContext.Provider
      value={{
        levels,
        currentLevelIndex,
        currentQuestionIndex,
        currentQuestion,
        xp,
        completedQuestions,
        selectLevel,
        answerQuestion,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
