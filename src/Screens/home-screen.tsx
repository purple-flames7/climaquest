import { useState, useEffect } from "react";
import { useGameStore } from "../stores";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logoIcon from "../assets/icons/icon-text-logo.webp";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { tutorialCompleted, xp } = useGameStore();
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Programmatically preload the home screen logo
  useEffect(() => {
    const img = new Image();
    img.src = logoIcon;
    img.onload = () => setLogoLoaded(true);
  }, []);

  const handlePlay = () => {
    if (tutorialCompleted) navigate("/progress-map");
    else navigate("/tutorial");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-emerald-100 to-emerald-700 p-6">
      {/* Logo */}
      <motion.img
        src={logoIcon}
        alt="ClimaQuest Logo"
        className="w-56 h-auto mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      />

      {/* Tagline */}
      <motion.p className="text-emerald-900 text-lg mb-8 font-medium">
        {tutorialCompleted
          ? "Continue your climate journey"
          : "Embark on your first quest"}
      </motion.p>

      {/* XP Progress Bar */}
      <motion.div
        className="w-64 bg-white/20 rounded-full h-4 overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={logoLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-lime-400 to-emerald-500"
          initial={{ width: "0%" }}
          animate={
            logoLoaded ? { width: `${Math.min((xp / 300) * 100, 100)}%` } : {}
          }
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col gap-4 w-64"
        initial={{ opacity: 0, y: 10 }}
        animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <button
          onClick={handlePlay}
          className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          {tutorialCompleted ? "Continue Journey" : "Start Adventure"}
        </button>

        <button className="bg-emerald-50 text-emerald-800  font-medium py-3 rounded-xl hover:bg-emerald-100 transition-colors duration-200">
          View Rewards
        </button>
      </motion.div>
    </div>
  );
}
