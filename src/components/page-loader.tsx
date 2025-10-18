import { motion } from "framer-motion";

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"
    />
  </div>
);
