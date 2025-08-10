import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helper,
  options,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-charcoal">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal 
          transition-colors duration-200 bg-white
          ${error ? 'border-semantic-danger focus:ring-semantic-danger focus:border-semantic-danger' : ''}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-semantic-danger">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-600">{helper}</p>
      )}
    </div>
  );
};

export default Select;