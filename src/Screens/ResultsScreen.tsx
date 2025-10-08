// src/screens/ResultsScreen.tsx
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGame } from "../context/useGame";
import { pickQuestionsForUser } from "../data/levels";
import type { Level } from "../types/level";

export default function ResultsScreen() {
  const { width, height } = useWindowSize();
  const { levels, currentLevelIndex, user, updateUser, selectLevel } =
    useGame();
  const navigate = useNavigate();
  const location = useLocation();

  // Get level from state or fallback to context
  let level = location.state?.level as Level | undefined;
  if (!level) level = levels[currentLevelIndex];
  if (!level) return <div>No level data available</div>;

  // XP earned in this level
  const xpEarned =
    user.progress.find((p) => p.levelId === level!.id)?.xpEarned ?? 0;

  // --- Next Level ---
  const handleNextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1;
    const nextLevel = levels[nextLevelIndex];
    if (!nextLevel || !nextLevel.unlocked) return;

    // Map user answered questions
    const answeredQuestions: Record<string, boolean> = {};
    user.progress.forEach((p) =>
      p.questionsAnswered.forEach((qId) => (answeredQuestions[qId] = true))
    );

    // Pick questions dynamically
    nextLevel.questionIDs = pickQuestionsForUser(
      nextLevel,
      answeredQuestions,
      false
    );

    // Update context
    selectLevel(nextLevelIndex);
    updateUser({ ...user, currentLevelId: nextLevel.id });

    navigate("/quiz", { state: { level: nextLevel } });
  };

  // --- Retry Level ---
  const handleRetryLevel = () => {
    const answeredQuestions: Record<string, boolean> = {};
    user.progress.forEach((p) =>
      p.questionsAnswered.forEach((qId) => (answeredQuestions[qId] = true))
    );

    level!.questionIDs = pickQuestionsForUser(level!, answeredQuestions, true);
    navigate("/quiz", { state: { level } });
  };

  // --- Back Home ---
  const handleBackHome = () => navigate("/home");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-100 to-blue-200">
      {/* Confetti celebration */}
      {xpEarned > 0 && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col items-center space-y-4"
      >
        <h2 className="text-2xl font-bold">{level.title} Complete!</h2>
        <p className="text-lg">You earned {xpEarned} XP</p>

        <div className="flex flex-col space-y-3 w-full">
          <button
            onClick={handleNextLevel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Next Level
          </button>
          <button
            onClick={handleRetryLevel}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            Retry Level
          </button>
          <button
            onClick={handleBackHome}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Back Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
