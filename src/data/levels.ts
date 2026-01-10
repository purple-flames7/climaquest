import type { Level } from "../types";
import { allQuestionsById } from "./all-questions";

/**
 * Game categories
 */
export const categories = [
  "Climate Science",
  "Climate Justice & Inequality",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
] as const;

/**
 * Level titles (30 total)
 */
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

/**
 * Build levels deterministically based on category and difficulty
 */
export const levels: Level[] = (() => {
  const allQuestions = Object.values(allQuestionsById);

  return Array.from({ length: 30 }, (_, i) => {
    // Determine difficulty
    const difficulty: "easy" | "medium" | "hard" =
      i >= 20 ? "hard" : i >= 10 ? "medium" : "easy";

    // Determine category (6 levels per category)
    const categoryIndex = Math.floor(i / 6);
    const category = categories[categoryIndex] ?? categories[0];

    // Get all questions in this category
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    // Slice questions for this level (5 per level max)
    const start = (i % 6) * 5;
    const levelQuestions = categoryQuestions.slice(start, start + 5);

    return {
      id: i + 1,
      title: levelTitles[i],
      completed: false,
      unlocked: i === 0, // First level unlocked by default
      categories: [category],
      difficulty,
      questionIDs: levelQuestions.map((q) => String(q.id)),
      xpReward: difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
    };
  });
})();
