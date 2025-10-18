import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface FeedbackBannerProps {
  correct?: boolean;
  show?: boolean;
  explanation?: string;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  correct,
  show = false,
  explanation = "",
}) => {
  const isCorrect = correct === true;
  const isWrong = correct === false;

  const variants = {
    correct: {
      bg: "bg-green-100 border-green-400 text-green-700",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      label: "Correct!",
    },
    wrong: {
      bg: "bg-red-100 border-red-400 text-red-700",
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      label: "Not quite right",
    },
    neutral: {
      bg: "bg-gray-100 border-gray-300 text-gray-700",
      icon: <Info className="w-6 h-6 text-gray-500" />,
      label: "Info",
    },
  };

  const current = isCorrect
    ? variants.correct
    : isWrong
    ? variants.wrong
    : variants.neutral;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className={`flex flex-col items-center justify-center gap-2 border rounded-xl shadow-sm px-4 py-3 mt-4 text-center ${current.bg}`}
        >
          <div className="flex items-center gap-2 font-semibold">
            {current.icon}
            <span>{current.label}</span>
          </div>
          {explanation && (
            <p className="text-sm opacity-80 mt-1 max-w-md">{explanation}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
