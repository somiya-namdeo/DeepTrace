import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'primary' | 'secondary' | 'warning' | 'critical';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  glow = 'none',
  ...props 
}) => {
  const glowClasses = {
    none: '',
    primary: 'glow-border',
    secondary: 'border border-secondary/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]',
    warning: 'glow-border-warning',
    critical: 'glow-border-critical'
  };

  return (
    <div 
      className={cn('glass-card p-6', glowClasses[glow], className)}
      {...props}
    >
      {children}
    </div>
  );
};
