import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { useGame } from "../context";
import type { Question } from "../types";
import { isMCQ, isTrueFalse, isShortAnswer, sanitizeInput } from "../utils";

import { AnswerOptions, ShortAnswerInput, FeedbackBanner } from "../components";
import { allQuestionsById } from "../data";

export default function QuizScreen() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // Grab everything needed from context
  const {
    currentLevelIndex,
    levels,
    currentQuestionIndex,
    currentQuestion,
    answerQuestion,
    nextQuestion,
  } = useGame();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentLevel = levels[currentLevelIndex];
  if (!currentLevel) return <div>Loading level...</div>;

  const questions: Question[] = currentLevel.questionIDs
    .map((id) => allQuestionsById[id])
    .filter(Boolean);

  if (questions.length === 0) return <div>No questions available</div>;

  if (!currentQuestion) return <div>Loading question...</div>;

  const answerOptions = isMCQ(currentQuestion)
    ? currentQuestion.options
    : isTrueFalse(currentQuestion)
    ? ["true", "false"]
    : [];

  const questionText = isTrueFalse(currentQuestion)
    ? currentQuestion.statement
    : currentQuestion.question;

  // --- Handle answer submission ---
  const handleSubmitAnswer = (answer: string) => {
    if (showFeedback) return;

    let correct = false;

    if (isMCQ(currentQuestion)) {
      correct =
        currentQuestion.options[currentQuestion.correctOptionIndex] === answer;
    } else if (isTrueFalse(currentQuestion)) {
      correct = currentQuestion.answer === (answer === "true");
    } else if (isShortAnswer(currentQuestion)) {
      correct = currentQuestion.acceptableAnswers.some(
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

    // Update global state via context
    answerQuestion(currentQuestion.id, correct, answer, currentQuestion);
  };

  // --- Handle Next Question ---
  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);

    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
    if (!isLastQuestion) {
      nextQuestion(); // <-- use context function
    } else {
      navigate("/results");
    }
  };

  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

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
            key={currentQuestion.id}
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
                  isMCQ(currentQuestion)
                    ? currentQuestion.options[
                        currentQuestion.correctOptionIndex
                      ]
                    : isTrueFalse(currentQuestion)
                    ? currentQuestion.answer
                      ? "true"
                      : "false"
                    : ""
                }
                showFeedback={showFeedback}
                onSelect={handleSubmitAnswer}
              />
            )}

            {/* Short Answer */}
            {isShortAnswer(currentQuestion) && (
              <ShortAnswerInput
                correctAnswer={currentQuestion.acceptableAnswers[0]}
                selectedAnswer={selectedAnswer ?? ""}
                showFeedback={showFeedback}
                onSubmit={handleSubmitAnswer}
              />
            )}

            {/* Feedback Banner */}
            <FeedbackBanner
              correct={isCorrect ?? undefined}
              show={showFeedback}
              explanation={currentQuestion.explanation}
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
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </motion.div>
    </div>
  );
}
