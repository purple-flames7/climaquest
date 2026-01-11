import type { Level } from "../types";
import { allQuestionsById } from "./all-questions";

/**
 * Canonical list of game categories.
 *
 * `as const` ensures:
 * - Literal string types
 * - Compile-time safety when matching question.category
 */
export const categories = [
  "Climate Science",
  "Climate Justice & Inequality",
  "Queer & Feminist Climate Futures",
  "Community Knowledge",
  "Climate Solutions",
] as const;

/**
 * Human-readable level titles.
 * Order matters: index maps directly to level number.
 * MUST remain length 30 to match level generation logic.
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
 * Builds the full list of game levels deterministically.
 *
 * Design constraints:
 * - 30 total levels
 * - 5 categories × 6 levels each
 * - 5 questions per level
 * - Difficulty escalates every 10 levels
 *
 * This file is a SOURCE OF TRUTH:
 * It should fail fast if data assumptions are violated.
 */
export const levels: Level[] = (() => {
  const allQuestions = Object.values(allQuestionsById);

  //  Guardrail: titles must match level count
  if (levelTitles.length !== 30) {
    throw new Error(`Expected 30 level titles, got ${levelTitles.length}`);
  }

  return Array.from({ length: 30 }, (_, i) => {
    const difficulty: "easy" | "medium" | "hard" =
      i >= 20 ? "hard" : i >= 10 ? "medium" : "easy";

    /**
     * Category progression:
     * Every 6 levels switches category
     */
    const categoryIndex = Math.floor(i / 6);
    const category = categories[categoryIndex];

    if (!category) {
      throw new Error(
        `Invalid category index ${categoryIndex} at level ${i + 1}`
      );
    }

    // Filter questions for this category
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    // Guardrail: each category must supply 30 questions (6 × 5)
    if (categoryQuestions.length < 30) {
      throw new Error(
        `Category "${category}" has ${categoryQuestions.length} questions. Expected at least 30.`
      );
    }

    /**
     * Slice 5 questions per level within the category
     */
    const start = (i % 6) * 5;
    const levelQuestions = categoryQuestions.slice(start, start + 5);

    // 🔒 Guardrail: every level must have exactly 5 questions
    if (levelQuestions.length !== 5) {
      throw new Error(
        `Level ${i + 1} has ${levelQuestions.length} questions instead of 5`
      );
    }

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
