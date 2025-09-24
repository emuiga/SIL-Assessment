import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  className = "flex items-center justify-center py-16 px-8 bg-portfolio"
}) => {
  return (
    <div className={className}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full mx-auto mb-4"></div>
        <p className="text-portfolio text-base font-playfair">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;