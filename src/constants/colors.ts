/**
 * Semantic color tokens for ClimaQuest.
 * These colors are used consistently across screens and components.
 * Using semantic names instead of hex codes keeps the UI maintainable.
 */
export const COLORS = {
  // Core brand colors
  primary: "#10B981", // Main brand color, used for buttons, highlights, XP indicators
  secondary: "#14B8A6", // Secondary color for accents, less prominent buttons or labels

  // Gradient for backgrounds or special cards
  gradient: {
    from: "#D1FAE5", // Start of gradient (lighter)
    to: "#99F6E4", // End of gradient (darker)
  },

  // Status colors
  success: "#4CAF50", // Success states: correct answers, completed levels
  error: "#F44336", // Error states: wrong answers, failed actions
  warning: "#FFC107", // Warnings or cautionary highlights

  // Text colors
  textPrimary: "#064E3B", // Main text color (used on light backgrounds)
  textOnPrimary: "#FFFFFF", // Text that appears on primary-colored backgrounds (buttons, badges)
};
