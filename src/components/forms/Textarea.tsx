import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helper,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-charcoal">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal 
          transition-colors duration-200 resize-vertical min-h-[120px]
          ${error ? 'border-semantic-danger focus:ring-semantic-danger focus:border-semantic-danger' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-semantic-danger">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-600">{helper}</p>
      )}
    </div>
  );
};

export default Textarea;