// src/store/user-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Achievement, Badge, UserProgress } from "../types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addXP: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  unlockAchievement: (achievement: Achievement) => void;
  updateProgress: (
    levelId: number,
    questionIds: string[],
    xpEarned: number,
    completed?: boolean
  ) => void;
  resetUserProgress: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser(user) {
        set({ user });
      },

      clearUser() {
        set({ user: null });
      },

      addXP(amount) {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              totalXp: (state.user.totalXp ?? 0) + amount,
            },
          };
        });
      },

      addBadge(badge) {
        set((state) => {
          if (!state.user) return state;

          // Ensure badges array exists
          const badges: Badge[] = state.user.badges ?? [];

          // Prevent duplicates
          if (badges.some((b) => b.id === badge.id)) return state;

          return {
            user: { ...state.user, badges: [...badges, badge] },
          };
        });
      },

      unlockAchievement(achievement) {
        set((state) => {
          if (!state.user) return state;

          const achievements: Achievement[] = state.user.achievements ?? [];

          // Prevent duplicates
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

      updateProgress(levelId, questionIds, xpEarned, completed = false) {
        set((state) => {
          if (!state.user) return state;

          const progress: UserProgress[] = [...(state.user.progress ?? [])];
          const existingIndex = progress.findIndex(
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

      resetUserProgress() {
        set((state) => {
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
      migrate: (persistedState: any, _version: number) => ({
        ...persistedState,
        user: persistedState?.user ?? null,
      }),
    }
  )
);
