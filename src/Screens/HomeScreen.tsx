// src/components/HomeScreen.tsx
import { motion } from "framer-motion";
import LogoIcon from "../assets/icons/fulllogo_transparent_nobuffer.png";

export default function HomeScreen() {
  const currentXP = 320;
  const nextLevelXP = 500;
  const progressPercent = (currentXP / nextLevelXP) * 100;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1D1E2C] via-[#4E4B7A] to-[#9F5F80]"
        animate={{
          background: [
            "linear-gradient(to bottom right, #1D1E2C, #4E4B7A, #9F5F80)",
            "linear-gradient(to bottom right, #0B3D91, #1E7145, #F4D35E)",
            "linear-gradient(to bottom right, #1D1E2C, #4E4B7A, #9F5F80)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-6 z-10">
        {/* Logo */}
        <img
          src={LogoIcon}
          alt="Logo"
          className="w-48 h-auto mb-6 mx-auto drop-shadow-lg"
        />

        {/* Greeting */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to play?
        </motion.h1>
        <p className="text-white/80 mb-8 text-center">Play. Learn. Grow</p>

        {/* Start Quiz Button */}
        <motion.button
          className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 px-12 rounded-2xl text-xl md:text-2xl shadow-lg mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Quiz
        </motion.button>

        {/* XP Progress Bar */}
        <div className="w-64 md:w-96 bg-white/20 rounded-full h-6 overflow-hidden mb-6 shadow-inner">
          <motion.div
            className="bg-teal-400 h-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <p className="text-white/70 mb-12">
          {currentXP} / {nextLevelXP} XP
        </p>

        {/* Bottom Navigation */}
        <div className="flex gap-10 text-white/80 text-lg">
          {["Rewards", "Tutorial", "Settings"].map((item) => (
            <motion.button
              key={item}
              className="hover:text-white transition"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
