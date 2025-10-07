import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGame } from "../context/useGame";
import { levels } from "../data/levels";

export default function ProgressMap() {
  const { selectLevel, currentLevelIndex } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current level or bottom
  useEffect(() => {
    if (containerRef.current) {
      const targetIndex = currentLevelIndex ?? 0;
      const target = containerRef.current.querySelector(
        `[data-level="${targetIndex}"]`
      ) as HTMLElement;

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Scroll to bottom (level 1)
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [currentLevelIndex]);

  // Reverse levels so level 1 is at bottom
  const reversedLevels = [...levels].reverse();

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

          return (
            <motion.button
              key={level.id}
              data-level={originalIndex}
              onClick={() => isUnlocked && selectLevel(originalIndex)}
              disabled={!isUnlocked}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center
                ${isUnlocked ? "bg-green-500" : "bg-gray-400"}
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
