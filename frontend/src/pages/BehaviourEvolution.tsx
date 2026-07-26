import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { SystemStatusFooter } from '../components/layout/SystemStatusFooter';
import { GlassCard } from '../components/common/GlassCard';
import { AreaChart } from '../components/visualizations/AreaChart';
import { CircularMetric } from '../components/common/CircularMetric';
import { behaviourService } from '../services/behaviourService';
import { coldStartService } from '../services/coldStartService';
import { mockColdStartFeatures } from '../data/mockColdStartFeatures';
import type { DriftStatusResponse, ColdStartResponse } from '../types/api';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BehaviourEvolution: React.FC = () => {
  const [driftStatus, setDriftStatus] = useState<DriftStatusResponse | null>(null);
  const [coldStart, setColdStart] = useState<ColdStartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      behaviourService.getDriftStatus(),
      coldStartService.predictColdStart(mockColdStartFeatures)
    ]).then(([drift, cold]) => {
      setDriftStatus(drift);
      setColdStart(cold);
      setLoading(false);
    }).catch(err => {
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

  if (error || !driftStatus || !coldStart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <div className="w-3 h-3 bg-critical rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)] mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase mb-6 text-critical">Unable to connect to DeepTrace Reasoning Core</div>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 rounded font-mono uppercase text-xs tracking-widest transition-colors">Retry Connection</button>
      </div>
    );
  }



  return (
    <>
      <Container className="pb-16 pt-8 max-w-7xl">
        
        {/* 1. Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-3">Adaptation</h4>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Behaviour <span className="text-primary">Evolution</span>
          </h1>
          <p className="text-white/50 text-base max-w-3xl leading-relaxed">
            Normal is a moving target. DeepTrace watches how behaviour drifts and how new identities fit into what it already understands.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <GlassCard className="p-6 border border-primary/30 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Behaviour Investigation</h3>
                <p className="text-white/60 text-sm max-w-2xl">
                  Investigate a user, device, or identity against learned behavioural clusters and understand how AI reaches its decision.
                </p>
              </div>
              <Link to="/behaviour-investigation" className="group shrink-0 flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.03] shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                <span>Start Investigation</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* 2. Concept Drift Overview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-5">
            <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-2">
              Concept Drift
            </h4>
            <h2 className="text-2xl font-semibold text-white mb-1">How normal is changing</h2>
            <p className="text-white/50 text-sm">Continuous evaluation of feature-level distributional change.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <GlassCard className={`p-5 flex flex-col justify-center border-t border-t-white/10 hover:border-t-warning/50 transition-colors group`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Overall Drift Score</span>
                <div className={`flex items-center text-[9px] ${driftStatus.overall_drift_score > 0.05 ? 'text-warning bg-warning/10 border-warning/20' : 'text-secondary bg-secondary/10 border-secondary/20'} font-mono uppercase tracking-widest px-2 py-0.5 rounded border`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${driftStatus.overall_drift_score > 0.05 ? 'bg-warning' : 'bg-secondary'} mr-1.5`} />
                  {driftStatus.overall_drift_score > 0.05 ? 'Elevated' : 'Normal'}
                </div>
              </div>
              <span className={`text-3xl font-semibold ${driftStatus.overall_drift_score > 0.05 ? 'text-warning' : 'text-secondary'} group-hover:scale-105 origin-left transition-transform`}>{driftStatus.overall_drift_score.toFixed(4)}</span>
            </GlassCard>

            <GlassCard className="p-5 flex flex-col justify-center border-t border-t-white/10 hover:border-t-warning/50 transition-colors group">
              <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">System Status</span>
              <div>
                <div className="text-3xl font-semibold text-warning mb-1 group-hover:scale-105 origin-left transition-transform">{driftStatus.system_status}</div>
                <div className="text-[10px] text-warning/70 uppercase font-mono">Concept drift detected</div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex flex-col justify-center border-t border-t-white/10 hover:border-t-secondary/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Stable Features</span>
              </div>
              <span className="text-3xl font-semibold text-secondary mb-1 group-hover:scale-105 origin-left transition-transform">{driftStatus.stable_features}</span>
              <div className="text-[10px] text-white/40 uppercase font-mono flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                Within baseline range
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex flex-col justify-center border-t border-t-white/10 hover:border-t-warning/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Warning Features</span>
              </div>
              <span className="text-3xl font-semibold text-warning mb-1 group-hover:scale-105 origin-left transition-transform">{driftStatus.warning_features}</span>
              <div className="text-[10px] text-warning/70 uppercase font-mono flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mr-2 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                Requires monitoring
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* 3. Behaviour Evolution Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between md:items-end space-y-4 md:space-y-0">
              <div>
                <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-2">Timeline</h4>
                <h2 className="text-xl font-semibold text-white mb-1">Behaviour Evolution</h2>
                <p className="text-white/50 text-sm">Drift score across the past 48 hours.</p>
              </div>
              
              <div className="flex flex-col md:items-end space-y-1">
                <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Analysis Window: <span className="text-white/80">48 hours</span></span>
                <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Last Updated: <span className="text-white/80">2 min ago</span></span>
                <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Detection Method: <span className="text-white/80">Feature Distribution Drift</span></span>
              </div>
            </div>
            
            <AreaChart />
            
            <div className="px-6 pb-6 pt-0 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest mr-2">Affected Behaviour</span>
              {driftStatus.affected_features.map((feat, idx) => (
                <span key={idx} className="text-[10px] px-3 py-1 rounded-full border border-warning/30 text-warning bg-warning/5 font-mono shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                  {feat.feature}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 4. Cold Start Intelligence */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="mb-5">
            <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-2">Cold Start Intelligence</h4>
            <h2 className="text-2xl font-semibold text-white mb-1">Scoring the unfamiliar</h2>
            <p className="text-white/50 text-sm max-w-2xl">For new users and devices, DeepTrace compares against behavioural memory of similar profiles.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Left Card */}
            <GlassCard className="p-8 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-4">New Entity Analysis</h4>
                <h3 className="text-2xl font-semibold text-white mb-3">No historical behaviour available.</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  DeepTrace compares against behavioural memory of similar identities to project a baseline risk.
                </p>
              </div>

              <div className="border border-secondary/20 bg-secondary/5 rounded-xl p-5 mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-white/60 uppercase font-mono tracking-widest">Decision</span>
                  <span className="text-[10px] text-white/60 flex items-center font-mono bg-secondary/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                    Cleared
                  </span>
                </div>
                <div className="text-2xl font-semibold text-secondary tracking-tight mb-2">{coldStart.risk_level.toUpperCase()}</div>
                <p className="text-white/60 text-sm">{coldStart.explanation}</p>
              </div>
            </GlassCard>

            {/* Right Card */}
            <GlassCard className="p-8 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Behaviour Reference</div>
                  <div className="text-sm font-mono text-white/90">1,842 Similar Identities</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Embedding Model</div>
                  <div className="text-sm font-mono text-white/90">Behaviour Encoder v2</div>
                </div>
              </div>

              <div className="space-y-6 flex-1 flex flex-col justify-center items-center py-2 relative">
                {/* Low Risk Badge */}
                <div className="absolute top-0 left-0 bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-mono tracking-widest px-2 py-1 rounded uppercase">
                  {coldStart.risk_level}
                </div>
                
                <CircularMetric 
                  label="Similarity Confidence" 
                  value={coldStart.similarity_score * 100} 
                  subvalue={`${(coldStart.similarity_score * 100).toFixed(1)}%`} 
                  color="#2DD4BF" 
                />
                
                {(() => {
                  const normalizedRisk = coldStart.cold_start_risk_score <= 1 ? coldStart.cold_start_risk_score * 100 : coldStart.cold_start_risk_score;
                  return (
                    <CircularMetric 
                      label="Risk Assessment" 
                      value={normalizedRisk} 
                      subvalue={`${normalizedRisk.toFixed(1)}%`} 
                      color={normalizedRisk > 50 ? "#F43F5E" : "#A78BFA"} 
                    />
                  );
                })()}
              </div>
            </GlassCard>
            
          </div>
        </motion.div>

        {/* 5. Behaviour Clusters (Kept Mocked) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-xl font-semibold text-white">Behaviour Clusters</h2>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 bg-white/5 px-2 py-1 rounded border border-white/10">3 Active Clusters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="p-5 hover:bg-surface/80 transition-colors">
              <h3 className="text-lg font-medium text-white mb-1">Engineering Team</h3>
              <p className="text-white/40 text-sm mb-4 font-mono">412 identities</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Status</span>
                <span className="text-xs text-secondary font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_5px_rgba(45,212,191,0.8)]" /> Stable
                </span>
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 hover:bg-surface/80 transition-colors">
              <h3 className="text-lg font-medium text-white mb-1">Finance Team</h3>
              <p className="text-white/40 text-sm mb-4 font-mono">286 identities</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Status</span>
                <span className="text-xs text-warning font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mr-2 shadow-[0_0_5px_rgba(245,158,11,0.8)]" /> Moderate Drift
                </span>
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 hover:bg-surface/80 transition-colors">
              <h3 className="text-lg font-medium text-white mb-1">New Devices</h3>
              <p className="text-white/40 text-sm mb-4 font-mono">67 identities</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Status</span>
                <span className="text-xs text-primary font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shadow-[0_0_5px_rgba(147,51,234,0.8)]" /> Monitoring
                </span>
              </div>
            </GlassCard>
          </div>
        </motion.div>

      </Container>
      <SystemStatusFooter />
    </>
  );
};
