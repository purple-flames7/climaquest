import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Achievement, Badge, UserProgress } from "../types";

/**
 * UserStore
 * ----------
 * Source of truth for authenticated / identified player data.
 *
 * This store represents the *player profile*, not the game session.
 * It persists across reloads and sessions.
 *
 * Responsibilities:
 * - XP accumulation
 * - Achievements & badges
 * - Per-level progress tracking
 *
 * Non-responsibilities:
 * - Game flow (handled by game-store)
 * - UI state (handled by ui-store)
 */
interface UserStore {
  /**
   * Current user profile.
   * Null indicates guest / unauthenticated state.
   */
  user: User | null;

  /** User lifecycle */
  setUser: (user: User) => void;
  clearUser: () => void;

  /** Progression & rewards */
  addXP: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  unlockAchievement: (achievement: Achievement) => void;

  /**
   * Update or insert progress for a specific level.
   *
   * This is designed to be idempotent and safe to call multiple times.
   */
  updateProgress: (
    levelId: number,
    questionIds: string[],
    xpEarned: number,
    completed?: boolean
  ) => void;

  /**
   * Fully resets progression-related fields while keeping
   * the user identity intact.
   */
  resetUserProgress: () => void;
}

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set, get): UserStore => ({
      user: null,

      /**
       * Set the active user profile.
       * Typically called after authentication or profile hydration.
       */
      setUser(user: User): void {
        set({ user });
      },

      /**
       * Clears the user profile.
       * Used for logout or guest reset flows.
       */
      clearUser(): void {
        set({ user: null });
      },

      /**
       * Increment the user's total XP.
       * Safely no-ops if no user is present.
       */
      addXP(amount: number): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              totalXp: (state.user.totalXp ?? 0) + amount,
            },
          };
        });
      },

      /**
       * Award a badge to the user if not already earned.
       * Duplicate badges are intentionally ignored.
       */
      addBadge(badge: Badge): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;

          const badges: Badge[] = state.user.badges ?? [];
          if (badges.some((b) => b.id === badge.id)) return state;

          return {
            user: {
              ...state.user,
              badges: [...badges, badge],
            },
          };
        });
      },

      /**
       * Unlock a new achievement for the user.
       * Ensures achievements remain unique and explicitly marked unlocked.
       */
      unlockAchievement(achievement: Achievement): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;

          const achievements: Achievement[] = state.user.achievements ?? [];
          if (achievements.some((a) => a.id === achievement.id)) return state;

          return {
            user: {
              ...state.user,
              achievements: [
                ...achievements,
                { ...achievement, unlocked: true },
              ],
            },
          };
        });
      },

      /**
       * Create or update progress for a specific level.
       *
       * This function:
       * - Updates answered questions
       * - Records XP earned for the level
       * - Optionally marks the level as completed
       * - Safely merges with existing progress
       */
      updateProgress(
        levelId: number,
        questionIds: string[],
        xpEarned: number,
        completed: boolean = false
      ): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;

          const progress: UserProgress[] = [...(state.user.progress ?? [])];

          const existingIndex: number = progress.findIndex(
            (p) => p.levelId === levelId
          );

          const updatedProgress: UserProgress = {
            levelId,
            completed,
            questionIDs: questionIds,
            questionsAnswered: questionIds,
            xpEarned,
          };

          if (existingIndex >= 0) {
            progress[existingIndex] = {
              ...progress[existingIndex],
              ...updatedProgress,
            };
          } else {
            progress.push(updatedProgress);
          }

          return {
            user: {
              ...state.user,
              totalXp: (state.user.totalXp ?? 0) + xpEarned,
              progress,
            },
          };
        });
      },

      /**
       * Reset all progression-related user data.
       * Intended for testing, debugging, or "start over" flows.
       */
      resetUserProgress(): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              totalXp: 0,
              progress: [],
              achievements: [],
              badges: [],
            },
          };
        });
      },
    }),
    {
      name: "climaquest-user",
      version: 4,

      /**
       * Migration guard to ensure user object is always defined.
       * Prevents crashes when older persisted versions are loaded.
       */
      migrate: (persistedState: any): UserStore => ({
        ...persistedState,
        user: persistedState?.user ?? null,
      }),
    }
  )
);
