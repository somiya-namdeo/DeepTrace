import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/common/GlassCard';
import { SystemStatusFooter } from '../components/layout/SystemStatusFooter';
import { HorizontalPipeline } from '../components/visualizations/HorizontalPipeline';
import { modelService } from '../services/modelService';
import type { MetricsResponse } from '../types/api';
import { Loader2 } from 'lucide-react';

const ProgressBar: React.FC<{ value: number, colorClass: string }> = ({ value, colorClass }) => (
  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`h-full rounded-full ${colorClass}`}
    />
  </div>
);

export const AICore: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    modelService.getModelStatus()
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase">DeepTrace Intelligence Core Initializing...</div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <div className="w-3 h-3 bg-critical rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)] mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase mb-6 text-critical">Unable to connect to DeepTrace Reasoning Core</div>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 rounded font-mono uppercase text-xs tracking-widest transition-colors">Retry Connection</button>
      </div>
    );
  }

  const formatPct = (val: number) => (val * 100).toFixed(1);

  return (
    <>
      <Container className="pb-16 pt-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8 text-center max-w-2xl mx-auto"
        >
          <h4 className="text-[10px] text-muted font-mono tracking-widest uppercase mb-2">DeepTrace Architecture</h4>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">Intelligence Core</h1>
          <p className="text-white/50 text-sm">An ensemble of sequence models, anomaly detectors, and explainable AI working together.</p>
        </motion.div>

        {/* Model Intelligence Cards */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        >
          <GlassCard glow="primary" className="p-6 flex flex-col justify-between group hover:bg-surface/80 transition-colors h-full">
            <h3 className="text-sm font-semibold text-white mb-5 group-hover:text-primary transition-colors">Transformer Behaviour Model</h3>
            <div className="space-y-3 font-mono text-[11px] flex-1">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Architecture</span>
                <span className="text-white/90">Transformer Encoder</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Capability</span>
                <span className="text-white/90">Behaviour Learning</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/40 uppercase tracking-widest">Window</span>
                <span className="text-white/90">128 Events</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard glow="secondary" className="p-6 flex flex-col justify-between group hover:bg-surface/80 transition-colors h-full">
            <h3 className="text-sm font-semibold text-white mb-5 group-hover:text-secondary transition-colors">Isolation Forest</h3>
            <div className="space-y-3 font-mono text-[11px] flex-1">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Method</span>
                <span className="text-white/90">Unsupervised</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Trees</span>
                <span className="text-white/90">200</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/40 uppercase tracking-widest">Purpose</span>
                <span className="text-white/90">Anomaly Detection</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard glow="warning" className="p-6 flex flex-col justify-between group hover:bg-surface/80 transition-colors h-full">
            <h3 className="text-sm font-semibold text-white mb-5 group-hover:text-warning transition-colors">SHAP Explainability</h3>
            <div className="space-y-3 font-mono text-[11px] flex-1">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Method</span>
                <span className="text-white/90">Kernel SHAP</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Coverage</span>
                <span className="text-white/90">100% alerts</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/40 uppercase tracking-widest">Purpose</span>
                <span className="text-white/90">Decision Transparency</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Dashboard Layout: Pipeline & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 flex flex-col"
          >
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-2">Intelligence Pipeline Visualization</h4>
            <GlassCard className="flex-1 flex flex-col justify-center overflow-hidden relative group p-0 min-h-[180px] lg:h-[220px]">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <HorizontalPipeline />
            </GlassCard>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 flex flex-col"
          >
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-2">Model Performance</h4>
            <GlassCard className="flex-1 p-5 flex flex-col justify-between">
              <div className="space-y-3.5">
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-white/50 uppercase font-mono tracking-widest">Accuracy</span>
                    <span className="text-sm font-semibold text-white font-mono">{formatPct(metrics.Accuracy)}%</span>
                  </div>
                  <ProgressBar value={metrics.Accuracy * 100} colorClass="bg-white/80" />
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-white/50 uppercase font-mono tracking-widest">Precision</span>
                    <span className="text-sm font-semibold text-white font-mono">{formatPct(metrics.Precision)}%</span>
                  </div>
                  <ProgressBar value={metrics.Precision * 100} colorClass="bg-white/80" />
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-white/50 uppercase font-mono tracking-widest">Recall</span>
                    <span className="text-sm font-semibold text-white font-mono">{formatPct(metrics.Recall)}%</span>
                  </div>
                  <ProgressBar value={metrics.Recall * 100} colorClass="bg-white/80" />
                </div>

                <div className="pb-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-white/50 uppercase font-mono tracking-widest">F1 Score</span>
                    <span className="text-sm font-semibold text-white font-mono">{formatPct(metrics.F1Score)}%</span>
                  </div>
                  <ProgressBar value={metrics.F1Score * 100} colorClass="bg-white/80" />
                </div>
                
                <div className="bg-primary/10 -mx-5 px-5 py-4 -mb-5 border-t border-primary/20 rounded-b-xl flex flex-col">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[10px] text-primary uppercase font-mono tracking-widest font-semibold">ROC-AUC</span>
                    <span className="text-xl font-semibold text-primary font-mono">{formatPct(metrics.ROCAUC)}%</span>
                  </div>
                  <ProgressBar value={metrics.ROCAUC * 100} colorClass="bg-primary shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
                </div>
                
              </div>
            </GlassCard>
          </motion.div>
        </div>

      </Container>
      
      {/* Footer remains at bottom */}
      <SystemStatusFooter />
    </>
  );
};
