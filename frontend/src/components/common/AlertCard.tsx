import React from 'react';
import { GlassCard } from './GlassCard';
import type { Alert } from '../../types';

export const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  const severityColor = 
    alert.confidence === 'HIGH' ? 'text-critical bg-critical/10 border-critical/30' : 
    alert.confidence === 'MEDIUM' ? 'text-warning bg-warning/10 border-warning/30' : 
    'text-primary bg-primary/10 border-primary/30';
    
  const dotColor = 
    alert.confidence === 'HIGH' ? 'bg-critical shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 
    alert.confidence === 'MEDIUM' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 
    'bg-primary shadow-[0_0_8px_rgba(147,51,234,0.8)]';

  const glowType = alert.confidence === 'HIGH' ? 'critical' : alert.confidence === 'MEDIUM' ? 'warning' : 'none';

  return (
    <GlassCard glow={glowType} className="p-4 hover:bg-surface/80 transition-colors cursor-pointer group relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex space-x-5">
          <div className="flex flex-col items-center justify-center min-w-[60px]">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-1">Risk</span>
            <span className={`text-2xl font-semibold ${alert.confidence === 'HIGH' ? 'text-critical' : alert.confidence === 'MEDIUM' ? 'text-warning' : 'text-primary'}`}>
              {alert.score.toFixed(2)}
            </span>
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-1.5">
              <span className="text-xs font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">{alert.id}</span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-white/80">{alert.type}</span>
            </div>
            <p className="text-sm text-white/50 pr-4 mt-2">{alert.description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between h-full space-y-4 pt-1">
          <div className={`w-2 h-2 rounded-full animate-pulse ${dotColor}`} />
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${severityColor}`}>
            Conf: {alert.confidence}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};
