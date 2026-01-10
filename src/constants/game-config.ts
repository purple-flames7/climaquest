/**
 * Global game configuration values.
 *
 * These values define core gameplay behavior and UX rules.
 * They should be treated as immutable and changed deliberately.
 */
export const GAME_CONFIG = {
  /**
   * Maximum number of questions presented in a single level.
   */
  MAX_QUESTIONS_PER_LEVEL: 10,

  /**
   * Minimum ratio of correct answers required to pass a level.
   * Example: 0.7 = 70%
   */
  PASS_THRESHOLD: 0.7,

  /**
   * Multiplier applied to XP calculations.
   * Allows global tuning of progression speed.
   */
  XP_MULTIPLIER: 1.2,

  /**
   * Delay (in milliseconds) before navigating to the review screen.
   * Used to allow feedback animations to complete.
   */
  REVIEW_DELAY_MS: 2000,

  /**
   * Toggles sound effects globally.
   */
  ENABLE_SOUND: true,

  /**
   * Controls whether hints are shown to the player.
   */
  SHOW_HINTS: true,
} as const;
