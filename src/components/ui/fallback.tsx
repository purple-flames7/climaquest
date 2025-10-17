// src/components/Fallback.tsx
import { Button } from "./button";
import { motion } from "framer-motion";

interface FallbackProps {
  type: "loading" | "error";
  message?: string;
  onRetry?: () => void;
}

export const Fallback: React.FC<FallbackProps> = ({
  type,
  message,
  onRetry,
}) => {
  const isLoading = type === "loading";

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-emerald-100 to-teal-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-opacity-50 mb-6"></div>
          <p className="text-gray-600 text-lg">Loading your game…</p>
        </>
      ) : (
        <>
          <p className="text-red-600 text-lg font-semibold mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700 mb-4">{message ?? "Please try again."}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Retry
            </Button>
          )}
        </>
      )}
    </motion.div>
  );
};
