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

  const categoryTitles = [
    "Climate Science",
    "Climate Justice & Inequality",
    "Queer & Feminist Climate Futures",
    "Community Knowledge",
    "Climate Solutions",
  ];

  const categoryGradients = [
    "from-sky-100 via-sky-200 to-emerald-100",
    "from-amber-100 via-orange-100 to-rose-100",
    "from-pink-100 via-fuchsia-100 to-violet-100",
    "from-lime-100 via-green-100 to-emerald-100",
    "from-emerald-100 via-teal-100 to-cyan-100",
  ];

  const groupedLevels = Array.from({ length: 5 }, (_, i) =>
    levels.slice(i * 6, i * 6 + 6)
  );

  useEffect(() => {
    if (!containerRef.current || levels.length === 0) return;
    const id = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = containerRef.current!;
        el.scrollTop = el.scrollHeight;

        if (unlockedLevels && unlockedLevels.length > 0) {
          const lastUnlockedLevelId = Math.max(...unlockedLevels);
          const lastUnlockedIndex = levels.findIndex(
            (lvl) => lvl.id === lastUnlockedLevelId
          );
          const target = el.querySelector(
            `[data-level="${lastUnlockedIndex}"]`
          ) as HTMLElement | null;
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 80);
          }
        }
      });
    }, 30);
    return () => clearTimeout(id);
  }, [levels.length, unlockedLevels]);

  const handleLevelClick = (levelIndex: number) => {
    const level = levels[levelIndex];
    if (!unlockedLevels.includes(level.id)) return;

    selectLevel(levelIndex);

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

  const reversedGrouped = [...groupedLevels].slice().reverse();

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-y-auto"
    >
      {reversedGrouped.map((categoryLevels, revIdx) => {
        const categoryIndex = groupedLevels.length - 1 - revIdx;

        // reverse order inside category so it goes upward
        const orderedLevels = [...categoryLevels].reverse();

        return (
          <section
            key={categoryIndex}
            className={`relative py-16 px-6 bg-gradient-to-b ${categoryGradients[categoryIndex]}`}
          >
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-extrabold text-emerald-900 mb-10 text-center tracking-tight"
            >
              {categoryTitles[categoryIndex]}
            </motion.h2>

            <div className="relative flex flex-col items-center space-y-16">
              {orderedLevels.map((level, localIdx) => {
                const globalIndex = categoryIndex * 6 + (5 - localIdx); // adjust index since we reversed
                const isUnlocked = unlockedLevels.includes(level.id);
                const isCompleted = completedLevels.includes(level.id);
                const isCurrent = globalIndex === currentLevelIndex;
                const alignLeft = localIdx % 2 === 0;

                const nextLevelExists = !!orderedLevels[localIdx + 1];
                const difficultyGlow =
                  level.difficulty === "easy"
                    ? "shadow-[inset_0_0_10px_#86efac]"
                    : level.difficulty === "medium"
                    ? "shadow-[inset_0_0_10px_#facc15]"
                    : "shadow-[inset_0_0_10px_#f87171]";

                return (
                  <motion.div
                    key={level.id}
                    data-level={globalIndex}
                    className={`relative flex flex-col items-center ${
                      alignLeft ? "self-start ml-10" : "self-end mr-10"
                    }`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: localIdx * 0.03 }}
                  >
                    {/* connector above current circle */}
                    {nextLevelExists && (
                      <motion.div
                        className={`absolute -top-20 ${
                          alignLeft ? "left-1/2" : "right-1/2"
                        } w-px h-20 rounded-full ${
                          isCompleted
                            ? "bg-emerald-400"
                            : isUnlocked
                            ? "bg-emerald-200"
                            : "bg-gray-300"
                        }`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.55, delay: 0.25 }}
                      />
                    )}

                    <motion.button
                      onClick={() => handleLevelClick(globalIndex)}
                      disabled={!isUnlocked}
                      whileTap={isUnlocked ? { scale: 0.96 } : {}}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 shadow-lg ${difficultyGlow}
                        ${
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-600 to-green-500"
                            : isUnlocked
                            ? "bg-gradient-to-br from-lime-400 to-emerald-500"
                            : "bg-gray-400"
                        }
                        ${
                          isCurrent
                            ? "ring-4 ring-yellow-300 scale-105 shadow-[0_0_15px_rgba(234,179,8,0.45)]"
                            : ""
                        }
                        ${
                          isUnlocked
                            ? "hover:scale-110"
                            : "opacity-80 cursor-not-allowed"
                        }
                      `}
                    >
                      {isCompleted ? "✓" : level.id}
                    </motion.button>

                    <span className="mt-3 text-center text-emerald-900 font-semibold max-w-[140px] leading-tight text-sm">
                      {level.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
