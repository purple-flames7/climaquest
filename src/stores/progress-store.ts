import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Level } from "../types";

interface ProgressStore {
  unlockedLevels: number[];
  completedLevels: number[];
  totalLevels: number;
  levels: Level[];
  setLevels: (levels: Level[]) => void;
  unlockLevel: (levelId: number) => void;
  markLevelCompleted: (levelId: number) => void;
  resetProgress: () => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isLevelCompleted: (levelId: number) => boolean;
}

export const useProgressStore = create<ProgressStore>()(
  persist<ProgressStore>(
    (set, get): ProgressStore => ({
      unlockedLevels: [1],
      completedLevels: [],
      totalLevels: 30,
      levels: [],

      setLevels(levels: Level[]): void {
        const { unlockedLevels, completedLevels } = get();
        const updatedLevels: Level[] = levels.map((lvl) => ({
          ...lvl,
          unlocked: unlockedLevels.includes(lvl.id),
          completed: completedLevels.includes(lvl.id),
        }));
        set({ levels: updatedLevels, totalLevels: levels.length });
      },

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

      isLevelUnlocked(levelId: number): boolean {
        return get().unlockedLevels.includes(levelId);
      },

      isLevelCompleted(levelId: number): boolean {
        return get().completedLevels.includes(levelId);
      },

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
