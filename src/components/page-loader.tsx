import { motion } from "framer-motion";

export const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-screen bg-gradient-to-b from-surface to-primary/10"
    aria-label="Loading page"
    role="status"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);
