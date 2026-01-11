import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  title?: string; // Optional main title of the header
  subtitle?: string; // Optional subtitle / secondary text
  onBack?: () => void; // Optional callback for back navigation
  className?: string; // Optional additional CSS classes
}

/**
 * Header component renders a top page banner with optional back button, title, and subtitle.
 *
 * Features:
 * - Optional back navigation button (using ArrowLeft icon)
 * - Responsive layout with title and subtitle
 * - Semantic HTML with accessibility roles
 * - Supports custom styling via `className`
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  className = "",
}) => {
  return (
    <header
      className={`
        w-full flex items-center gap-3 p-4 
        border-b border-muted/30 
        bg-surface/80 backdrop-blur-sm 
        ${className}
      `}
      role="banner" // Accessibility: identifies the header landmark
    >
      {/* Render back button if onBack callback is provided */}
      {onBack && (
        <Button
          variant="icon" // Icon-only button
          icon={<ArrowLeft size={20} aria-hidden="true" />} // Arrow icon
          onClick={onBack}
          className="focus-visible:ring-primary" // Focus ring for accessibility
          aria-label="Go back" // Screen reader label
        />
      )}

      {/* Title and optional subtitle */}
      <div>
        {title && (
          <h1 className="text-xl font-bold text-text-strong">{title}</h1>
        )}
        {subtitle && (
          <p className="text-text-muted text-sm leading-snug">{subtitle}</p>
        )}
      </div>
    </header>
  );
};
