import React from 'react';
import { motion } from 'framer-motion';

export const AreaChart: React.FC = () => {
  // Mock data points for 48 hours (we'll use 10 points for a smooth curve)
  // X from 0 to 100, Y from 0 to 100
  const points = [
    { x: 0, y: 70 },
    { x: 10, y: 65 },
    { x: 20, y: 55 },
    { x: 30, y: 40 },
    { x: 40, y: 30 },
    { x: 50, y: 20 },
    { x: 60, y: 15 },
    { x: 70, y: 12 },
    { x: 80, y: 15 },
    { x: 90, y: 18 },
    { x: 100, y: 10 }, // Highest drift (lowest Y coordinate on screen)
  ];

  // SVG path commands for a smooth bezier curve
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const mx = (p1.x + p2.x) / 2;
    d += ` C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  // Create area path by drawing to the bottom corners
  const areaD = `${d} L 100 100 L 0 100 Z`;

  // Threshold line
  const thresholdY = 25;

  return (
    <div className="relative w-full h-[260px] mt-2 overflow-visible px-4">
      <svg className="absolute inset-0 w-full h-full overflow-visible px-6" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Threshold dashed line */}
        <line x1="0" y1={thresholdY} x2="100" y2={thresholdY} stroke="#F43F5E" strokeWidth="0.8" strokeDasharray="2" strokeOpacity="0.8" />
        <text x="100" y={thresholdY - 2} fontSize="3" fill="#ffffff" fillOpacity="0.7" textAnchor="end" className="font-mono tracking-widest">threshold = 0.008</text>

        {/* Threshold Exceeded Annotation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <line x1="50" y1={thresholdY} x2="50" y2={thresholdY - 10} stroke="#F43F5E" strokeWidth="0.5" strokeOpacity="0.6" />
          <text x="50" y={thresholdY - 12} fontSize="2.5" fill="#F43F5E" fillOpacity="0.9" textAnchor="middle" className="font-mono uppercase tracking-widest">Threshold Exceeded</text>
        </motion.g>

        {/* Filled Area */}
        <motion.path
          d={areaD}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={d}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Points with tooltips */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill="#F59E0B"
            className="hover:r-[2.5px] hover:fill-[#FFF] transition-all cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + (i * 0.05) }}
          >
            <title>Score: {(100 - p.y) / 1000}</title>
          </motion.circle>
        ))}
        
        {/* Timestamps */}
        <text x="0" y="96" fontSize="2.5" fill="#ffffff" fillOpacity="0.4" textAnchor="start" className="font-mono uppercase tracking-widest">-48 HOURS AGO</text>
        <text x="100" y="96" fontSize="2.5" fill="#ffffff" fillOpacity="0.4" textAnchor="end" className="font-mono uppercase tracking-widest">NOW</text>
      </svg>
    </div>
  );
};
