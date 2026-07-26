import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { BehaviourSpacePoint } from '../../types/api';
import { GlassCard } from '../common/GlassCard';

interface BehaviourEmbeddingProps {
  points: BehaviourSpacePoint[];
}

export const BehaviourEmbedding: React.FC<BehaviourEmbeddingProps> = ({ points }) => {
  const [hoveredNode, setHoveredNode] = useState<BehaviourSpacePoint | null>(null);

  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'anomaly':
        return 'bg-critical shadow-[0_0_15px_rgba(244,63,94,0.8)] z-10 w-4 h-4';
      case 'suspicious':
        return 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)] z-0 w-3 h-3';
      case 'normal':
      default:
        return 'bg-primary/60 w-2 h-2';
    }
  };

  const getRiskAndClassification = (cluster: string) => {
    switch (cluster) {
      case 'anomaly': return { risk: 0.90, classification: 'Anomaly Detected' };
      case 'suspicious': return { risk: 0.55, classification: 'Suspicious Behaviour' };
      case 'normal':
      default: return { risk: 0.15, classification: 'Normal Behaviour' };
    }
  };

  const counts = useMemo(() => {
    let normal = 0, suspicious = 0, anomaly = 0;
    points.forEach(p => {
      if (p.cluster === 'anomaly') anomaly++;
      else if (p.cluster === 'suspicious') suspicious++;
      else normal++;
    });
    return { normal, suspicious, anomaly };
  }, [points]);

  const normalizedPoints = useMemo(() => {
    if (!points || points.length === 0) return [];
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    if (maxX === minX) { maxX += 1; minX -= 1; }
    if (maxY === minY) { maxY += 1; minY -= 1; }

    // chartWidth and chartHeight in percentage, leaving 10% total padding (5% each side)
    const chartWidth = 90;
    const chartHeight = 90;

    return points.map(p => {
      const normalizedX = ((p.x - minX) / (maxX - minX)) * chartWidth;
      const normalizedY = ((p.y - minY) / (maxY - minY)) * chartHeight;
      
      // Add 5% padding and invert Y axis
      const finalX = 5 + normalizedX;
      const finalY = 100 - (5 + normalizedY);

      return { ...p, normX: finalX, normY: finalY };
    });
  }, [points]);

  return (
    <div className="relative w-full h-[500px] bg-[#0c0c14] border border-white/5 rounded-xl overflow-hidden mt-6">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Nodes */}
      {normalizedPoints.map((node, idx) => (
        <motion.div
          key={idx}
          className={`absolute rounded-full cursor-pointer transition-colors ${getNodeStyle(node.cluster)}`}
          style={{ left: `${node.normX}%`, top: `${node.normY}%` }}
          initial={{ opacity: 0 }}
          animate={{
            x: [0, (Math.random() * 4 - 2), 0],
            y: [0, (Math.random() * 4 - 2), 0],
            opacity: 1
          }}
          transition={{
            x: { duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" },
            y: { duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1 }
          }}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* Hover Tooltip */}
      {hoveredNode && (
        <GlassCard 
          glow={hoveredNode.cluster === 'anomaly' ? 'critical' : hoveredNode.cluster === 'suspicious' ? 'warning' : 'primary'}
          className="absolute z-20 w-64 p-4 pointer-events-none"
          style={{ 
            left: `${Math.min((hoveredNode as any).normX + 2, 80)}%`, 
            top: `${Math.min((hoveredNode as any).normY + 2, 80)}%` 
          }}
        >
          <div className="font-mono text-xs text-white/50 mb-1 uppercase tracking-widest">Entity:</div>
          <div className="text-white text-sm mb-4 font-mono">{hoveredNode.label}</div>
          
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Risk:</span>
              <span className={`text-lg font-semibold ${hoveredNode.cluster === 'anomaly' ? 'text-critical' : hoveredNode.cluster === 'suspicious' ? 'text-warning' : 'text-primary'}`}>
                {getRiskAndClassification(hoveredNode.cluster).risk.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col border-t border-white/5 pt-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Classification:</span>
              <span className="text-xs text-white">{getRiskAndClassification(hoveredNode.cluster).classification}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Legend Footer */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-surface/80 backdrop-blur-md rounded-lg border border-white/5 text-xs font-mono">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
            <span className="text-white/60">Normal Behaviour {counts.normal}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-white/60">Suspicious Behaviour {counts.suspicious}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-critical shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            <span className="text-white/60">Anomaly Detected {counts.anomaly}</span>
          </div>
        </div>
        <div className="text-white/30 uppercase">
          latent • 2D projection • t-SNE
        </div>
      </div>
    </div>
  );
};
