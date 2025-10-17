import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
} from "../types";

export function isMCQ(q: Question): q is MultipleChoiceQuestion {
  return q.type === "mcq";
}

export function isTrueFalse(q: Question): q is TrueFalseQuestion {
  return q.type === "truefalse";
}

export function isShortAnswer(q: Question): q is ShortAnswerQuestion {
  return q.type === "shortanswer";
}
