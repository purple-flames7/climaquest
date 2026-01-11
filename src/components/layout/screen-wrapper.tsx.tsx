import { GradientBackground } from "../ui/gradient-background";

interface ScreenWrapperProps {
  children: React.ReactNode; // The main content of the screen
  className?: string; // Optional additional CSS classes
  gradient?: string; // Optional gradient override for the background
}

/**
 * ScreenWrapper provides a consistent layout for screens in ClimaQuest.
 *
 * Features:
 * - Gradient background via `GradientBackground` component
 * - Full viewport height (`min-h-screen`) and vertical layout
 * - Centers content horizontally and stacks children vertically
 * - Responsive padding for mobile (`px-4 py-8`) and desktop (`md:px-8`)
 * - Ensures accessibility by marking main content with `role="main"`
 * - Supports custom className and gradient overrides
 */
export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className = "",
  gradient,
}) => {
  return (
    <GradientBackground
      gradient={gradient} // Allow overriding the default gradient
      className={`
        min-h-screen 
        flex flex-col items-center justify-start 
        px-4 py-8 md:px-8 
        text-text-base
        ${className}
      `}
    >
      {/* Main content area with proper accessibility role */}
      <main role="main" className="w-full max-w-3xl flex-1 flex flex-col gap-6">
        {children}
      </main>
    </GradientBackground>
  );
};
