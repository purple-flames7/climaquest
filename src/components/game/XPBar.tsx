interface XPBarProps {
  currentXP: number;
  maxXP: number;
  height?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  maxXP,
  height = "h-4",
}) => {
  const percentage = Math.min(100, (currentXP / maxXP) * 100);

  return (
    <div className={`bg-gray-200 ${height} rounded-full overflow-hidden`}>
      <div
        className="bg-yellow-400 h-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
