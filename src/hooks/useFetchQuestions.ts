// src/hooks/useFetchQuestions.ts
import { useState, useEffect } from "react";
import { pickQuestionsForUser } from "../data/levels";
import { allQuestionsById } from "../data/allQuestions";
import type { Level } from "../types/level";

interface UseFetchQuestionsProps {
  level: Level;
  answeredQuestions: Record<string, boolean>;
  allowRepeats?: boolean;
}

export const useFetchQuestions = ({
  level,
  answeredQuestions,
  allowRepeats = false,
}: UseFetchQuestionsProps) => {
  const [questions, setQuestions] = useState<
    (typeof allQuestionsById)[number][]
  >([]);

  useEffect(() => {
    if (!level) return;

    const questionIDs = pickQuestionsForUser(
      level,
      answeredQuestions,
      allowRepeats
    );
    const selectedQuestions = questionIDs
      .map((id) => allQuestionsById[id])
      .filter(Boolean);

    setQuestions(selectedQuestions);
  }, [level, answeredQuestions, allowRepeats]);

  return { questions };
};
