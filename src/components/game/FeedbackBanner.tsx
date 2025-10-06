interface FeedbackBannerProps {
  message: string;
  type?: "correct" | "wrong" | "info";
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  message,
  type = "info",
}) => {
  const colors = {
    correct: "bg-green-500 text-white",
    wrong: "bg-red-500 text-white",
    info: "bg-gray-200 text-gray-800",
  };

  return (
    <div className={`p-3 rounded-xl text-center font-semibold ${colors[type]}`}>
      {message}
    </div>
  );
};
