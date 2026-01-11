import { motion } from "framer-motion";

/**
 * PageLoader displays a full-screen loading spinner.
 * Uses Framer Motion for smooth rotation animation.
 */
export const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-screen bg-gradient-to-b from-surface to-primary/10"
    aria-label="Loading page" // Accessibility: announces what is happening
    role="status" // Indicates an ongoing loading process to screen readers
  >
    <motion.div
      // Animate a full rotation indefinitely
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      // Visual spinner styling
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);
