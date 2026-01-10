import { useState } from "react";
import DOMPurify from "dompurify";
import { Button } from "../ui/button";
import { sanitizeInput } from "../../utils";

interface ShortAnswerInputProps {
  correctAnswer: string;
  selectedAnswer?: string;
  showFeedback?: boolean;
  onSubmit: (answer: string) => void;
}

export const ShortAnswerInput: React.FC<ShortAnswerInputProps> = ({
  correctAnswer,
  selectedAnswer,
  showFeedback = false,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");

  const normalizedCorrect = sanitizeInput(correctAnswer);
  const normalizedSelected = selectedAnswer
    ? sanitizeInput(selectedAnswer)
    : null;

  const isCorrect = showFeedback && normalizedSelected === normalizedCorrect;

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    const sanitizedInput = DOMPurify.sanitize(inputValue);
    const normalizedInput = sanitizeInput(sanitizedInput);
    onSubmit(normalizedInput);
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto spacing-inner">
      <label htmlFor="short-answer" className="sr-only">
        Your answer
      </label>
      <input
        id="short-answer"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={showFeedback}
        placeholder="Type your answer..."
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
      />

      <Button
        label="Submit"
        onClick={handleSubmit}
        disabled={showFeedback || !inputValue.trim()}
        className="btn btn-primary w-full"
      />

      {showFeedback && (
        <p
          role="status"
          className={`mt-2 text-center font-semibold ${
            isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect"}
        </p>
      )}
    </div>
  );
};
