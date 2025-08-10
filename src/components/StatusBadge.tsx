import React from 'react';

interface StatusBadgeProps {
  status: 'filed' | 'in-progress' | 'overdue' | 'upcoming' | 'completed';
  children: React.ReactNode;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children, className = '' }) => {
  const statusClasses = {
    'filed': 'bg-semantic-success/10 text-semantic-success border-semantic-success/20',
    'in-progress': 'bg-semantic-warning/10 text-semantic-warning border-semantic-warning/20',
    'overdue': 'bg-semantic-danger/10 text-semantic-danger border-semantic-danger/20',
    'upcoming': 'bg-semantic-info/10 text-semantic-info border-semantic-info/20',
    'completed': 'bg-semantic-success/10 text-semantic-success border-semantic-success/20',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
        ${statusClasses[status]} ${className}
      `}
    >
      {children}
    </span>
  );
};

export default StatusBadge;