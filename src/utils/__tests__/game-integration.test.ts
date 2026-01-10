import { describe, it, expect } from "vitest";
import { gameReducer } from "../../context";
import { createTestState } from "../../context/__tests__/test-utils";
import type { Level, MultipleChoiceQuestion } from "../../types";

/**
 * Mock Levels
 * Used to simulate simple game progression for testing.
 */
const mockLevels: Level[] = [
  {
    id: 1,
    title: "Level 1",
    completed: false,
    unlocked: true,
    categories: ["Climate Science"],
    difficulty: "easy",
    questionIDs: ["q1", "q2"],
    xpReward: 10,
  },
  {
    id: 2,
    title: "Level 2",
    completed: false,
    unlocked: false,
    categories: ["Climate Science"],
    difficulty: "medium",
    questionIDs: ["q3", "q4"],
    xpReward: 15,
  },
];

/**
 * Mock Questions for Level 1
 */
const question1: MultipleChoiceQuestion = {
  id: "q1",
  type: "mcq",
  question: "What is CO2?",
  explanation: "CO2 is carbon dioxide.",
  category: "Climate Science",
  difficulty: "easy",
  options: ["A", "B", "C"],
  correctOptionIndex: 0,
};

const question2: MultipleChoiceQuestion = {
  id: "q2",
  type: "mcq",
  question: "Which gas contributes to global warming?",
  explanation: "CO2 and methane are greenhouse gases.",
  category: "Climate Science",
  difficulty: "easy",
  options: ["A", "B", "C"],
  correctOptionIndex: 1,
};

/**
 * Integration test for game state management
 * - Selects level
 * - Answers questions
 * - Checks XP and completed questions
 */
describe("Game integration test", () => {
  it("simulates answering questions with XP correctly", () => {
    // Initialize a fresh test state
    let state = createTestState(mockLevels);

    // --- Step 1: Select Level 1 ---
    state = gameReducer(state, {
      type: "SELECT_LEVEL",
      payload: { index: 0, questionIDs: mockLevels[0].questionIDs },
    });

    // --- Step 2: Answer question1 correctly ---
    state = gameReducer(state, {
      type: "ANSWER_QUESTION",
      payload: {
        questionId: question1.id,
        correct: true,
        userAnswer: "A",
        questionData: question1,
      },
    });

    // Expect XP to reflect easy question correctly answered
    expect(state.xp).toBe(10); // base XP 10 * easy multiplier 1
    // Question should be marked as completed
    expect(state.completedQuestions).toContain("q1");

    // --- Step 3: Answer question2 incorrectly ---
    state = gameReducer(state, {
      type: "ANSWER_QUESTION",
      payload: {
        questionId: question2.id,
        correct: false,
        userAnswer: "B",
        questionData: question2,
      },
    });

    // XP should not increase for incorrect answer
    expect(state.xp).toBe(10);
    // Question should still be marked as completed
    expect(state.completedQuestions).toContain("q2");
  });
});
