import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info';
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    info: 'badge-info',
  };

  return (
    <span
      className={cn('badge', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
