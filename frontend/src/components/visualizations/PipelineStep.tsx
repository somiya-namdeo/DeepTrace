import React from 'react';
import { GlassCard } from '../common/GlassCard';

export interface PipelineStepData {
  id: string;
  title: string;
  desc: string;
  type: 'normal' | 'primary' | 'secondary' | 'warning' | 'critical';
}

export const PipelineStep: React.FC<{ step: PipelineStepData, isLast: boolean }> = ({ step, isLast }) => {
  const getGlow = (type: string) => {
    switch (type) {
      case 'primary': return 'group-hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:border-primary/40';
      case 'secondary': return 'group-hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] group-hover:border-secondary/40';
      case 'warning': return 'group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:border-warning/40';
      case 'critical': return 'group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:border-critical/40';
      default: return 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-white/10';
    }
  };

  return (
    <div className="relative group">
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-[-12px] w-0.5 bg-white/5 z-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      )}
      <GlassCard className={`relative z-10 py-3 px-4 flex items-center justify-between hover:bg-white/[0.04] transition-all duration-300 cursor-default border-transparent group-hover:translate-x-[6px] ${getGlow(step.type)}`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm border transition-colors
            ${step.type === 'normal' ? 'bg-white/5 border-white/10 text-white/50 group-hover:bg-white/10 group-hover:text-white/70' : ''}
            ${step.type === 'primary' ? 'bg-primary/10 border-primary/30 text-primary glow-border' : ''}
            ${step.type === 'secondary' ? 'bg-secondary/10 border-secondary/30 text-secondary' : ''}
            ${step.type === 'warning' ? 'bg-warning/10 border-warning/30 text-warning glow-border-warning' : ''}
            ${step.type === 'critical' ? 'bg-critical/10 border-critical/30 text-critical glow-border-critical' : ''}
          `}>
            {step.id}
          </div>
          <span className="text-white font-medium">{step.title}</span>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase text-right max-w-[150px] leading-tight">{step.desc}</span>
      </GlassCard>
    </div>
  );
};
