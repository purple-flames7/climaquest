interface FooterProps {
  children?: React.ReactNode; // Optional content to display inside the footer
  className?: string; // Optional additional CSS classes for customization
}

/**
 * Footer component provides a consistent page footer.
 *
 * Features:
 * - Flexible: accepts children content (text, links, etc.)
 * - Can be extended with additional styling via `className`
 * - Uses semantic <footer> tag with accessibility role
 */
export const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <footer
      // Tailwind classes:
      // - full width, centered content
      // - top border for separation
      // - muted text color and small font
      // - padding and margin to align at bottom of page
      className={`w-full flex items-center justify-center border-t border-muted/30 text-text-muted text-sm p-4 mt-auto ${className}`}
      role="contentinfo" // Accessibility: identifies this as the page footer
    >
      {children} // Render any nested content passed to the footer
    </footer>
  );
};
