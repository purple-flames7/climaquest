// src/screens/RewardsScreen.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useGameStore } from "../stores";
import { useEffect } from "react";
import { Award, Star, Zap } from "lucide-react";
import confetti from "canvas-confetti";

export default function RewardsScreen() {
  const navigate = useNavigate();
  const { recentXP, user, levels, currentLevelIndex, selectLevel } =
    useGameStore();

  // --- Confetti on mount
  useEffect(() => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-8 h-8 text-yellow-500" />;
      case "Star":
        return <Star className="w-8 h-8 text-yellow-400" />;
      case "Zap":
        return <Zap className="w-8 h-8 text-green-500" />;
      default:
        return <Award className="w-8 h-8 text-yellow-500" />;
    }
  };

  const handleNextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < levels.length) {
      selectLevel(nextLevelIndex); // reset state for next level with fresh questions
      navigate("/quiz");
    } else {
      navigate("/home"); // all levels completed
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-800 mb-6"
      >
        Rewards Unlocked!
      </motion.h1>

      {/* XP Summary */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm mb-6"
      >
        <h2 className="text-lg font-semibold text-green-700 mb-2">XP Earned</h2>
        <div className="text-3xl font-bold text-green-800">
          +{recentXP ?? 0} XP
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Total: {user.totalXp} XP
        </div>
        {/* XP Progress Bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-3 bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min((user.totalXp / 1000) * 100, 100)}%`,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Achievements / Badges */}
      <div className="w-full max-w-md space-y-4 mb-6">
        {user.badges && user.badges.length > 0 ? (
          user.badges.map((badge) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-3"
            >
              {getIcon(badge.icon)}
              <div className="text-left">
                <p className="font-bold text-green-700">{badge.name}</p>
                <p className="text-gray-600 text-sm">{badge.description}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No new badges yet.</p>
        )}
      </div>

      {/* Next Level Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleNextLevel}
        className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-800 transition-all"
      >
        {currentLevelIndex + 1 < levels.length ? "Next Level" : "Back Home"}
      </motion.button>
    </div>
  );
}
