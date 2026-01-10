interface CardProps {
  title?: string;
  children: React.ReactNode;
  shadow?: boolean;
  rounded?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  shadow = true,
  rounded = true,
  className = "",
}) => {
  return (
    <div
      className={`card ${shadow ? "shadow-lg" : "shadow-none"} ${
        rounded ? "rounded-2xl" : ""
      } ${className}`}
      role="group"
    >
      {title && (
        <h3 className="text-lg font-bold mb-2 text-text-strong">{title}</h3>
      )}
      {children}
    </div>
  );
};
