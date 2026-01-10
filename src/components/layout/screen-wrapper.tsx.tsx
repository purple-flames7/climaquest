import { GradientBackground } from "../ui/gradient-background";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className = "",
  gradient,
}) => {
  return (
    <GradientBackground
      gradient={gradient}
      className={`min-h-screen flex flex-col items-center justify-start px-4 py-8 md:px-8 text-text-base ${className}`}
    >
      <main role="main" className="w-full max-w-3xl flex-1 flex flex-col gap-6">
        {children}
      </main>
    </GradientBackground>
  );
};
