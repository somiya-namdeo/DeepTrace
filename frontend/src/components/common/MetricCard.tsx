import React from 'react';
import { GlassCard } from './GlassCard';
import type { ThreatMetric } from '../../types';

export const MetricCard: React.FC<{ metric: ThreatMetric }> = ({ metric }) => {
  const isString = typeof metric.value === 'string';

  return (
    <GlassCard glow={metric.severity !== 'normal' ? metric.severity : 'none'} className="flex flex-col relative overflow-hidden group">
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-2 relative z-10">
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{metric.label}</span>
        {metric.severity !== 'normal' && (
          <div className="flex items-center space-x-1.5">
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${metric.severity === 'critical' ? 'bg-critical shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]'}`} />
          </div>
        )}
      </div>

      <div className="text-4xl font-semibold text-white tracking-tight relative z-10">
        {isString ? (
          <span>{metric.value}</span>
        ) : (
          <NumberCounter to={metric.value as number} />
        )}
      </div>
      
      <span className="text-xs text-white/40 mt-2 relative z-10">{metric.description}</span>
    </GlassCard>
  );
};

// A simple animated number counter component
const NumberCounter: React.FC<{ to: number }> = ({ to }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Simple fast animation for numbers
    const duration = 1000;
    const steps = 30;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let current = 0;
    const increment = to / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [to]);

  return <span>{count.toLocaleString()}</span>;
};
