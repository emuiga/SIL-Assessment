import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  message: string;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  actionLink,
  icon,
  className = "text-center py-16"
}) => {
  return (
    <div className={className}>
      {icon && <div className="mb-4">{icon}</div>}
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </h3>
      )}
      <p className="text-gray-500 mb-6">{message}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;