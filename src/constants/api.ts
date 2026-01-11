// API holds the base URL and endpoint paths for the ClimaQuest backend.
// This makes it easy to update endpoints in one place if the API changes.
export const API = {
  BASE_URL: "https://api.climaquest.com", // The root URL of the backend API (currently a placeholder)
  QUIZZES: "/quizzes", // Endpoint to fetch or submit quiz data
  USERS: "/users", // Endpoint to get or update user data
  LEADERBOARD: "/leaderboard", // Endpoint to fetch leaderboard or ranking information
};
