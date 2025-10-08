// src/screens/QuizScreen.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGame } from "../context/useGame";
import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
} from "../types/question";
import { isMCQ, isTrueFalse, isShortAnswer } from "../utils/questionGuards";
import { allQuestionsById } from "../data/allQuestions";

export default function QuizScreen() {
  const navigate = useNavigate();
  const { currentLevelIndex, levels, answerQuestion, user, updateUser } =
    useGame();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  // --- Defensive loading checks ---
  const currentLevel = levels[currentLevelIndex];
  if (!currentLevel) return <div>Loading level...</div>;

  const questions: Question[] = currentLevel.questionIDs
    .map((id) => allQuestionsById[id])
    .filter(Boolean);

  if (questions.length === 0) return <div>No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div>Loading question...</div>;

  // --- Handle answer submission ---
  const handleSubmitAnswer = (answer?: string) => {
    if (showFeedback) return;

    let correct = false;

    if (isMCQ(currentQuestion) && answer) {
      const mcq = currentQuestion as MultipleChoiceQuestion;
      correct = mcq.options[mcq.correctOptionIndex] === answer;
      setSelectedAnswer(answer);
    } else if (isTrueFalse(currentQuestion) && answer) {
      const tf = currentQuestion as TrueFalseQuestion;
      correct = tf.answer === (answer === "true");
      setSelectedAnswer(answer);
    } else if (isShortAnswer(currentQuestion)) {
      const sa = currentQuestion as ShortAnswerQuestion;
      correct = sa.acceptableAnswers.some(
        (ans) => ans.toLowerCase() === typedAnswer.trim().toLowerCase()
      );
      setSelectedAnswer(typedAnswer);
    }

    // Update GameContext
    answerQuestion(currentQuestion.id, correct);

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
      });
    }

    updateUser({ ...user, progress: newProgress });
    setShowFeedback(true);
  };

  // --- Handle Next button ---
  const handleNext = () => {
    setTypedAnswer("");
    setSelectedAnswer(null);
    setShowFeedback(false);

    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results");
    }
  };

  // --- Render answer options ---
  const answerOptions: string[] = isMCQ(currentQuestion)
    ? currentQuestion.options
    : isTrueFalse(currentQuestion)
    ? ["true", "false"]
    : [];

  const getButtonClasses = (option: string) => {
    if (!showFeedback) return "bg-gray-200 hover:bg-gray-300";

    const correctOption =
      (isMCQ(currentQuestion) &&
        currentQuestion.options[currentQuestion.correctOptionIndex]) ||
      (isTrueFalse(currentQuestion) &&
        (currentQuestion.answer ? "true" : "false"));

    if (option === correctOption) return "bg-green-400 text-white";
    if (option === selectedAnswer) return "bg-red-400 text-white";
    return "bg-gray-200";
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-100 to-blue-200">
      <h2 className="text-xl font-bold mb-4">{currentLevel.title}</h2>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <p className="text-lg mb-4">
          {isTrueFalse(currentQuestion)
            ? currentQuestion.statement
            : currentQuestion.question}
        </p>

        {/* MCQ / TrueFalse */}
        {answerOptions.length > 0 && (
          <div className="flex flex-col space-y-3">
            {answerOptions.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => handleSubmitAnswer(opt)}
                className={`p-3 rounded-md transition-colors ${getButtonClasses(
                  opt
                )}`}
                whileHover={{ scale: selectedAnswer === opt ? 1 : 1.05 }}
                whileTap={{ scale: selectedAnswer === opt ? 1 : 0.95 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        )}

        {/* Short Answer */}
        {isShortAnswer(currentQuestion) && !showFeedback && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="border p-2 rounded w-full"
            />
            <button
              onClick={() => handleSubmitAnswer()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <p className="font-bold">
              {selectedAnswer === typedAnswer ? "Your answer" : selectedAnswer}
            </p>
            <p>{currentQuestion.explanation}</p>
            <button
              onClick={handleNext}
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 w-full max-w-xl">
        <p>
          Question {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>
    </div>
  );
}
