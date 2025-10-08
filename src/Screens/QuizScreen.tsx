import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGame } from "../context/useGame";
import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
} from "../types/question";
import type { Level } from "../types/level";
import { isMCQ, isTrueFalse, isShortAnswer } from "../utils/questionGuards";

type QuizState = {
  level: Level;
  questions: Question[];
};

export default function QuizScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { answerQuestion, user, updateUser } = useGame(); // Removed unused variables

  // Type-safe state from location
  const { level, questions } = state as QuizState;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion: Question = questions[currentQuestionIndex];
  if (!currentQuestion) return <div>Loading...</div>;

  // --- Handle answer submission ---
  const handleSubmitAnswer = (answer?: string) => {
    if (showFeedback) return; // prevent multiple submissions

    let correct = false;
    if (isMCQ(currentQuestion) && answer) {
      const mcq: MultipleChoiceQuestion = currentQuestion;
      correct = mcq.options[mcq.correctOptionIndex] === answer;
      setSelectedAnswer(answer);
    } else if (isTrueFalse(currentQuestion) && answer) {
      const tf: TrueFalseQuestion = currentQuestion;
      correct = tf.answer === (answer === "true");
      setSelectedAnswer(answer);
    } else if (isShortAnswer(currentQuestion)) {
      const sa: ShortAnswerQuestion = currentQuestion;
      correct = sa.acceptableAnswers.some(
        (ans) => ans.toLowerCase() === typedAnswer.trim().toLowerCase()
      );
      setSelectedAnswer(typedAnswer);
    }

    // Update GameContext
    answerQuestion(currentQuestion.id, correct);

    // Update user progress
    const progressIndex = user.progress.findIndex(
      (p) => p.levelId === level.id
    );
    const newProgress: typeof user.progress = [...user.progress];

    if (progressIndex >= 0) {
      const levelProgress = { ...newProgress[progressIndex] };
      levelProgress.questionsAnswered.push(currentQuestion.id);
      if (correct) levelProgress.xpEarned += level.xpReward;
      newProgress[progressIndex] = levelProgress;
    } else {
      newProgress.push({
        levelId: level.id,
        completed: false,
        questionsAnswered: [currentQuestion.id],
        xpEarned: correct ? level.xpReward : 0,
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

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/progress-map");
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
    if (
      (isMCQ(currentQuestion) &&
        option ===
          currentQuestion.options[currentQuestion.correctOptionIndex]) ||
      (isTrueFalse(currentQuestion) &&
        (option === "true" ? true : false) === currentQuestion.answer)
    )
      return "bg-green-400 text-white";
    if (option === selectedAnswer) return "bg-red-400 text-white";
    return "bg-gray-200";
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-100 to-blue-200">
      <h2 className="text-xl font-bold mb-4">{level.title}</h2>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <p className="text-lg mb-4">
          {isTrueFalse(currentQuestion)
            ? currentQuestion.statement
            : currentQuestion.question}
        </p>

        {/* --- Multiple Choice / TrueFalse buttons --- */}
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

        {/* --- Short Answer input --- */}
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

        {/* --- Feedback & Explanation --- */}
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
