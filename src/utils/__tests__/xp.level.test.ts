import { describe, it, expect } from "vitest";
import { calculateXP } from "../calculate-xp";
import {
  unlockNextLevel,
  markLevelComplete,
  calculateTotalXP,
  getNextPlayableLevel,
} from "../levels-utils";

/**
 * Mock levels for testing utilities
 */
const levels = [
  { id: 1, completed: true, unlocked: true, xpReward: 10 },
  { id: 2, completed: false, unlocked: false, xpReward: 15 },
  { id: 3, completed: false, unlocked: false, xpReward: 20 },
] as any[]; // Using `any` for simplicity in test mocks

describe("XP calculation utility", () => {
  it("calculates XP correctly based on difficulty and correctness", () => {
    expect(calculateXP(10, "easy", true)).toBe(10);
    expect(calculateXP(10, "medium", true)).toBe(15);
    expect(calculateXP(10, "hard", true)).toBe(20);
    expect(calculateXP(10, "hard", false)).toBe(0); // Incorrect answer → 0 XP
  });
});

describe("Level utility functions", () => {
  it("marks a level as completed", () => {
    const updated = markLevelComplete(levels, 2); // Mark level 2 completed
    expect(updated[1].completed).toBe(true);
  });

  it("unlocks the next level after a given level", () => {
    const updated = unlockNextLevel(levels, 1); // Unlock level after 1
    expect(updated[1].unlocked).toBe(true); // Level 2 unlocked
  });

  it("calculates total XP for completed levels only", () => {
    const total = calculateTotalXP(levels);
    expect(total).toBe(10); // Only level 1 completed initially
  });

  it("returns the next playable level (first unlocked, not completed)", () => {
    const next = getNextPlayableLevel(levels);
    expect(next?.id).toBe(2); // Level 2 is first unlocked & incomplete
  });
});
