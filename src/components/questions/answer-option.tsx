import { memo } from "react";
import { Button } from "../ui/button";
import { sanitizeInput } from "../../utils";

interface AnswerOptionsProps {
  options: string[];
  selected?: string;
  correctAnswer: string;
  showFeedback?: boolean;
  isChecking?: boolean;
  onSelect: (answer: string) => void;
}

export const AnswerOptions = memo(
  ({
    options,
    selected,
    correctAnswer,
    showFeedback = false,
    isChecking = false,
    onSelect,
  }: AnswerOptionsProps) => {
    const normalizedCorrect = sanitizeInput(correctAnswer);
    const normalizedSelected = selected ? sanitizeInput(selected) : null;

    return (
      <div
        className="flex flex-col gap-3 w-full max-w-md mx-auto spacing-inner"
        role="radiogroup"
        aria-label="Answer options"
      >
        {options.map((opt) => {
          const normalizedOpt = sanitizeInput(opt);

          const isCorrect = showFeedback && normalizedOpt === normalizedCorrect;
          const isWrong =
            showFeedback &&
            normalizedSelected === normalizedOpt &&
            normalizedOpt !== normalizedCorrect;
          const isSelected = normalizedSelected === normalizedOpt;

          const variant = isCorrect
            ? "bg-green-600 text-white hover:bg-green-700"
            : isWrong
            ? "bg-red-600 text-white hover:bg-red-700"
            : isSelected
            ? "bg-primary text-white hover:bg-primary-hover"
            : "bg-surface text-text-base border border-gray-300 hover:bg-secondary";

          return (
            <Button
              key={opt}
              onClick={() => onSelect(normalizedOpt)}
              disabled={showFeedback || isChecking}
              aria-pressed={isSelected}
              aria-label={`Answer option: ${opt}`}
              data-testid={`answer-option-${normalizedOpt}`}
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

AnswerOptions.displayName = "AnswerOptions";
