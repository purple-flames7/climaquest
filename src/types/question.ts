/**
 * Difficulty levels used for progression, scoring, and analytics.
 * Must stay in sync with the question schema.
 */
export type Difficulty = "easy" | "medium" | "hard";

/**
 * Question categories.
 * These values are user-facing and should not be renamed
 * without considering persisted data and analytics.
 */
export type Category =
  | "Climate Justice & Inequality"
  | "Climate Science"
  | "Queer & Feminist Climate Futures"
  | "Community Knowledge"
  | "Climate Solutions";

/**
 * Base fields shared by all question types.
 * Extracted for clarity and consistency.
 */
type BaseQuestion = {
  id: string;
  explanation?: string;
  category: Category;
  difficulty: Difficulty;
};

/**
 * Multiple-choice question.
 */
export type MultipleChoiceQuestion = BaseQuestion & {
  type: "mcq";
  question: string;
  options: string[];
  /**
   * Index of the correct option in the `options` array.
   */
  correctOptionIndex: number;
};

/**
 * True / False question.
 */
export type TrueFalseQuestion = BaseQuestion & {
  type: "truefalse";
  statement: string;
  answer: boolean;
};

/**
 * Short answer (free-text) question.
 */
export type ShortAnswerQuestion = BaseQuestion & {
  type: "shortanswer";
  question: string;
  /**
   * List of acceptable answers.
   * Matching rules are handled elsewhere.
   */
  acceptableAnswers: string[];
};

/**
 * Union of all supported question types.
 * Intended for use throughout the application
 * after data has been validated.
 */
export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion;
