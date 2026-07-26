import React from 'react';
import { GlassCard } from '../common/GlassCard';

export const ProfileEvolution: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      {/* VS Arrow in center for desktop */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-white/10 items-center justify-center">
        <span className="text-white/40 text-[10px] font-mono">VS</span>
      </div>

      <GlassCard className="p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-sm font-mono tracking-widest text-secondary uppercase mb-6 relative z-10">Historical Behaviour Profile</h3>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Identity</span>
            <span className="text-sm font-mono text-white/90">User-4821</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Baseline</span>
            <span className="text-sm font-mono text-white/90">30 days</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Typical Login</span>
            <span className="text-sm font-mono text-white/90">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Known Devices</span>
            <span className="text-sm font-mono text-white/90">3</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Common Locations</span>
            <span className="text-sm font-mono text-white/90">2</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard glow="warning" className="p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-warning/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-sm font-mono tracking-widest text-warning uppercase mb-6 relative z-10">Current Behaviour Profile</h3>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Login Pattern</span>
            <span className="text-sm font-mono text-warning">Changed</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">New Device</span>
            <span className="text-sm font-mono text-warning">Detected</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Location</span>
            <span className="text-sm font-mono text-warning">Unusual</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Risk</span>
            <span className="text-sm font-mono text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">Medium</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
