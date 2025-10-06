import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/Button";

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
  className,
}) => {
  return (
    <div className={`w-full flex items-center p-4 ${className}`}>
      {onBack && (
        <Button
          variant="icon"
          icon={<ArrowLeft size={20} />}
          onClick={onBack}
        />
      )}
      <div className="ml-2">
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {subtitle && <p className="text-gray-700">{subtitle}</p>}
      </div>
    </div>
  );
};
