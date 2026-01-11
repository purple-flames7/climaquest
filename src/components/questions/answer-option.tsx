import { memo } from "react";
import { Button } from "../ui/button";
import { sanitizeInput } from "../../utils";

interface AnswerOptionsProps {
  options: string[]; // List of answer strings
  selected?: string; // Currently selected answer
  correctAnswer: string; // Correct answer for the question
  showFeedback?: boolean; // Whether to show correct/wrong feedback
  isChecking?: boolean; // Whether answers are being checked (disable interaction)
  onSelect: (answer: string) => void; // Callback when an option is clicked
}

/**
 * AnswerOptions renders a list of selectable answers for a question.
 * It highlights correct and wrong answers when feedback is enabled.
 *
 * Uses `memo` for performance optimization to avoid unnecessary re-renders
 * when props do not change.
 */
export const AnswerOptions = memo(
  ({
    options,
    selected,
    correctAnswer,
    showFeedback = false,
    isChecking = false,
    onSelect,
  }: AnswerOptionsProps) => {
    // Normalize strings for consistent comparison (remove whitespace, accents, lowercase)
    const normalizedCorrect = sanitizeInput(correctAnswer);
    const normalizedSelected = selected ? sanitizeInput(selected) : null;

    return (
      <div
        className="flex flex-col gap-3 w-full max-w-md mx-auto spacing-inner"
        role="radiogroup" // Accessibility: treat as radio group
        aria-label="Answer options"
      >
        {options.map((opt) => {
          const normalizedOpt = sanitizeInput(opt);

          // Determine the state of this option
          const isCorrect = showFeedback && normalizedOpt === normalizedCorrect;
          const isWrong =
            showFeedback &&
            normalizedSelected === normalizedOpt &&
            normalizedOpt !== normalizedCorrect;
          const isSelected = normalizedSelected === normalizedOpt;

          // Dynamically style the button based on state
          const variant = isCorrect
            ? "bg-green-600 text-white hover:bg-green-700" // Correct answer
            : isWrong
            ? "bg-red-600 text-white hover:bg-red-700" // Selected wrong answer
            : isSelected
            ? "bg-primary text-white hover:bg-primary-hover" // Selected but not checked
            : "bg-surface text-text-base border border-gray-300 hover:bg-secondary"; // Default

          return (
            <Button
              key={opt}
              onClick={() => onSelect(normalizedOpt)}
              disabled={showFeedback || isChecking} // Disable clicks while feedback is shown or checking
              aria-pressed={isSelected} // Accessibility: indicate selected option
              aria-label={`Answer option: ${opt}`} // Accessibility label
              data-testid={`answer-option-${normalizedOpt}`} // For tests
              className={`btn w-full py-3 px-4 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus-visible:ring-primary ${variant}`}
            >
              {opt}
            </Button>
          );
        })}
      </div>
    );
  }
);

// Display name for React DevTools
AnswerOptions.displayName = "AnswerOptions";
