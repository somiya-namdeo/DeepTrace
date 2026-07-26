import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { ModelCard } from '../components/intelligence/ModelCard';
import { MetricCard } from '../components/common/MetricCard';
import { AlertCard } from '../components/common/AlertCard';
import { BehaviourEmbedding } from '../components/visualizations/BehaviourEmbedding';
import { PipelineStep, type PipelineStepData } from '../components/visualizations/PipelineStep';
import { SystemStatusFooter } from '../components/layout/SystemStatusFooter';
import { mockModels } from '../data/mockData';
import { dashboardService } from '../services/dashboardService';
import { investigationService } from '../services/investigationService';
import { behaviourService } from '../services/behaviourService';
import type { DashboardSummary, BehaviourSpacePoint } from '../types/api';
import type { ThreatMetric, Alert } from '../types';
import { Loader2 } from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [behaviourSpacePoints, setBehaviourSpacePoints] = useState<BehaviourSpacePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      dashboardService.getDashboardOverview(),
      investigationService.getLatestAlerts(),
      behaviourService.getBehaviourSpace()
    ]).then(([dashboard, alerts, space]) => {
      setDashboardData(dashboard);
      setBehaviourSpacePoints(space.points);
      
      const mappedAlerts: Alert[] = alerts.alerts.slice(0, 4).map(a => ({
        id: a.alert_id,
        score: a.risk_score,
        type: a.title,
        description: `Severity: ${a.severity} | ${a.timestamp}`,
        confidence: a.confidence.toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW',
        status: a.status.toUpperCase() as 'OPEN' | 'INVESTIGATING' | 'CLOSED'
      }));
      setRecentAlerts(mappedAlerts);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setError(true);
      setLoading(false);
    });
  }, []);

  const pipelineSteps: PipelineStepData[] = [
    { id: '01', title: 'Event Stream', desc: 'Raw authentication and access events', type: 'normal' },
    { id: '02', title: 'Behaviour Sequence Analysis', desc: 'Temporal pattern extraction', type: 'normal' },
    { id: '03', title: 'Transformer Model', desc: 'Sequence anomaly detection', type: 'primary' },
    { id: '04', title: 'Isolation Forest', desc: 'Independent anomaly validation', type: 'secondary' },
    { id: '05', title: 'Threat Score Fusion', desc: 'Transformer + Isolation Forest ensemble confidence', type: 'primary' },
    { id: '06', title: 'SHAP Explanation', desc: 'Feature attribution reasoning', type: 'warning' },
    { id: '07', title: 'SOC Decision', desc: 'Human analyst review', type: 'critical' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase">DeepTrace Intelligence Core Initializing...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <div className="w-3 h-3 bg-critical rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)] mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase mb-6 text-critical">Unable to connect to DeepTrace Reasoning Core</div>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 rounded font-mono uppercase text-xs tracking-widest transition-colors">Retry Connection</button>
      </div>
    );
  }

  const dynamicMetrics: ThreatMetric[] = [
    { id: 'tm-1', label: 'Total Events Analyzed', value: dashboardData?.TotalEvents.toLocaleString() || '0', description: 'Past 24 hours', severity: 'normal' },
    { id: 'tm-2', label: 'Anomalies Detected', value: dashboardData?.TotalAlerts.toLocaleString() || '0', description: 'Requires review', severity: 'warning' },
    { id: 'tm-3', label: 'Critical Threat Score', value: dashboardData?.CriticalAlerts.toLocaleString() || '0', description: 'Immediate action needed', severity: 'critical' },
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
              <Link to="/investigations" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Open live investigation
              </Link>
              <Link to="/ai-core" className="bg-surface/50 hover:bg-surface border border-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.03] hover:border-white/30">
                Inspect intelligence core
              </Link>
            </div>
          </div>
          
          {/* Right Model Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center relative min-h-[400px]">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col space-y-4 z-10 h-full py-2">
              {/* Vertical connecting line */}
              <div className="absolute left-8 top-12 bottom-12 w-[2px] bg-gradient-to-b from-primary/30 via-secondary/30 to-primary/30 -z-10 hidden sm:block" />
              
              {mockModels.map((model, idx) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                  className="group relative flex-1 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  <div className="relative h-full [&>div]:transition-colors [&>div]:duration-300 group-hover:[&>div]:border-primary/40 group-hover:[&>div]:bg-[#12121a]">
                    <ModelCard 
                      title={model.type} 
                      name={model.name} 
                      subtitle={Object.entries(model.details).map(([k,v]) => `${k.toLowerCase()}: ${v}`).join(' • ')} 
                      status={model.status} 
                      glowColor={model.name.includes('Transformer') ? 'primary' : model.name.includes('Isolation') ? 'secondary' : 'primary'}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Overview */}
        <div className="mb-16 mt-16">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs text-muted font-mono tracking-widest uppercase">AI Threat Overview</h4>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2">What the reasoning core has observed</h2>
          <p className="text-white/50 mb-6">Aggregate signal from the transformer, isolation forest, and fusion engine over the last 24 hours.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicMetrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
            <MetricCard metric={{ id: "tm-state", label: "System State", value: dashboardData?.CriticalAlerts && dashboardData.CriticalAlerts > 0 ? "WARNING" : "STABLE", description: "Concept drift detected", severity: dashboardData?.CriticalAlerts && dashboardData.CriticalAlerts > 0 ? "warning" : "secondary" }} />
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
          
          <BehaviourEmbedding points={behaviourSpacePoints} />
        </div>

        {/* Decision Pipeline & Recent Investigations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="text-xs text-muted font-mono tracking-widest uppercase mb-6">Reasoning Graph</h4>
            <h2 className="text-2xl font-semibold text-white mb-2">AI Decision Pipeline</h2>
            <p className="text-white/50 mb-8">Every alert flows through this chain — from raw event to human decision.</p>
            
            <div className="space-y-3 relative z-10">
              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/40 via-warning/40 to-critical/40 animate-pulse -z-10 hidden sm:block" />
              {pipelineSteps.map((step, idx) => (
                <PipelineStep key={step.id} step={step} isLast={idx === pipelineSteps.length - 1} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-xs text-muted font-mono tracking-widest uppercase">Recent Investigations</h4>
               <Link to="/investigations" className="text-xs text-white/60 hover:text-white transition-all duration-300 bg-white/5 px-3 py-1.5 rounded border border-white/10 hover:bg-white/10 hover:scale-[1.03]">View all →</Link>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Signals awaiting analyst review</h2>
            <p className="text-white/50 mb-8">Highest confidence anomaly classifications.</p>
            
            <div className="space-y-4">
              {recentAlerts.map(alert => (
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
