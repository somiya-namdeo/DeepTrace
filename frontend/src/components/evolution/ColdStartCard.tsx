import React, { useEffect, useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';

const CircularProgress: React.FC<{ value: number, colorClass: string, label: string }> = ({ value, colorClass, label }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
          />
        </svg>
        <div className="absolute flex items-center justify-center inset-0">
          <span className="text-xl font-semibold text-white">{progress}%</span>
        </div>
      </div>
      <span className="mt-3 text-xs text-white/50 uppercase tracking-widest font-mono text-center max-w-[80px]">{label}</span>
    </div>
  );
};

export const ColdStartCard: React.FC = () => {
  return (
    <GlassCard className="p-8 relative overflow-hidden group h-full">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Cold Start Intelligence</h2>
          <p className="text-white/50 text-sm max-w-sm">Risk assessment for entities without historical behaviour using peer-group clustering.</p>
        </div>
        <Badge variant="primary" className="border-primary/30">Active Evaluation</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 h-[calc(100%-80px)]">
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">New Entity Detected</div>
            <div className="text-xl font-mono text-white tracking-wide">DEVICE-92031</div>
          </div>
          
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Confidence</span>
            <span className="text-sm font-mono text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">Medium</span>
          </div>
        </div>

        <div className="flex items-center justify-around bg-surface/50 rounded-xl border border-white/5 p-4">
          <CircularProgress value={78} colorClass="text-secondary" label="Similarity Score" />
          <div className="w-px h-16 bg-white/10" />
          <CircularProgress value={42} colorClass="text-warning" label="Risk Score" />
        </div>
      </div>
    </GlassCard>
  );
};
