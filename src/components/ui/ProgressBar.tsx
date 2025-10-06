interface ProgressBarProps {
  progress: number;
  height?: string;
  color?: string;
  bgColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "h-4",
  color = "bg-green-500",
  bgColor = "bg-gray-200",
}) => {
  return (
    <div className={`${bgColor} ${height} rounded-full overflow-hidden`}>
      <div
        className={`${color} h-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
