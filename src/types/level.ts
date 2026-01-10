// src/types/level.ts
import type { Difficulty, Category } from "./question";

/**
 * Represents a playable level in the game.
 * This type should stay aligned with the Level-related schemas.
 */
export interface Level {
  /**
   * Unique numeric identifier for the level.
   * Used for ordering and progression logic.
   */
  id: number;

  /**
   * Display name shown to the user.
   */
  title: string;

  /**
   * Optional description or narrative context for the level.
   */
  description?: string;

  /**
   * Whether the player has completed this level.
   */
  completed: boolean;

  /**
   * Whether the level is currently available to the player.
   */
  unlocked: boolean;

  /**
   * Optional icon identifier or asset reference.
   */
  icon?: string;

  /**
   * IDs of questions included in this level.
   * The actual question content is resolved elsewhere.
   */
  questionIDs: string[];

  /**
   * Categories represented in this level.
   */
  categories: Category[];

  /**
   * Difficulty applied to the level as a whole.
   */
  difficulty: Difficulty;

  /**
   * XP awarded upon completing the level.
   */
  xpReward: number;
}
