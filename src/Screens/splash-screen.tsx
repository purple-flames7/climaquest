// src/screens/SplashScreen.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logoIcon from "../assets/icons/big-logo-icon.png";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const text = "CLIMAQUEST";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-100 to-teal-200">
      {/* Logo Icon */}
      <motion.img
        src={logoIcon}
        alt="Logo Icon"
        className="w-28 h-28 mb-6"
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Letter-by-letter text animation */}
      <div className="flex space-x-1 text-[22px] md:text-[24px] tracking-[0.08em] font-raleway font-black text-[#008038] leading-snug">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
