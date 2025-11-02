import type { Level } from "../types";

export const unlockNextLevel = (
  levels: Level[],
  currentLevelId: number
): Level[] => {
  return levels.map(
    (level): Level =>
      level.id === currentLevelId + 1 ? { ...level, unlocked: true } : level
  );
};

export const markLevelComplete = (
  levels: Level[],
  levelId: number
): Level[] => {
  return levels.map(
    (level): Level =>
      level.id === levelId ? { ...level, completed: true } : level
  );
};

export const calculateTotalXP = (levels: Level[]): number => {
  return levels.reduce(
    (sum: number, level: Level): number =>
      level.completed ? sum + level.xpReward : sum,
    0
  );
};

export const getNextPlayableLevel = (levels: Level[]): Level | undefined => {
  const available: Level | undefined = levels.find(
    (level) => level.unlocked && !level.completed
  );
  if (available) return available;

  return levels.find((level) => !level.unlocked);
};

export const setLevelQuestions = (
  levels: Level[],
  levelId: number,
  questionIDs: string[]
): Level[] => {
  return levels.map(
    (level): Level => (level.id === levelId ? { ...level, questionIDs } : level)
  );
};
