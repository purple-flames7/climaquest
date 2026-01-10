import React from "react";

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  className = "",
}) => {
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${sizes[size]} ${className}`}
      aria-disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children ?? label}
    </button>
  );
};
