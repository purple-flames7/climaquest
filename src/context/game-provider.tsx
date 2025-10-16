// src/context/GameProvider.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import type { Level, User, Question, Badge } from "../types";
import { levels as initialLevels, pickQuestionsForUser } from "../data/levels";
import { allQuestionsById } from "../data/all-questions";
import { GameContext } from "./game-context-core";
import { badges } from "../data/badges";

// --- Unified AnsweredQuestion type
export interface AnsweredQuestion {
  id: string;
  correct: boolean;
  userAnswer: string | boolean | null;
  questionText: string;
  correctAnswer: string | boolean | null;
  type: "mcq" | "truefalse" | "shortanswer";
  options?: string[] | null;
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);

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
    badges: [],
    streak: 0,
  });

  const [recentXP, setRecentXP] = useState<number>(0);
  const [recentBadge, setRecentBadge] = useState<Badge[] | null>(null);

  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const completeTutorial = () => {
    setTutorialCompleted(true);
    localStorage.setItem("tutorialCompleted", "true");
  };

  const currentLevel = levels[currentLevelIndex];
  const currentQuestionId = currentLevel.questionIDs[currentQuestionIndex];
  const currentQuestion = allQuestionsById[currentQuestionId];

  const normalizeAnswer = (
    answer: string | boolean | null | undefined
  ): string | boolean | null => {
    if (typeof answer === "boolean") return answer ? "True" : "False";
    if (typeof answer === "string") {
      if (answer.toLowerCase() === "true") return "True";
      if (answer.toLowerCase() === "false") return "False";
      return answer;
    }
    return null;
  };

  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setAnsweredQuestions([]);

    setLevels((prevLevels) => {
      const updatedLevels = [...prevLevels];
      const level = updatedLevels[index];

      if (level.questionIDs.length === 0) {
        const questionIDs = pickQuestionsForUser(level, {}, false, 5);
        level.questionIDs = questionIDs;
      }

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
              questionIDs: [...level.questionIDs],
            },
          ],
        };
      });

      return updatedLevels;
    });
  };

  const answerQuestion = (
    questionId: string,
    correct: boolean,
    userAnswer: string | boolean,
    questionData?: Question
  ) => {
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions((prev) => [...prev, questionId]);

      // Award XP per question
      const xpForQuestion = correct ? currentLevel.xpReward ?? 10 : 0;
      setXp((prev) => prev + xpForQuestion);

      // Prepare question data
      const questionText =
        questionData?.type === "truefalse"
          ? questionData.statement
          : questionData?.question ?? "";

      let correctAnswer: string | boolean | null = null;
      switch (questionData?.type) {
        case "mcq":
          correctAnswer =
            questionData.options?.[questionData.correctOptionIndex] ?? null;
          break;
        case "truefalse":
          correctAnswer = normalizeAnswer(questionData.answer);
          break;
        case "shortanswer":
          correctAnswer = questionData.acceptableAnswers?.[0] ?? null;
          break;
      }

      // Format user answer
      let formattedUserAnswer: string | boolean | null = userAnswer;
      if (questionData?.type === "mcq") {
        const letterIndex =
          typeof userAnswer === "string"
            ? userAnswer.toUpperCase().charCodeAt(0) - 65
            : Number(userAnswer);
        if (!isNaN(letterIndex) && questionData.options?.[letterIndex]) {
          formattedUserAnswer = questionData.options[letterIndex];
        }
      } else if (questionData?.type === "truefalse") {
        formattedUserAnswer =
          userAnswer === true || userAnswer === "true" ? "True" : "False";
      } else if (questionData?.type === "shortanswer") {
        formattedUserAnswer = String(userAnswer).trim();
      }

      setAnsweredQuestions((prev) => [
        ...prev,
        {
          id: questionId,
          correct,
          userAnswer: formattedUserAnswer,
          questionText,
          correctAnswer,
          type: questionData?.type ?? "mcq",
          options:
            questionData?.type === "mcq" ? questionData.options ?? [] : null,
        },
      ]);
    }

    // Progression logic
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    const allAnswered = currentLevel.questionIDs.every(
      (qId) => completedQuestions.includes(qId) || qId === questionId
    );

    if (allAnswered) {
      const nextLevelIndex = currentLevelIndex + 1;

      // Mark level completed and unlock next
      setLevels((prev) =>
        prev.map((lvl, idx) => {
          if (idx === currentLevelIndex) return { ...lvl, completed: true };
          if (idx === nextLevelIndex) return { ...lvl, unlocked: true };
          return lvl;
        })
      );

      // --- Calculate XP for this level
      const earnedXP = currentLevel.questionIDs.reduce((sum, qId) => {
        const ans = answeredQuestions.find((a) => a.id === qId);
        return sum + ((ans?.correct ? currentLevel.xpReward ?? 10 : 0) || 0);
      }, 0);
      setRecentXP(earnedXP);

      // --- Calculate badges
      const newBadges: Badge[] = [];
      const alreadyBadgeIds = user.badges?.map((b) => b.id) ?? [];

      if (!alreadyBadgeIds.includes("eco-starter"))
        newBadges.push(badges.find((b) => b.id === "eco-starter")!);
      const allCorrect = answeredQuestions.every((a) => a.correct);
      if (allCorrect && !alreadyBadgeIds.includes("perfect-score"))
        newBadges.push(badges.find((b) => b.id === "perfect-score")!);

      const updatedTotalXP = user.totalXp + earnedXP;
      if (updatedTotalXP >= 500 && !alreadyBadgeIds.includes("xp-500"))
        newBadges.push(badges.find((b) => b.id === "xp-500")!);

      // --- Update user
      setRecentBadge(newBadges.length > 0 ? newBadges : null);
      setUser((prev) => ({
        ...prev,
        totalXp: updatedTotalXP,
        badges: [...(prev.badges ?? []), ...newBadges],
      }));

      // Do NOT auto-navigate — rewards screen navigation is manual
    }
  };

  const retryLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setAnsweredQuestions([]);

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

  const resetGame = () => {
    setLevels(initialLevels);
    setCurrentLevelIndex(0);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setAnsweredQuestions([]);
    setXp(0);
    setUser({
      id: "1",
      name: "Player",
      avatar: undefined,
      currentLevelId: 1,
      totalXp: 0,
      progress: [],
      achievements: [],
      badges: [],
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
        answeredQuestions,
        recentXP,
        recentBadge,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
