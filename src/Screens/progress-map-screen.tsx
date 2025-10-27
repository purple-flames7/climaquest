import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { useGameStore } from "../stores/game-store";
import { useProgressStore } from "../stores/progress-store";

export default function ProgressMap() {
  const { levels, currentLevelIndex, selectLevel } = useGameStore();
  const { unlockedLevels, completedLevels, markLevelCompleted } =
    useProgressStore();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to last unlocked/current level
  useEffect(() => {
    if (!containerRef.current || levels.length === 0) return;

    // Find last unlocked level index
    const lastUnlockedLevelId = Math.max(...unlockedLevels);
    const lastUnlockedIndex = levels.findIndex(
      (lvl) => lvl.id === lastUnlockedLevelId
    );

    const target = containerRef.current.querySelector(
      `[data-level="${lastUnlockedIndex}"]`
    ) as HTMLElement;

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [levels, unlockedLevels]);

  const handleLevelClick = (levelIndex: number) => {
    const level = levels[levelIndex];
    if (!unlockedLevels.includes(level.id)) return;

    // Select level in game store
    selectLevel(levelIndex);

    // Optional: mark level completed if revisiting
    if (!completedLevels.includes(level.id)) {
      markLevelCompleted(level.id);
    }

    navigate("/quiz", {
      state: { level, questions: level.questionIDs },
    });
  };

  if (!levels.length) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-700">
        Loading levels...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-y-scroll bg-gradient-to-b from-blue-100 via-green-100 to-yellow-100 p-6"
    >
      <div className="flex flex-col-reverse items-center space-y-12">
        {levels.map((level, idx) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCompleted = completedLevels.includes(level.id);
          const isCurrent = idx === currentLevelIndex;

          return (
            <motion.div
              key={level.id}
              data-level={idx}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              {/* Level number circle */}
              <motion.button
                onClick={() => handleLevelClick(idx)}
                disabled={!isUnlocked}
                className={`w-16 h-16 rounded-full flex items-center justify-center
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
              >
                <span className="text-white font-bold text-lg">{idx + 1}</span>
              </motion.button>

              {/* Level title below the circle */}
              <span className="mt-2 text-center text-gray-700 font-medium max-w-xs">
                {level.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
