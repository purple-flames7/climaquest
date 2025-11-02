import { useUserStore } from "../stores";
import type { Badge, Achievement } from "../types";

export const userService = {
  //   Add xp pints to the player
  addXP(amount: number): void {
    const { xp, setXP } = useUserStore.getState();
    setXP(xp + amount);
  },

  // Award a badge to the player
  awardBadge(badge: Badge): void {
    const { badges, addBadge } = useUserStore.getState();
    if (!badges.includes(badge)) addBadge(badge);
  },

  //  Unlock an achievement
  unlockAchievement(achievement: Achievement): void {
    const { achievements, addAchievement } = useUserStore.getState();
    if (!achievements.includes(achievement)) addAchievement(achievement);
  },
};
