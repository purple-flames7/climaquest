import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { useGameStore } from "../stores";
import { isMCQ, isTrueFalse, isShortAnswer, sanitizeInput } from "../utils";

// Reusable components
import { ShortAnswerInput, FeedbackBanner } from "../components";

/**
 * AnswerOptions
 * Inline component for rendering multiple-choice or true/false buttons.
 * Handles visual feedback for selected, correct, and wrong options.
 */
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

        /** Base button styling */
        const baseClasses =
          "w-full py-3 px-4 rounded-xl font-medium border transition-all duration-300 ease-in-out shadow-sm";

        /** State-specific styling: correct / wrong / selected / default */
        let stateClasses = "";
        if (isCorrect) {
          stateClasses =
            "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
        } else if (isWrong) {
          stateClasses =
            "bg-rose-100 text-rose-900 border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.25)]";
        } else if (!showFeedback && isSelected) {
          stateClasses =
            "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100";
        } else {
          stateClasses =
            "bg-white/80 text-gray-800 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300";
        }

        return (
          <motion.button
            key={option}
            onClick={() => onSelect(option)}
            disabled={showFeedback} // prevent selection after answer is submitted
            className={`${baseClasses} ${stateClasses}`}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * QuizScreen
 * ----------
 * Handles the entire quiz experience for the current level:
 * - Displays current question (MCQ, True/False, or Short Answer)
 * - Handles answer submission & feedback
 * - Shows confetti on correct answers
 * - Progress tracking and navigation to next question or results
 */
export default function QuizScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // for confetti canvas

  // Global game store
  const {
    levels,
    currentLevelIndex,
    currentQuestion,
    answerQuestion,
    nextQuestion,
  } = useGameStore();

  // Local UI state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /** Get current level and question */
  const currentLevel = levels[currentLevelIndex];
  if (!currentLevel) return <div>Loading level...</div>;

  const question = currentQuestion();
  if (!question) return <div>Loading question...</div>;

  /** Determine answer options for MCQ / TrueFalse */
  const answerOptions = isMCQ(question)
    ? question.options
    : isTrueFalse(question)
    ? ["true", "false"]
    : [];

  /** Question text differs slightly for True/False vs others */
  const questionText = isTrueFalse(question)
    ? question.statement
    : question.question;

  /**
   * Handles answer selection/submission
   * - Determines correctness based on question type
   * - Shows feedback banner
   * - Triggers confetti for correct answers
   * - Updates global store
   */
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
      setTimeout(() => setShowConfetti(false), 1800); // confetti duration
    }

    answerQuestion(question.id, correct, answer, question);
  };

  /** Handle moving to next question or navigating to results */
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

  /** Progress bar percent for current question */
  const progressPercent =
    ((currentLevel.questionIDs.indexOf(question.id) + 1) /
      currentLevel.questionIDs.length) *
    100;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-teal-200 p-6">
      {/* Confetti for correct answers */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      {/* Main quiz container */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl flex flex-col space-y-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Level Title & Progress Bar */}
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

        {/* Question Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id} // ensures motion animation on question change
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <p className="text-lg text-gray-800 font-medium mb-6 text-center">
              {questionText}
            </p>

            {/* Render MCQ / TrueFalse options */}
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

            {/* Render Short Answer input */}
            {isShortAnswer(question) && (
              <ShortAnswerInput
                correctAnswer={question.acceptableAnswers[0]}
                selectedAnswer={selectedAnswer ?? ""}
                showFeedback={showFeedback}
                onSubmit={handleSubmitAnswer}
              />
            )}

            {/* Feedback banner */}
            <FeedbackBanner
              correct={isCorrect ?? undefined}
              show={showFeedback}
              explanation={question.explanation}
            />

            {/* Next Question Button */}
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

        {/* Footer: current question / total questions */}
        <div className="text-center text-gray-700 font-medium">
          Question {currentLevel.questionIDs.indexOf(question.id) + 1} /{" "}
          {currentLevel.questionIDs.length}
        </div>
      </motion.div>
    </div>
  );
}
