import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useGameStore } from "../stores";

/**
 * TutorialScreen
 * Interactive onboarding experience that introduces the core
 * question types and mechanics of ClimaQuest.
 * Responsibilities:
 * - Walk the player through the different question formats
 * - Visually demonstrate interactions without requiring input
 * - Mark the tutorial as completed and route the user into the game
 * This screen mutates global game state only once (on completion).
 */
export default function TutorialScreen(): JSX.Element {
  const navigate = useNavigate();

  /**
   * Global game actions
   * completeTutorial updates persistent game state
   * so the user is not shown onboarding again.
   */
  const { completeTutorial } = useGameStore();

  /**
   * Local tutorial step state.
   * Steps are linear and intentionally simple (1 → 5).
   */
  const [step, setStep] = useState<number>(1);

  /**
   * Advance the tutorial.
   * - Steps 1–4 progress the onboarding flow
   * - Final step marks tutorial as complete and returns user home
   */
  const handleNext = (): void => {
    if (step < 5) setStep((prev) => prev + 1);
    else {
      completeTutorial();
      navigate("/home");
    }
  };

  /**
   * Shared animation variants for step transitions.
   * Used by AnimatePresence to smoothly transition
   * between tutorial overlays.
   */
  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-200 via-green-200 to-teal-300 text-center p-6 overflow-hidden">
      {/* Tutorial overlays rendered one at a time */}
      <AnimatePresence mode="wait">
        {/* Step 1: Introduction */}
        {step === 1 && (
          <motion.div
            key="intro"
            {...fadeVariants}
            transition={{ duration: 0.6 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-80"
          >
            <h2 className="text-2xl font-bold text-emerald-800 mb-3">
              Welcome to ClimaQuest!
            </h2>
            <p className="text-emerald-700 mb-4">
              Let’s quickly show you how to play the game. 🌱
            </p>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Let’s Go
            </button>
          </motion.div>
        )}

        {/* Step 2: Multiple Choice Question example */}
        {step === 2 && (
          <motion.div
            key="mcq"
            {...fadeVariants}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xl font-semibold text-emerald-900 mb-3">
              Multiple Choice Questions
            </p>

            <div className="bg-white/80 p-6 rounded-2xl shadow-md w-80">
              <p className="text-emerald-800 mb-4">
                Example: Which of these actions helps reduce carbon footprint?
              </p>

              {/* Animated example options (non-interactive) */}
              <div className="flex flex-col gap-3">
                {["Plant trees", "Burn waste", "Ignore recycling"].map(
                  (opt, idx) => (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2 rounded-lg border ${
                        idx === 0
                          ? "bg-lime-100 border-lime-400 animate-pulse"
                          : "bg-white border-emerald-200"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  )
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="mt-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-white px-6 py-2 rounded-xl"
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Step 3: True / False interaction */}
        {step === 3 && (
          <motion.div
            key="truefalse"
            {...fadeVariants}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xl font-semibold text-emerald-900 mb-3">
              True or False Questions
            </p>

            <div className="bg-white/80 p-6 rounded-2xl shadow-md w-80">
              <p className="text-emerald-800 mb-4">
                Example: Solar power is a renewable energy source.
              </p>

              {/* Visual cue demonstrating swipe interaction */}
              <div className="flex justify-between gap-4">
                <motion.div
                  className="w-1/2 bg-lime-100 border border-lime-400 py-3 rounded-xl text-emerald-900 font-medium"
                  animate={{ x: [0, 20, -20, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  Swipe →
                </motion.div>

                <div className="w-1/2 bg-white border border-emerald-200 py-3 rounded-xl text-emerald-700">
                  False
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="mt-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-white px-6 py-2 rounded-xl"
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Step 4: Short Answer input */}
        {step === 4 && (
          <motion.div
            key="shortanswer"
            {...fadeVariants}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xl font-semibold text-emerald-900 mb-3">
              Short Answer Questions
            </p>

            <div className="bg-white/80 p-6 rounded-2xl shadow-md w-80">
              <p className="text-emerald-800 mb-4">
                Example: Name one greenhouse gas.
              </p>

              {/* Animated input to signal typing interaction */}
              <motion.input
                type="text"
                placeholder="Type here..."
                className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <button
              onClick={handleNext}
              className="mt-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-white px-6 py-2 rounded-xl"
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Step 5: Completion */}
        {step === 5 && (
          <motion.div
            key="finish"
            {...fadeVariants}
            transition={{ duration: 0.6 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-80"
          >
            <h2 className="text-2xl font-bold text-emerald-800 mb-3">
              You’re Ready!
            </h2>
            <p className="text-emerald-700 mb-4">
              Now you know how to answer questions. Time to begin your Climate
              Quest!
            </p>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Start Playing
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step indicator dots (visual progress only) */}
      <div className="absolute bottom-8 flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-3 h-3 rounded-full transition-all ${
              n === step ? "bg-emerald-600 scale-110" : "bg-emerald-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
