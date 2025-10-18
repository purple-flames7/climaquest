import { memo } from "react";
import { Button } from "../ui/button";
import { normalizeText } from "../../utils";

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
    const normalizedCorrect = normalizeText(correctAnswer);
    const normalizedSelected = selected ? normalizeText(selected) : null;

    return (
      <div
        className="flex flex-col gap-3 w-full max-w-md mx-auto"
        role="group"
        aria-label="Answer options"
      >
        {options.map((opt) => {
          const normalizedOpt = normalizeText(opt);

          const isCorrect = showFeedback && normalizedOpt === normalizedCorrect;
          const isWrong =
            showFeedback &&
            normalizedSelected === normalizedOpt &&
            normalizedOpt !== normalizedCorrect;
          const isSelected = normalizedSelected === normalizedOpt;

          const baseClasses =
            "transition-all duration-300 ease-in-out transform text-base font-medium rounded-xl py-3 px-4 w-full border focus:outline-none focus:ring-2";
          const defaultClasses =
            "bg-white hover:bg-gray-100 text-gray-800 border-gray-200";
          const selectedClasses =
            "bg-blue-500 text-white hover:bg-blue-600 border-blue-500";
          const correctClasses =
            "bg-green-500 text-white border-green-600 scale-105";
          const wrongClasses = "bg-red-500 text-white border-red-600 scale-95";

          const buttonClasses = [
            baseClasses,
            isCorrect
              ? correctClasses
              : isWrong
              ? wrongClasses
              : isSelected
              ? selectedClasses
              : defaultClasses,
          ].join(" ");

          return (
            <Button
              key={opt}
              label={opt}
              onClick={() => onSelect(normalizedOpt)}
              disabled={showFeedback || isChecking}
              aria-pressed={isSelected}
              aria-label={`Answer option: ${opt}`}
              data-testid={`answer-option-${normalizedOpt}`}
              className={buttonClasses}
            />
          );
        })}
      </div>
    );
  }
);

AnswerOptions.displayName = "AnswerOptions";
