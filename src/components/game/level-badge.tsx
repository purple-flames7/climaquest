import { Star, Lock } from "lucide-react";
import type { FC } from "react";

/**
 * Props for the LevelBadge component.
 */
export interface LevelBadgeProps {
  levelNumber: number; // The level number to display
  unlocked: boolean; // Whether the level is unlocked and clickable
  completed: boolean; // Whether the level has been completed
  xpReward?: number; // Optional XP reward to display for this level
  onClick?: () => void; // Callback when the badge is clicked
}

/**
 * LevelBadge displays a single level in the game UI.
 *
 * Features:
 * - Shows a star icon if unlocked, lock icon if locked
 * - Displays level number and optional XP reward
 * - Visual cues for unlocked, completed, and locked states
 * - Clickable if unlocked
 * - Accessible via aria-label
 */
export const LevelBadge: FC<LevelBadgeProps> = ({
  levelNumber,
  unlocked,
  completed,
  xpReward,
  onClick,
}) => {
  // Only trigger onClick if level is unlocked
  const handleClick = (): void => {
    if (unlocked && onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!unlocked} // disables button for locked levels
      aria-label={`Level ${levelNumber}${completed ? " (completed)" : ""}`} // accessible label
      className={`
        flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg 
        transition-transform duration-200
        focus-visible:ring-2 focus-visible:ring-primary
        ${
          unlocked
            ? "bg-primary text-white hover:scale-105" // unlocked styling & hover effect
            : "bg-muted text-text-muted cursor-not-allowed" // locked styling
        }
        ${completed ? "ring-4 ring-accent" : ""} // completed visual ring
      `}
    >
      {/* Icon: Star if unlocked, Lock if locked */}
      {unlocked ? <Star className="w-6 h-6" /> : <Lock className="w-6 h-6" />}

      {/* Level number */}
      <span className="font-bold mt-2">Level {levelNumber}</span>

      {/* Optional XP reward */}
      {xpReward && (
        <span className="text-sm opacity-90 mt-1">{xpReward} XP</span>
      )}
    </button>
  );
};
