import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";
import type { FC } from "react";

export interface FeedbackBannerProps {
  correct?: boolean; // true if the answer was correct, false if wrong, undefined for neutral/info
  show?: boolean; // whether to display the banner
  explanation?: string; // optional explanatory text below the main message
}

/**
 * FeedbackBanner displays a transient notification about quiz answers or other feedback.
 *
 * Features:
 * - Uses framer-motion for smooth enter/exit animations
 * - Supports three states: correct, wrong, neutral
 * - Displays an icon, label, and optional explanation text
 * - Accessible: uses role="status" and aria-live="polite" for screen readers
 * - Automatically animates in/out using AnimatePresence
 */
export const FeedbackBanner: FC<FeedbackBannerProps> = ({
  correct,
  show = false,
  explanation = "",
}) => {
  const isCorrect = correct === true;
  const isWrong = correct === false;

  // Define visual variants for different feedback types
  const variants = {
    correct: {
      bg: "bg-secondary border-primary text-primary", // background & text color
      icon: <CheckCircle className="w-6 h-6 text-primary" />, // correct icon
      label: "Correct!", // main label
    },
    wrong: {
      bg: "bg-red-50 border-red-400 text-red-700",
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      label: "Not quite right",
    },
    neutral: {
      bg: "bg-secondary border-gray-300 text-gray-700",
      icon: <Info className="w-6 h-6 text-gray-500" />,
      label: "Info",
    },
  };

  // Pick the current variant based on the feedback type
  const current = isCorrect
    ? variants.correct
    : isWrong
    ? variants.wrong
    : variants.neutral;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 15 }} // start slightly below and transparent
          animate={{ opacity: 1, y: 0 }} // animate to visible and original position
          exit={{ opacity: 0, y: -15 }} // exit slightly above and fade out
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="status" // informs screen readers that this is status feedback
          aria-live="polite" // polite reading for screen readers
          className={`
            flex flex-col items-center justify-center gap-2
            border rounded-xl shadow-sm
            px-4 py-3 mt-4 text-center
            ${current.bg}
          `}
        >
          {/* Icon and main label */}
          <div className="flex items-center gap-2 font-semibold">
            {current.icon}
            <span>{current.label}</span>
          </div>

          {/* Optional explanation text */}
          {explanation && (
            <p className="text-sm opacity-80 mt-1 max-w-md">{explanation}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
