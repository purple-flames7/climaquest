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
  className,
}) => {
  return (
    <div
      className={`bg-white p-4 ${shadow ? "shadow-lg" : ""} ${
        rounded ? "rounded-2xl" : ""
      } ${className}`}
    >
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      {children}
    </div>
  );
};
