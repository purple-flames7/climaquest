interface ProgressBarProps {
  progress: number;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "h-4",
}) => {
  return (
    <div
      className={`progress-track ${height}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};
