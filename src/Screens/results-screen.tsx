import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGameStore, useUserStore, useProgressStore } from "../stores";
import { Award, Star, Zap } from "lucide-react";
import { badges as allBadges } from "../data/badges";

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const { levels, currentLevelIndex, answeredQuestions, selectLevel } =
    useGameStore();
  const { addXP, addBadge } = useUserStore();
  const { markLevelCompleted } = useProgressStore();

  const level = levels[currentLevelIndex];

  // Compute results
  const levelAnswers = level
    ? answeredQuestions.filter((a) => level.questionIDs.includes(a.id))
    : [];
  const totalQuestions = level ? level.questionIDs.length : 0;
  const correctCount = levelAnswers.filter((a) => a.correct).length;
  const questionsAnswered = levelAnswers.length;
  const xpPerQuestion = level?.xpReward ?? 10;
  const xpEarned = correctCount * xpPerQuestion;
  const correctRatio =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isLastLevel = currentLevelIndex + 1 >= levels.length;

  //  Badge logic
  const earnedBadge =
    correctRatio === 100
      ? allBadges.find((b) => b.name === "Accuracy Ace")
      : null;

  // Update stores once on mount
  useEffect(() => {
    if (!level) return;
    addXP(xpEarned);
    markLevelCompleted(level.id);
    if (earnedBadge) addBadge(earnedBadge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // --- Icons ---
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

  // Navigation
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

  // Fallback render 
  if (!level) {
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200 p-6 relative">
      {earnedBadge && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

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

        {/* XP Summary */}
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

        {/* Badge */}
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
