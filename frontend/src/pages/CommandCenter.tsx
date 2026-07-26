import React from 'react';
import { Container } from '../components/layout/Container';
import { ModelCard } from '../components/intelligence/ModelCard';
import { MetricCard } from '../components/common/MetricCard';
import { AlertCard } from '../components/common/AlertCard';
import { BehaviourEmbedding } from '../components/visualizations/BehaviourEmbedding';
import { PipelineStep, type PipelineStepData } from '../components/visualizations/PipelineStep';
import { SystemStatusFooter } from '../components/layout/SystemStatusFooter';
import { mockAlerts, mockModels, mockMetrics } from '../data/mockData';

export const CommandCenter: React.FC = () => {
  const pipelineSteps: PipelineStepData[] = [
    { id: '01', title: 'Event Stream', desc: 'Raw authentication and access events', type: 'normal' },
    { id: '02', title: 'Behaviour Sequence Analysis', desc: 'Temporal pattern extraction', type: 'normal' },
    { id: '03', title: 'Transformer Model', desc: 'Sequence anomaly detection', type: 'primary' },
    { id: '04', title: 'Isolation Forest', desc: 'Independent anomaly validation', type: 'secondary' },
    { id: '05', title: 'Threat Score Fusion', desc: 'Transformer + Isolation Forest ensemble confidence', type: 'primary' },
    { id: '06', title: 'SHAP Explanation', desc: 'Feature attribution reasoning', type: 'warning' },
    { id: '07', title: 'SOC Decision', desc: 'Human analyst review', type: 'critical' },
  ];

  return (
    <>
      <Container className="pb-20">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 relative mt-4">
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            <h4 className="text-[10px] text-muted font-mono tracking-widest uppercase mb-4 flex items-center">
              <div className="w-6 h-px bg-primary/50 mr-3" />
              DeepTrace AI Engine v2.4.1
            </h4>
            <div className="relative">
              {/* Subtle animated scanning glow behind the title */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-4 relative z-10">
                Behaviour Intelligence <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                  Running.
                </span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/20 border border-secondary/40">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
              </div>
              <span className="text-sm font-mono text-secondary uppercase tracking-widest">Reasoning Core Online</span>
            </div>

            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
              A reasoning system that learns the shape of normal, detects the shape of anomalous, and explains every decision it makes about your users and devices.
            </p>
            <div className="flex space-x-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Open live investigation
              </button>
              <button className="bg-surface/50 hover:bg-surface border border-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Inspect intelligence core
              </button>
            </div>
          </div>
          
          {/* Right Model Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 relative">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            {mockModels.map(model => (
              <ModelCard 
                key={model.id}
                title={model.type} 
                name={model.name} 
                subtitle={Object.entries(model.details).map(([k,v]) => `${k.toLowerCase()}: ${v}`).join(' • ')} 
                status={model.status} 
                glowColor={model.name.includes('Transformer') ? 'primary' : model.name.includes('Isolation') ? 'secondary' : 'primary'}
              />
            ))}
          </div>
        </div>

        {/* Threat Overview */}
        <div className="mb-16 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs text-muted font-mono tracking-widest uppercase">AI Threat Overview</h4>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2">What the reasoning core has observed</h2>
          <p className="text-white/50 mb-6">Aggregate signal from the transformer, isolation forest, and fusion engine over the last 24 hours.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
            <MetricCard metric={{ id: "tm-state", label: "System State", value: "WARNING", description: "Concept drift detected", severity: "warning" }} />
          </div>
        </div>

        {/* Behaviour Space */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs text-muted font-mono tracking-widest uppercase">Behaviour Intelligence</h4>
            <div className="flex items-center space-x-2 text-xs font-mono text-primary/70 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="uppercase tracking-widest">Transformer embedding</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Behaviour Space</h2>
          <p className="text-white/50 max-w-3xl">Latent projection of learned user and device patterns. Clusters describe normal life; outliers describe the interesting kind of unusual.</p>
          
          <BehaviourEmbedding />
        </div>

        {/* Decision Pipeline & Recent Investigations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="text-xs text-muted font-mono tracking-widest uppercase mb-6">Reasoning Graph</h4>
            <h2 className="text-2xl font-semibold text-white mb-2">AI Decision Pipeline</h2>
            <p className="text-white/50 mb-8">Every alert flows through this chain — from raw event to human decision.</p>
            
            <div className="space-y-3">
              {pipelineSteps.map((step, idx) => (
                <PipelineStep key={step.id} step={step} isLast={idx === pipelineSteps.length - 1} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-xs text-muted font-mono tracking-widest uppercase">Recent Investigations</h4>
               <button className="text-xs text-white/60 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded border border-white/10 hover:bg-white/10">View all →</button>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Signals awaiting analyst review</h2>
            <p className="text-white/50 mb-8">Highest confidence anomaly classifications.</p>
            
            <div className="space-y-4">
              {mockAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>

      </Container>
      <SystemStatusFooter />
    </>
  );
};
