// src/context/gameContext.tsx

import { useState } from "react";
import type { ReactNode } from "react";
import type { Level } from "../types/level";
import type { User } from "../types/user";
import { levels as initialLevels } from "../data/levels";
import { allQuestionsById } from "../data/allQuestions";
import { GameContext } from "./gameContextCore";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(() => {
    const stored = localStorage.getItem("tutorialCompleted");
    return stored ? JSON.parse(stored) : false;
  });

  const [user, setUser] = useState<User>({
    id: "1",
    name: "Player",
    avatar: undefined,
    currentLevelId: 1,
    totalXp: 0,
    progress: [],
    achievements: [],
    streak: 0,
  });

  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const completeTutorial = () => {
    setTutorialCompleted(true);
    localStorage.setItem("tutorialCompleted", "true");
  };

  const currentLevel = levels[currentLevelIndex];
  const currentQuestionId = currentLevel.questionIDs[currentQuestionIndex];
  const currentQuestion = allQuestionsById[currentQuestionId];

  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
  };

  const answerQuestion = (questionId: string, correct: boolean) => {
    // Mark question as completed
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions((prev) => [...prev, questionId]);
      if (correct) setXp((prev) => prev + (currentLevel.xpReward ?? 10));
    }

    // Move to next question
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    // Check if all questions in level are answered
    const allAnswered = currentLevel.questionIDs.every(
      (qId) => completedQuestions.includes(qId) || qId === questionId
    );

    if (allAnswered) {
      // Update levels: mark current as completed, unlock next
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
    setUser({
      id: "1",
      name: "Player",
      avatar: undefined,
      currentLevelId: 1,
      totalXp: 0,
      progress: [],
      achievements: [],
      streak: 0,
    });
    localStorage.removeItem("tutorialCompleted");
    setTutorialCompleted(false);
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
        tutorialCompleted,
        completeTutorial,
        user,
        updateUser,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
