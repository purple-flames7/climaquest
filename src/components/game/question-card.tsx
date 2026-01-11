import type { FC, ReactNode } from "react";
import { Card } from "../ui/card";

/**
 * Props for the QuestionCard component.
 */
export interface QuestionCardProps {
  children: ReactNode; // Content to display inside the card (question, options, etc.)
  className?: string; // Optional additional Tailwind classes for customization
}

/**
 * QuestionCard is a reusable wrapper for displaying a quiz question.
 *
 * Features:
 * - Wraps content inside a styled Card component
 * - Provides padding, background, text styling, rounded corners, and shadow
 * - Accepts additional classNames for flexibility
 */
export const QuestionCard: FC<QuestionCardProps> = ({
  children,
  className,
}) => {
  return (
    <Card
      className={`
        p-6                 
        bg-surface         
        text-text-base     
        rounded-xl         
        shadow-card        
        ${className ?? ""} 
      `}
    >
      {children} {/* Render the question content inside the card */}
    </Card>
  );
};
