import type { FC, ReactNode } from "react";
import { Card } from "../ui/card";

export interface QuestionCardProps {
  children: ReactNode;
  className?: string;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  children,
  className,
}) => {
  return (
    <Card
      className={`p-6 bg-surface text-text-base rounded-xl shadow-card ${
        className ?? ""
      }`}
    >
      {children}
    </Card>
  );
};
