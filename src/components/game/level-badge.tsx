import { Star, Lock } from "lucide-react";
import type { FC } from "react";

export interface LevelBadgeProps {
  levelNumber: number;
  unlocked: boolean;
  completed: boolean;
  xpReward?: number;
  onClick?: () => void;
}

export const LevelBadge: FC<LevelBadgeProps> = ({
  levelNumber,
  unlocked,
  completed,
  xpReward,
  onClick,
}) => {
  const handleClick = (): void => {
    if (unlocked && onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!unlocked}
      aria-label={`Level ${levelNumber}${completed ? " (completed)" : ""}`}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-primary
        ${
          unlocked
            ? "bg-primary text-white hover:scale-105"
            : "bg-muted text-text-muted cursor-not-allowed"
        }
        ${completed ? "ring-4 ring-accent" : ""}
      `}
    >
      {unlocked ? <Star className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
      <span className="font-bold mt-2">Level {levelNumber}</span>
      {xpReward && (
        <span className="text-sm opacity-90 mt-1">{xpReward} XP</span>
      )}
    </button>
  );
};
