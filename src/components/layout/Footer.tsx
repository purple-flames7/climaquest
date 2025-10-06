interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <div className={`w-full p-4 flex justify-center items-center ${className}`}>
      {children}
    </div>
  );
};
