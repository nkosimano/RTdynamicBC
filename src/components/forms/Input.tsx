import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-charcoal">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal 
          transition-colors duration-200
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

export default Input;