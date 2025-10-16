import { Card } from "../ui/card";

interface QuestionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  children,
  className,
}) => {
  return (
    <Card className={`p-6 bg-white dark:bg-gray-800 ${className}`}>
      {children}
    </Card>
  );
};
