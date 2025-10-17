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

    // Sanitize user input
    const sanitizedInput = DOMPurify.sanitize(inputValue);

    // Normalize for evaluation
    const normalizedInput = sanitizeInput(sanitizedInput);

    // Pass safe, normalized answer to GameProvider
    onSubmit(normalizedInput);

    // Reset input
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={showFeedback}
        className="border p-2 rounded"
        placeholder="Type your answer..."
      />

      <Button
        label="Submit"
        onClick={handleSubmit}
        disabled={showFeedback || !inputValue.trim()}
      />

      {showFeedback && (
        <p
          className={`mt-2 font-medium ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect"}
        </p>
      )}
    </div>
  );
};
