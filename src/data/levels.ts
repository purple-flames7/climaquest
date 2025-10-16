// src/data/levels.ts

import type { Level, Category } from "../types";
import { allQuestionsById } from "./all-questions";

// The categories for levels
export const categories: Category[] = [
  "Climate Science",
  "Climate Justice & Inequality",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
];

// Level titles
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

// Create levels
export const levels: Level[] = Array.from({ length: 30 }, (_, i) => {
  let difficulty: "easy" | "medium" | "hard" = "easy";
  if (i >= 20) difficulty = "hard";
  else if (i >= 10) difficulty = "medium";

  return {
    id: i + 1,
    title: levelTitles[i],
    completed: false,
    unlocked: i === 0,
    categories, // all categories included in each level
    difficulty,
    questionIDs: [], // dynamically filled per user
    xpReward: difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
  };
});

export function pickQuestionsForUser(
  level: Level,
  answeredQuestions: Record<string, boolean>,
  allowRepeats = false,
  numQuestions = 5
): string[] {
  // Step 1: Collect the full pool
  let pool = Object.values(allQuestionsById).filter(
    (q) =>
      level.categories.includes(q.category) && q.difficulty === level.difficulty
  );

  // Step 2: Filter out already answered ones (if not allowed)
  if (!allowRepeats) {
    pool = pool.filter((q) => !answeredQuestions[q.id]);
  }

  // Step 3: If not enough questions, fallback to all in that difficulty
  if (pool.length < numQuestions) {
    pool = Object.values(allQuestionsById).filter(
      (q) =>
        level.categories.includes(q.category) &&
        q.difficulty === level.difficulty
    );
  }

  // Step 4: Shuffle and take first N
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numQuestions);

  return selected.map((q) => q.id);
}
