import { useState } from "react";
import type { ReactNode } from "react";
import type { Level, User } from "../types";
import { levels as initialLevels, pickQuestionsForUser } from "../data/levels";
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

  // 🟢 Select Level — generate and store questions once
  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);

    setLevels((prevLevels) => {
      const updatedLevels = [...prevLevels];
      const level = updatedLevels[index];

      // ✅ Only generate questions if not already set
      if (level.questionIDs.length === 0) {
        const questionIDs = pickQuestionsForUser(level, {}, false, 5);
        level.questionIDs = questionIDs;
      }

      // ✅ Store chosen questions in user progress if not already tracked
      setUser((prev) => {
        const alreadyTracked = prev.progress.find(
          (p) => p.levelId === level.id
        );
        if (alreadyTracked) return prev;

        return {
          ...prev,
          progress: [
            ...prev.progress,
            {
              levelId: level.id,
              xpEarned: 0,
              completed: false,
              questionsAnswered: [],
              questionIDs: [...level.questionIDs], // 🔒 Save for reuse
            },
          ],
        };
      });

      return updatedLevels;
    });
  };

  // 🟢 Answer Question — XP + progress handling
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

  // 🟢 Retry Level — reuse same questions from stored progress
  const retryLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);

    setLevels((prevLevels) => {
      const updated = [...prevLevels];
      const level = updated[index];

      const savedProgress = user.progress.find((p) => p.levelId === level.id);
      if (savedProgress?.questionIDs?.length) {
        level.questionIDs = [...savedProgress.questionIDs];
      }

      updated[index] = { ...level, completed: false };
      return updated;
    });
  };

  // 🟢 Full Reset
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
        retryLevel,
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
