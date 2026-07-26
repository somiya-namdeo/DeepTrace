import React from 'react';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto container-padding w-full ${className}`}>
      {children}
    </div>
  );
};
