export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface UserProgress {
  levelId: number; // Level the user has progressed in
  completed: boolean; // Did the user finish this level?
  questionsAnswered: string[]; // IDs of questions answered in this level
  xpEarned: number; // XP earned in this level
  questionIDs: string[]; // IDs of questions presented in this level
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  unlocked: boolean;
  icon?: "Award" | "Star" | "Zap" | string;
}

export interface User {
  id: string; // Unique identifier for the player
  name: string; // Player name or nickname
  avatar?: string; // Optional avatar image or emoji
  currentLevelId?: number; // Level currently playing (optional)
  totalXp?: number; // Accumulated XP (optional )
  progress?: UserProgress[]; // Track progress per level
  achievements?: Achievement[]; // Badges, milestones, or unlocked rewards
  badges?: Badge[]; // Badges earned by the user
  streak?: number; // Optional daily or consecutive play streak
}
