import { describe, it, expect } from "vitest";
import { calculateXP } from "../calculate-xp";
import {
  unlockNextLevel,
  markLevelComplete,
  calculateTotalXP,
  getNextPlayableLevel,
} from "../levels-utils";

const levels = [
  { id: 1, completed: true, unlocked: true, xpReward: 10 },
  { id: 2, completed: false, unlocked: false, xpReward: 15 },
  { id: 3, completed: false, unlocked: false, xpReward: 20 },
] as any[];

describe("XP calculation", () => {
  it("gives correct XP for difficulty", () => {
    expect(calculateXP(10, "easy", true)).toBe(10);
    expect(calculateXP(10, "medium", true)).toBe(15);
    expect(calculateXP(10, "hard", true)).toBe(20);
    expect(calculateXP(10, "hard", false)).toBe(0);
  });
});

describe("Level utils", () => {
  it("marks level complete", () => {
    const updated = markLevelComplete(levels, 2);
    expect(updated[1].completed).toBe(true);
  });

  it("unlocks next level", () => {
    const updated = unlockNextLevel(levels, 1);
    expect(updated[1].unlocked).toBe(true); // level 2
  });

  it("calculates total XP", () => {
    const total = calculateTotalXP(levels);
    expect(total).toBe(10); // only level 1 completed
  });

  it("gets next playable level", () => {
    const next = getNextPlayableLevel(levels);
    expect(next?.id).toBe(2); // first unlocked, not completed
  });
});
