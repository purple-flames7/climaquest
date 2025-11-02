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
  persist<UserStore>(
    (set, get): UserStore => ({
      user: null,

      setUser(user: User): void {
        set({ user });
      },

      clearUser(): void {
        set({ user: null });
      },

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

      addBadge(badge: Badge): void {
        set((state): Partial<UserStore> => {
          if (!state.user) return state;
          const badges: Badge[] = state.user.badges ?? [];
          if (badges.some((b) => b.id === badge.id)) return state;
          return {
            user: { ...state.user, badges: [...badges, badge] },
          };
        });
      },

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
      migrate: (persistedState: any): UserStore => ({
        ...persistedState,
        user: persistedState?.user ?? null,
      }),
    }
  )
);
