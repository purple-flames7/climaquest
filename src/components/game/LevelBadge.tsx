import { Star, Lock } from "lucide-react";

interface LevelBadgeProps {
  levelNumber: number;
  unlocked: boolean;
  completed: boolean;
  xpReward?: number;
  onClick?: () => void;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  levelNumber,
  unlocked,
  completed,
  xpReward,
  onClick,
}) => {
  return (
    <div
      onClick={unlocked && onClick ? onClick : undefined}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg cursor-pointer
        ${
          unlocked
            ? "bg-gradient-to-br from-green-400 to-blue-500"
            : "bg-gray-300 cursor-not-allowed"
        }
        ${completed ? "ring-4 ring-yellow-400" : ""}
      `}
    >
      {unlocked ? <Star size={24} /> : <Lock size={24} />}
      <span className="font-bold mt-2">Level {levelNumber}</span>
      {xpReward && <span className="text-sm mt-1">{xpReward} XP</span>}
    </div>
  );
};
