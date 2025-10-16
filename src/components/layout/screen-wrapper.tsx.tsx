import { GradientBackground } from "../ui/gradient-background";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className,
  gradient,
}) => {
  return (
    <GradientBackground
      gradient={gradient}
      className={`min-h-screen flex flex-col items-center justify-start p-4 ${className}`}
    >
      {children}
    </GradientBackground>
  );
};
