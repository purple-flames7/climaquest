interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className,
  gradient = "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
}) => {
  return (
    <div className={`${gradient} min-h-screen w-full ${className}`}>
      {children}
    </div>
  );
};
