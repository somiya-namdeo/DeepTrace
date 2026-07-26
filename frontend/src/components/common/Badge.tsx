import React from 'react';
import { cn } from './GlassCard';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'warning' | 'critical' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className,
  ...props 
}) => {
  const variants = {
    default: 'bg-white/10 text-white',
    primary: 'bg-primary/20 text-primary border border-primary/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    critical: 'bg-critical/20 text-critical border border-critical/30',
    outline: 'border border-white/20 text-white/70'
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
