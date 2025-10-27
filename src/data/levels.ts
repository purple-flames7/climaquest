// src/data/levels.ts

import type { Level } from "../types";
import { allQuestionsById } from "./all-questions";

// The five categories
export const categories = [
  "Climate Science",
  "Climate Justice & Inequality",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
];

// Level titles (30 total)
const levelTitles: string[] = [
  "Sprout of Awareness",
  "Breezy Beginnings",
  "Seeds of Change",
  "Gentle Currents",
  "Learning the Winds",
  "First Footsteps",
  "Curious Clouds",
  "Eco Explorers",
  "Whispers of Justice",
  "Illuminated Leaves",
  "Rising Tides",
  "Solar Surge",
  "Community Pulse",
  "Winds of Action",
  "Roots of Resistance",
  "Climate Compass",
  "Queer Horizons",
  "Intersectional Sparks",
  "The Green Path",
  "Challenging Currents",
  "Tempest Trials",
  "Radical Roots",
  "Eco Revolution",
  "Justice Storm",
  "Resilient Future",
  "Feminist Frontlines",
  "Carbon Crusade",
  "Global Guardians",
  "Last Stand of the Forest",
  "Horizon Reimagined",
];

// --- Build Levels deterministically ---
export const levels: Level[] = (() => {
  const allQuestions = Object.values(allQuestionsById);

  return Array.from({ length: 30 }, (_, i) => {
    // Determine difficulty
    let difficulty: "easy" | "medium" | "hard" = "easy";
    if (i >= 20) difficulty = "hard";
    else if (i >= 10) difficulty = "medium";

    // Determine category
    const categoryIndex = Math.floor(i / 6);
    const category = categories[categoryIndex];

    // Get all questions for this category
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    // Determine slice for this level (5 per level)
    const start = (i % 6) * 5;
    const end = start + 5;

    const levelQuestions = categoryQuestions.slice(start, end);

    // Build level object
    return {
      id: i + 1,
      title: levelTitles[i],
      completed: false,
      unlocked: i === 0,
      categories: [category],
      difficulty,
      questionIDs: levelQuestions.map((q) => String(q.id)),
      xpReward: difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
    };
  });
})();
