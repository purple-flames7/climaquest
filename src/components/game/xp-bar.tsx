import type { FC } from "react";

export interface XPBarProps {
  currentXP: number;
  maxXP: number;
  height?: string;
}

export const XPBar: FC<XPBarProps> = ({ currentXP, maxXP, height = "h-3" }) => {
  const percentage = Math.min(100, (currentXP / maxXP) * 100);

  return (
    <div
      className={`bg-secondary ${height} rounded-full overflow-hidden`}
      role="progressbar"
      aria-valuenow={currentXP}
      aria-valuemin={0}
      aria-valuemax={maxXP}
      aria-label="Experience progress"
    >
      <div
        className="bg-accent h-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
