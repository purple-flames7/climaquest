import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  className = "",
}) => {
  return (
    <header
      className={`w-full flex items-center gap-3 p-4 border-b border-muted/30 bg-surface/80 backdrop-blur-sm ${className}`}
      role="banner"
    >
      {onBack && (
        <Button
          variant="icon"
          icon={<ArrowLeft size={20} aria-hidden="true" />}
          onClick={onBack}
          className="focus-visible:ring-primary"
          aria-label="Go back"
        />
      )}
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
