import React from 'react';
import { GlassCard } from '../common/GlassCard';

export const ThreatFlow: React.FC = () => {
  const steps = [
    { id: '01', title: 'Event Stream', desc: 'INGEST', type: 'normal' },
    { id: '02', title: 'Behaviour Sequence Analysis', desc: 'SEQUENCE N=128', type: 'normal' },
    { id: '03', title: 'Transformer Model', desc: 'ATTENTION LAYERS - 6', type: 'primary' },
    { id: '04', title: 'Isolation Forest', desc: 'UNSUPERVISED', type: 'secondary' },
    { id: '05', title: 'Threat Score Fusion', desc: 'ENSEMBLE', type: 'primary' },
    { id: '06', title: 'SHAP Explanation', desc: 'ATTRIBUTION', type: 'warning' },
    { id: '07', title: 'SOC Decision', desc: 'HUMAN-IN-THE-LOOP', type: 'critical' },
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div key={step.id} className="relative">
          {idx !== steps.length - 1 && (
            <div className="absolute left-6 top-10 bottom-[-12px] w-0.5 bg-white/5 z-0" />
          )}
          <GlassCard className="relative z-10 py-3 px-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-default">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm border
                ${step.type === 'normal' ? 'bg-white/5 border-white/10 text-white/50' : ''}
                ${step.type === 'primary' ? 'bg-primary/10 border-primary/30 text-primary glow-border' : ''}
                ${step.type === 'secondary' ? 'bg-secondary/10 border-secondary/30 text-secondary' : ''}
                ${step.type === 'warning' ? 'bg-warning/10 border-warning/30 text-warning glow-border-warning' : ''}
                ${step.type === 'critical' ? 'bg-critical/10 border-critical/30 text-critical glow-border-critical' : ''}
              `}>
                {step.id}
              </div>
              <span className="text-white font-medium">{step.title}</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">{step.desc}</span>
          </GlassCard>
        </div>
      ))}
    </div>
  );
};
