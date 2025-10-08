import React from "react";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  className = "", // default empty
}) => {
  const base =
    "font-semibold rounded transition-colors duration-200 flex items-center justify-center";
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
  };
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    icon: "p-2 bg-transparent hover:bg-gray-100 text-gray-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};
