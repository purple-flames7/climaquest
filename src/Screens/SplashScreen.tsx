// src/components/SplashScreen.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import LogoIcon from "../assets/icons/icononly_transparent_nobuffer.png";

const LOGO_TEXT = "CLIMAQUEST";
const PARTICLE_COUNT = 20;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);

  // Auto-advance after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => navigate("/home"), 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Particle component
  const Particle = ({
    size,
    left,
    duration,
  }: {
    size: number;
    left: number;
    duration: number;
  }) => (
    <motion.div
      className="absolute bg-white rounded-full opacity-50"
      style={{ width: size, height: size, left }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: 200 + Math.random() * 100,
        opacity: 0.3 + Math.random() * 0.4,
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  );

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-green-700 via-teal-600 to-blue-600 flex flex-col items-center justify-center overflow-hidden">
      {/* Particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle
          key={i}
          size={Math.random() * 6 + 4}
          left={Math.random() * window.innerWidth}
          duration={2 + Math.random() * 3}
        />
      ))}

      {/* Logo container (vertical stack) */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon animation */}
            <motion.img
              src={LogoIcon}
              alt="Logo Icon"
              className="w-28 md:w-36"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />

            {/* Text animation */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white flex">
              {LOGO_TEXT.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.12 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional tagline */}
      <AnimatePresence>
        {showLogo && (
          <motion.p
            className="absolute bottom-20 text-white text-lg md:text-2xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3, duration: 0.5 }} // adjust to match longer duration
          >
            Test your climate knowledge
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
