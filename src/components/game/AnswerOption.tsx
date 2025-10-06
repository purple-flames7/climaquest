import { Button } from "../ui/Button";

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
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isCorrect = showFeedback && opt === correctAnswer;
        const isWrong =
          showFeedback && selected === opt && opt !== correctAnswer;

        return (
          <Button
            key={opt}
            label={opt}
            onClick={() => onSelect(opt)}
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
