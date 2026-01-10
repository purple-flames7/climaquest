import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logoIcon from "../assets/icons/icon-logo.webp";

const SPLASH_DELAY_MS = 3000;
const TITLE = "CLIMAQUEST";

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);

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
      <motion.img
        src={logoIcon}
        alt="ClimaQuest logo"
        className="w-28 h-28 mb-6"
        initial={{ scale: 0, rotate: -35, opacity: 0 }}
        animate={logoLoaded ? { scale: 1, rotate: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeOut" }}
        onLoad={() => setLogoLoaded(true)}
      />

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
