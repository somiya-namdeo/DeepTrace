import React from 'react';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ReasoningTrace } from '../components/investigation/ReasoningTrace';
import { ShapPanel } from '../components/investigation/ShapPanel';

export const Investigations: React.FC = () => {
  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-[10px] text-muted font-mono tracking-widest uppercase mb-2">Investigation Workspace</h4>
          <h1 className="text-3xl font-semibold text-white">Analyst Review</h1>
        </div>
        <div className="flex space-x-3">
          <Badge variant="outline">ALT-006073</Badge>
          <Badge variant="critical">Critical</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Trace */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard glow="critical" className="p-8">
            <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Abnormal Traffic Sequence</h3>
                <p className="text-white/50 text-sm">Deviation in resource access sequence relative to peer group.</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Threat Score</div>
                <div className="text-4xl font-semibold text-critical">0.97</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono mb-6">AI Reasoning Trace</h4>
              <ReasoningTrace />
            </div>
          </GlassCard>
        </div>

        {/* Right Column: SHAP & Confidence */}
        <div className="lg:col-span-5 space-y-6">
          
          <GlassCard>
            <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono mb-6">Decision Confidence</h4>
            <div className="flex items-center justify-center mb-8 py-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center bg-surface relative z-10">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-white">97%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono mt-1">Confidence</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Transformer Model</span>
                <span className="text-white font-mono">94%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Isolation Forest</span>
                <span className="text-white font-mono">91%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">Feature Attribution</h4>
              <Badge variant="outline" className="text-[10px]">Kernel SHAP</Badge>
            </div>
            <p className="text-white/50 text-xs mb-6">These are the primary drivers forcing the AI's classification decision.</p>
            <ShapPanel />
          </GlassCard>
          
        </div>
      </div>
    </Container>
  );
};
