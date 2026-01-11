import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import logoText from "../assets/icons/icon-text-logo.webp";
import { useGameStore } from "../stores";
import { XPBar } from "../components/game";

/**
 * HomeScreen
 * Primary landing screen after the splash screen.
 * Responsibilities:
 * - Display the game logo and player progress
 * - Provide the main entry point into gameplay
 * - Route the user based on tutorial completion state
 * This screen reads global game state but does not mutate it.
 */
export default function HomeScreen(): JSX.Element {
  const navigate = useNavigate();

  /**
   * Global game state
   * - tutorialCompleted: determines whether to send the user to tutorial or map
   * - xp: used to visualize overall player progression
   */
  const { tutorialCompleted, xp } = useGameStore();

  /**
   * Local UI state
   * Ensures animations only run once the logo asset is fully loaded.
   * This avoids desynchronized animations on slower connections.
   */
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);

  /**
   * Preload logo image so that entrance animations
   * are synchronized with actual asset availability.
   *
   * Runs once on mount.
   */
  useEffect(() => {
    const img = new Image();
    img.src = logoText;
    img.onload = () => setLogoLoaded(true);
  }, []);

  /**
   * Primary CTA handler.
   * Routes the user depending on whether they have
   * completed the onboarding tutorial.
   */
  const handlePlay = (): void => {
    if (tutorialCompleted) navigate("/progress-map");
    else navigate("/tutorial");
  };

  /**
   * XP calculation for the progress bar.
   * Currently uses a fixed XP threshold per level.
   */
  const xpForLevel = 300;
  const xpPercent = Math.min(100, (xp / xpForLevel) * 100);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-100 to-teal-200 text-center">
      {/* Animated text logo */}
      <motion.img
        src={logoText}
        alt="ClimaQuest"
        className="w-56 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      />

      {/* Contextual prompt based on player progress */}
      <motion.p
        className="text-lg mb-6 text-gray-700"
        initial={{ opacity: 0 }}
        animate={logoLoaded ? { opacity: 1 } : {}}
      >
        {tutorialCompleted
          ? "Continue your climate journey"
          : "Embark on your first quest"}
      </motion.p>

      {/* Player XP progress indicator */}
      <div className="w-64 mb-8">
        <XPBar progress={xpPercent} height="h-3" />
      </div>

      {/* Primary navigation actions */}
      <motion.div
        className="flex flex-col gap-4 w-64"
        initial={{ opacity: 0, y: 10 }}
        animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={handlePlay}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold py-4 rounded-2xl shadow-lg text-lg"
        >
          Continue Journey
        </motion.button>

        <button
          onClick={() => navigate("/progress-map")}
          className="text-emerald-700 font-medium underline underline-offset-4 hover:text-emerald-800"
        >
          View Journey Map
        </button>
      </motion.div>
    </main>
  );
}
