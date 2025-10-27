import { describe, it, expect } from "vitest";
import { gameReducer } from "../../context";
import { createTestState } from "../../context/__tests__/test-utils";
import type { Level, MultipleChoiceQuestion } from "../../types";

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

// Mock questions only for this test
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

describe("Game integration test", () => {
  it("simulates answering questions with XP correctly", () => {
    let state = createTestState(mockLevels);

    // Select Level 1
    state = gameReducer(state, {
      type: "SELECT_LEVEL",
      payload: { index: 0, questionIDs: mockLevels[0].questionIDs },
    });

    // Answer question1 correctly
    state = gameReducer(state, {
      type: "ANSWER_QUESTION",
      payload: {
        questionId: question1.id,
        correct: true,
        userAnswer: "A",
        questionData: question1,
      },
    });
    expect(state.xp).toBe(10); // base 10 * easy multiplier 1
    expect(state.completedQuestions).toContain("q1");

    // Answer question2 incorrectly
    state = gameReducer(state, {
      type: "ANSWER_QUESTION",
      payload: {
        questionId: question2.id,
        correct: false,
        userAnswer: "B",
        questionData: question2,
      },
    });
    expect(state.xp).toBe(10); // XP should not increase
    expect(state.completedQuestions).toContain("q2");
  });
});
