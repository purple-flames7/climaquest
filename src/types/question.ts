// src/types/questions.ts

export type Difficulty = "easy" | "medium" | "hard";

export type Category =
  | "Climate Justice & Inequality"
  | "Climate Science"
  | "Queer & Feminist Climate Futures"
  | "Community Knowledge"
  | "Climate Solutions";

// Question Types

export type MultipleChoiceQuestion = {
  id: string;
  type: "mcq";
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
};

export type TrueFalseQuestion = {
  id: string;
  type: "truefalse";
  statement: string;
  answer: boolean;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
};

export type ShortAnswerQuestion = {
  id: string;
  type: "shortanswer";
  question: string;
  acceptableAnswers: string[];
  explanation?: string;
  category: Category;
  difficulty: Difficulty;
};

export type DragDropQuestion = {
  id: string;
  type: "dragdrop";
  prompt: string;
  items: string[];
  targets: string[];
  correctMatches: Record<string, string>;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
};

export type ScenarioQuestion = {
  id: string;
  type: "scenario";
  scenario: string;
  options?: string[];
  correctOptionIndex?: number;
  acceptableAnswers?: string[];
  explanation: string;
  category: Category;
  difficulty: Difficulty;
};

// Union Type

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion
  | DragDropQuestion
  | ScenarioQuestion;
