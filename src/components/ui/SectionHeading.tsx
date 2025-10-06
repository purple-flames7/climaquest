interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
}) => (
  <div className={`mb-4 ${className}`}>
    <h2 className="text-2xl font-bold">{title}</h2>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);
