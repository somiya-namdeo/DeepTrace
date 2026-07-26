import React from 'react';
import { GlassCard } from '../common/GlassCard';

export interface PipelineStepData {
  id: string;
  title: string;
  desc: string;
  type: 'normal' | 'primary' | 'secondary' | 'warning' | 'critical';
}

export const PipelineStep: React.FC<{ step: PipelineStepData, isLast: boolean }> = ({ step, isLast }) => {
  return (
    <div className="relative group">
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-[-12px] w-0.5 bg-white/5 z-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      )}
      <GlassCard className="relative z-10 py-3 px-4 flex items-center justify-between hover:bg-white/[0.04] transition-colors cursor-default border-transparent group-hover:border-white/10">
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
