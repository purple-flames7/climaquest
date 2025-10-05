// src/data/levels.ts
import type { Level } from "../types/level";
import type { Category } from "../types/question";
import { allQuestions } from "./allQuestions";

// The categories for each level
export const categories: Category[] = [
  "Climate Science",
  "Climate Justice & Inequality",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
];

// Thematic level titles
const levelTitles: string[] = [
  // Easy (1–10)
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

  // Medium (11–20)
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

  // Hard (21–30)
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

// Static level definitions
export const levels: Level[] = Array.from({ length: 30 }, (_, i) => {
  let difficulty: "easy" | "medium" | "hard" = "easy";
  if (i >= 20) difficulty = "hard";
  else if (i >= 10) difficulty = "medium";

  return {
    id: i + 1,
    title: levelTitles[i],
    completed: false,
    unlocked: i === 0, // first level unlocked by default
    categories,
    difficulty,
    questionIDs: [], // will be dynamically populated per user
    xpReward: difficulty === "easy" ? 50 : difficulty === "medium" ? 100 : 150,
  };
});

// Helper to dynamically pick questions for a user
export function pickQuestionsForUser(
  level: Level,
  answeredQuestions: Record<string, boolean>,
  allowRepeats = false
): string[] {
  return level.categories.map((category) => {
    let pool = allQuestions[category].filter(
      (q) => q.difficulty === level.difficulty
    );

    if (!allowRepeats) {
      pool = pool.filter((q) => !answeredQuestions[q.id]);
    }

    if (pool.length === 0) {
      // fallback: all questions have been used
      pool = allQuestions[category].filter(
        (q) => q.difficulty === level.difficulty
      );
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex]?.id || "";
  });
}
