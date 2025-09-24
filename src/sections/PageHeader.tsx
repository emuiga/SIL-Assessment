import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = "mb-12 text-center"
}) => {
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold text-portfolio mb-4 font-playfair">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-playfair">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;