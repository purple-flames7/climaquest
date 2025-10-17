import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useGame } from "../context";
import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
} from "../types";
import { isMCQ, isTrueFalse, isShortAnswer, sanitizeInput } from "../utils";
import { ShortAnswerInput } from "../components";
import { allQuestionsById } from "../data";

export default function QuizScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { currentLevelIndex, levels, answerQuestion, user, updateUser } =
    useGame();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentLevel = levels[currentLevelIndex];
  if (!currentLevel) return <div>Loading level...</div>;

  const questions: Question[] = currentLevel.questionIDs
    .map((id) => allQuestionsById[id])
    .filter(Boolean);

  if (questions.length === 0) return <div>No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div>Loading question...</div>;

  const handleSubmitAnswer = (answer: string) => {
    if (showFeedback) return;

    let correct = false;
    const userAnswer = answer;

    if (isMCQ(currentQuestion)) {
      const mcq = currentQuestion as MultipleChoiceQuestion;
      correct = mcq.options[mcq.correctOptionIndex] === userAnswer;
      setSelectedAnswer(userAnswer);
    } else if (isTrueFalse(currentQuestion)) {
      const tf = currentQuestion as TrueFalseQuestion;
      correct = tf.answer === (userAnswer === "true");
      setSelectedAnswer(userAnswer);
    } else if (isShortAnswer(currentQuestion)) {
      const sa = currentQuestion as ShortAnswerQuestion;

      // acceptableAnswers normalized once
      correct = sa.acceptableAnswers.some(
        (ans) => sanitizeInput(ans) === userAnswer
      );

      setSelectedAnswer(userAnswer);
    }

    // Pass sanitized + normalized answer from ShortAnswerInput to context
    answerQuestion(currentQuestion.id, correct, userAnswer, currentQuestion);

    // Update user progress
    const progressIndex = user.progress.findIndex(
      (p) => p.levelId === currentLevel.id
    );
    const newProgress = [...user.progress];

    if (progressIndex >= 0) {
      const levelProgress = { ...newProgress[progressIndex] };
      if (!levelProgress.questionsAnswered.includes(currentQuestion.id)) {
        levelProgress.questionsAnswered.push(currentQuestion.id);
        if (correct) levelProgress.xpEarned += currentLevel.xpReward;
      }
      newProgress[progressIndex] = levelProgress;
    } else {
      newProgress.push({
        levelId: currentLevel.id,
        completed: false,
        questionsAnswered: [currentQuestion.id],
        xpEarned: correct ? currentLevel.xpReward : 0,
        questionIDs: currentLevel.questionIDs,
      });
    }

    updateUser({ ...user, progress: newProgress });

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results");
    }
  };

  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const answerOptions: string[] = isMCQ(currentQuestion)
    ? currentQuestion.options
    : isTrueFalse(currentQuestion)
    ? ["true", "false"]
    : [];

  const getButtonClasses = (option: string) => {
    if (!showFeedback)
      return "bg-white/70 hover:bg-white text-gray-800 border border-emerald-200";

    const correctOption =
      (isMCQ(currentQuestion) &&
        currentQuestion.options[currentQuestion.correctOptionIndex]) ||
      (isTrueFalse(currentQuestion) &&
        (currentQuestion.answer ? "true" : "false"));

    if (option === correctOption)
      return "bg-emerald-400 text-white border border-emerald-500";
    if (option === selectedAnswer)
      return "bg-red-400 text-white border border-red-500";
    return "bg-white/70 text-gray-700 border border-gray-200";
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200 p-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl relative flex flex-col space-y-6"
      >
        {/* Title and Progress */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-700 text-center mb-3">
            {currentLevel.title}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <p className="text-lg text-gray-800 font-medium mb-6 text-center">
              {isTrueFalse(currentQuestion)
                ? currentQuestion.statement
                : currentQuestion.question}
            </p>

            {/* Options */}
            {answerOptions.length > 0 && (
              <div className="flex flex-col space-y-3">
                {answerOptions.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => handleSubmitAnswer(opt)}
                    className={`py-3 px-4 rounded-xl transition-colors font-semibold ${getButtonClasses(
                      opt
                    )}`}
                    whileHover={{ scale: selectedAnswer === opt ? 1 : 1.05 }}
                    whileTap={{ scale: selectedAnswer === opt ? 1 : 0.97 }}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Short Answer */}
            {isShortAnswer(currentQuestion) && (
              <ShortAnswerInput
                correctAnswer={currentQuestion.acceptableAnswers[0]}
                selectedAnswer={selectedAnswer ?? ""}
                showFeedback={showFeedback}
                onSubmit={handleSubmitAnswer} // Pass directly
              />
            )}

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 bg-white/60 border border-emerald-200 p-4 rounded-xl text-center"
                >
                  <p className="font-semibold text-gray-800 mb-2">
                    {selectedAnswer
                      ? `You chose: ${selectedAnswer}`
                      : "Answer submitted"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {currentQuestion.explanation}
                  </p>

                  <motion.button
                    onClick={handleNext}
                    className="mt-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold py-2 px-6 rounded-lg shadow hover:opacity-90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <div className="text-center text-gray-700 font-medium">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </motion.div>
    </div>
  );
}
