// src/types/level.ts
import type { Category, Difficulty } from "./question";

export interface Level {
  id: number; // Unique level ID
  title: string; // Display name for the level
  description?: string;
  completed: boolean; // Has the player completed it?
  unlocked: boolean; // Is the level available to the player?
  icon?: string;
  questionIDs: string[];
  categories: Category[]; // Categories included in this level
  difficulty: Difficulty; // Difficulty for all questions in this level
  xpReward?: number; // XP awarded for completing the level
}
