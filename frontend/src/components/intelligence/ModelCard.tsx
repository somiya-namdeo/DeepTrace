import React from 'react';
import { GlassCard } from '../common/GlassCard';

export const ModelCard: React.FC<{
  title: string;
  name: string;
  status: string;
  subtitle: string;
  glowColor?: 'primary' | 'secondary' | 'warning' | 'critical' | 'none';
}> = ({ title, name, status, subtitle, glowColor = 'none' }) => {
  return (
    <GlassCard glow={glowColor} className="flex flex-col justify-between hover:bg-surface/80 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-[10px] uppercase tracking-widest text-white/50 font-mono mb-1">{title}</h4>
        {status === 'ACTIVE' || status === 'OPERATIONAL' ? (
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(147,51,234,0.8)] animate-pulse" />
            <span className="text-[10px] text-white font-mono uppercase tracking-widest">{status}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-[10px] text-warning font-mono uppercase tracking-widest">{status}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-white font-medium text-lg">{name}</h3>
        <p className="text-white/50 text-sm mt-1">{subtitle}</p>
      </div>
    </GlassCard>
  );
};
