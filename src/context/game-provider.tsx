// src/context/GameProvider.tsx
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Level, User, Question, Badge } from "../types";
import {
  levels as initialLevels,
  pickQuestionsForUser,
  allQuestionsById,
} from "../data";
import { GameContext } from "./game-context-core";
import {
  getLocalStorageData,
  setLocalStorageData,
  removeLocalStorageData,
  sanitizeInput,
} from "../utils";
import { Fallback } from "../components";

// Unified AnsweredQuestion type
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
  const [recentXP] = useState<number>(0);
  const [recentBadge] = useState<Badge[] | null>(null);

  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(() =>
    getLocalStorageData<boolean>("tutorialCompleted", false)
  );

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

  // Status for fallback
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialization
  useEffect(() => {
    try {
      const data = getLocalStorageData<boolean>("tutorialCompleted", false);
      if (typeof data !== "boolean")
        throw new Error("Corrupted localStorage data detected.");
      setStatus("ready");
    } catch (error: unknown) {
      if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("Failed to initialize game data.");
      setStatus("error");
    }
  }, []);

  // Offline detection
  useEffect(() => {
    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        setErrorMessage(
          "You're offline. Please check your internet connection."
        );
        setStatus("error");
      } else if (status === "error" && errorMessage?.includes("offline")) {
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
  }, [status, errorMessage]);

  // Derived values
  const currentLevel = levels[currentLevelIndex];
  const currentQuestionId = currentLevel?.questionIDs?.[currentQuestionIndex];
  const currentQuestion: Question | undefined =
    allQuestionsById[currentQuestionId];

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

  const completeTutorial = () => {
    setTutorialCompleted(true);
    setLocalStorageData("tutorialCompleted", true);
  };
  const updateUser = (updatedUser: User) => setUser(updatedUser);

  // Level & Question logic
  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setAnsweredQuestions([]);

    setLevels((prevLevels) => {
      const updatedLevels = [...prevLevels];
      const level = updatedLevels[index];

      if (!level.questionIDs.length) {
        level.questionIDs = pickQuestionsForUser(level, {}, false, 5);
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

      const xpForQuestion = correct ? currentLevel.xpReward ?? 10 : 0;
      setXp((prev) => prev + xpForQuestion);

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
        formattedUserAnswer = sanitizeInput(String(userAnswer));
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

    setCurrentQuestionIndex((prev) => prev + 1);
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
      if (savedProgress?.questionIDs?.length)
        level.questionIDs = [...savedProgress.questionIDs];
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
    removeLocalStorageData("tutorialCompleted");
    setTutorialCompleted(false);
  };

  // --- Fallback handling
  if (status === "loading") return <Fallback type="loading" />;
  if (status === "error")
    return (
      <Fallback
        type="error"
        message={errorMessage ?? undefined}
        onRetry={() => window.location.reload()}
      />
    );

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
