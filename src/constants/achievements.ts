// ACHIEVEMENTS is a constant array of achievement objects used in the game.
// Each object represents a milestone or reward a player can earn.
// These can be tied to the user's progress, XP, streaks, or special accomplishments.
export const ACHIEVEMENTS = [
  {
    id: "first_quiz", // Unique identifier for the achievement (used internally)
    name: "Getting Started", // Display name shown to the player
    description: "Complete your first quiz", // Explains what the player must do to earn it
  },
  {
    id: "perfect_score",
    name: "Climate Expert",
    description: "Score 100% on a level", // Earned by completing a level with all answers correct
  },
  {
    id: "streak_5",
    name: "Consistency Hero",
    description: "Complete 5 quizzes in a row", // Rewards consistent gameplay over multiple sessions
  },
  {
    id: "eco_master",
    name: "Eco Master",
    description: "Earn 1000 total XP", // Rewards long-term engagement and XP accumulation
  },
];
