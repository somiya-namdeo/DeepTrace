import React from 'react';
import { motion } from 'framer-motion';

export const ShapPanel: React.FC = () => {
  const features = [
    { name: 'Failed Logins (1h)', pct: 45 },
    { name: 'Login Location', pct: 25 },
    { name: 'Distinct Resources Accessed', pct: 15 },
    { name: 'Time Deviation', pct: 9 },
    { name: 'Device Fingerprint Shift', pct: 6 },
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/70 font-mono">{feature.name}</span>
            <span className="text-white font-mono">{feature.pct}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-critical rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${feature.pct}%` }}
              transition={{ duration: 1, delay: idx * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
