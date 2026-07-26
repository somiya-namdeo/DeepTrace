import React from 'react';
import { motion } from 'framer-motion';

export const HorizontalPipeline: React.FC = () => {
  const steps = [
    { id: 'events', label: 'Behaviour Events', type: 'normal' },
    { id: 'transformer', label: 'Transformer Encoder', type: 'primary' },
    { id: 'iforest', label: 'Isolation Forest', type: 'secondary' },
    { id: 'fusion', label: 'Threat Fusion', type: 'primary' },
    { id: 'shap', label: 'SHAP Explanation', type: 'warning' },
    { id: 'decision', label: 'Final Decision', type: 'critical' },
  ];

  return (
    <div className="flex flex-col h-full justify-center py-6 relative w-full">
      {/* Background connecting line */}
      <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-white/10 -translate-y-1/2 z-0 rounded-full" />
      
      {/* Animated glowing scan line */}
      <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 -translate-y-1/2 z-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
      
      <div className="flex justify-between items-center relative z-10 w-full px-4 md:px-8">
        {steps.map((step, idx) => {
          const isPrimary = step.type === 'primary';
          const isSecondary = step.type === 'secondary';
          const isWarning = step.type === 'warning';
          const isCritical = step.type === 'critical';
          const isNormal = step.type === 'normal';
          
          return (
            <React.Fragment key={step.id}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center group relative cursor-default"
              >
                {/* Node */}
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full mb-3 md:mb-4 border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125
                  ${isNormal ? 'bg-surface border-white/40 group-hover:border-white/80' : ''}
                  ${isPrimary ? 'bg-surface border-primary shadow-[0_0_12px_rgba(147,51,234,0.6)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.9)]' : ''}
                  ${isSecondary ? 'bg-surface border-secondary shadow-[0_0_12px_rgba(45,212,191,0.6)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.9)]' : ''}
                  ${isWarning ? 'bg-surface border-warning shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.9)]' : ''}
                  ${isCritical ? 'bg-surface border-critical shadow-[0_0_12px_rgba(244,63,94,0.6)] group-hover:shadow-[0_0_20px_rgba(244,63,94,0.9)]' : ''}
                `}>
                  <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300
                    ${isNormal ? 'bg-white/40 group-hover:bg-white/80' : ''}
                    ${isPrimary ? 'bg-primary' : ''}
                    ${isSecondary ? 'bg-secondary' : ''}
                    ${isWarning ? 'bg-warning' : ''}
                    ${isCritical ? 'bg-critical' : ''}
                  `} />
                </div>
                
                {/* Label */}
                <span className={`text-[9px] md:text-xs font-mono tracking-wider uppercase text-center max-w-[80px] md:max-w-[110px] leading-snug transition-colors duration-300
                  ${isNormal ? 'text-white/50 group-hover:text-white/80' : 'text-white/80 group-hover:text-white'}
                `}>
                  {step.label}
                </span>
              </motion.div>
              
              {/* Optional: Add small arrows between nodes for visual clarity on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 z-0 opacity-40 pointer-events-none" style={{ left: `${(idx * 100) / (steps.length - 1) + (100 / (steps.length - 1)) / 2}%` }}>
                  <span className="text-white/30 text-[10px]">→</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
