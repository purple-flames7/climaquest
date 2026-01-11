import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * PageWrapper provides a simple fade-in/out animation for wrapped content.
 * Uses Framer Motion for smooth opacity transitions.
 */
export const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    // Start fully transparent
    initial={{ opacity: 0 }}
    // Animate to fully opaque
    animate={{ opacity: 1 }}
    // Animate back to transparent when exiting
    exit={{ opacity: 0 }}
    // Smooth fade transition
    transition={{ duration: 0.3 }}
    // Ensure the wrapper takes full width and height of parent
    style={{ width: "100%", height: "100%" }}
  >
    {children}
  </motion.div>
);
