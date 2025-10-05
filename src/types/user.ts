// src/types/user.ts

export interface UserProgress {
  currentLevelId: number; // the level the user is currently on
  completedLevels: number[]; // list of level IDs the user has completed
  totalXP: number; // total XP earned
  answeredQuestions: Record<string, boolean>; // key=questionId, value=true if answered correctly
}
