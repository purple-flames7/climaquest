// src/types/user.ts

export interface UserProgress {
  levelId: number; // Level the user has progressed in
  completed: boolean; // Did the user finish this level?
  questionsAnswered: string[]; // IDs of questions answered in this level
  xpEarned: number; // XP earned in this level
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  unlocked: boolean;
}

export interface User {
  id: string; // Unique identifier for the player
  name: string; // Player name or nickname
  avatar?: string; // Optional avatar image or emoji
  currentLevelId: number; // Level currently playing
  totalXp: number; // Accumulated XP
  progress: UserProgress[]; // Track progress per level
  achievements: Achievement[]; // Badges, milestones, or unlocked rewards
  streak?: number; // Optional daily or consecutive play streak
}
