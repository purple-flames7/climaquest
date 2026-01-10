import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
} from "../types";

/**
 * Type guard: checks if a Question is a Multiple Choice Question.
 */
export function isMCQ(q: Question): q is MultipleChoiceQuestion {
  return q.type === "mcq";
}

/**
 * Type guard: checks if a Question is a True/False Question.
 */
export function isTrueFalse(q: Question): q is TrueFalseQuestion {
  return q.type === "truefalse";
}

/**
 * Type guard: checks if a Question is a Short Answer Question.
 */
export function isShortAnswer(q: Question): q is ShortAnswerQuestion {
  return q.type === "shortanswer";
}
