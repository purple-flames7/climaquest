import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logoIcon from "../assets/icons/icon-logo.webp";

/**
 * Duration (in milliseconds) to display the splash screen
 * after the logo animation has fully loaded.
 *
 * UX NOTE:
 * This delay ensures branding is visible long enough to register
 * without blocking the user excessively.
 */
const SPLASH_DELAY_MS = 3000;

/**
 * Application title displayed during the splash animation.
 * Split into individual characters for staggered entrance effects.
 */
const TITLE = "CLIMAQUEST";

/**
 * SplashScreen
 * Initial entry screen responsible for:
 * - Displaying brand identity (logo + title)
 * - Running the intro animation sequence
 * - Redirecting the user to the home screen after a short delay
 * This screen is intentionally state-light and does not depend on stores.
 */
export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();

  /**
   * Tracks when the logo image has fully loaded.
   * Animations and navigation are gated behind this flag
   * to avoid janky transitions on slow connections.
   */
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);

  /**
   * Once the logo has loaded, start a timer that navigates
   * the user to the home screen after the splash delay.
   *
   * Cleanup ensures no navigation occurs if the component unmounts early.
   */
  useEffect(() => {
    if (!logoLoaded) return;

    const t = setTimeout(() => navigate("/home"), SPLASH_DELAY_MS);
    return () => clearTimeout(t);
  }, [logoLoaded, navigate]);

  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center justify-center spacing-section bg-gradient-to-b from-emerald-100 to-teal-200"
    >
      {/* Animated logo entrance */}
      <motion.img
        src={logoIcon}
        alt="ClimaQuest logo"
        className="w-28 h-28 mb-6"
        initial={{ scale: 0, rotate: -35, opacity: 0 }}
        animate={logoLoaded ? { scale: 1, rotate: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeOut" }}
        onLoad={() => setLogoLoaded(true)}
      />

      {/* Animated title text (purely decorative) */}
      <div
        aria-hidden="true"
        className="flex space-x-1 text-lg md:text-xl tracking-wider font-black text-primary"
      >
        {TITLE.split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.45 }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    </main>
  );
}
