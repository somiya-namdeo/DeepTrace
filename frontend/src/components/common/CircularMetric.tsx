import React, { useEffect, useState } from 'react';


export const CircularMetric: React.FC<{ value: number; label: string; subvalue: string; color: string }> = ({ value, label, subvalue, color }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center space-x-6">
      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-semibold text-white font-mono">{progress.toFixed(1)}%</span>
        </div>
      </div>
      <div>
        <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">{label}</div>
        <div className="text-3xl font-mono" style={{ color }}>{subvalue}</div>
      </div>
    </div>
  );
};
