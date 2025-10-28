import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useGameStore } from "../stores";
import { useProgressStore } from "../stores/progress-store";

export default function ReviewScreen() {
  const navigate = useNavigate();
  const {
    answeredQuestions,
    currentLevelIndex,
    retryLevel,
    selectLevel,
    levels,
  } = useGameStore();
  const { unlockedLevels } = useProgressStore();

  if (!answeredQuestions || answeredQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">
          No Answers to Review Yet
        </h2>
        <button
          onClick={() => navigate("/home")}
          className="bg-emerald-500 text-white py-3 px-6 rounded-xl shadow hover:bg-emerald-600 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Filter only questions from the current level
  const level = levels[currentLevelIndex];
  const levelQuestionIds = level.questionIDs;

  const levelAnsweredQuestions = answeredQuestions.filter((q) =>
    levelQuestionIds.includes(q.id)
  );

  const isLastLevel = currentLevelIndex + 1 >= levels.length;

  const handleRetryLevel = () => {
    retryLevel(currentLevelIndex);
    const level = levels[currentLevelIndex];
    navigate("/quiz", { state: { level, questions: level.questionIDs } });
  };

  const handleNextLevel = () => {
    if (isLastLevel) {
      navigate("/progress-map");
      return;
    }
    const nextIndex = currentLevelIndex + 1;
    selectLevel(nextIndex);
    const nextLevel = levels[nextIndex];
    navigate("/quiz", {
      state: { level: nextLevel, questions: nextLevel.questionIDs },
    });
  };

  const handleProgressMap = () => {
    navigate("/progress-map");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 p-6">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-6">
          Review Your Answers
        </h1>

        {levelAnsweredQuestions.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow p-6 space-y-4 border border-emerald-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {index + 1}. {q.questionText}
            </h3>

            {q.options && q.options.length > 0 && (
              <ul className="space-y-1">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`p-2 rounded-lg ${
                      opt === q.correctAnswer
                        ? "bg-emerald-100 font-semibold text-emerald-700"
                        : opt === q.userAnswer
                        ? "bg-red-100 text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </li>
                ))}
              </ul>
            )}

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Your Answer:</span>{" "}
                {q.userAnswer ? (
                  <span
                    className={`${
                      q.correct ? "text-emerald-700" : "text-red-700"
                    } font-medium`}
                  >
                    {String(q.userAnswer)}
                  </span>
                ) : (
                  "—"
                )}
              </p>

              <p>
                <span className="font-semibold">Correct Answer:</span>{" "}
                <span className="text-emerald-700 font-medium">
                  {String(q.correctAnswer)}
                </span>
              </p>
            </div>

            <p
              className={`font-semibold mt-2 ${
                q.correct ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {q.correct ? "Correct" : "Incorrect"}
            </p>
          </motion.div>
        ))}

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleNextLevel}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition-all"
          >
            {isLastLevel ? "Finish Journey" : "Next Level"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRetryLevel}
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-yellow-600 transition-all"
          >
            Retry Level
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleProgressMap}
            className="bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-800 transition-all"
          >
            Progress Map
          </motion.button>
        </div>
      </div>
    </div>
  );
}
