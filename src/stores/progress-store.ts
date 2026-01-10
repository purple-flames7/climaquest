import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Level } from "../types";

/**
 * Progress store tracks player advancement and level states.
 * This is persisted in localStorage and synchronized with the game store.
 */
interface ProgressStore {
  /** IDs of levels currently unlocked for the player */
  unlockedLevels: number[];

  /** IDs of levels completed by the player */
  completedLevels: number[];

  /** Total number of levels available */
  totalLevels: number;

  /** Snapshot of level states for UI and persistence */
  levels: Level[];

  /** Initializes levels and syncs unlocked/completed status */
  setLevels: (levels: Level[]) => void;

  /** Unlocks a level and updates its unlocked flag */
  unlockLevel: (levelId: number) => void;

  /** Marks a level as completed and unlocks the next level */
  markLevelCompleted: (levelId: number) => void;

  /** Resets all progress back to default (first level unlocked only) */
  resetProgress: () => void;

  /** Checks if a level is unlocked */
  isLevelUnlocked: (levelId: number) => boolean;

  /** Checks if a level is completed */
  isLevelCompleted: (levelId: number) => boolean;
}

/**
 * Zustand store with persistence.
 * Handles unlocking, completion, and syncing level states.
 */
export const useProgressStore = create<ProgressStore>()(
  persist<ProgressStore>(
    (set, get): ProgressStore => ({
      unlockedLevels: [1], // Default first level unlocked
      completedLevels: [],
      totalLevels: 30, // Will be overwritten by setLevels
      levels: [],

      /**
       * Initializes levels and applies unlocked/completed flags
       */
      setLevels(levels: Level[]): void {
        const { unlockedLevels, completedLevels } = get();
        const updatedLevels: Level[] = levels.map((lvl) => ({
          ...lvl,
          unlocked: unlockedLevels.includes(lvl.id),
          completed: completedLevels.includes(lvl.id),
        }));
        set({ levels: updatedLevels, totalLevels: levels.length });
      },

      /**
       * Unlocks a level, if not already unlocked
       * Updates level object in snapshot for UI
       */
      unlockLevel(levelId: number): void {
        const { unlockedLevels } = get();
        if (!unlockedLevels.includes(levelId)) {
          set({
            unlockedLevels: [...unlockedLevels, levelId].sort((a, b) => a - b),
            levels: get().levels.map((lvl) =>
              lvl.id === levelId ? { ...lvl, unlocked: true } : lvl
            ),
          });
        }
      },

      /**
       * Marks a level as completed.
       * Automatically unlocks the next sequential level if it exists.
       */
      markLevelCompleted(levelId: number): void {
        const { completedLevels, totalLevels } = get();

        if (!completedLevels.includes(levelId)) {
          set({
            completedLevels: [...completedLevels, levelId],
            levels: get().levels.map((lvl) =>
              lvl.id === levelId ? { ...lvl, completed: true } : lvl
            ),
          });
        }

        const nextLevel: number = levelId + 1;
        if (nextLevel <= totalLevels) {
          get().unlockLevel(nextLevel);
        }
      },

      /** Returns true if the level is unlocked */
      isLevelUnlocked(levelId: number): boolean {
        return get().unlockedLevels.includes(levelId);
      },

      /** Returns true if the level is completed */
      isLevelCompleted(levelId: number): boolean {
        return get().completedLevels.includes(levelId);
      },

      /**
       * Resets progress to default:
       * - First level unlocked
       * - All other levels locked and incomplete
       */
      resetProgress(): void {
        set({
          unlockedLevels: [1],
          completedLevels: [],
          levels: get().levels.map((lvl) => ({
            ...lvl,
            unlocked: lvl.id === 1,
            completed: false,
          })),
        });
      },
    }),
    {
      name: "climaquest-progress",
      version: 4,
    }
  )
);
