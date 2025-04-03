
import React from 'react';
import { cn } from '@/lib/utils';
import { FaultStatus } from '@/types/fault-report';

interface StatusBadgeProps {
  status: FaultStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusClass = (status: FaultStatus) => {
    switch (status) {
      case 'Outstanding':
        return 'status-badge-outstanding';
      case 'Parts Ordered':
        return 'status-badge-parts';
      case 'Completed':
        return 'status-badge-completed';
      default:
        return '';
    }
  };

  return (
    <span className={cn(getStatusClass(status), className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
