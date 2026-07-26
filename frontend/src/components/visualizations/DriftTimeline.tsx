import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { timelineEvents } from '../../data/evolutionMockData';

export const DriftTimeline: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Map 1-30 days to 0-100% width
  const getX = (day: number) => ((day - 1) / 29) * 100;
  
  // Create an SVG path for the line
  const pathData = timelineEvents.map((evt, idx) => {
    const x = getX(evt.day);
    // Add some random y variation for the line graph look
    const y = evt.risk === 'normal' ? 80 : evt.risk === 'info' ? 70 : evt.risk === 'warning' ? 50 : evt.risk === 'critical' ? 20 : 60;
    return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-64 mt-8 pt-4 pb-8">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      
      {/* SVG Line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      {timelineEvents.map((evt) => {
        const x = getX(evt.day);
        const y = evt.risk === 'normal' ? '80%' : evt.risk === 'info' ? '70%' : evt.risk === 'warning' ? '50%' : evt.risk === 'critical' ? '20%' : '60%';
        const colorClass = evt.risk === 'critical' ? 'bg-critical shadow-[0_0_12px_rgba(244,63,94,1)]' :
                           evt.risk === 'warning' ? 'bg-warning shadow-[0_0_12px_rgba(245,158,11,1)]' :
                           evt.risk === 'primary' ? 'bg-primary shadow-[0_0_12px_rgba(147,51,234,1)]' :
                           'bg-secondary shadow-[0_0_8px_rgba(45,212,191,0.6)]';
                           
        return (
          <motion.div
            key={evt.day}
            className="absolute w-4 h-4 -ml-2 -mt-2 cursor-pointer z-10"
            style={{ left: `${x}%`, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + (evt.day * 0.05) }}
            onMouseEnter={() => setHoveredDay(evt.day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div className={`w-full h-full rounded-full border-2 border-[#08080D] transition-transform duration-300 ${hoveredDay === evt.day ? 'scale-150' : 'scale-100'} ${colorClass}`} />
            
            {/* Tooltip */}
            {hoveredDay === evt.day && (
              <GlassCard 
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 p-3 pointer-events-none text-left z-50"
                glow={evt.risk === 'info' ? 'secondary' : evt.risk === 'normal' ? 'none' : evt.risk}
              >
                <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">{evt.label}</div>
                <div className="text-white text-sm font-medium">{evt.desc}</div>
              </GlassCard>
            )}
          </motion.div>
        );
      })}

      {/* X Axis Labels */}
      <div className="absolute -bottom-2 left-0 text-[10px] font-mono text-white/40 uppercase">30 Days Ago</div>
      <div className="absolute -bottom-2 right-0 text-[10px] font-mono text-white/40 uppercase">Today</div>
    </div>
  );
};
