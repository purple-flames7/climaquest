export * from "./question";
export * from "./level";
export * from "./user";
export * from "./review";
export * from "./answered-question";

// Shared primitives and cross-cutitng interfaces
export type ID = string | number;

export type AnswerValue = string | boolean | null;

export interface Timestamped {
  createdAt: number;
  updatedAt?: number;
}

export interface Versioned {
  version: number;
}
