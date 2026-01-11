/**
 * Keys for storing and retrieving data in localStorage or other persistent storage.
 * Centralizing these keys helps avoid typos and ensures consistency across the app.
 */
export const STORAGE_KEYS = {
  USER_PROGRESS: "climaquest_user_progress", // Stores user's progress: levels completed, XP, streaks
  SELECTED_CATEGORY: "climaquest_selected_category", // Stores the last category the user selected
  SELECTED_LEVEL: "climaquest_selected_level", // Stores the last level the user selected
  USER_PROFILE: "climaquest_user_profile", // Stores the user's profile info (name, avatar, etc.)
};
