import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { behaviourEmbeddings } from '../../data/mockData';
import type { NodeEmbedding } from '../../types';
import { GlassCard } from '../common/GlassCard';

export const BehaviourEmbedding: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<NodeEmbedding | null>(null);

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

  return (
    <div className="relative w-full h-[500px] bg-[#0c0c14] border border-white/5 rounded-xl overflow-hidden mt-6">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Nodes */}
      {behaviourEmbeddings.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full cursor-pointer transition-colors ${getNodeStyle(node.type)}`}
          initial={{ x: `${node.x}%`, y: `${node.y}%`, opacity: 0 }}
          animate={{
            x: [`${node.x}%`, `${node.x + (Math.random() * 2 - 1)}%`, `${node.x}%`],
            y: [`${node.y}%`, `${node.y + (Math.random() * 2 - 1)}%`, `${node.y}%`],
            opacity: 1
          }}
          transition={{
            x: { duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" },
            y: { duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1 }
          }}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* Hover Tooltip */}
      {hoveredNode && (
        <GlassCard 
          glow={hoveredNode.type === 'anomaly' ? 'critical' : hoveredNode.type === 'suspicious' ? 'warning' : 'primary'}
          className="absolute z-20 w-64 p-4 pointer-events-none"
          style={{ 
            left: `${Math.min(hoveredNode.x + 2, 80)}%`, 
            top: `${Math.min(hoveredNode.y + 2, 80)}%` 
          }}
        >
          <div className="font-mono text-xs text-white/50 mb-1 uppercase tracking-widest">Entity:</div>
          <div className="text-white text-sm mb-4 font-mono">{hoveredNode.entity}</div>
          
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Risk:</span>
              <span className={`text-lg font-semibold ${hoveredNode.risk >= 0.75 ? 'text-critical' : hoveredNode.risk >= 0.5 ? 'text-warning' : 'text-primary'}`}>
                {hoveredNode.risk.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col border-t border-white/5 pt-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Classification:</span>
              <span className="text-xs text-white">{hoveredNode.classification}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Legend Footer */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-surface/80 backdrop-blur-md rounded-lg border border-white/5 text-xs font-mono">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
            <span className="text-white/60">Normal Behaviour 190</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-white/60">Suspicious Behaviour 22</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-critical shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            <span className="text-white/60">Anomaly Detected 5</span>
          </div>
        </div>
        <div className="text-white/30 uppercase">
          latent • 2D projection • t-SNE
        </div>
      </div>
    </div>
  );
};
