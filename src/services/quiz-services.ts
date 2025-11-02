import { allQuestionsById } from "../data";
import type { Question } from "../types";

export const quizService = {
  // Get a single quesiton by ID
  getQuestionById(id: string): Question | null {
    return allQuestionsById[id] ?? null;
  },

  //   Get multiple random quesitons
  getRandomQuestions(count: number): Question[] {
    const allQuestions = Object.values(allQuestionsById);
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  },

  //  Get all questions from a specific category
  getQuestionsByCategory(category: string): Question[] {
    return Object.values(allQuestionsById).filter(
      (q) => q.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Verify if an answer is correct
  checkAnswer(questionId: string, selectedOption: string): boolean {
    const question = allQuestionsById[questionId];
    return question ? question.correctOption === selectedOption : false;
  },
};
