import type { FC } from "react";

/**
 * Props for the XPBar component.
 */
export interface XPBarProps {
  currentXP: number; // Current XP the user has earned
  maxXP: number; // XP required to reach the next level
  height?: string; // Optional Tailwind height class (default "h-3")
}

/**
 * XPBar is a visual representation of the user's experience progress.
 *
 * Features:
 * - Shows current XP relative to the maximum XP needed for the next level
 * - Animated fill for smooth transitions when XP changes
 * - Fully accessible with proper ARIA attributes
 */
export const XPBar: FC<XPBarProps> = ({ currentXP, maxXP, height = "h-3" }) => {
  // Calculate the fill percentage (capped at 100%)
  const percentage = Math.min(100, (currentXP / maxXP) * 100);

  return (
    <div
      className={`bg-secondary ${height} rounded-full overflow-hidden`}
      role="progressbar" // ARIA role for accessibility
      aria-valuenow={currentXP} // Current progress
      aria-valuemin={0} // Minimum progress
      aria-valuemax={maxXP} // Maximum progress
      aria-label="Experience progress" // Screen reader label
    >
      <div
        className="bg-accent h-full transition-all duration-500"
        style={{ width: `${percentage}%` }} // Fill width based on percentage
      />
    </div>
  );
};
