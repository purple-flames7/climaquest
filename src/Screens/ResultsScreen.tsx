// src/screens/ResultsScreen.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGame } from "../context/useGame";

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // Grab the functions we need from context
  const {
    user,
    levels,
    currentLevelIndex,
    updateUser,
    answeredQuestions,
    retryLevel,
    selectLevel,
  } = useGame();

  const level = levels[currentLevelIndex];

  // filter answeredQuestions down to this level's questions only
  const levelQuestionIds = new Set(level.questionIDs);
  const thisLevelAnswers = answeredQuestions.filter((a) =>
    levelQuestionIds.has(a.id)
  );

  const totalQuestions = level.questionIDs.length;
  const correctCount = thisLevelAnswers.filter((a) => a.correct).length;
  const questionsAnswered = thisLevelAnswers.length;

  // XP per question is stored on level.xpReward
  const xpPerQuestion = level.xpReward ?? 10;
  const xpEarned = correctCount * xpPerQuestion;

  // percentage safe-guard
  const correctRatio =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Update user progress entry for this level once (idempotent)
  // This keeps user.progress in sync with answeredQuestions
  React.useEffect(() => {
    const progressEntry = user.progress.find((p) => p.levelId === level.id);
    if (!progressEntry) {
      // create initial entry if missing
      const newProgress = [
        ...user.progress,
        {
          levelId: level.id,
          completed: questionsAnswered >= totalQuestions,
          questionsAnswered: thisLevelAnswers.map((a) => a.id),
          xpEarned,
          questionIDs: level.questionIDs,
        },
      ];
      updateUser({ ...user, progress: newProgress });
      return;
    }

    // update existing entry only if data changed to avoid infinite re-renders
    const sameCount =
      progressEntry.questionsAnswered?.length === thisLevelAnswers.length;
    const sameXp = progressEntry.xpEarned === xpEarned;
    const shouldComplete = questionsAnswered >= totalQuestions;

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
    // We only want this effect to run when answeredQuestions for this level or user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsAnswered, xpEarned, level.id]);

  // Play same level again (keeps the same questions if saved in progress)
  const handlePlayAgain = () => {
    // Use retryLevel if you want to reuse saved progress/questions
    retryLevel(currentLevelIndex);
    navigate("/quiz");
  };

  // Move to next level and start it immediately
  const handleNextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1;

    if (nextLevelIndex < levels.length) {
      // Use selectLevel to properly reset provider state for the next level
      selectLevel(nextLevelIndex);
      navigate("/quiz");
    } else {
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
            onClick={() => navigate("/review")}
            disabled={answeredQuestions.length === 0}
            className={`w-full sm:w-auto font-semibold py-3 px-6 rounded-xl shadow transition ${
              answeredQuestions.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            whileHover={answeredQuestions.length > 0 ? { scale: 1.05 } : {}}
            whileTap={answeredQuestions.length > 0 ? { scale: 0.97 } : {}}
          >
            Review Answers
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
