/**
 * Static level definitions for ClimaQuest.
 * These are simplified constants used for UI rendering or initial state.
 * Each level corresponds to a set of questions grouped by category.
 */
export const LEVELS = [
  {
    id: 1, // Unique numeric identifier for the level
    title: "Climate Basics", // Display name shown in the UI
    description: "Understand the fundamentals of climate change", // Optional tooltip or detail text
    category: "climate_science", // Maps to question categories for filtering
    unlocked: true, // Determines if the player can access this level initially
  },
  {
    id: 2,
    title: "Causes of Global Warming",
    description: "Dive deeper into human impacts",
    category: "climate_science",
    unlocked: false, // Locked by default; unlocks after previous level completion
  },
];
