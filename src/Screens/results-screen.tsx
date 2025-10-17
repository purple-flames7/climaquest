// src/screens/ResultsScreen.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGame } from "../context";

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const { user, levels, currentLevelIndex, updateUser, answeredQuestions } =
    useGame();

  const level = levels[currentLevelIndex];
  const levelQuestionIds = new Set(level.questionIDs);
  const thisLevelAnswers = answeredQuestions.filter((a) =>
    levelQuestionIds.has(a.id)
  );

  const totalQuestions = level.questionIDs.length;
  const correctCount = thisLevelAnswers.filter((a) => a.correct).length;
  const questionsAnswered = thisLevelAnswers.length;

  const xpPerQuestion = level.xpReward ?? 10;
  const xpEarned = correctCount * xpPerQuestion;

  const correctRatio =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Update progress safely
  useEffect(() => {
    const progressEntry = user.progress.find((p) => p.levelId === level.id);
    const shouldComplete = questionsAnswered >= totalQuestions;

    if (!progressEntry) {
      updateUser({
        ...user,
        progress: [
          ...user.progress,
          {
            levelId: level.id,
            completed: shouldComplete,
            questionsAnswered: thisLevelAnswers.map((a) => a.id),
            xpEarned,
            questionIDs: level.questionIDs,
          },
        ],
      });
    } else {
      const sameCount =
        progressEntry.questionsAnswered?.length === thisLevelAnswers.length;
      const sameXp = progressEntry.xpEarned === xpEarned;

      if (!sameCount || !sameXp || progressEntry.completed !== shouldComplete) {
        const updatedProgress = user.progress.map((p) =>
          p.levelId === level.id
            ? {
                ...p,
                questionsAnswered: Array.from(
                  new Set([
                    ...p.questionsAnswered,
                    ...thisLevelAnswers.map((a) => a.id),
                  ])
                ),
                xpEarned,
                completed: shouldComplete,
              }
            : p
        );
        updateUser({ ...user, progress: updatedProgress });
      }
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsAnswered, xpEarned, level.id]);

  const isLastLevel = currentLevelIndex + 1 >= levels.length;

  // Auto transition to Review screen after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/review");
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

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
          className="text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Redirecting to Review...
        </motion.div>
      </motion.div>
    </div>
  );
}
