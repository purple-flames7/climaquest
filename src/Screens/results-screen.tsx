import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGameStore, useUserStore, useProgressStore } from "../stores";
import { Award, Star, Zap } from "lucide-react";
import { badges as allBadges } from "../data/badges";

/**
 * ResultsScreen
 * -------------
 * Displays a summary after completing a level:
 * - XP earned
 * - Questions answered & accuracy
 * - Badge earned (if any)
 * - Confetti animation for special achievements
 * - Navigation to next level review or progress map
 */
export default function ResultsScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // for confetti dimensions

  // Global stores
  const { levels, currentLevelIndex, answeredQuestions, selectLevel } =
    useGameStore();
  const { addXP, addBadge } = useUserStore();
  const { markLevelCompleted } = useProgressStore();

  // Current level reference
  const level = levels[currentLevelIndex];

  // --- Compute results for this level ---
  const levelAnswers = level
    ? answeredQuestions.filter((a) => level.questionIDs.includes(a.id))
    : [];
  const totalQuestions = level ? level.questionIDs.length : 0;
  const correctCount = levelAnswers.filter((a) => a.correct).length;
  const questionsAnswered = levelAnswers.length;
  const xpPerQuestion = level?.xpReward ?? 10; // fallback XP per question
  const xpEarned = correctCount * xpPerQuestion;
  const correctRatio =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isLastLevel = currentLevelIndex + 1 >= levels.length;

  // --- Badge logic ---
  // Award "Accuracy Ace" badge for 100% correct answers
  const earnedBadge =
    correctRatio === 100
      ? allBadges.find((b) => b.name === "Accuracy Ace")
      : null;

  /**
   * Update global stores on mount
   * - Add earned XP
   * - Mark level as completed
   * - Award badge if applicable
   */
  useEffect(() => {
    if (!level) return;
    addXP(xpEarned);
    markLevelCompleted(level.id);
    if (earnedBadge) addBadge(earnedBadge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // --- Icon mapping for badges ---
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

  /**
   * Navigate to next screen
   * - If more levels exist → review answers
   * - If last level → back to progress map
   */
  const handleNext = () => {
    if (!level) return;

    if (!isLastLevel) {
      navigate("/review", {
        state: {
          level,
          levelIndex: currentLevelIndex,
          questions: level.questionIDs,
        },
      });
    } else {
      navigate("/progress-map");
    }
  };

  // --- Fallback for missing level ---
  if (!level) {
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200 p-6 relative">
      {/* Confetti animation when a badge is earned */}
      {earnedBadge && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Main results card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center flex flex-col items-center space-y-6"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-emerald-700">
          {isLastLevel ? "All Levels Complete!" : "Level Complete!"}
        </h2>
        <p className="text-gray-700 font-medium text-lg">{level.title}</p>

        {/* XP Earned */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-2xl py-6 px-10 shadow-lg"
        >
          <p className="text-4xl font-bold">{xpEarned} XP</p>
          <p className="text-sm opacity-90">Earned this round</p>
        </motion.div>

        {/* Questions answered & accuracy */}
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

        {/* Badge display */}
        {earnedBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white shadow-lg rounded-2xl p-4 w-full flex items-center justify-center space-x-4"
          >
            {getIcon(earnedBadge.icon)}
            <div className="text-left">
              <p className="font-bold text-emerald-700">{earnedBadge.name}</p>
              <p className="text-gray-600 text-sm">{earnedBadge.description}</p>
            </div>
          </motion.div>
        )}

        {/* Next / Review button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-800 transition-all"
        >
          {isLastLevel ? "Back to Map" : "Review Answers"}
        </motion.button>
      </motion.div>
    </div>
  );
}
