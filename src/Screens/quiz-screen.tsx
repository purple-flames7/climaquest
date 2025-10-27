import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { useGameStore } from "../stores";
import { isMCQ, isTrueFalse, isShortAnswer, sanitizeInput } from "../utils";

// Reusable components
import { ShortAnswerInput, FeedbackBanner } from "../components";

// --- AnswerOptions inline for clarity ---
function AnswerOptions({
  options,
  selected,
  correctAnswer,
  showFeedback,
  onSelect,
}: {
  options: string[];
  selected: string;
  correctAnswer: string | boolean;
  showFeedback: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = selected === option;
        const isCorrect = showFeedback && option === correctAnswer;
        const isWrong = showFeedback && isSelected && option !== correctAnswer;

        return (
          <motion.button
            key={option}
            onClick={() => onSelect(option)}
            disabled={showFeedback}
            className={`w-full py-2 px-4 rounded-lg font-medium border-2
              ${isCorrect ? "bg-green-500 text-white border-green-700" : ""}
              ${isWrong ? "bg-red-500 text-white border-red-700" : ""}
              ${
                !showFeedback && isSelected
                  ? "bg-emerald-400 text-white border-emerald-600"
                  : ""
              }
              ${
                !showFeedback && !isSelected
                  ? "bg-white text-gray-800 border-gray-300"
                  : ""
              }
              hover:opacity-90 transition`}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function QuizScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const {
    levels,
    currentLevelIndex,
    currentQuestion,
    answerQuestion,
    nextQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentLevel = levels[currentLevelIndex];
  if (!currentLevel) return <div>Loading level...</div>;

  const question = currentQuestion();
  if (!question) return <div>Loading question...</div>;

  const answerOptions = isMCQ(question)
    ? question.options
    : isTrueFalse(question)
    ? ["true", "false"]
    : [];

  const questionText = isTrueFalse(question)
    ? question.statement
    : question.question;

  // --- Handle answer submission ---
  const handleSubmitAnswer = (answer: string) => {
    if (showFeedback) return;

    let correct = false;

    if (isMCQ(question)) {
      correct =
        question.options[question.correctOptionIndex].trim().toLowerCase() ===
        answer.trim().toLowerCase();
    } else if (isTrueFalse(question)) {
      correct = question.answer === (answer === "true");
    } else if (isShortAnswer(question)) {
      correct = question.acceptableAnswers.some(
        (ans) => sanitizeInput(ans) === sanitizeInput(answer)
      );
    }

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }

    answerQuestion(question.id, correct, answer, question);
  };

  // --- Handle next question ---
  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);

    const currentIndex = currentLevel.questionIDs.indexOf(question.id);
    const isLastQuestion = currentIndex + 1 >= currentLevel.questionIDs.length;

    if (!isLastQuestion) {
      nextQuestion();
    } else {
      navigate("/results");
    }
  };

  const progressPercent =
    ((currentLevel.questionIDs.indexOf(question.id) + 1) /
      currentLevel.questionIDs.length) *
    100;

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
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl flex flex-col space-y-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Level Title & Progress */}
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
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <p className="text-lg text-gray-800 font-medium mb-6 text-center">
              {questionText}
            </p>

            {/* Multiple Choice / TrueFalse */}
            {answerOptions.length > 0 && (
              <AnswerOptions
                options={answerOptions}
                selected={selectedAnswer ?? ""}
                correctAnswer={
                  isMCQ(question)
                    ? question.options[question.correctOptionIndex]
                    : isTrueFalse(question)
                    ? question.answer
                      ? "true"
                      : "false"
                    : ""
                }
                showFeedback={showFeedback}
                onSelect={handleSubmitAnswer}
              />
            )}

            {/* Short Answer */}
            {isShortAnswer(question) && (
              <ShortAnswerInput
                correctAnswer={question.acceptableAnswers[0]}
                selectedAnswer={selectedAnswer ?? ""}
                showFeedback={showFeedback}
                onSubmit={handleSubmitAnswer}
              />
            )}

            {/* Feedback Banner */}
            <FeedbackBanner
              correct={isCorrect ?? undefined}
              show={showFeedback}
              explanation={question.explanation}
            />

            {/* Next Button */}
            {showFeedback && (
              <motion.button
                onClick={handleNext}
                className="mt-5 bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold py-2 px-6 rounded-lg shadow hover:opacity-90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Progress */}
        <div className="text-center text-gray-700 font-medium">
          Question {currentLevel.questionIDs.indexOf(question.id) + 1} /{" "}
          {currentLevel.questionIDs.length}
        </div>
      </motion.div>
    </div>
  );
}
