// src/screens/ProgressMap.tsx
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useGame } from "../context/useGame";
import { pickQuestionsForUser } from "../data/levels";
import { allQuestionsById } from "../data/allQuestions";

export default function ProgressMap() {
  const { levels, currentLevelIndex, user, updateUser, selectLevel } =
    useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to current level
  useEffect(() => {
    if (containerRef.current) {
      const target = containerRef.current.querySelector(
        `[data-level="${currentLevelIndex}"]`
      ) as HTMLElement;

      if (target)
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      else containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLevelIndex]);

  const reversedLevels = [...levels].reverse();

  const handleLevelClick = (levelIndex: number) => {
    const level = levels[levelIndex];
    if (!level.unlocked) return;

    selectLevel(levelIndex);
    updateUser({ ...user, currentLevelId: level.id });

    // Map answered questions
    const answeredQuestions: Record<string, boolean> = {};
    user.progress.forEach((p) =>
      p.questionsAnswered.forEach((qId) => (answeredQuestions[qId] = true))
    );

    // Pick questions dynamically
    level.questionIDs = pickQuestionsForUser(level, answeredQuestions, false);
    const questions = level.questionIDs
      .map((id) => allQuestionsById[id])
      .filter(Boolean);

    navigate("/quiz", { state: { level, questions, user } });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-y-scroll bg-gradient-to-b from-blue-100 via-green-100 to-yellow-100 p-6"
    >
      <div className="flex flex-col-reverse items-center space-y-8">
        {reversedLevels.map((level, idx) => {
          const originalIndex = levels.length - 1 - idx;
          const isUnlocked = level.unlocked;
          const isCurrent = originalIndex === currentLevelIndex;
          const isCompleted = level.completed;

          return (
            <motion.button
              key={level.id}
              data-level={originalIndex}
              onClick={() => handleLevelClick(originalIndex)}
              disabled={!isUnlocked}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center
                ${
                  isCompleted
                    ? "bg-green-700"
                    : isUnlocked
                    ? "bg-green-500"
                    : "bg-gray-400"
                }
                ${isCurrent ? "ring-4 ring-yellow-300" : ""}
                shadow-lg cursor-pointer`}
              whileHover={isUnlocked ? { scale: 1.1 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              style={{
                alignSelf: originalIndex % 2 === 0 ? "flex-start" : "flex-end",
                marginRight: originalIndex % 2 === 0 ? "20%" : "0%",
                marginLeft: originalIndex % 2 !== 0 ? "20%" : "0%",
              }}
            >
              <span className="text-white font-bold text-lg">
                Level {originalIndex + 1}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
