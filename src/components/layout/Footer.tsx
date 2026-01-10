interface FooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <footer
      className={`w-full flex items-center justify-center border-t border-muted/30 text-text-muted text-sm p-4 mt-auto ${className}`}
      role="contentinfo"
    >
      {children}
    </footer>
  );
};
