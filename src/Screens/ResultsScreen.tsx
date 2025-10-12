// src/screens/ResultsScreen.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGame } from "../context/useGame";

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { user, levels, currentLevelIndex, updateUser } = useGame();

  const level = levels[currentLevelIndex];
  const progress = user.progress.find((p) => p.levelId === level.id);

  const xpEarned = progress?.xpEarned || 0;
  const totalQuestions = level.questionIDs.length;
  const questionsAnswered = progress?.questionsAnswered.length || 0;
  const correctRatio = Math.round((questionsAnswered / totalQuestions) * 100);

  // ✅ Mark current level completed if all questions were answered
  if (progress && !progress.completed && questionsAnswered === totalQuestions) {
    const updatedProgress = user.progress.map((p) =>
      p.levelId === level.id ? { ...p, completed: true } : p
    );
    updateUser({ ...user, progress: updatedProgress });
  }

  const handlePlayAgain = () => navigate("/quiz");

  const handleNextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < levels.length) {
      // ✅ Unlock the next level if not already
      const nextLevel = levels[nextLevelIndex];
      const hasNextProgress = user.progress.some(
        (p) => p.levelId === nextLevel.id
      );

      if (!hasNextProgress) {
        const updatedProgress = [
          ...user.progress,
          {
            levelId: nextLevel.id,
            completed: false,
            questionsAnswered: [],
            xpEarned: 0,
            questionIDs: nextLevel.questionIDs,
          },
        ];
        updateUser({ ...user, progress: updatedProgress });
      }

      navigate("/quiz");
    } else {
      // ✅ If this was the last level, return to home
      navigate("/home");
    }
  };

  const isLastLevel = currentLevelIndex + 1 >= levels.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200 p-6 relative">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center flex flex-col items-center space-y-6"
      >
        <h2 className="text-3xl font-bold text-emerald-700">
          {isLastLevel ? "All Levels Complete!" : "Level Complete!"}
        </h2>

        <p className="text-gray-700 font-medium text-lg">{level.title}</p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-2xl py-6 px-10 shadow-lg"
        >
          <p className="text-4xl font-bold">{xpEarned} XP</p>
          <p className="text-sm opacity-90">Earned this round</p>
        </motion.div>

        <div className="w-full space-y-2 text-gray-700 font-medium">
          <p>
            Questions Answered:{" "}
            <span className="font-semibold text-emerald-600">
              {questionsAnswered}/{totalQuestions}
            </span>
          </p>
          <p>
            Accuracy:{" "}
            <span className="font-semibold text-emerald-600">
              {correctRatio}%
            </span>
          </p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handlePlayAgain}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-semibold py-3 px-6 rounded-xl shadow hover:opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Play Again
          </motion.button>

          <motion.button
            onClick={handleNextLevel}
            className="w-full sm:w-auto bg-white text-emerald-700 border border-emerald-200 font-semibold py-3 px-6 rounded-xl shadow hover:bg-emerald-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLastLevel ? "Back Home" : "Next Level"}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
