import { Button } from "../ui/button";
import { normalizeText } from "../../utils";

interface AnswerOptionsProps {
  options: string[];
  selected?: string;
  correctAnswer: string;
  showFeedback?: boolean;
  onSelect: (answer: string) => void;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selected,
  correctAnswer,
  showFeedback = false,
  onSelect,
}) => {
  const normalizedCorrect = normalizeText(correctAnswer);
  const normalizedSelected = selected ? normalizeText(selected) : null;

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const normalizedOpt = normalizeText(opt);

        const isCorrect = showFeedback && normalizedOpt === normalizedCorrect;
        const isWrong =
          showFeedback &&
          normalizedSelected === normalizedOpt &&
          normalizedOpt !== normalizedCorrect;

        return (
          <Button
            key={opt}
            label={opt}
            onClick={() => onSelect(normalizedOpt)}
            disabled={showFeedback}
            className={`transition-colors duration-200 ${
              isCorrect ? "bg-green-500 text-white" : ""
            } ${isWrong ? "bg-red-500 text-white" : ""}`}
          />
        );
      })}
    </div>
  );
};
