import type { Level, Question, User } from "../types";

export type GameAction =
  | { type: "INIT" }
  | { type: "SET_READY" }
  | { type: "SET_ERROR"; payload: { message?: string } }
  | { type: "SELECT_LEVEL"; payload: { index: number; questionIDs?: string[] } }
  | {
      type: "ANSWER_QUESTION";
      payload: {
        questionId: string;
        correct: boolean;
        userAnswer: string | boolean;
        questionData?: Question;
      };
    }
  | { type: "RETRY_LEVEL"; payload: { index: number } }
  | { type: "RESET_GAME" }
  | { type: "SET_USER"; payload: { user: User } }
  | { type: "COMPLETE_TUTORIAL" }
  | { type: "SET_LEVELS"; payload: { levels: Level[] } }
  | { type: "NEXT_QUESTION" };
