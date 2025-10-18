import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{ width: "100%", height: "100%" }}
  >
    {children}
  </motion.div>
);
