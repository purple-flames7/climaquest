// src/types/level.ts
import type { Difficulty } from "./question";

export interface Level {
  id: number; // Unique level ID (use numeric index for level ordering)
  title: string; // Display name for the level
  description?: string;
  completed: boolean; // Has the player completed it?
  unlocked: boolean; // Is the level available to the player?
  icon?: string;
  questionIDs: string[]; // array of question ids (strings like "CS-E1")
  categories: string[];
  difficulty: Difficulty; // Difficulty for all questions in this level (if applicable)
  xpReward: number; // XP awarded for completing the level
}
