import { useState } from "react";
import DOMPurify from "dompurify"; // Sanitize user input to prevent XSS
import { Button } from "../ui/button";
import { sanitizeInput } from "../../utils";

interface ShortAnswerInputProps {
  correctAnswer: string; // The correct answer to compare against
  selectedAnswer?: string; // Answer previously submitted by the user
  showFeedback?: boolean; // Whether to display correct/incorrect feedback
  onSubmit: (answer: string) => void; // Callback when user submits an answer
}

/**
 * ShortAnswerInput provides a text input for open-ended questions.
 *
 * Features:
 * - Sanitizes and normalizes input for safe and consistent comparison
 * - Shows feedback if `showFeedback` is true
 * - Disables input and button when feedback is being displayed
 */
export const ShortAnswerInput: React.FC<ShortAnswerInputProps> = ({
  correctAnswer,
  selectedAnswer,
  showFeedback = false,
  onSubmit,
}) => {
  // Local state for input field
  const [inputValue, setInputValue] = useState("");

  // Normalize correct and previously selected answers for consistent comparison
  const normalizedCorrect = sanitizeInput(correctAnswer);
  const normalizedSelected = selectedAnswer
    ? sanitizeInput(selectedAnswer)
    : null;

  // Determine if the previously submitted answer was correct
  const isCorrect = showFeedback && normalizedSelected === normalizedCorrect;

  // Called when the user clicks "Submit"
  const handleSubmit = () => {
    if (!inputValue.trim()) return; // Prevent submitting empty input
    const sanitizedInput = DOMPurify.sanitize(inputValue); // Remove any malicious HTML
    const normalizedInput = sanitizeInput(sanitizedInput); // Normalize string (lowercase, remove accents, etc.)
    onSubmit(normalizedInput); // Pass normalized input to parent handler
    setInputValue(""); // Clear input field
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto spacing-inner">
      {/* Hidden label for accessibility */}
      <label htmlFor="short-answer" className="sr-only">
        Your answer
      </label>

      {/* Text input field */}
      <input
        id="short-answer"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={showFeedback} // Disable input when feedback is being shown
        placeholder="Type your answer..."
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
      />

      {/* Submit button */}
      <Button
        label="Submit"
        onClick={handleSubmit}
        disabled={showFeedback || !inputValue.trim()} // Disable if feedback showing or empty
        className="btn btn-primary w-full"
      />

      {/* Feedback message */}
      {showFeedback && (
        <p
          role="status" // Accessibility: announce status
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
