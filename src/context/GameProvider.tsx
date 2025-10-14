// src/context/GameProvider.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import type { Level, User, Question } from "../types";
import { levels as initialLevels, pickQuestionsForUser } from "../data/levels";
import { allQuestionsById } from "../data/allQuestions";
import { GameContext } from "./gameContextCore";
import { useNavigate } from "react-router";

//  Unified AnsweredQuestion type
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
  const navigate = useNavigate();

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

  // --- Select Level
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

      // Add progress tracking if not already there
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

  // --- Helper: format answers consistently
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

  // --- Answer Question
  const answerQuestion = (
    questionId: string,
    correct: boolean,
    userAnswer: string | boolean,
    questionData?: Question
  ) => {
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions((prev) => [...prev, questionId]);

      // Award XP
      if (correct) {
        setXp((prev) => prev + (currentLevel.xpReward ?? 10));
      }

      // Question text
      const questionText =
        questionData?.type === "truefalse"
          ? questionData.statement
          : questionData?.question ?? "";

      // Correct answer
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
        // If the answer is the letter (A/B/C/D), find index from that
        const letterIndex =
          typeof userAnswer === "string"
            ? userAnswer.toUpperCase().charCodeAt(0) - 65 // "A" → 0, "B" → 1
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

      //  Save structured data
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

    // --- Progression logic
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

      setTimeout(() => {
        navigate("/results");
      }, 500);
    }
  };

  // --- Retry Level
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

  // --- Reset Game
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
