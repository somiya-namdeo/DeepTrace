import React from 'react';
import { motion } from 'framer-motion';

export const ThreatFlowInteractive: React.FC = () => {
  const steps = [
    { label: 'Behaviour Events', desc: 'Raw telemetry ingestion' },
    { label: 'Transformer Encoder', desc: 'Sequence learning' },
    { label: 'Anomaly Detection', desc: 'Isolation forest scoring' },
    { label: 'Threat Fusion', desc: 'Ensemble confidence aggregation' },
    { label: 'SHAP Explanation', desc: 'Feature attribution' },
    { label: 'Final Decision', desc: 'Risk classification' },
  ];

  return (
    <div className="flex flex-col items-center py-12">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="w-full max-w-sm p-4 rounded-xl border border-white/10 bg-white/5 text-center cursor-default transition-colors relative z-10"
          >
            <div className="text-white font-medium text-lg">{step.label}</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-widest mt-1">{step.desc}</div>
          </motion.div>
          {idx < steps.length - 1 && (
            <div className="h-10 w-px bg-gradient-to-b from-white/20 to-primary/50 my-2 relative z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/50 text-xs">
                ↓
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
